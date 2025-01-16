import React from 'react';
import { useForm } from '../../../hooks/useForm';

const FilterPanel = ({ onFilter, filters, sortOptions }) => {
  const { values, handleChange } = useForm({
    artist: '',
    album: '',
    genre: '',
    year: '',
    duration: '',
    sortBy: '',
    sortOrder: 'asc',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(values);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtres */}
          <select
            name="artist"
            value={values.artist}
            onChange={handleChange}
            className="input"
          >
            <option value="">Artiste</option>
            {filters.artists?.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>

          <select
            name="album"
            value={values.album}
            onChange={handleChange}
            className="input"
          >
            <option value="">Album</option>
            {filters.albums?.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>

          <select
            name="genre"
            value={values.genre}
            onChange={handleChange}
            className="input"
          >
            <option value="">Genre</option>
            {filters.genres?.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="year"
            placeholder="Année"
            value={values.year}
            onChange={handleChange}
            className="input"
          />

          <select
            name="duration"
            value={values.duration}
            onChange={handleChange}
            className="input"
          >
            <option value="">Durée</option>
            <option value="0-180">0-3 min</option>
            <option value="181-300">3-5 min</option>
            <option value="301+">5+ min</option>
          </select>

          {/* Options de tri */}
          <div className="flex gap-2">
            <select
              name="sortBy"
              value={values.sortBy}
              onChange={handleChange}
              className="input flex-1"
            >
              <option value="">Trier par</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              name="sortOrder"
              value={values.sortOrder}
              onChange={handleChange}
              className="input w-24"
            >
              <option value="asc">↑</option>
              <option value="desc">↓</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onFilter({})}
            className="btn btn-secondary"
          >
            Réinitialiser
          </button>
          <button type="submit" className="btn btn-primary">
            Appliquer
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;
