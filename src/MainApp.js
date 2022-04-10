import React, { useState } from 'react';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import './App.css';

export const AppContext = React.createContext();

const defaultNotif = { severity: 'success', message: '' };

function MainApp() {
  const [loading, setLoading] = useState(false);

  const [notif, setNotif] = useState(defaultNotif);
  const [notifOpen, setNotifOpen] = useState(false);

  const openNewNotif = ({ severity, message }) => {
    setNotif({ severity, message });
    setNotifOpen(true);
  };

  const handleClose = () => {
    setNotifOpen(false);
  };

  const context = { loading, setLoading, openNewNotif };

  return (
    <>
      <AppContext.Provider value={context}>
        <h1>Salut toi !</h1>
      </AppContext.Provider>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={notifOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={notif.severity} sx={{ width: '100%' }}>
          {notif.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default MainApp;
