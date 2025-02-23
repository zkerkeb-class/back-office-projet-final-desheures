/* eslint-disable comma-dangle */
import api from './api';

export const sortService = {
  getArtistsAlphabetical: (order) =>
    api.get(`/sort/artists/alphabetical?order=${order}`),
  getArtistsByPopularity: () => api.get('/sort/artists/popularity'),

  getAlbumsByDate: (order) => api.get(`/sort/albums/date?order=${order}`),
  getAlbumsByPopularity: () => api.get('/sort/albums/popularity'),
  getAlbumsByTracks: (order) => api.get(`/sort/albums/tracks?order=${order}`),
  getAlbumsByReleased: () => api.get('/sort/albums/released'),

  getAudiosAlphabetical: () => api.get('/sort/audios/alphabetical'),
  getAudiosByDuration: (order) =>
    api.get(`/sort/audios/duration/?order=${order}`),
};
