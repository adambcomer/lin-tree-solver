import { ComponentType, useEffect } from 'react'
import { RouteChildrenProps } from 'react-router'

const withTracker = <P extends RouteChildrenProps>(WrappedComponent: ComponentType<P>) => {
  const trackPage = (page: string) => {
    if (window.gtag === undefined) return

    window.gtag('config', 'G-NPWF2XR6L3', { 'page_path': page })
    window.gtag('config', 'UA-129077573-1', { 'page_path': page })
  }

  const HOC = (props: P) => {

    useEffect(() => {
      trackPage(props.location.pathname)
    }, [props.location.pathname])

    return <WrappedComponent {...props as P} />
  }

  return HOC
}

export default withTracker
