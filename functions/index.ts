export const onRequestGet: PagesFunction = async (context) => {
  try {
    const { renderPage } = await import('vike/server')
    const { httpResponse } = await renderPage({
      urlOriginal: context.request.url
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
