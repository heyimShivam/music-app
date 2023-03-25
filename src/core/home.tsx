import "./home.css";

import Navbar from "./components/navbar";
import HeaderHomePage from './components/HeaderHomePage';
import SongsContainer from './components/SongsContainer';

function Home() {
    return (
        <div>
            <div className="mainComponentHomePage">
                <div className="leftSideComponentHomePage">
                    <Navbar />
                </div>
                <div className="rightSideComponentHomePage">
                    <HeaderHomePage />
                        <SongsContainer/>
                </div>
            </div>
        </div>
    );
}

export default Home;
