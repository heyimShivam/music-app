import {  useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./main.css";

import Home from "./home";
import Navbar from "./components/navbar";
import Search from "./search";
import Favourities from "./favourities";
import Playlists from "./playlists";
import PlayingSongContainer from "./components/playingSongContainer";
import SongsDataBaseService from "./components/SongsDataBaseService";

interface playingSongDetailsInterface {
    key: string;
    image: string;
    songTitle: string;
    songAuthorName: string;
    address: string;
}

function Main() {

    const [playingSongDetais, setPlayingSongDetais] = useState<playingSongDetailsInterface>(SongsDataBaseService.playingSongDetail);

    SongsDataBaseService.getFavSongsfromLocalStorage();

    function updateFunction() {
        setPlayingSongDetais(SongsDataBaseService.playingSongDetail);
    }

    return (
        <div>
            <Router>
                <div className="mainComponentHomePage">
                    <div className="leftSideComponentHomePage">
                        <Navbar />
                    </div>
                    <div className="rightSideComponentHomePage">


                        <Routes>
                            <Route path="/" element={<Home updateFunction={updateFunction} />} ></Route>
                            <Route path="search" element={<Search updateFunction={updateFunction}/>} ></Route>
                            <Route path="favourities" element={<Favourities updateFunction={updateFunction}/>} ></Route>
                            <Route path="playlists" element={<Playlists updateFunction={updateFunction}/>} ></Route>
                        </Routes>
                        {/* <Route path="*" element={<NoPage />} /> */}
                    </div>

                    {playingSongDetais.address ?
                        <PlayingSongContainer playingSongDetaisProps={playingSongDetais} /> : <></>}
                </div>
            </Router>
        </div>
    );
}

export default Main;
