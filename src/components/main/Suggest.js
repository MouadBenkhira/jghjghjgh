import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal';
import Profile from '../../pages/drawerPage/ProfileItems'; 
import './suggest.css';

const MyComponent = () => {
  const [usersData, setUsersData] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/all');
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArtist(null);
  };

  return (
    <>
      <div className='flex-container'>
        <div className='play-box'>
          <h1>Suggested artists</h1>
        </div>
      </div>
      <div className='grid-container'>
        {usersData.map(item => (
          <div key={item.id} className='navlink-item' onClick={() => handleArtistClick(item)}>
            <div className='image-container'>
              <img className='image' src={`http://localhost:8080/api/users/${item.id}/image`} alt={item.nom} />
            </div>
            <span className='text'>{item.nom}</span> <br />
          </div>
        ))}
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        {selectedArtist && <Profile artist={selectedArtist} />} {/* Pass the selected artist to Profile */}
      </Modal>
    </>
  );
};

export default MyComponent;
