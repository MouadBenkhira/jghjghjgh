// src/drawerPage/ArtistProfile.js
import React, { useEffect, useState } from 'react';

const ArtistProfile = ({ artist }) => {
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    fetchArtistData();
  }, [artist]);

  const fetchArtistData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${artist.id}`);
      const data = await response.json();
      setArtistData(data);
    } catch (error) {
      console.error('Error fetching artist data:', error);
    }
  };

  if (!artistData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardContent}>
          <div style={styles.profileHeader}>
            <div style={styles.profileImageContainer}>
              <img src={`http://localhost:8080/api/users/${artist.id}/image`} alt={artistData.nom} style={styles.profileImage} />
            </div>
            <div style={styles.profileInfo}>
              <h1 style={styles.profileName}>{artistData.nom}</h1>
              <p style={styles.profileLocation}>{artistData.location || 'Unknown location'}</p>
            </div>
          </div>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <p style={styles.statNumber}>{artistData.songs || 0}</p>
              <p style={styles.statLabel}>songs</p>
            </div>
            <div style={styles.stat}>
              <p style={styles.statNumber}>{artistData.followers || 0}</p>
              <p style={styles.statLabel}>Followers</p>
            </div>
            <div style={styles.stat}>
              <p style={styles.statNumber}>{artistData.following || 0}</p>
              <p style={styles.statLabel}>Following</p>
            </div>
          </div>
          <div style={styles.about}>
            <h2 style={styles.aboutTitle}>About</h2>
            <p style={styles.aboutText}>{artistData.about || 'No information available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0C0C0C',
    textAlign: 'center',
  },
  card: {
    margin: '0 auto',
    marginTop: '20px',
    backgroundColor: '#0C0C0C',
    borderRadius: '10px',
  },
  cardContent: {
    padding: '20px',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: '20px',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '75px',
  },
  profileInfo: {
    flex: '1',
  },
  profileName: {
    fontSize: '24px',
    color: 'white',
  },
  profileLocation: {
    fontSize: '16px',
    color: 'white',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: '14px',
    color: 'white',
  },
  about: {
    marginTop: '20px',
  },
  aboutTitle: {
    fontSize: '20px',
    color: 'white',
  },
  aboutText: {
    fontSize: '16px',
    lineHeight: '24px',
    color: 'white',
  },
};

export default ArtistProfile;
