
import { useState, useEffect } from "react";
import { RootObjectFav } from "./favType";
import SongsDataBaseService from "./components/SongsDataBaseService";


interface updateFunction {
    updateFunction: () => void
}

function Favourities(props: updateFunction) {
    const [loader, setLoader] = useState(true);
    let [favouritiesSongsAllData, setFavouritiesSongsAllData] = useState<RootObjectFav[]>([]);

    useEffect(() => {
        SongsDataBaseService.getFavSongsDataFromBackend().then((res) => {
            setFavouritiesSongsAllData(res as RootObjectFav[]);
            setLoader(false);
        });
    }, []);

    function updateCurrentPlayingSongDetails(value: number = 0): void {
        SongsDataBaseService.playingSongDetail = {
            key: String(favouritiesSongsAllData[value].data[0].id),
            image: (favouritiesSongsAllData[value].data[0].attributes.artwork.url).replace('{w}x{h}', '400x400'),
            songTitle: favouritiesSongsAllData[value].data[0].attributes.albumName,
            songAuthorName: favouritiesSongsAllData[value].data[0].attributes.artistName,
            address: String(favouritiesSongsAllData[value].data[0].attributes.previews[0].url)
        }

        props.updateFunction();
    }

    return (<>
        <div className="container">
            {loader ? <><div className="loader"></div></> : <></>}
            {favouritiesSongsAllData ? <>
                {
                    favouritiesSongsAllData.map((value, index) => {
                        return (<div key={index}>
                            <div className="box">
                                <div className="songCard favSongsCoard songCardClickEvent" onClick={() => { updateCurrentPlayingSongDetails(index) }}>
                                    {value.data ? <>
                                        <img src={(value.data[0].attributes.artwork.url).replace('{w}x{h}', '400x400')} className="background-image-song-card" alt={value.data[0].attributes.albumName} />
                                        <div className="background-image-song-card-two"></div>
                                        <p>{value.data[0].attributes.albumName}</p>
                                    </> : <></>}
                                </div>
                            </div>
                        </div>)
                    })
                }
            </> : <></>}
        </div>
    </>)
}
export default Favourities;