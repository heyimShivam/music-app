import { Outlet, Link, BrowserRouter as Router} from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="container navbarContainer">
                <ul>
                    <li><Link className="linkstyle" to="/"><i className="bi bi-house"></i> Home</Link></li>
                    <li><Link className="linkstyle" to="/search"><i className="bi bi-search"></i> Search</Link></li>
                    <li><Link className="linkstyle" to="/favourities"><i className="bi bi-heart-fill"></i>Favourities</Link></li>
                    <li><Link className="linkstyle" to="/playlists"><i className="bi bi-music-note-list"></i> Playlists</Link></li>
                </ul>
            </div>
        </>
    )

}

export default Navbar;