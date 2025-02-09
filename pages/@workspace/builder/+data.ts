import { PageContextServer } from 'vike/types'

export const data = async (pageContext: PageContextServer) => {
  if (import.meta.env.PROD) {
    return pageContext.data
  }

  return fetch(
    `${import.meta.env.PUBLIC_ENV__API_BASE}/api/workspaces/${pageContext.routeParams.workspace}`
  ).then((res) => res.json())
}
