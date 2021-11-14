import React, { ComponentType, useEffect } from 'react'
import { useLocation } from 'react-router'

const withTracker = (WrappedComponent: ComponentType) => {
  const trackPage = (page: string) => {
    if (window.gtag === undefined) return

    window.gtag('config', 'G-NPWF2XR6L3', { page_path: page })
  }

  const HOC = (props: any) => {
    const location = useLocation()

    useEffect(() => {
      trackPage('/lin-tree-solver' + location.pathname)
    }, [location.pathname])

    return <WrappedComponent {...props} />
  }

  return HOC
}

export default withTracker
