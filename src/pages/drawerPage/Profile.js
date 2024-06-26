import React from 'react';

const Profile = () => {
  const goBack = () => {
    window.history.back(); // Navigate back to the previous screen
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <div style={styles.cardContent}>
          <div style={styles.profileHeader}>
            <div style={styles.profileImageContainer}>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Profile" style={styles.profileImage} />
            </div>
            <div style={styles.profileInfo}>
              <h1 style={styles.profileName}>Andy Horwitz</h1>
              <p style={styles.profileLocation}>New York</p>
            </div>
          </div>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <p style={styles.statNumber}>253</p>
              <p style={styles.statLabel}>songs</p>
            </div>
            <div style={styles.stat}>
              <p style={styles.statNumber}>1026</p>
              <p style={styles.statLabel}>Followers</p>
            </div>
            <div style={styles.stat}>
              <p style={styles.statNumber}>478</p>
              <p style={styles.statLabel}>Following</p>
            </div>
          </div>
          <div style={styles.about}>
            <h2 style={styles.aboutTitle}>About</h2>
            <p style={styles.aboutText}>Web Developer</p>
            <p style={styles.aboutText}>Lives in New York</p>
            <p style={styles.aboutText}>Photographer</p>
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
  backButtonContainer: {
    paddingLeft: '20px',
    fontSize: '20px',
    marginTop: '20px',
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

export default Profile;
