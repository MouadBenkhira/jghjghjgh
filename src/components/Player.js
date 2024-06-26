import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar, Button, Container, Row, Col } from 'react-bootstrap';
import './player.css';

const Player = ({ song, onNext, onPrevious, isPlaying, onPlayPause }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = document.getElementById('audio-element');
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      audio.addEventListener('timeupdate', updateProgress);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [song]);

  const handleSeek = (e) => {
    const audio = document.getElementById('audio-element');
    const percent = (e.nativeEvent.offsetX / e.target.offsetWidth) * 100;
    audio.currentTime = (percent / 100) * audio.duration;
    setProgress(percent);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Container fluid className="player-container fixed-bottom">
      <Row className="align-items-center">
        <Col xs={12} className="text-center">
          <h4>{song.title}</h4>
        </Col>
      </Row>
      <Row className="align-items-center justify-content-center mt-3">
        <Button variant="primary" onClick={onPrevious} className="mx-2">
          <FontAwesomeIcon icon={faStepBackward} />
        </Button>
        <Button variant="primary" onClick={onPlayPause} className="mx-2">
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </Button>
        <Button variant="primary" onClick={onNext} className="mx-2">
          <FontAwesomeIcon icon={faStepForward} />
        </Button>
      </Row>
      <Row className="mt-3">
        <Col>
          <ProgressBar now={progress} onClick={handleSeek} className="progress-bar-custom" />
        </Col>
      </Row>
      <audio id="audio-element" src={`http://localhost:8080/api/songs/${song.id}/play`} />
    </Container>
  );
};

export default Player;
