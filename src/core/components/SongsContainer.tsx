import { useEffect, useState } from "react";

function SongsContainer() {
    const [beat, setBeat] = useState<HTMLAudioElement>();

    const fetchChratTrackData = () => {
        const options = {
            method: 'GET',
            headers: {'X-RapidAPI-Key': '1c31c7e468mshadcdb940674038ep115cdbjsn3948d878f5e5'}
          };
          
          fetch('https://shazam.p.rapidapi.com/charts/track', options)
            .then(response => response.json())
            .then(response => {console.log(response.tracks[0].hub.actions[1].uri)
                setBeat(new Audio(response.tracks[0].hub.actions[1].uri));
            })
            .catch(err => console.error(err));
    }

    const playSong = () => {
       beat?.play();
    }
    const pauseSong = () => {
        beat?.pause();
    }

    useEffect(() => {
        fetchChratTrackData()
    }, [])

    return (<>
        <div className="BottomSideTopComponentHomePage">
        <button onClick={playSong}>Play Song</button>
        <button onClick={pauseSong}>Pause Song</button>
        </div>
    </>)
}

export default SongsContainer;