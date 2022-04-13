import React, { useState } from 'react';
import { Alert, Backdrop, CircularProgress, Snackbar, Typography } from '@mui/material';
import './App.css';
import { WhoAreYou } from 'components/whoAreYou';
import { VerifyID } from 'components/verifyId';
import { Final } from 'components/final';

export const AppContext = React.createContext();

const defaultNotif = { severity: 'success', message: '' };

function MainApp() {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const [notif, setNotif] = useState(defaultNotif);
  const [notifOpen, setNotifOpen] = useState(false);
  const [name, setName] = useState('');
  const [verified, setVerified] = useState(false);

  const openNewNotif = ({ severity, message }) => {
    setNotif({ severity, message });
    setNotifOpen(true);
  };

  const handleClose = () => {
    setNotifOpen(false);
  };

  const context = {
    loading,
    setLoading,
    openNewNotif,
    name,
    setName,
    setVerified,
    ready,
    setReady,
  };

  return (
    <>
      <AppContext.Provider value={context}>
        <div className="center">
          {!name && (
            <>
              <Typography variant="h4">Bonjour à vous.</Typography>
              <WhoAreYou />
            </>
          )}
          {name && !ready && !verified && (
            <Typography variant="h4">{`Enchanté ${name} !`}</Typography>
          )}
        </div>

        {name && !verified && <VerifyID />}
        {name && verified && <Final />}
      </AppContext.Provider>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 100 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={notifOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={notif.severity} sx={{ width: '100%' }}>
          {notif.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default MainApp;
