const SongsDataBaseService = {
    playingSongDetail: {
        image: '',
        songTitle: '',
        songAuthorName: '',
        address: '',
    },
    getAllSongsData: async (startFrom: string) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2197bb7d1emsh9028ee7d9d54b39p1e7c8ejsn74ebbd152abe',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
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