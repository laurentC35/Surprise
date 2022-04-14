import { Button, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AppContext } from 'MainApp';
import React, { useContext, useState } from 'react';
import fr from 'date-fns/locale/fr';
import { format } from 'date-fns/esm';
import { Lock } from '@mui/icons-material';

export const VerifyID = () => {
  const { name, setName, openNewNotif, setVerified, ready, setReady } = useContext(AppContext);

  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const [value, setValue] = useState('');

  const changeStep = newStep => {
    if (newStep === 1) setValue(new Date());
    else setValue('');
    setStep(newStep);
    setSuccess(false);
    setMessage(null);
  };

  const solutions = [[`l'écho`, `écho`, `echo`, `l'echo`], `08/05/2021 00:22`];

  const accept = type => e => {
    if (type) setReady(true);
    else setName(null);
  };

  const checkSoluce = e => {
    e.preventDefault();
    if (step === 0) {
      if (solutions[step].includes(value.toLowerCase().trim())) {
        setSuccess(true);
        setMessage(`C'est bien ça ! ( ${solutions[step][0]} )`);
      } else {
        setSuccess(false);
        setMessage(`"${value}" n'est pas la bonne réponse !`);
      }
    }
    if (step === 1) {
      const strDate = format(value, 'dd/MM/yyyy HH:mm');
      if (strDate === solutions[step]) {
        setSuccess(true);
        setMessage(`C'est bien ça ! (${solutions[step]})`);
      } else {
        setSuccess(false);
        setMessage(`Le "${strDate}" n'est pas la bonne réponse !`);
      }
    }
  };

  return (
    <div className="verify">
      {!ready && (
        <div className="center-wrapper">
          <Typography>Avant de continuer, nous aimerions vérifier votre identité.</Typography>
          <br />
          <Typography>Étes-vous prêt.e ?</Typography>
          <br />
          <Button
            variant="contained"
            className="verify-button"
            color="success"
            onClick={accept(true)}
          >
            Oui
          </Button>
          <Button
            variant="contained"
            className="verify-button"
            color="error"
            onClick={accept(false)}
          >
            Non
          </Button>
        </div>
      )}
      {ready && step === 0 && (
        <div className="center-wrapper">
          <br />
          <Typography variant="h5">
            {success ? `Énigme` : `Veuillez répondre à l'énigme suivante :`}
          </Typography>
          <br />
          <Typography>Il parle toutes les langues sans en comprendre aucune.</Typography>
          <Typography>Il loge dans les hauteurs mais jamais dans les dunes.</Typography>
          <Typography>Il faut bien se garder de lui faire confiance.</Typography>
          <Typography>Car il va répéter la moindre confidence.</Typography>

          <br />
          {!success && (
            <>
              <form onSubmit={checkSoluce} className="whoareyou">
                <Typography className="consigne">Qu'est-ce ?</Typography>
                <TextField
                  label="Réponse"
                  variant="outlined"
                  value={value}
                  onChange={({ target: { value: v } }) => {
                    setValue(v);
                    setMessage(null);
                  }}
                />
                <br />
                <Button type="submit" variant="contained" className="whoareyou-button">
                  Valider
                </Button>
              </form>
            </>
          )}
          <br />
          {success && message && (
            <Typography variant="h6" color={'green'}>
              {`C'est bien ça ! ( ${solutions[0][0]} )`}
            </Typography>
          )}
          {!success && message && (
            <Typography variant="h6" color={'red'}>
              {`"${value}" n'est pas la bonne réponse !`}
            </Typography>
          )}
          <br />
          {success && (
            <Button variant="contained" onClick={() => changeStep(1)}>
              Continuer
            </Button>
          )}
        </div>
      )}
      {ready && step === 1 && (
        <div className="center-wrapper">
          <br />
          <Typography variant="h5">Veuillez répondre à la question suivante : </Typography>
          <br />
          <Typography>
            Il est preque sûr que vous connaissiez déjà la réponse à l'énigme précédente.
          </Typography>
          <Typography>
            D'ailleurs, il semblerait qu'une personne aie trouvé la réponse avant vous.
          </Typography>

          <br />
          {!success && (
            <>
              <form onSubmit={checkSoluce} className="whoareyou">
                <Typography className="consigne">
                  À quelle date et à quelle heure, avez-vous envoyé votre premier <b>SMS</b> à cette
                  personne ?
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={fr}>
                  <DateTimePicker
                    label="Date et heure"
                    value={value}
                    onChange={v => {
                      setValue(v);
                      setMessage(null);
                    }}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <br />
                <Button type="submit" variant="contained" className="whoareyou-button">
                  Valider
                </Button>
              </form>
            </>
          )}
          <br />
          {message && (
            <Typography variant="h6" color={success ? 'green' : 'red'}>
              {message}
            </Typography>
          )}
          <br />
          {success && (
            <Button variant="contained" onClick={() => changeStep(2)}>
              Continuer
            </Button>
          )}
        </div>
      )}
      {ready && step === 2 && (
        <div className="center-wrapper">
          <br />
          <Typography variant="h5">{`Impressionnant ${name} !`}</Typography>
          <br />
          <Typography>Votre identité est désormais confirmée.</Typography>

          <br />
          <Button variant="contained" onClick={() => setVerified(true)} startIcon={<Lock />}>
            Continuer de manière sécurisé
          </Button>
        </div>
      )}
    </div>
  );
};
