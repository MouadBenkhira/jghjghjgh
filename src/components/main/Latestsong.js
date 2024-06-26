import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';
import './latest.css';

const MyComponent = () => {
  const [latestSongs, setLatestSongs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/songs/latest');
      if (!response.ok) {
        throw new Error('Failed to fetch latest songs');
      }
      const data = await response.json();
      setLatestSongs(data);
    } catch (error) {
      console.error('Error fetching latest songs:', error.message);
    }
  };

  return (
    <>
      <div className='flex-container'>
        <div className='play-box'>
          <h1>Latest Songs</h1>
        </div>
      </div>
      <div className='grid-container1'>
        {latestSongs.slice(0, 5).map(song => (
          <NavLink key={song.id} to="#" className='navlink-item'>
            <div className='image-container'>
              <img className='image1' src={`http://localhost:8080/api/songs/${song.id}/image`} alt={song.title} />
              <button className='play-button'>
                <Icon name="play" />
              </button>
            </div>
            <span className='text'>{song.title}</span> <br />
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default MyComponent;
