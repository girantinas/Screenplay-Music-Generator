import React, { useState } from 'react';

const AudioPlayer = (mp3Url) => {
    const url = window.URL.createObjectURL(new Blob([mp3Url]));
  var audio = new Audio(url)
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    audio.play()
    setIsPlaying(true);
  };

  const handlePause = () => {
    audio.pause()
    setIsPlaying(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'audio.mp3');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {!isPlaying && <button onClick={handlePlay}>Play</button>}
      {isPlaying && <button onClick={handlePause}>Pause</button>}
      <button onClick={handleDownload}>Download</button>
    </div>
    
  );
};

export default AudioPlayer;