import React, { useContext } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      {songsData.length !== 0 ? (
        <>
          <div className='h-[90%] flex'>
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : (
        <div className='flex items-center justify-center h-full text-white'>
          <p>No songs available</p>
        </div>
      )}
      
      <audio ref={audioRef} src={track?.file || ""} preload='auto'></audio>
    </div>
  );
};

export default App;
