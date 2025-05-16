import { FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { CssBaseline, ThemeProvider, createTheme, styled } from '@mui/material';
import { grey, orange, pink } from '@mui/material/colors';
import { StyledEngineProvider } from '@mui/material/styles';

import { WithLocalContext, WithTokenContext } from '@graasp/apps-query-client';

import { API_HOST } from '@/config/env';
import i18nConfig from '@/config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from '@/config/queryClient';
import Loader from '@/modules/common/Loader';

import App from './main/App';

// declare the module to enable theme modification
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: { background: string; color: string };
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: { background: string; color: string };
    };
  }

  interface PaletteOptions {
    default: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: pink,
    default: grey['500'],
    background: {
      default: 'transparent',
      paper: '#fff',
    },
  },
  status: {
    danger: {
      background: orange['400'],
      color: '#fff',
    },
  },
});

const RootDiv = styled('div')({
  flexGrow: 1,
  height: '100%',
});

const Root: FC = () => (
  <RootDiv>
    {/* Used to define the order of injected properties between JSS and emotion */}
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <I18nextProvider i18n={i18nConfig}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <WithLocalContext
              defaultValue={{
                apiHost: API_HOST,
                context: 'player',
                itemId: '',
                permission: 'read',
              }}
              LoadingComponent={<Loader />}
              useGetLocalContext={hooks.useGetLocalContext}
              useAutoResize={hooks.useAutoResize}
              onError={() => {
                console.error('An error occurred while fetching the context.');
              }}
            >
              <WithTokenContext
                LoadingComponent={<Loader />}
                useAuthToken={hooks.useAuthToken}
                onError={() => {
                  console.error(
                    'An error occurred while requesting the token.',
                  );
                }}
              >
                <App />
              </WithTokenContext>
            </WithLocalContext>
            {import.meta.env.DEV && (
              <ReactQueryDevtools position="bottom-left" />
            )}
          </QueryClientProvider>
        </I18nextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </RootDiv>
);

export default Root;
