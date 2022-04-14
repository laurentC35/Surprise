export const CONF_KEY = 'local-my-pogues-conf';

export const getLocalConf = () => {
  return localStorage.getItem(CONF_KEY) ? JSON.parse(localStorage.getItem(CONF_KEY)) : null;
};

const examplePhoto = {
  src: 'https://laurentc35.github.io/static/img/metallicorn.jpg',
  width: 600,
  height: 600,
};

export const photos = [
  examplePhoto,
  examplePhoto,
  examplePhoto,
  examplePhoto,
  examplePhoto,
  examplePhoto,
  examplePhoto,
  examplePhoto,
  examplePhoto,
];

export const finalText = [
  'Voilà ! Nous venons de passer une première année ensemble.',
  'Pour moi cette année était juste merveilleuse à mes yeux.',
  "Dès de notre rencontre, il s'est passé quelque chose en moi, je t'ai de suite appréciée et j'en ai voulu plus rapidement.",
  "Tu n'étais pas seulement belle et séduisante, tu dégagais quelque chose en plus qui te rendait terriblement intéressante, attrayante et attachante à mes yeux.",
  '',
  `Je pense avoir "zingué" pour toi si ça existe !`,
  '',
  "Depuis que je te fréquente, il n'y a pas un seul moment en ta compagnie que j'ai regretté, seulement nos départs...",
  '',
  "Je me rends compte tous les jours que tu es une personne exceptionnelle avec qui je n'ai pas peur de m'engager.",
  "J'ai très hâte de vivre avec toi à Lille ! 🥰",
  '',
  "Je ne vais pas t'inonder de compliments, surtout que tu sais déjà ce que je pense de toi, il ne faudrais pas que tes chevilles gonflent ! 😜",
  'Je voudrais simplement te rappeler des souvenirs de cette première année ensemble...',
];
