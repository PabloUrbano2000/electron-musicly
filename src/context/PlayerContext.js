import React from "react";

export const PlayerContext = React.createContext({});

export function PlayerProvider(props) {
  const { children } = props;
  const [song, setSong] = React.useState(null);
  const playerRef = React.useRef(null);
  const [seeking, setSeeking] = React.useState(false);
  const [miniature, setMiniature] = React.useState(null);
  const [muted, setMuted] = React.useState(false);
  const [playing, setPlaying] = React.useState(null);
  const [volume, setVolume] = React.useState(0.5);
  const [loop, setLoop] = React.useState(false);
  const [totalSeconds, setTotalSeconds] = React.useState(0);
  const [currentSeconds, setCurrentSeconds] = React.useState(0);

  const handleSeekChange = (e) => {
    setCurrentSeconds(parseFloat(e.target.value));
  };

  const playSong = (songData, miniature) => {
    setSong(songData);
    setMiniature(miniature);
    setPlaying(true);
  };

  const silence = () => setMuted(!muted);

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    if (playerRef) {
      playerRef.current.seekTo(parseFloat(e.target.value));
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const onProgress = (data) => {
    if (!seeking) {
      setTotalSeconds(data.loadedSeconds);
      setCurrentSeconds(data.playedSeconds);
    }
  };

  const pause = () => setPlaying(false);
  const resume = () => setPlaying(true);

  const repeat = () => setLoop(!loop);

  const data = {
    playSong,
    pause,
    resume,
    seeking,
    silence,
    repeat,
    onProgress,
    totalSeconds,
    currentSeconds,
    handleSeekMouseUp,
    handleSeekChange,
    handleSeekMouseDown,
    song,
    volume,
    setVolume,
    miniature,
    playing,
    loop,
    playerRef,
    muted,
  };

  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  );
}
