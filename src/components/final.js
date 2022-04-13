import { Lock } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { PhotoAlbum } from 'react-photo-album';
import { finalText, photos } from 'utils/constants';

export const Final = () => {
  const widthLayout = window.innerWidth;
  const nbColumn = widthLayout <= 590 ? 1 : 3;

  const [seePhoto, setSeePhoto] = useState(false);

  return (
    <div className="center final">
      <div className="fixed-icon">
        <Lock />
      </div>
      {!seePhoto && (
        <>
          <Typography
            variant="h4"
            className="final-title"
          >{`Joyeux 1 an ma chérie !!!!! `}</Typography>

          <div className="final-text-wrapper">
            {finalText.map((text, i) => {
              if (text) return <Typography key={`texte-${i}`}>{text}</Typography>;
              return <br key={`texte-${i}`} />;
            })}
          </div>
          <br />
          <Button variant="contained" onClick={() => setSeePhoto(true)}>
            Me remémorer ces souvenirs ...
          </Button>
        </>
      )}

      {seePhoto && (
        <>
          <Typography variant="h6">C'est parti pour 1 an de souvenirs !</Typography>
          <br />
          <PhotoAlbum layout="columns" photos={photos} columns={nbColumn} />
          <br />
          <Button variant="contained" onClick={() => setSeePhoto(false)}>
            Retour
          </Button>
        </>
      )}
    </div>
  );
};
