import React from 'react';
import AudioPlayer from './AudioPlayer';

const AudioPlayerList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <AudioPlayer key={index} item={item} />
      ))}
    </div>
  );
};


export default AudioPlayerList;