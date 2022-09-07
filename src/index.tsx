import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Customize form so each control has more space
 */
const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '0.8em 0',
        },
      },
    },
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
