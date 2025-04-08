import { usePageContext } from 'vike-react/usePageContext'

const Page = () => {
  const pageContext = usePageContext()

  if (pageContext.is404) {
    return <p>{pageContext.abortReason || '404 Page Not Found'}</p>
  }

  return <p>500 Internal Server Error</p>
}

declare global {
  namespace Vike {
    interface PageContext {
      abortReason?: string
    }
  }
}

export default Page
