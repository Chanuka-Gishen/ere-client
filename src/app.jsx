import { createRef } from 'react';

/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import SnackbarNotifier from './common/service/snackbar-notifier';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  // Dismiss Action to all snackbars
  const notistackRef = createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider>
        <SnackbarProvider
          dense
          preventDuplicate
          ref={notistackRef}
          action={(key) => (
            <IconButton aria-label="dismiss" size="small" onClick={onClickDismiss(key)}>
              <CloseIcon fontSize="inherit" color={'action'} />
            </IconButton>
          )}
        >
          <SnackbarNotifier />
          <Router />
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
