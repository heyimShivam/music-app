import { RootObjectFav } from "../favType";

const SongsDataBaseService = {
    searchSongAndGetData: async (songName: string) => {
        const options = {
            method: 'GET',
            headers: {
            //   'X-RapidAPI-Key': '5eaaa179d5msh71212fb680dc314p1c433cjsn890c126ec4e1',
            //   'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
          };
          
          let response = await fetch('https://shazam.p.rapidapi.com/search?term='+ songName +'&locale=en-US&offset=0&limit=5', options);
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
            const options = {
                method: 'GET',
                headers: {
                    // 'X-RapidAPI-Key': '5eaaa179d5msh71212fb680dc314p1c433cjsn890c126ec4e1',
                    // 'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                }
            };

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
        const options = {
            method: 'GET',
            headers: {
                // 'X-RapidAPI-Key': '5eaaa179d5msh71212fb680dc314p1c433cjsn890c126ec4e1',
                // 'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        var response = await fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=15&startFrom=' + startFrom, options)
        return response;

        // .then(response => response.json())
        // .then(response => { return (response as RootObject) })
        // .catch(err => {
        //     console.error(err)
        //     return {} as RootObject;
        // });
    },
    // getTopSongs: async (startFrom: string = '0') => {
    //     const options = {
    // // method: 'GET',
    // // headers: {
    //     // 'X-RapidAPI-Key': 'b59f240666msh21f256ccc5aa39dp1bebd0jsn87f61f690a8b',
    //     // 'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    //     // }
    // // };

    // // var response = await fetch('https://shazam.p.rapidapi.com/artists/get-top-songs?id=567072&l=en-US&locale=en-US&pageSize=20&startFrom=' + startFrom, options)
    //     // return response;
    // }
};

export default SongsDataBaseService;