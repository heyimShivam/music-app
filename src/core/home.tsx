import HeaderHomePage from './components/HeaderHomePage';
import SongsContainer from './components/SongsContainer';

interface updateFunction {
    updateFunction: () => void
}

function Home(props: updateFunction) {
    function updateFunction() {
        props.updateFunction();
    }

    return (
        <>
            <HeaderHomePage />
            <SongsContainer updateFunction={updateFunction} />
        </>);
}
export default Home;