import React from "react";

export const PlayerContext = React.createContext({});

export function PlayerProvider(props) {
  const { children } = props;
  const [song, setSong] = React.useState(null);
  const [miniature, setMiniature] = React.useState(null);
  const [playing, setPlaying] = React.useState(null);
  const [volume, setVolume] = React.useState(0.5);

  const playSong = (songData, miniature) => {
    setSong(songData);
    setMiniature(miniature);
    setPlaying(true);
  };

  const pause = () => setPlaying(false);
  const resume = () => setPlaying(true);

  const data = {
    playSong,
    pause,
    resume,
    song,
    volume,
    setVolume,
    miniature,
    playing,
  };

  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  );
}
