import { useEffect, useRef, useState } from 'react'
import './index.css'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import Header from './Header';

import DeepSnowcapImg from './songs/Deep-Abstract-Ambient-Snowcap-Img.png';
import DeepSnowcapPlay from './songs/Deep-Abstract-Ambient-Snowcap-play.mp3';
import FutureImg from './songs/Future-Design-Img.png';
import FuturePlay from './songs/future-design-play.mp3';
import VlogImg from './songs/Vlog-Beat-Img.png';
import VlogPlay from './songs/vlog-beat-play.mp3';

function App() {

  const songs = [
    { file: DeepSnowcapPlay, albumArt: DeepSnowcapImg, title: "Ambient Snowcap", artist: "ummbrella"},
    { file: FuturePlay, albumArt: FutureImg, title: "Future Design", artist: "penguinmusic" },
    { file: VlogPlay, albumArt: VlogImg, title: "Vlog Beat", artist: "Tunetank"}
];


  const [imgSrc, setImgSrc] = useState(DeepSnowcapImg);
  const [title, setTitle] = useState("Song Title");
  const [artist, setArtist] = useState("Song Artist");
  const [audioSrc, setAudio] = useState(DeepSnowcapPlay);
  const [speed, setSpeed] = useState(1.00);
  const [currentTrack, changeTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

    // useEffect(() => {
    //   if (isPlaying) {
    //     audioRef.load();
    //     audioRef.play();
    //   } else {
    //     audioRef.pause();
    //   }
    // }, [isPlaying]);

  const goBackward = () => {
    if(currentTrack === 0) {
        changeTrack(songs.length - 1);
    }
    else {
        changeTrack(currentTrack - 1);
    };
    setSpeed(1.0);
    setIsPlaying(true);
    // audioPlayer.playbackRate = speed;
  }

  const goForward = () => {
    if(currentTrack != songs.length - 1) {
        changeTrack(currentTrack + 1);
    }
    else {
        changeTrack(0);
    };
    setSpeed(1.0);
    // audioPlayer.playbackRate = speed;
}


  return (
   <div>
    <Header />
    <main className="flex flex-col items-center gap-5 bg-blue-100 pt-5 h-[100vh]">
      {/* Music Info Box */}
        <div className="musicInfo flex flex-col">
            <img id="songPicture" src={imgSrc} className=" bg-gray-400 h-[200px] w-[200px] rounded-sm"/>
            <p id="songTitle" className="text-gray-700 text-[16px]">{title}</p>
            <p id="songArtist" className="text-gray-700 text-[16px]">{artist}</p>
        </div>


        <p className="bg-blue-300 rounded-sm px-4 py-2">Speed: <span className="font-bold">{speed}</span>x</p>
        
        {/* Audio handling */}
        <div className="flex flex-col items-start w-[50%]">
            <audio id="audi" src={audioSrc} hidden controls ref={audioRef}></audio>
            <p className='w-[100%]'>
                <progress hidden id="progress" style={{width: "100%"}} max="1" className="bg-blue-300 w-[100%]"></progress>

                <div id="custom-progress" className="w-[100%] h-2 bg-blue-500 trasition-all rounded-full">
                    <div id="custom-progress-bar"  className="w-0 h-2 bg-blue-300 z-10 rounded-full"></div>
                </div>
                <p className="text-[12px] text-black items-start" id="seconds">0:00/1:00</p>
            </p>
        </div>


        {/* Button Box */}
         <div>
            <div className="button-holder bg-blue-200 p-5 rounded-2xl flex gap-6">
                <button id="backwards" onClick={goBackward}>
                    <SkipBack className="text-blue-600 fill-blue-400"></SkipBack>
                </button>
                
                <button id="playButton" onClick={() => setIsPlaying(true)}>
                    <Play  className="text-blue-600 fill-blue-400"> </Play>
                </button>
                <button id="pauseButton" onClick={() => setIsPlaying(false)}>
                    <Pause className="text-blue-600 fill-blue-400"> </Pause>
                </button>
                <button id="forward" onClick={goForward}>
                    <SkipForward className="text-blue-600 fill-blue-400"> </SkipForward>
                </button>
            </div>
        </div>
    </main>
    <script src="script.js"></script>
</div>
  )
}

export default App
