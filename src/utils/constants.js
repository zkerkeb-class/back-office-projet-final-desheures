/* eslint-disable comma-dangle */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
  },
  ARTISTS: {
    BASE: '/artist',
    BY_ID: (id) => `/artist/${id}`,
  },
  ALBUMS: {
    BASE: '/album',
    BY_ID: (id) => `/album/${id}`,
  },
  AUDIO: {
    BASE: '/audio',
    BY_ID: (id) => `/audio/${id}`,
  },
};

export const FILE_TYPES = {
  AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  IMAGE: ['image/jpeg', 'image/png', 'image/gif'],
};

export const MAX_FILE_SIZE = {
  AUDIO: 10 * 1024 * 1024,
  IMAGE: 5 * 1024 * 1024,
};

export const SUPPORTED_LANGUAGES = ['fr', 'en'];

export const DEFAULT_PAGINATION = {
  PAGE_SIZE: 10,
  CURRENT_PAGE: 1,
};
