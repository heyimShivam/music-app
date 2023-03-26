import { useEffect, useState } from "react";
import SongsDataBaseService from "./SongsDataBaseService";

interface PropsPlayingSongDetails {
    playingSongDetaisProps: {
        key: string;
        image: string;
        songTitle: string;
        songAuthorName: string;
        address: string;
    }
}

function PlayingSongContainer(props: PropsPlayingSongDetails) {
    const [beat, setBeat] = useState<HTMLAudioElement>();
    const [heartToggle, setHeartToggle] = useState<boolean>(false);
    const [songIsPlaying, setSongIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if((SongsDataBaseService.favouritiesSongsKey as string[]).includes(props.playingSongDetaisProps.key)) {
            setHeartToggle(true);
        } else {
            setHeartToggle(false);
        }

        setSongIsPlaying(false);
        beat?.pause();
        setBeat(new Audio(props.playingSongDetaisProps.address));;  
        beat?.load();
    }, [props.playingSongDetaisProps.address])

    const removeFromFavSongs = () => {
        if((SongsDataBaseService.favouritiesSongsKey as string[]).includes(props.playingSongDetaisProps.key)) {

            (SongsDataBaseService.favouritiesSongsKey as string[]).splice(
                (SongsDataBaseService.favouritiesSongsKey as string[]).indexOf(props.playingSongDetaisProps.key),
                1
            );
            SongsDataBaseService.saveFavSongToLocalstorage();
            setHeartToggle(false);
        }
    }

    const addToFavSongs = () => {
        if(! (SongsDataBaseService.favouritiesSongsKey as string[]).includes(props.playingSongDetaisProps.key)) {
            (SongsDataBaseService.favouritiesSongsKey as string[]).push(props.playingSongDetaisProps.key);
            SongsDataBaseService.saveFavSongToLocalstorage();
            setHeartToggle(true);
        }
    }

    const playSong = () => {
        if (!songIsPlaying) {

            beat?.play();
            setSongIsPlaying(true);
        }
    }

    const pauseSong = () => {
        if (songIsPlaying) {
            beat?.pause();

            setSongIsPlaying(false);
        }
    }

    return (<>
        <div className="bottomSongsContainer">
            <img src={props.playingSongDetaisProps.image} alt='playing music image' className="playing-music-image" />

            <div className="text-container-music-player">
                <h5>{props.playingSongDetaisProps.songTitle}</h5>
                <p>Autor: {props.playingSongDetaisProps.songAuthorName}</p>
            </div>

            <div className="player-music">
                <div className="control">
                    <div className="btn btn-repeat">
                        <i className="bi bi-arrow-clockwise"></i>
                    </div>
                    <div className="btn btn-prev">
                        <i className="bi bi-skip-backward-fill"></i>
                    </div>
                    <div className="btn btn-toggle-play">
                        {songIsPlaying ?
                            <i className="bi bi-pause icon-pause" onClick={pauseSong}></i> :
                            <i className="bi bi-play-fill" onClick={playSong}></i>
                        }
                    </div>
                    <div className="btn btn-new">
                        <i className="bi bi-skip-forward-fill"></i>
                    </div>
                    <div className="btn btn-random">
                        <i className="bi bi-shuffle"></i>
                    </div>

                    <div className="btn btn-heart">
                        {heartToggle ?
                        <i className="bi bi-heart-fill" onClick={removeFromFavSongs}></i> : 
                        <i className="bi bi-heart" onClick={addToFavSongs}></i>}
                    </div>
                </div>
                {/* <input id="progress" className="progress" type="range" value="80" step="0.1" min="0" max="100" /> */}
            </div>
        </div>
    </>)
}

export default PlayingSongContainer;