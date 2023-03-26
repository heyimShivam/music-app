import SongsContainer from './components/SongsContainer';

function Search() {
    function updateFunction() {
    }

    return (<>
        <div className="container">
            <div className="searchInputWrapper">    
                <input className="searchInput" type="text" placeholder='Search song here....'>
                </input>
                <i className="searchInputIcon bi bi-search"></i>
            </div>
        </div>
        <div className="container-fluid search-container">
           <SongsContainer updateFunction={updateFunction}/>
        </div>
    </>)
}

export default Search;