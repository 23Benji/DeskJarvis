import React, { useRef, useState, useEffect } from 'react';

const playlist = [
  { title: 'Mood Remix', artist: 'Desk Jarvis', src: '/music/track1.mp3' },
  { title: 'Calm Down', artist: 'Desk Jarvis', src: '/music/track2.mp3' },
  { title: 'Gangstas Paradise', artist: 'feat. L.V.', src: '/music/track3.mp3' },
  { title: 'A Million Dreams', artist: 'Unknown', src: '/music/track4.mp3' }

];

const MusicPlayer = () => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const audioRef = useRef(null);

  const current = playlist[index];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play();
    setPlaying(!playing);
  };

  const nextTrack = () => {
    setIndex((i) => (i + 1) % playlist.length);
    setPlaying(true); // autoplay next track
    setTime(0);
  };

  const prevTrack = () => {
    setIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setPlaying(true); // autoplay previous track
    setTime(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const update = () => setTime(audio.currentTime);
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('ended', nextTrack);
    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('ended', nextTrack);
    };
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [index, playing]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="music-horizontal">
      <h3 className="widget-title">Music</h3>
      <p className="music-title">
        {current.title} – <span className="music-artist">{current.artist}</span>
      </p>

      <div className="music-controls">
        <button onClick={prevTrack}>⏮</button>
        <button onClick={togglePlay}>{playing ? '❚❚' : '▶'}</button>
        <button onClick={nextTrack}>⏭</button>
      </div>

      <div className="music-progress">
        <div className="bar">
          <div
            className="bar-fill"
            style={{
              width: `${
                audioRef.current && audioRef.current.duration
                  ? (time / audioRef.current.duration) * 100
                  : 0
              }%`,
            }}
          ></div>
        </div>
        <div className="time">
          {formatTime(time)} /{' '}
          {audioRef.current
            ? formatTime(audioRef.current.duration || 0)
            : '0:00'}
        </div>
      </div>

      <audio ref={audioRef} src={current.src} preload="auto" />
    </div>
  );
};

export default MusicPlayer;