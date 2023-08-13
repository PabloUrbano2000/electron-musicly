import React from "react";
import { Icon, Checkbox, Input } from "semantic-ui-react";
import ReactPlayer from "react-player";
import { usePlayer } from "../../../hooks";
import "./Player.scss";

export const Player = () => {
  const {
    song,
    playing,
    pause,
    resume,
    volume,
    loop,
    repeat,
    playerRef,
    totalSeconds,
    currentSeconds,
    handleSeekMouseUp,
    handleSeekChange,
    handleSeekMouseDown,
    onProgress,
    muted,
  } = usePlayer();

  return (
    <div className="player">
      <Icon
        name={playing ? "pause circle outline" : "play circle outline"}
        onClick={() => {
          if (song?.file) {
            playing ? pause() : resume();
          }
        }}
      />
      <Checkbox
        label={
          <Icon name={`${loop ? "repeat" : "shuffle"}`} onClick={repeat} />
        }
        onChange={(_, e) => repeat(e.checked)}
      />
      <ReactPlayer
        ref={playerRef}
        url={song?.file}
        playing={playing}
        height={0}
        width={0}
        loop={loop}
        volume={volume}
        muted={muted}
        progressInterval={totalSeconds}
        onProgress={onProgress}
      />
      <Input
        type="range"
        value={currentSeconds}
        min={0.0}
        className="bar"
        width={"100%"}
        size="tiny"
        step={0.01}
        max={!song?.file ? 1 : totalSeconds}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
      />
    </div>
  );
};
