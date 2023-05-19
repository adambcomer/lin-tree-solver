/*
 * Copyright 2022 Adam Bishop Comer
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

import { createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material'
import TreeViewer from './Pages/TreeViewer'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import SentenceEditor from './Pages/SentenceEditor'
import RuleEditor from './Pages/RulesEditor'
import RuleSetEditor from './Pages/RuleSetEditor'
import Home from './Pages/Home'
import GlobalContextProvider from './Context/GlobalContextProvider'
import Support from './Pages/Support'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/500.css'

import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/500.css'
import NewTreeRoot from './Pages/Support/NewTreeRoot'
import SharingTrees from './Pages/Support/SharingTrees'

const theme = createTheme({
  palette: {
    primary: {
      main: '#263238',
      light: '#4f5b62',
      dark: '#000a12',
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
    },
  },
})

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalContextProvider>
        <BrowserRouter>
          <Grid container>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sentence' element={<SentenceEditor />} />
              <Route path='/viewer' element={<TreeViewer />} />
              <Route path='/rules' element={<RuleEditor />} />
              <Route path='/rules/:id' element={<RuleSetEditor />} />

              <Route path='/support' element={<Support />} />
              <Route path='/support/new-tree-root' element={<NewTreeRoot />} />
              <Route path='/support/sharing-trees' element={<SharingTrees />} />

              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </Grid>
        </BrowserRouter>
      </GlobalContextProvider>
    </ThemeProvider>
  )
}

export default App
