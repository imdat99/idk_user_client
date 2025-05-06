/**
 * Enhanced fetcher for SWR with authentication and token refresh
 */

import { memorizeFn } from "./utils"

// Options for the enhanced fetcher
export interface EnhancedFetcherOptions {
    /** Function to get the current access token */
    getAccessToken?: () => string | null
    /** Function to get the refresh token */
    getRefreshToken?: () => string | null
    /** Function to store new tokens after refresh */
    setTokens?: (accessToken: string, refreshToken: string) => void
    /** URL for refreshing tokens */
    refreshTokenUrl?: string
    /** Function to handle authentication errors */
    onAuthError?: (response: Response) => void
    /** Function to handle other errors */
    onError?: (error: Error) => void
    /** Default headers for all requests */
    defaultHeaders?: Record<string, string>
  }
  
  // Interface for API error
  export interface ApiError extends Error {
    status?: number
    info?: any
  }
  
  /**
   * Creates an enhanced fetcher for SWR with authentication and token refresh
   * @param apiBaseUrl - Base URL of the API
   * @param options - Configuration options for the fetcher
   * @returns SWR fetcher function
   */
  export const createEnhancedFetcher = (
    apiBaseUrl: string,
    options: EnhancedFetcherOptions = {}
  ) => {
    const {
      getAccessToken = () => localStorage.getItem('accessToken'),
      getRefreshToken = () => localStorage.getItem('refreshToken'),
      setTokens = (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
      },
      refreshTokenUrl = '/auth/refresh-token',
      onAuthError = () => {},
      onError = () => {},
      defaultHeaders = {},
    } = options
  
    // Flag to prevent multiple simultaneous refresh attempts
    let isRefreshing = false
    // Queue of requests waiting for token refresh
    let refreshQueue: Array<() => void> = []
  
    /**
     * Process the queue of pending requests after token refresh
     */
    const processQueue = () => {
      refreshQueue.forEach(callback => callback())
      refreshQueue = []
    }
  
    /**
     * Attempt to refresh the authentication token
     * @returns Promise that resolves when token is refreshed
     */
    const refreshAuthToken = async (): Promise<boolean> => {
      if (isRefreshing) {
        // Return a promise that resolves when the refresh is complete
        return new Promise(resolve => {
          refreshQueue.push(() => resolve(true))
        })
      }
  
      isRefreshing = true
      const refreshToken = getRefreshToken()
  
      if (!refreshToken) {
        isRefreshing = false
        return false
      }
  
      try {
        const response = await fetch(`${apiBaseUrl}${refreshTokenUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        })
  
        if (!response.ok) {
          isRefreshing = false
          return false
        }
  
        const data = await response.json()
        
        // Store new tokens
        if (data.accessToken && data.refreshToken) {
          setTokens(data.accessToken, data.refreshToken)
          isRefreshing = false
          processQueue()
          return true
        }
        
        isRefreshing = false
        return false
      } catch (error) {
        console.error('Token refresh failed:', error)
        isRefreshing = false
        return false
      }
    }
  
    /**
     * Enhanced fetcher for SWR
     * @param url - Endpoint to fetch
     * @param config - Additional fetch configuration
     * @returns Promise with parsed data
     */
    return async <T = any>(
      url: string,
      config: RequestInit & { 
        headers?: Record<string, string>,
        skipAuthRefresh?: boolean
      } = {}
    ): Promise<T> => {
      // Prepare URL
      const fullUrl = url.startsWith('http') ? url : `${apiBaseUrl}${url}`
      
      const executeRequest = async (retried = false): Promise<T> => {
        // Prepare headers with authentication token
        const token = typeof getAccessToken === 'function' ? getAccessToken() : getAccessToken
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          ...defaultHeaders,
          ...(config.headers || {}),
        }
  
        // Add Authorization header if token exists
        if (token) {
          Object.assign(headers, {
            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
          })
        }
  
        try {
          // Execute request
          const response = await fetch(fullUrl, {
            ...config,
            headers,
            credentials: config.credentials || 'include',
          })
  
          // Handle authentication error with token refresh
          if (response.status === 401 && !retried && !config.skipAuthRefresh) {
            const refreshed = await refreshAuthToken()
            if (refreshed) {
              return executeRequest(true)
            } else {
              onAuthError(response)
              throw new Error('Unauthorized')
            }
          }
  
          // Handle other errors
          if (!response.ok) {
            const apiError = new Error(`HTTP Error: ${response.status}`) as ApiError
            apiError.status = response.status
            apiError.info = await response.json().catch(() => ({}))
            throw apiError
          }
  
          // Check response type
          const contentType = response.headers.get('content-type')
          if (contentType?.includes('application/json')) {
            return response.json() as Promise<T>
          } else if (contentType?.includes('text/')) {
            return response.text() as unknown as T
          } else {
            return response as unknown as T
          }
        } catch (error) {
          if ((error as Error).message !== 'Unauthorized') {
            onError(error as Error)
          }
          throw error
        }
      }
  
      return executeRequest()
    }
  }
  
  /**
   * Hook that provides a pre-configured fetcher for use with SWR
   * @returns Configured fetcher
   */
  export const useEnhancedFetch = memorizeFn(() => {
    // Create fetcher with your API base URL
    const fetcher = createEnhancedFetcher('https://jsonplaceholder.typicode.com', {
      getAccessToken: () => localStorage.getItem('accessToken'),
      getRefreshToken: () => localStorage.getItem('refreshToken'),
      setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
      },
      refreshTokenUrl: '/auth/refresh',
      onAuthError: () => {
        // Redirect to login when refresh token fails
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      },
      defaultHeaders: {
        'X-App-Version': '1.0.0',
      },
    })
  
    return fetcher
  })
  
  /**
   * Usage example with SWR hook:
   * 
   * import useSWR from 'swr';
   * import { useEnhancedFetch } from './enhancedFetcher';
   * 
   * function UserProfile() {
   *   const fetcher = useEnhancedFetch();
   *   const { data, error } = useSWR('/users/me', fetcher);
   *   
   *   if (error) return <div>Failed to load</div>;
   *   if (!data) return <div>Loading...</div>;
   *   
   *   return <div>Hello {data.name}!</div>;
   * }
   */
  