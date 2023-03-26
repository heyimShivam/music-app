import { Track } from "./trackType";
import SongsDataBaseService from "./SongsDataBaseService";

interface PropsTrack {
    track: Track,
    updateFunction: () => void
}

function SongCard(props: PropsTrack) {
    const updateCurrentPlayingSongDetails = () => {
      SongsDataBaseService.playingSongDetail = {
        image: props.track.images.coverarthq,
        songTitle: props.track.title,
        songAuthorName: props.track.subtitle,
        address: String(props.track.hub.actions[1].uri)
      }
      props.updateFunction();
    }

    return (
    <div className="songCard songCardClickEvent" onClick={updateCurrentPlayingSongDetails}>
      <img src={props.track.images.coverarthq} alt={props.track.title}/>
      <p>{props.track.title}</p>
    </div>)
}

export default SongCard;