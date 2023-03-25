import "./main.css";
import Home from "./home";
import Navbar from "./components/navbar";
import Search from "./search";
import Favourities from "./favourities";
import Playlists from "./playlists";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function Main() {
    return (
        <div>
            <Router>
            <div className="mainComponentHomePage">
                <div className="leftSideComponentHomePage">
                    <Navbar />
                </div>
                <div className="rightSideComponentHomePage">
                    

                        <Routes>
                            <Route path="/" element={<Home/>} ></Route>
                            <Route path="search" element={<Search/>} ></Route>
                            <Route path="favourities" element={<Favourities/>} ></Route>
                            <Route path="playlists" element={<Playlists/>} ></Route>
                        </Routes>
                            {/* <Route path="*" element={<NoPage />} /> */}
                </div>
            </div>
            </Router>
        </div>
    );
}

export default Main;
