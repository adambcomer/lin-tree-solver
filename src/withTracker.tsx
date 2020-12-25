/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */

import React, { Component, ComponentType, ReactNode } from 'react'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-129077573-1')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function withTracker (WrappedComponent: ComponentType, options = {}) {
  const trackPage = (page: string): void => {
    ReactGA.set({
      page: '/lin-tree-solver' + page,
      ...options
    })
    ReactGA.pageview('/lin-tree-solver' + page)
  }

  const HOC = class extends Component<{ location: { pathname: string } }> {
    componentDidMount (): void {
      const {
        location: { pathname: page }
      } = this.props
      trackPage(page)
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps (nextProps: { location: { pathname: string } }): void {
      const {
        location: { pathname: currentPage }
      } = this.props
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render (): ReactNode {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}
