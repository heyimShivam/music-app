import { RootObjectFav } from "../favType";
import { PlayListData } from "../playlists";
import { AllPlaylist } from "./playingSongContainer";

const shazamApiKey = 'b59b9311e8msh1d91f1d554612d1p1a25afjsn7c22fdbab884';
const options = {
    method: 'GET',
    headers: {
        // 'X-RapidAPI-Key': shazamApiKey,
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
};

const SongsDataBaseService = {
    playingSongDetail: {
        key: '',
        image: '',
        songTitle: '',
        songAuthorName: '',
        address: '',
    },
    favouritiesSongsKey: [],
    favouritiesSongsAllData: [],
    searchSongAndGetData: async (songName: string) => {
        let response = await fetch('https://shazam.p.rapidapi.com/search?term=' + songName + '&locale=en-US&offset=0&limit=5', options);
        return response;
    },
    setPlaylistData: (data: AllPlaylist[]) => {
        localStorage.setItem('playListData', JSON.stringify(data));
    },
    getPlaylistData: () => {
        if (JSON.parse(localStorage.getItem('playListData') as string)) {
            return JSON.parse(localStorage.getItem('playListData') as string);
        } else {
            return null;
        }
    },
    saveFavSongToLocalstorage: () => {
        localStorage.setItem('favSongs', JSON.stringify(SongsDataBaseService.favouritiesSongsKey))
    },
    getFavSongsfromLocalStorage: () => {
        if (JSON.parse(localStorage.getItem('favSongs') as string)) {
            SongsDataBaseService.favouritiesSongsKey = JSON.parse(localStorage.getItem('favSongs') as string);
        }
    },
    getFavSongsDataFromBackend: async () => {
        if (SongsDataBaseService.favouritiesSongsKey) {
            const FavSongsAllData: RootObjectFav[] = [];

            for (let i = 0; i <= SongsDataBaseService.favouritiesSongsKey.length; i++) {
                await fetch('https://shazam.p.rapidapi.com/songs/v2/get-details?id=' + SongsDataBaseService.favouritiesSongsKey[i] + '&l=en-US', options)
                    .then(response => response.json())
                    .then(response => {
                        FavSongsAllData.push(response);
                        (SongsDataBaseService.favouritiesSongsAllData as object[]) = FavSongsAllData as object[];
                    })
                    .catch(err => console.error(err));
            }

            return Promise.resolve(FavSongsAllData);
        }
    },
    getPlayListSongsDetailsBackend: async () => {
        const playlistData: PlayListData[] = [];

        if (!SongsDataBaseService.getPlaylistData()) {
            return Promise.reject([] as PlayListData[]);
        }

        for (let i = 0; i < SongsDataBaseService.getPlaylistData().length; i++) {
            playlistData.push({
                playlistName: SongsDataBaseService.getPlaylistData()[i].name,
                playlistSongData: []
            });

            for (let j = 0; j < SongsDataBaseService.getPlaylistData()[i].tracksIds.length; j++) {
                await fetch('https://shazam.p.rapidapi.com/songs/v2/get-details?id=' + SongsDataBaseService.getPlaylistData()[i].tracksIds[j] + '&l=en-US', options)
                    .then(response => response.json())
                    .then(response => {
                        playlistData[i].playlistSongData.push(response);
                    })
                    .catch(err => console.error(err));
            }
        }

        return Promise.resolve(playlistData as PlayListData[]);
    },
    getAllSongsData: async (startFrom: string) => {
        var response = await fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=15&startFrom=' + startFrom, options)
        return response;
    }
};

export default SongsDataBaseService;