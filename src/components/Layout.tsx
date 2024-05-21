/*
 * Copyright 2024 Adam Bishop Comer
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

import { PropsWithChildren, useEffect, useState } from 'react'
import { createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material'
import { Navbar, NavbarTab } from 'src/components/Navbar'
import GlobalContextProvider from 'src/Context/GlobalContextProvider'

const theme = createTheme({
  palette: {
    primary: {
      main: '#263238',
      light: '#4f5b62',
      dark: '#000a12'
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d'
    }
  }
})

interface LayoutProps {
  tab?: NavbarTab
}

export const Layout = ({ children, tab }: PropsWithChildren<LayoutProps>) => {
  return (
    <GlobalContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container>
          <Navbar tab={tab} />
          {children}
        </Grid>
      </ThemeProvider>
    </GlobalContextProvider>
  )
}
