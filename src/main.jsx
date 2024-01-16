import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {colors, components} from "./chakraStyles.js";
import App from './App.jsx'
import './index.css'

const theme = extendTheme({
    colors: colors,
    components: components,
})

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
        <ChakraProvider theme={theme}>
            <App/>
        </ChakraProvider>
    </BrowserRouter>
)
