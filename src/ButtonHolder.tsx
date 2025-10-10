import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface buttonProps {
    playProp: Function,
    pauseProp: Function,
    skipProp: Function,
    backProp: Function
}

const ButtonHolder = () => {
    return (
         <div>
            <div className="button-holder bg-blue-200 p-5 rounded-2xl flex gap-6">
                <button id="backwards" className=''>
                    <SkipBack className="text-blue-600 fill-blue-400"></SkipBack>
                </button>
                
                <button id="playButton">
                    <Play  className="text-blue-600 fill-blue-400"> </Play>
                </button>
                <button id="pauseButton">
                    <Pause  className="text-blue-600 fill-blue-400"> </Pause>
                </button>
                <button id="forward">
                    <SkipForward className="text-blue-600 fill-blue-400"> </SkipForward>
                </button>
            </div>
        </div>
    )

}

export default ButtonHolder