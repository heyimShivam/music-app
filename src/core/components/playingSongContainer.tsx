import { useEffect, useState } from "react";
import SongsDataBaseService from "./SongsDataBaseService";
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown } from "react-bootstrap";

interface PropsPlayingSongDetails {
    playingSongDetaisProps: {
        key: string;
        image: string;
        songTitle: string;
        songAuthorName: string;
        address: string;
    }
}

export interface AllPlaylist {
    name: string;
    tracksIds: string[];
}

function PlayingSongContainer(props: PropsPlayingSongDetails) {
    const [beat, setBeat] = useState<HTMLAudioElement>();
    const [heartToggle, setHeartToggle] = useState<boolean>(false);
    const [songIsPlaying, setSongIsPlaying] = useState<boolean>(false);

    const [showModal, setShowModal] = useState(false);


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => setShowModal(true);

    const [allPlaylistName, setAllPlaylistName] = useState<AllPlaylist[]>(SongsDataBaseService.getPlaylistData());

    const [newPlaylistName, setNewPlaylistName] = useState<string>('');

    const [addToThisPlaylistLast, setAddToThisPlaylistLast] = useState('playlist');

    if (!SongsDataBaseService.getPlaylistData() === null) {
        setAddToThisPlaylistLast(SongsDataBaseService.getPlaylistData()[0].name);
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlaylistName(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setNewPlaylistName('');
            if (allPlaylistName) {
                let box = allPlaylistName;
                setAllPlaylistName([...box, { name: String(newPlaylistName), tracksIds: [] }]);
            } else {
                setAllPlaylistName([{ name: String(newPlaylistName), tracksIds: [] }]);
            }

            if (allPlaylistName) {
                setAddToThisPlaylistLast(allPlaylistName[0].name)
            } else {
                setAddToThisPlaylistLast(newPlaylistName);
            };
        }
    };

    useEffect(() => {
        if ((SongsDataBaseService.favouritiesSongsKey as string[]).includes(props.playingSongDetaisProps.key)) {
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
        if ((SongsDataBaseService.favouritiesSongsKey as string[]).includes(props.playingSongDetaisProps.key)) {

            (SongsDataBaseService.favouritiesSongsKey as string[]).splice(
                (SongsDataBaseService.favouritiesSongsKey as string[]).indexOf(props.playingSongDetaisProps.key),
                1
            );
            SongsDataBaseService.saveFavSongToLocalstorage();
            setHeartToggle(false);
        }
    }

    const addToFavSongs = () => {
        if (!(SongsDataBaseService.favouritiesSongsKey as string[]).includes(props.playingSongDetaisProps.key)) {
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

    function createPlaylistButton() {
        handleShowModal();
    }

    const doneHandleCloseModal = () => {
        let backendPlaylistData = SongsDataBaseService.getPlaylistData();
        setShowModal(false);

        let temp = {
            name: addToThisPlaylistLast,
            tracksIds: [SongsDataBaseService.playingSongDetail.key]
        };

        if (backendPlaylistData) {
            for (let i = 0; i < backendPlaylistData.length; i++) {
                if (addToThisPlaylistLast === backendPlaylistData[i].name) {
                    if (!(backendPlaylistData[i].tracksIds.includes(SongsDataBaseService.playingSongDetail.key))) {
                        backendPlaylistData[i].tracksIds.push(SongsDataBaseService.playingSongDetail.key);
                    }
                    SongsDataBaseService.setPlaylistData(backendPlaylistData);
                    break;
                } else if (i + 1 === backendPlaylistData.length) {
                    SongsDataBaseService.setPlaylistData(backendPlaylistData.push(temp));
                }
            }
        } else {
            SongsDataBaseService.setPlaylistData([temp]);
        }
    };

    return (<>
        <div className="bottomSongsContainer">
            <div className="image-and-text-div-player">
                <img src={props.playingSongDetaisProps.image} alt='playing music image' className="playing-music-image" />

                <div className="text-container-music-player">
                    <h5>{props.playingSongDetaisProps.songTitle}</h5>
                    <p>Autor: {props.playingSongDetaisProps.songAuthorName}</p>
                </div>

            </div>

            <div className="player-music">
                <div className="control">
                    <div className="btn btn-repeat"  onClick={createPlaylistButton}>
                        <i className="bi bi-music-note-list"></i>
                    </div>
                    <div className="btn btn-prev">
                        <i className="bi bi-skip-backward-fill"></i>
                    </div>

                    {songIsPlaying ?
                        <div className="btn btn-toggle-play" onClick={pauseSong}>
                            <i className="bi bi-pause icon-pause" ></i> </div> :
                        <div className="btn btn-toggle-play" onClick={playSong}>
                            <i className="bi bi-play-fill"></i>
                        </div>
                    }
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

        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title className="playlist">Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className="create-new-playlist">
                    New Playlist
                </span>

                <br />
                <input type="text" className="create-new-playlist-input" placeholder="Enter playlist name" onChange={handleChange} value={newPlaylistName} onKeyDown={handleKeyDown}></input>
                <br />

                {allPlaylistName ? <>
                    <span className="create-new-playlist">
                        Current Playlist
                    </span>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {addToThisPlaylistLast}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {allPlaylistName.map((value, index) => {
                                return <div key={index}>
                                    <Dropdown.Item onClick={() => { setAddToThisPlaylistLast(value.name) }}>{value.name}</Dropdown.Item>
                                </div>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </> : <></>}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={doneHandleCloseModal}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default PlayingSongContainer;