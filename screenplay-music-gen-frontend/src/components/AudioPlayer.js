import React, { useState } from 'react';

// audioFile -> path to mp3
const AudioPlayer = (audioFile) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const audio = new Audio(audioFile);
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <button onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default AudioPlayer;