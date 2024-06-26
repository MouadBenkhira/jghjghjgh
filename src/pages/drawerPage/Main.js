import React from 'react';
import TopContributor from '../../components/main/TopContributtor';
import '../css/main.css';
import Suggest from '../../components/main/Suggest';
import Latestsong from '../../components/main/Latestsong';

export default function Main({ onArtistClick }) {
  return (
    <div>
      <TopContributor />
      <Latestsong />
      <Suggest onArtistClick={onArtistClick} />
    </div>
  );
}
