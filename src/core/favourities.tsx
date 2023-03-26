
import { useState } from "react";
import { RootObjectFav } from "./favType";
import SongsDataBaseService from "./components/SongsDataBaseService";

function Favourities() {
    let favouritiesSongsAllData: RootObjectFav[] = [];
    SongsDataBaseService.getFavSongsDataFromBackend().then((res) => {
        favouritiesSongsAllData = res as RootObjectFav[];
        console.log(favouritiesSongsAllData);
    });

    function updateCurrentPlayingSongDetails(value: number = 0): void {
        SongsDataBaseService.playingSongDetail = {
            key: String(favouritiesSongsAllData[value].data[0].id),
            image: favouritiesSongsAllData[value].data[0].attributes.artwork.url,
            songTitle: favouritiesSongsAllData[value].data[0].attributes.albumName,
            songAuthorName: favouritiesSongsAllData[value].data[0].attributes.artistName,
            address: String(favouritiesSongsAllData[value].data[0].attributes.previews[0].url)
        }
        // props.updateFunction();
    }

    console.log(favouritiesSongsAllData);

    return (<>

        {favouritiesSongsAllData ? <>
            {
                favouritiesSongsAllData.map((value, index) => {
                    return (<div key={index}>
                        <div className="box">
                            <div className="songCard songCardClickEvent" onClick={() => { updateCurrentPlayingSongDetails(index) }}>
                                <img src={"https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/1b/38/ea/1b38eacd-158d-5040-8887-2786d2a641bc/192641874338_Cover.jpg/{w}x{h}bb.jpg"} className="background-image-song-card" alt='shis' />
                                <div className="background-image-song-card-two"></div>
                                <p>shivam</p>
                            </div>
                        </div>
                    </div>)
                })
            }
        </> : <></>}
    </>)
}
export default Favourities;