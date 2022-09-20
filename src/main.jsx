import { ChakraProvider } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import theme from './css/customTheme';
import { store } from './features/store';

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://7793453693094482a72d849e5d7b97fc@o1401587.ingest.sentry.io/6732677',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.7,
    enabled: false,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  </React.StrictMode>,

  document.getElementById('root'),
);
