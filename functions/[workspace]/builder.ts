interface Env {
  DB: D1Database
}

interface WorkspaceRow {
  id: string
  ruleset: string
  sentence: string
  created_at: string
  updated_at: string
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const res = await context.env.DB.prepare(
    'SELECT id, sentence, ruleset, created_at, updated_at FROM workspaces WHERE id = ?'
  )
    .bind(context.params.workspace)
    .first<WorkspaceRow>()

  try {
    const { renderPage } = await import('vike/server')
    const { httpResponse } = await renderPage({
      urlOriginal: context.request.url,

      data: {
        id: res.id,
        ruleset: JSON.parse(res.ruleset),
        sentence: JSON.parse(res.sentence),
        created_at: new Date(res.created_at),
        updated_at: new Date(res.updated_at)
      }
    })

    return new Response(httpResponse.getReadableWebStream(), {
      status: httpResponse.statusCode,
      headers: httpResponse.headers
    })
  } catch (err) {
    const error = err as Error
    console.error(error)
    return new Response(`${error.message}\n${error.stack}`, { status: 500 })
  }
}
