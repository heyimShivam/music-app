import { Track } from "./trackType";

interface PropsTrack {
    track: Track,
}

function SongCard(props: PropsTrack) {
    // console.log(props.track)
    return (
    <div className="songCard">
      <img src={props.track.images.coverarthq} alt={props.track.title}/>
      <p>{props.track.title}</p>
    </div>)
}

export default SongCard;