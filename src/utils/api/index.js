import { fetcher } from './fetcher';

const getRequest = url => token => fetcher(url, token, 'GET', null);
const postRequest = url => token => body => fetcher(url, token, 'POST', body);

export const getAlbums = apiUrl => token => getRequest(`${apiUrl}/v1/albums`)(token);

export const getAlbum = apiUrl => id => token => getRequest(`${apiUrl}/v1/albums/${id}`)(token);

export const getAllMedias = apiUrl => token => getRequest(`${apiUrl}/v1/mediaItems`)(token);
export const searchMedias = apiUrl => body => token =>
  postRequest(`${apiUrl}/v1/mediaItems:search`)(token)(body);

export const getSharedAlbums = apiUrl => token => getRequest(`${apiUrl}/v1/sharedAlbums`)(token);
export const getSharedAlbum = apiUrl => sharedToken => token =>
  getRequest(`${apiUrl}/v1/sharedAlbums/${sharedToken}`)(token);

export const createAlbum = apiUrl => token =>
  postRequest(`${apiUrl}/v1/albums`)(token)({ album: { title: 'Surprise' } });

export const joinAlbum = apiUrl => sharedToken => token =>
  postRequest(`${apiUrl}/v1/sharedAlbums:join`)(token)({
    shareToken: sharedToken,
  });
