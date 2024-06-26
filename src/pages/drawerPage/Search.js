import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@material-ui/core';
import Player from '../../components/Player';
import '../css/search.css';

const Search = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    fetchData();
    return () => {
      audio.pause();
      setAudio(new Audio());
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/songs/all');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const playSong = async (song) => {
    if (currentSong && currentSong.id === song.id && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/songs/${song.id}/play`);
      if (!response.ok) {
        throw new Error('Failed to play song');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      audio.pause();
      audio.src = url;
      audio.play();

      setCurrentSong(song);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

  const handlePlayPause = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    setIsPlaying(!audio.paused);
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  return (
    <div className="latest">
      <h1>Explore Latest Songs</h1>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="search"
        />
      </div>
    
      <div className="songs-container">
        {songs.map((song, index) => (
          <div key={index} className="song-card">
            <div className="song-title">
              {song.title}
              <IconButton color="primary" onClick={() => playSong(song)}>
                <FontAwesomeIcon icon={faPlay} />
              </IconButton>
            </div>
            <div className="song-subtitle">{song.title}</div>
          </div>
        ))}
      </div>
      
      {currentSong && (
        <Player
          song={currentSong}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      )}
    </div>
  );
};

export default Search;
