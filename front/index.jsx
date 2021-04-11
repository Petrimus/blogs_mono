import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import Container from '@material-ui/core/Container'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Container>
        <App />
      </Container>
    </Router>
  </Provider>,
  document.getElementById('root')
)
