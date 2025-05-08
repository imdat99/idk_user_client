import { Outlet } from "react-router"

const index = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center min-h-screen">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6">
        <Outlet />
      {/* <!-- SIGN IN PAGE -->
      <div id="signin">
        <div className="text-center">
          <img src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="Google Logo" className="mx-auto w-16 h-16" />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-600">Sign in to continue</p>
        </div>

        <button className="w-full mt-6 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or with email</span>
          </div>
        </div>

        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-blue-600" /> Remember me
            </label>
            <button type="button" onclick="showPage('forgot')" className="text-blue-600 hover:underline">Forgot?</button>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?
          <button onclick="showPage('signup')" className="text-blue-600 hover:underline">Sign Up</button>
        </div>
      </div>

      <!-- SIGN UP PAGE -->
      <div id="signup" className="hidden">
        <h2 className="text-center text-xl font-semibold text-gray-800">Create Account</h2>
        <form className="mt-6 space-y-4">
          <input type="text" placeholder="Full Name" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <button onclick="showPage('signin')" className="text-blue-600 hover:underline">Sign In</button>
        </div>
      </div>

      <!-- FORGOT PASSWORD PAGE -->
      <div id="forgot" className="hidden">
        <h2 className="text-center text-xl font-semibold text-gray-800">Reset Password</h2>
        <form className="mt-6 space-y-4">
          <input type="email" placeholder="Enter your email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition">
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?
          <button onclick="showPage('signin')" className="text-blue-600 hover:underline">Back to Sign In</button>
        </div>
      </div> */}
    </div>
  </div>
  )
}

export default index