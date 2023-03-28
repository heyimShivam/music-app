import { useEffect, useState } from "react";
import SongsDataBaseService from './SongsDataBaseService';
import { RootObject, Track } from './trackType';

import SongCard from "./songCard";

interface updateFunction {
    updateFunction: () => void
}

function SongsContainer(props: updateFunction) {
    function updateFunctionSongContainer() {
        props.updateFunction();
    }

    const [songsData, setSongsData] = useState<RootObject>({} as RootObject);
    const [featuredSongsData, setFeaturedSongsData] = useState<RootObject>({} as RootObject);

    const fetchSongsData = (startingValue: string = '0') => {
        SongsDataBaseService.getAllSongsData(startingValue).then(response => response.json())
            .then(response => {
                setSongsData(response);
            })
            .catch(err => {
                console.error(err)
            });
    }

    const fetchFeaturedSongsData = (startingValue: string = '5') => {
        SongsDataBaseService.getAllSongsData(startingValue).then(response => response.json())
            .then(response => {
                setFeaturedSongsData(response);
            })
            .catch(err => {
                console.error(err)
            });
    }

    useEffect(() => {
        fetchSongsData();
        fetchFeaturedSongsData();
    }, [])

    return (<>
        <div className="container-fluid">
            <div className="songByListContainer">
                <div className="headingBlock d-flex">
                    <p className="headingSongsContainer">Released This Week</p>
                    <div className="hrHeading">
                        <hr className='shivam' />
                    </div>
                </div>

                {songsData.tracks ? <>
                    <div className="container-fluid">
                        <div className="songCardViewRow">
                            {
                                songsData.tracks.map((value, index) => {
                                    return (<div key={index}>
                                        <div className="songCardView">
                                            <SongCard track={value} updateFunction={updateFunctionSongContainer} />
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </> : <></>}
            </div>
            <div className="headingBlock d-flex">
                <p className="headingSongsContainer">Featured Playlist</p>
                <div className="hrHeading">
                    <hr className='shivam' />
                </div>
            </div>

            {featuredSongsData.tracks ? <>
                <div className="container-fluid">
                    <div className="songCardViewRow">
                        {
                            featuredSongsData.tracks.map((value, index) => {
                                return (<div key={index}>
                                    <div className="songCardView">
                                        <SongCard track={value} updateFunction={updateFunctionSongContainer} />
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </> : <></>}
            <div className="headingBlock d-flex">
                <p className="headingSongsContainer">New to me</p>
                <div className="hrHeading">
                    <hr className='shivam' />
                </div>
            </div>

            {featuredSongsData.tracks ? <>
                <div className="container-fluid">
                    <div className="songCardViewRow">
                        {
                            featuredSongsData.tracks.map((value, index) => {
                                return (<div key={index}>
                                    <div className="songCardView">
                                        <SongCard track={value} updateFunction={updateFunctionSongContainer} />
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </> : <></>}

        </div>
    </>)
}
export default SongsContainer;
