export interface RootObjectFav {
    data: RootObjectDatum[];
   }
   
   export interface RootObjectDatum {
    attributes:    Attributes;
    id:            string;
    relationships: Relationships;
    type:          string;
   }
   
   export interface Attributes {
    albumName:                 string;
    artistName:                string;
    artwork:                   Artwork;
    audioLocale:               string;
    audioTraits:               string[];
    composerName:              string;
    discNumber:                number;
    durationInMillis:          number;
    genreNames:                string[];
    hasLyrics:                 boolean;
    hasTimeSyncedLyrics:       boolean;
    isAppleDigitalMaster:      boolean;
    isMasteredForItunes:       boolean;
    isVocalAttenuationAllowed: boolean;
    isrc:                      string;
    name:                      string;
    playParams:                PlayParams;
    previews:                  Preview[];
    releaseDate:               Date;
    trackNumber:               number;
    url:                       string;
   }
   
   export interface Artwork {
    bgColor:    string;
    hasP3:      boolean;
    height:     number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url:        string;
    width:      number;
   }
   
   export interface PlayParams {
    id:   string;
    kind: string;
   }
   
   export interface Preview {
    url: string;
   }
   
   export interface Relationships {
    albums:  Albums;
    artists: Albums;
   }
   
   export interface Albums {
    data: AlbumsDatum[];
   }
   
   export interface AlbumsDatum {
    id:   string;
    type: string;
   }
   