import { Button, TextField, Typography } from '@mui/material';
import { AppContext } from 'MainApp';
import React, { useContext, useState } from 'react';

export const WhoAreYou = () => {
  const { setName } = useContext(AppContext);
  const [formName, setFormName] = useState('');

  const onChange = e => {
    setFormName(e.target.value);
  };

  const valid = e => {
    e.preventDefault();
    setName(formName);
  };
  return (
    <div className="center-wrapper">
      <form onSubmit={valid} className="whoareyou">
        <Typography className="consigne">Pour commencer, qui êtes vous ?</Typography>
        <TextField label="Prénom" variant="outlined" value={formName} onChange={onChange} />
        <br />
        <Button type="submit" variant="contained" className="whoareyou-button">
          Valider
        </Button>
      </form>
    </div>
  );
};
