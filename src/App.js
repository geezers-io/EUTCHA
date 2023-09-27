/* modules */
import { theme as chakraTheme, extendTheme } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages';
import About from '@/pages/about';
import MovieList from './page/MovieList';

/* css */
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'about',
    element: <About />,
  },
]);

const { Button } = chakraTheme.components;

const theme = extendTheme({
  components: {
    Button,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MovieList />
    </ChakraProvider>
  );
}

export default App;
