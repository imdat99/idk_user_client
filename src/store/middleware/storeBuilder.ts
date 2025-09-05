import { create, type StateCreator } from 'zustand'

type AnyStateCreator<T> = StateCreator<T, any, any, any>
type Middleware<T extends object> = (config: AnyStateCreator<T>) => AnyStateCreator<T>

function storeBuilder<T extends object>() {
  let middlewares: Middleware<T>[] = []
  let config: AnyStateCreator<T> | null = null

  const api = {
    use(mw: Middleware<T>) {
      middlewares.push(mw)
      return api
    },
    apply(mws: Middleware<T>[]) {
      middlewares = middlewares.concat(mws)
      return api
    },
    config(c: AnyStateCreator<T>) {
      config = c
      return api
    },
    create() {
      if (!config) throw new Error('Store config has not been set')
      const wrapped = middlewares.reduceRight<AnyStateCreator<T>>((acc, mw) => mw(acc), config)
      return create<T>()(wrapped as AnyStateCreator<T>)
    },
  }

  return api
}

export default storeBuilder