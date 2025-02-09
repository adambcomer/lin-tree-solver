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
    .bind(context.params.id)
    .first<WorkspaceRow>()

  return Response.json(
    {
      id: res.id,
      ruleset: JSON.parse(res.ruleset),
      sentence: JSON.parse(res.sentence),
      created_at: new Date(res.created_at),
      updated_at: new Date(res.updated_at)
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS'
      }
    }
  )
}
