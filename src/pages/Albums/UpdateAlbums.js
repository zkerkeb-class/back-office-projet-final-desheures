/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { useParams, Link, data } from 'react-router-dom';
import { albumApi } from '../../services/api';
import { audioApi } from '../../services/api';
import { artistApi } from '../../services/api';
import Layout from '../../components/layout/Layout/Layout';
import Button from '../../components/common/Button/Button';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import PopUp from '../../components/common/Popup/Popup';

const UpdateAlbums = (onDelete) => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [availableTracks, setAvailableTracks] = useState([]);
  const [availableArtists, setAvailableArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    tracks: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState([]);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumResponse = await albumApi.getById(id);
        const tracksWithDetails = await Promise.all(
          albumResponse.data.tracks.map(async (track) => {
            const trackResponse = await audioApi.getById(track._id);
            return trackResponse.data;
          })
        );

        const albumWithTracks = {
          ...albumResponse.data,
          tracks: tracksWithDetails,
        };

        setAlbum(albumWithTracks);
        setFormData({
          title: albumResponse.data.title,
          releaseDate: new Date(albumResponse.data.releaseDate).getFullYear(),
          artist: albumResponse.data.artist?._id || '',
        });

        const tracksResponse = await audioApi.getAll();
        setAvailableTracks(tracksResponse.data);

        const artistsResponse = await artistApi.getAll();
        setAvailableArtists(artistsResponse.data);
      } catch (err) {
        setError(
          "Impossible de charger l'album, les musiques ou les artistes disponibles"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  useEffect(() => {
    if (searchQuery) {
      const results = availableTracks.filter((track) =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTracks(results);
    } else {
      setFilteredTracks(availableTracks);
    }
  }, [searchQuery, availableTracks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = album.tracks;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setIsUpdating(true);
    try {
      const updatedAlbum = {
        ...album,
        tracks: items.map((track) => ({
          _id: track._id,
        })),
      };
      setAlbum({
        ...album,
        tracks: items,
      });
      setFormData({
        ...album,
        tracks: items,
      });
    } catch (err) {
      setError('Erreur lors de la réorganisation des musiques');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddTrack = async (trackId) => {
    setIsUpdating(true);
    try {
      const trackResponse = await audioApi.getById(trackId);
      const trackDetails = trackResponse.data;

      const updatedAlbum = {
        ...album,
        tracks: [...album.tracks, { _id: trackDetails._id }],
      };
      setFormData(updatedAlbum);
      setAlbum(updatedAlbum);
    } catch (err) {
      setError("Erreur lors de l'ajout de la musique");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    setIsUpdating(true);
    try {
      const updatedAlbum = {
        ...album,
        tracks: album.tracks.filter((track) => track._id !== trackId),
      };
      setAlbum(updatedAlbum);
      setFormData(updatedAlbum);
    } catch (err) {
      setError('Erreur lors de la suppression de la musique');
    } finally {
      setIsUpdating(false);
      setShowDeletePopup(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const updatedAlbum = {
        ...album,
        title: formData.title,
        artist: album.artist._id,
        tracks: formData.tracks.map((track) => track._id),
      };
      const newAlbumdata = await albumApi.update(id, updatedAlbum);
      setAlbum(newAlbumdata.data);
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'album");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!album) return <p>Aucun album trouvé.</p>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#29282D] p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white">Modifier l'album</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Titre de l'album
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-[#1F1F23] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="artist"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Artiste
            </label>
            <div className="flex gap-2 items-center">
              <div
                id="artist"
                name="artist"
                className="w-full p-3 bg-[#1F1F23] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none"
              >
                {album.artist.name}
              </div>

              {formData.artist && (
                <Link
                  to={`/artist/update/${formData.artist}`}
                  className="text-[#A238FF] hover:text-[#8429DB] p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2 mt-4 text-white">
            Liste des musiques :
          </h2>
          {album.tracks && album.tracks.length > 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tracks" type="TRACK">
                {(provided) => (
                  <ul
                    className="list-none text-gray-700 dark:text-gray-300"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {album.tracks.map((track, index) => (
                      <Draggable
                        key={track._id}
                        draggableId={track._id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-1 flex justify-between items-center p-3 rounded-md ${
                              snapshot.isDragging
                                ? 'bg-[#2F2F33]'
                                : 'bg-[#1F1F23]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>
                              <span>
                                {index + 1}. {track.title}
                              </span>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Link
                                to={`/audio/update/${track._id}`}
                                className="text-[#A238FF] hover:text-[#8429DB] p-2"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </Link>
                              <Button
                                variant="danger"
                                onClick={() => handleDeleteClick()}
                                disabled={isUpdating}
                              >
                                Supprimer
                              </Button>
                              <PopUp
                                isOpen={showDeletePopup}
                                message={`Êtes-vous sûr de vouloir supprimer l'audio" ?`}
                                onConfirm={() => handleRemoveTrack(track._id)}
                                onCancel={handleCancelDelete}
                              />
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <p className="text-gray-500">Aucune musique trouvée.</p>
          )}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Annuler
            </Button>
            <Button type="submit" variant="primary" disabled={isUpdating}>
              {isUpdating ? 'Mise à jour...' : "Mettre à jour l'album"}
            </Button>
          </div>
        </form>

        <h3 className="text-xl font-semibold mb-2 mt-4 text-white">
          Ajouter une musique :
        </h3>
        <div className="mb-4">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Rechercher une musique
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-[#1F1F23] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none"
            placeholder="Rechercher par titre"
          />
        </div>

        {filteredTracks.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {filteredTracks.map((track) => (
              <li
                key={track._id}
                className="mb-1 flex justify-between items-center"
              >
                {track.title}
                <Button
                  variant="primary"
                  onClick={() => handleAddTrack(track._id)}
                  disabled={isUpdating}
                >
                  Ajouter
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            Aucune musique trouvée pour votre recherche.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default UpdateAlbums;
