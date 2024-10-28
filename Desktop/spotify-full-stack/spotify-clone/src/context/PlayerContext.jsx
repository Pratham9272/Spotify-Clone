// PlayerContext.jsx
import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = 'http://localhost:4000';

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { seconds: 0, minutes: 0 },
    totalTime: { seconds: 0, minutes: 0 }
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => console.error("Audio play failed:", error));
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    const selectedTrack = songsData.find((item) => id === item._id);
    if (selectedTrack) {
      setTrack(selectedTrack);
      try {
        await audioRef.current.play();
        setPlayStatus(true);
      } catch (error) {
        console.error("Audio play failed:", error);
      }
    }
  };

  const next = () => {
    songsData.map(async (item,index) => {
      if (track._id === item._id && index < songsData.length - 1) {
        await setTrack(songsData[index + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const previous = () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error("Error fetching albums data:", error);
    }
  };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        seekBar.current.style.width = `${Math.floor((currentTime / duration) * 100)}%`;

        setTime({
          currentTime: {
            seconds: Math.floor(currentTime % 60),
            minutes: Math.floor(currentTime / 60),
          },
          totalTime: {
            seconds: Math.floor(duration % 60),
            minutes: Math.floor(duration / 60),
          }
        });
      };
    }
  }, [audioRef, track]);

  // New function to handle clicking on the seek bar
  const seekSong = (e) => {
    if (audioRef.current && seekBg.current) {
      const rect = seekBg.current.getBoundingClientRect();
      const seekTime = ((e.clientX - rect.left) / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      if (!playStatus) play();
    }
  };

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    next,
    previous,
    seekSong, // add seekSong to context
    songsData,
    albumsData
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
