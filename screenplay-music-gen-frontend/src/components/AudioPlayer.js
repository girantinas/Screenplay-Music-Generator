import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ audioURL }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioURL;
    }
  }, [audioURL]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={playAudio}>Play Audio</button>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default AudioPlayer;