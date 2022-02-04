import React, { ComponentType, useEffect } from 'react'
import { useLocation } from 'react-router'

function withTracker<P> (WrappedComponent: ComponentType<P>): (props: P) => JSX.Element {
  const trackPage = (page: string): void => {
    if (window.gtag === undefined) return

    window.gtag('config', 'G-NPWF2XR6L3', { page_path: page })
  }

  const HOC = (props: P): JSX.Element => {
    const location = useLocation()

    useEffect(() => {
      trackPage('/lin-tree-solver' + location.pathname)
    }, [location.pathname])

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default withTracker
