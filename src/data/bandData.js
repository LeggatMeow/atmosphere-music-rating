// src/data/bandData.js

import {
  overcastTracks,
  godLovesUglyTracks,
  sevensTravelsTracks,
  youCantImagineTracks,
  whenLifeGivesYouLemonsTracks,
  theFamilySignTracks,
  southsidersTracks,
  fishingBluesTracks,
  miVidaLocalTracks,
  wheneverTracks,
  theDayBeforeHalloweenTracks,
  wordTracks,
  soManyOtherRealitiesTracks,
  jesturesTracks
} from './tracks'

export const bandData = {
  name: "Atmosphere",
  description: "Atmosphere is an American hip hop duo consisting of rapper Slug (Sean Daley) and DJ/producer Ant (Anthony Davis).",
  albums: [

    //  STUDIO ALBUMS (oldest → newest)
    { ...overcastTracks, id: overcastTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Underground Hip-Hop", cover: "/album-covers/overcast.jpg" },
    { ...godLovesUglyTracks, id: godLovesUglyTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Alternative Hip-Hop", cover: "/album-covers/god-loves-ugly.jpg" },
    { ...sevensTravelsTracks, id: sevensTravelsTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Alternative Hip-Hop", cover: "/album-covers/sevens-travels.jpg" },
    { ...youCantImagineTracks, id: youCantImagineTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Hip-Hop", cover: "/album-covers/you-cant-imagine.jpg" },
    { ...whenLifeGivesYouLemonsTracks, id: whenLifeGivesYouLemonsTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Alternative Hip-Hop", cover: "/album-covers/when-life-gives-you-lemons.jpg" },
    { ...theFamilySignTracks, id: theFamilySignTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Alternative Hip-Hop", cover: "/album-covers/the-family-sign.jpg" },
    { ...southsidersTracks, id: southsidersTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Hip-Hop", cover: "/album-covers/southsiders.jpg" },
    { ...fishingBluesTracks, id: fishingBluesTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Hip-Hop", cover: "/album-covers/fishing-blues.jpg" },
    { ...miVidaLocalTracks, id: miVidaLocalTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Alternative Hip-Hop", cover: "/album-covers/mi-vida-local.jpg" },
    { ...wheneverTracks, id: wheneverTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Alternative Hip-Hop", cover: "/album-covers/whenever.jpg" },
    { ...theDayBeforeHalloweenTracks, id: theDayBeforeHalloweenTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Hip-Hop", cover: "/album-covers/the-day-before-halloween.jpg" },
    { ...wordTracks, id: wordTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Hip-Hop", cover: "/album-covers/word.jpg" },
    { ...soManyOtherRealitiesTracks, id: soManyOtherRealitiesTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Hip-Hop", cover: "/album-covers/so-many-other-realities.jpg" },
    { ...jesturesTracks, id: jesturesTracks.albumId, type: "studio", artist: "Atmosphere", genre: "Hip-Hop", cover: "/album-covers/jestures.jpg" },

    //  EPs (sorted oldest → newest)
    { id: "ford-one", title: "Ford One", year: 2000, cover: null, type: "ep", artist: "Atmosphere", genre: "Hip-Hop" },
    { id: "ford-two", title: "Ford Two", year: 2000, cover: null, type: "ep", artist: "Atmosphere", genre: "Hip-Hop" },
    { id: "lucy-ep", title: "The Lucy EP", year: 2001, cover: null, type: "ep", artist: "Atmosphere", genre: "Alternative Hip-Hop" },
    { id: "strictly-leakage", title: "Strictly Leakage", year: 2007, cover: null, type: "ep", artist: "Atmosphere", genre: "Hip-Hop" },
    { id: "leak-at-will", title: "Leak at Will", year: 2009, cover: null, type: "ep", artist: "Atmosphere", genre: "Hip-Hop" },
    { id: "to-all-my-friends", title: "To All My Friends, Blood Makes The Blade Holy", year: 2010, cover: null, type: "ep", artist: "Atmosphere", genre: "Hip-Hop" },
    { id: "demosexual-7", title: "Demosexual 7\"", year: 2013, cover: null, type: "ep", artist: "Atmosphere", genre: "Hip-Hop" },
    { id: "lake-nokomis-maxi-single", title: "The Lake Nokomis Maxi Single", year: 2014, cover: null, type: "ep", artist: "Atmosphere", genre: "Hip-Hop" },
    { id: "frida-kahlo-vs-ezra-pound", title: "Frida Kahlo vs. Ezra Pound", year: 2016, cover: null, type: "ep", artist: "Atmosphere", genre: "Hip-Hop" },
    { id: "talk-talk", title: "Talk Talk", year: 2023, cover: null, type: "ep", artist: "Atmosphere", genre: "Hip-Hop" },

    //  COMPILATIONS (sorted oldest → newest)
    { id: "lucy-ford", title: "Lucy Ford: The Atmosphere EPs", year: 2001, cover: null, type: "compilation", artist: "Atmosphere", genre: "Compilation" },
    { id: "headshots-se7en", title: "Headshots: SE7EN", year: 2005, cover: null, type: "compilation", artist: "Atmosphere", genre: "Compilation" },
    { id: "sad-clown-bad-year", title: "Sad Clown Bad Year (#9-#12 Collection)", year: 2018, cover: null, type: "compilation", artist: "Atmosphere", genre: "Compilation" },
    { id: "triple-x-years", title: "Triple X Years In The Game", year: 2025, cover: null, type: "compilation", artist: "Atmosphere", genre: "Compilation" }
  ]
};
