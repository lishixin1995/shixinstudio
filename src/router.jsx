import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// A small history router: the site only needs a handful of paths.
// Cloudflare Pages serves index.html for every path (public/_redirects).

const RouterContext = createContext({ path: '/', navigate: () => {} })

const clean = (path) => path.replace(/\/+$/, '') || '/'

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => clean(window.location.pathname))

  useEffect(() => {
    const onPop = () => setPath(clean(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to) => {
    if (clean(to) !== clean(window.location.pathname)) window.history.pushState(null, '', to)
    setPath(clean(to))
    window.scrollTo(0, 0)
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export const useRouter = () => useContext(RouterContext)

// A plain link that changes page without reloading; modifier clicks still open new tabs.
export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useRouter()
  return (
    <a
      href={to}
      {...rest}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — SX Architecture` : 'SX Architecture — Shixin Doris Li'
  }, [title])
}
