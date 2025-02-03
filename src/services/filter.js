/* eslint-disable comma-dangle */
import api from './api';

export const filterService = {
  getArtistsByGenre: (genre) => api.get(`/filter/artists/genres/${genre}`),

  getAlbumsByArtist: (artistId) => api.get(`/filter/albums/artist/${artistId}`),
  getAlbumsByYear: (year) => api.get(`/filter/albums/year/${year}`),
  getAlbumsByGenre: (genre) => api.get(`/filter/albums/genres/${genre}`),

  getTracksByArtist: (artistId) => api.get(`/filter/tracks/artist/${artistId}`),
  getTracksByAlbum: (albumId) => api.get(`/filter/tracks/album/${albumId}`),
  getTracksByYear: (year) => api.get(`/filter/tracks/year/${year}`),
  getTracksByGenre: (genre) => api.get(`/filter/tracks/genres/${genre}`),
  getTracksByDuration: (range) => api.get(`/filter/tracks/duration/${range}`),
};
