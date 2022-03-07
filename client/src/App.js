import './App.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/screens/Home';
import Show from './components/screens/Show'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/people/:id" element={<Show/>} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)

export default App
