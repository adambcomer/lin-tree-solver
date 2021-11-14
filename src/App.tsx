import React, { FC } from 'react'
import { createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material'
import TreeViewer from './Pages/TreeViewer'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import SentenceEditor from './Pages/SentenceEditor'
import RuleEditor from './Pages/RulesEditor'
import RuleSetEditor from './Pages/RuleSetEditor'
import Home from './Pages/Home'
import GlobalContextProvider from './Context/GlobalContextProvider'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/500.css'

import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/500.css'

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

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalContextProvider>
        <BrowserRouter basename='/lin-tree-solver'>
          <Grid container>

            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sentence' element={<SentenceEditor />} />
              <Route path='/viewer' element={<TreeViewer />} />
              <Route path='/rules' element={<RuleEditor />} />
              <Route path='/rules/:id' element={<RuleSetEditor />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>

          </Grid>
        </BrowserRouter>
      </GlobalContextProvider>
    </ThemeProvider>
  )
}

export default App
