import { Lock } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { AppContext } from 'MainApp';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { getSharedAlbum, joinAlbum, searchMedias } from 'utils/api';

const apiUrl = 'https://photoslibrary.googleapis.com';

export const GoogleButton = () => {
  const { name, openNewNotif, setLoading, setPhotos, setVerified, setName, shareToken } =
    useContext(AppContext);

  const [init, setInit] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const responseGoogle = response => {
    const { accessToken, profileObj } = response;
    console.log(response);
    if (accessToken) setAccessToken(accessToken);
    if (profileObj) setName(profileObj);
  };

  const logout = () => {
    setAccessToken(null);
    setPhotos(null);
    setInit(false);
    setName('');
    setVerified(false);
  };

  const createAlbumsFromResp = mediaItems => {
    return mediaItems?.map(({ baseUrl, mediaMetadata: { width, height } }) => {
      return { src: baseUrl, width: parseInt(width), height: parseInt(height) };
    });
  };

  const loadAlbum = useCallback(
    async albumId => {
      const { data } = await searchMedias(apiUrl)({ albumId: albumId })(accessToken);
      if (data) {
        const { mediaItems } = data;
        setPhotos(createAlbumsFromResp(mediaItems));
        setVerified(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken]
  );

  useEffect(() => {
    const launch = async () => {
      if (shareToken) {
        setLoading(true);
        const { data: shareAlbumData, error: errorGet } = await getSharedAlbum(apiUrl)(shareToken)(
          accessToken
        );
        console.log('shareAlbumData', shareAlbumData);
        if (!errorGet && shareAlbumData) {
          if (shareAlbumData.id) await loadAlbum(shareAlbumData.id);
          else {
            const { data: joinData, errorJoin } = await joinAlbum(apiUrl)(shareToken)(accessToken);
            console.log('joinData', joinData);
            if (!errorJoin && joinData?.album?.id) await loadAlbum(joinData?.album?.id);
            else {
              openNewNotif({ severity: 'error', message: `Impossible de charger l'album 1` });
              setError(JSON.stringify(joinData));
            }
          }
        } else {
          openNewNotif({ severity: 'error', message: `Impossible de charger l'album 2` });
          setError(JSON.stringify(shareAlbumData));
        }

        setInit(true);
        setLoading(false);
      } else {
        openNewNotif({ severity: 'error', message: `Impossible de charger l'album 3` });
        setError(JSON.stringify('Pas de shared token'));
      }
    };
    if (accessToken && !init) launch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, loadAlbum, init]);

  return (
    <>
      {!accessToken && (
        <div className="center-wrapper">
          <br />
          <Typography variant="h5">{`Impressionnant ${name} !`}</Typography>
          <br />
          <Typography>Votre identité est désormais confirmée.</Typography>

          <br />

          <GoogleLogin
            clientId="768407271978-7ieukafqae4qo9o7b6pmpukrchl0b0l6.apps.googleusercontent.com"
            scope={
              'profile email https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing'
            }
            render={renderProps => (
              <Button
                variant="contained"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{ textTransform: 'initial' }}
                startIcon={<Lock />}
              >
                {`Continuer de manière sécurisée, avec Google !! 😜`}
              </Button>
            )}
            buttonText="Se connecter"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      )}
      {accessToken && (
        <>
          <GoogleLogout
            clientId="768407271978-7ieukafqae4qo9o7b6pmpukrchl0b0l6.apps.googleusercontent.com"
            buttonText="Se déconnecter"
            onLogoutSuccess={logout}
          />
          <Typography>{error}</Typography>
        </>
      )}
    </>
  );
};
