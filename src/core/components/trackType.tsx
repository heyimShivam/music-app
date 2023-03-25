export interface RootObjectAllSongsData {
    data: Datum[];
}

export interface Datum {
    attributes: Attributes;
    id: string;
    type: Type;
}

export interface Attributes {
    albumName: string;
    artistName: ArtistName;
    artwork: Artwork;
    audioLocale: AudioLocale;
    audioTraits: AudioTrait[];
    composerName: string;
    contentRating?: string;
    discNumber: number;
    durationInMillis: number;
    genreNames: string[];
    hasLyrics: boolean;
    hasTimeSyncedLyrics: boolean;
    isAppleDigitalMaster: boolean;
    isMasteredForItunes: boolean;
    isVocalAttenuationAllowed: boolean;
    isrc: string;
    name: string;
    playParams: PlayParams;
    previews: Preview[];
    releaseDate: Date;
    trackNumber: number;
    url: string;
}

export enum ArtistName {
    Gorillaz = "Gorillaz",
}

export interface Artwork {
    bgColor: string;
    hasP3: boolean;
    height: number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url: string;
    width: number;
}

export enum AudioLocale {
    EnUS = "en-US",
}

export enum AudioTrait {
    Lossless = "lossless",
    LossyStereo = "lossy-stereo",
}

export interface PlayParams {
    id: string;
    kind: Kind;
}

export enum Kind {
    Song = "song",
}

export interface Preview {
    url: string;
}

export enum Type {
    Songs = "songs",
}


export interface RootObject {
    properties: Properties;
    tracks: Track[];
}

export interface Properties {
}

export interface Track {
    artists: Artist[];
    highlightsurls: Highlightsurls;
    hub: Hub;
    images: Images;
    key: string;
    layout: string;
    properties: Properties;
    share: Share;
    subtitle: string;
    title: string;
    type: TrackType;
    url: string;
}

export interface Artist {
    adamid: string;
    alias: string;
    id: string;
}

export interface Highlightsurls {
    artisthighlightsurl: string;
    trackhighlighturl?: string;
}

export interface Hub {
    actions: Action[];
    displayname: Displayname;
    explicit: boolean;
    image: string;
    options: Option[];
    type: HubType;
}

export interface Action {
    id?: string;
    name: Name;
    type: ActionType;
    uri?: string;
}

export enum Name {
    Apple = "apple",
    HubApplemusicDeeplink = "hub:applemusic:deeplink",
}

export enum ActionType {
    Applemusicopen = "applemusicopen",
    Applemusicplay = "applemusicplay",
    URI = "uri",
}

export enum Displayname {
    AppleMusic = "APPLE MUSIC",
}

export interface Option {
    actions: Action[];
    beacondata: Beacondata;
    caption: Caption;
    colouroverflowimage: boolean;
    image: string;
    listcaption: Listcaption;
    overflowimage: string;
    providername: Providername;
    type: BeacondataType;
}

export interface Beacondata {
    providername: Providername;
    type: BeacondataType;
}

export enum Providername {
    Applemusic = "applemusic",
}

export enum BeacondataType {
    Open = "open",
}

export enum Caption {
    Open = "OPEN",
}

export enum Listcaption {
    OpenInAppleMusic = "Open in Apple Music",
}

export enum HubType {
    Applemusic = "APPLEMUSIC",
}

export interface Images {
    background: string;
    coverart: string;
    coverarthq: string;
    joecolor: string;
}

export interface Share {
    avatar?: string;
    href: string;
    html: string;
    image: string;
    snapchat: string;
    subject: string;
    text: string;
    twitter: string;
}

export enum TrackType {
    Music = "MUSIC",
}
