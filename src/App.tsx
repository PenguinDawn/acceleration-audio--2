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
  const [speed, setSpeed] = useState("1.0");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, changeTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

    useEffect(() => {
      if (isPlaying) {
        audioRef.current.load();
        audioRef.current.play();
        let intervalId = setInterval(() => {
          setProgress(audioRef.current.currentTime);
          setDuration(audioRef.current.duration);
        }, 500)
      } else {
        audioRef.current.pause();
      }
    }, [isPlaying]);


// watching our current time to see if it ends

useEffect(() => {
    setImgSrc(songs[currentTrack].albumArt);
    setArtist(songs[currentTrack].artist);
    setAudio(songs[currentTrack].file);
    setTitle(songs[currentTrack].title);
    setSpeed("1.0");
    audioRef.current.load();
    audioRef.current.playbackRate = speed;
}, [currentTrack])


// going back an entire song
  const goBackward = () => {
    if(currentTrack === 0) {
        changeTrack(songs.length - 1);
    }
    else {
        changeTrack(currentTrack - 1);
    };
  }

//   skipping forward a total song
  const goForward = () => {
    if(currentTrack != songs.length - 1) {
        changeTrack(currentTrack + 1);
    }
    else {
        changeTrack(0);
    };
}

// formatting our time
const changeTime = (seconds) => {
    let mins = 0;
    let sec = seconds;
    while (sec > 60) {
        mins += 1;
        sec -= 60;
    }
    sec = parseInt(sec)
    if (sec < 10) {
        sec = "0" + sec.toString() ;
    }
    return `${mins}:${sec}`
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
                <progress hidden id="progress" value={progress / duration} style={{width: "100%"}} max="1" className="bg-blue-300 w-[100%]"></progress>

                <div id="custom-progress" className="w-[100%] h-2 bg-blue-500 trasition-all rounded-full">
                    <div id="custom-progress-bar" style={{width: `${(progress / duration) * 100}%`}} className="w-0 h-2 bg-blue-300 z-10 rounded-full"></div>
                </div>
                <p className="text-[12px] text-black items-start" id="seconds">{changeTime(progress)}/{changeTime(duration)}</p>
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
