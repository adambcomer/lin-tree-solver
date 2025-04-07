import { PageContextServer } from 'vike/types'
import { render } from 'vike/abort'
import { db } from '../../../repo/database'
import { getWorkspace } from '../../../repo/workspace'

export const data = async (pageContext: PageContextServer) => {
  const workspace = await getWorkspace(db, pageContext.routeParams.workspace)
  if (!workspace) {
    throw render(
      404,
      `Workspace with ID ${pageContext.routeParams.workspace} doesn't exist.`
    )
  }

  return workspace
}
