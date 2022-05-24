import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'
import './styles/sidebar.css'
import './styles/login.css'
import './styles/loader.css'
import './styles/register.css'
import './styles/pages.css'
import './styles/table.css'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config,
  styles: {
    global: (props) => ({
      body: {
        bg: '#2b2b2b',
      },
    }),
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)