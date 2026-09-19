/*
 * Copyright 2026 Adam Bishop Comer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/toast'

import type { Route } from './+types/root'
import favicon from './favicon.ico'
import './style.css'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: favicon },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap'
  }
]

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <Meta />
      <Links />
      {import.meta.env.PROD && (
        <script
          defer
          src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon='{"token": "4a8f4dcd24dd44de90aff09a966bb224"}'
        ></script>
      )}
    </head>
    <body>
      <HeroUIProvider>
        <ToastProvider />
        <div className='max-w-screen-2xl mx-auto p-4 2xl:p-8'>{children}</div>
      </HeroUIProvider>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
)

const App = () => <Outlet />

export default App

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <p>{typeof error.data === 'string' ? error.data : '404 Page Not Found'}</p>
    }
    return <p>{`${error.status} ${error.statusText}`}</p>
  }

  return <p>500 Internal Server Error</p>
}
