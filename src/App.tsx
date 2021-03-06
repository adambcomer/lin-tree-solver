import React from 'react'
import TreeViewer from './Pages/TreeViewer'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider, Grid } from '@material-ui/core'
import Navbar from './Components/Navbar'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import SentenceEditor from './Pages/SentenceEditor'
import { Provider } from 'react-redux'
import store from './redux/store'
import RuleEditor from './Pages/RulesEditor'
import RuleSetEditor from './Pages/RuleSetEditor'
import Home from './Pages/Home'
import withTracker from './withTracker'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/500.css'

import '@fontsource/roboto-mono/400.css'
import '@fontsource/roboto-mono/500.css'

const theme = createMuiTheme({
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

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Provider store={store}>
          <BrowserRouter basename='/lin-tree-solver'>
            <Grid container>

              <Navbar />
              <Switch>
                <Route exact path='/' component={withTracker(Home)} />
                <Route exact path='/sentence' component={withTracker(SentenceEditor)} />
                <Route exact path='/viewer' component={withTracker(TreeViewer)} />
                <Route exact path='/rules' component={withTracker(RuleEditor)} />
                <Route exact path='/rules/:id' component={withTracker(RuleSetEditor)} />
                <Redirect to='/' />
              </Switch>

            </Grid>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
