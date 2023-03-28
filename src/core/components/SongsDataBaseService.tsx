import { RootObjectFav } from "../favType";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5eaaa179d5msh71212fb680dc314p1c433cjsn890c126ec4e1',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
};

const SongsDataBaseService = {
    searchSongAndGetData: async (songName: string) => {
        let response = await fetch('https://shazam.p.rapidapi.com/search?term=' + songName + '&locale=en-US&offset=0&limit=5', options);
        return response;
    },
    favouritiesSongsKey: [],
    favouritiesSongsAllData: [],
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
    playingSongDetail: {
        key: '',
        image: '',
        songTitle: '',
        songAuthorName: '',
        address: '',
    },
    getAllSongsData: async (startFrom: string) => {
        var response = await fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=15&startFrom=' + startFrom, options)
        return response;
    }
};

export default SongsDataBaseService;