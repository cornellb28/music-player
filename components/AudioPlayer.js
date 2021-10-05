import { useState, useRef, useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { BsSkipBackward, BsSkipForward } from "react-icons/bs";
import { GrPlay, GrPause } from "react-icons/gr";

function AudioPlayer({ timeJump }) {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setSongDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // References
  const audioPlayer = useRef(); // the audioPlayer
  const progressBar = useRef(); // the progressBar
  const animationRef = useRef(); // animation

  useEffect(() => {
    if (timeJump) {
      timeTravel(timeJump);
      setIsPlaying(true);
      play();
    } else {
      timeTravel(0);
    }
  }, [timeJump]);

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration); // 15
    setSongDuration(seconds);
    progressBar.current.max = seconds; // set the progressbar max to the current seconds // 15
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  useEffect(() => {
    if (currentTime == duration) {
      togglePlayPause();
      timeTravel(0);
    }
  }, [currentTime]);

  const togglePlayPause = () => {
    let prevState = isPlaying; // false
    setIsPlaying(!prevState); // true

    if (!prevState) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const changeRangeStatus = () => {
    audioPlayer.current.currentTime = progressBar.current.value; // set current Time to match the progressBar
    changePlayerCurrentTime();
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRangeStatus();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRangeStatus();
  };

  const timeTravel = (newTime) => {
    progressBar.current.value = newTime;
    changeRangeStatus();
  };

  return (
    <div className={styles.audioplayer}>
      <audio
        src=""
        preload="metadata"
        ref={audioPlayer}
      />
      <button className={styles.forwardBackward} onClick={backThirty}>
        <BsSkipBackward />
      </button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <GrPause /> : <GrPlay className={styles.play} />}
      </button>
      <button className={styles.forwardBackward} onClick={forwardThirty}>
        <BsSkipForward />
      </button>
      {/* current time */}
      <div className={styles.currentTime}>{currentTime}</div>
      {/* progress bar */}
      <div className={styles.duration}>
        <input
          type="range"
          className={styles.progressBar}
          ref={progressBar}
          onChange={changeRangeStatus}
        />
      </div>
      {/* duration */}
      <div className={styles.duration}>
        {duration && !isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  );
}

export { AudioPlayer };
