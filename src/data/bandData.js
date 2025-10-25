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
    { ...overcastTracks, id: overcastTracks.albumId, type: "studio" },
    { ...godLovesUglyTracks, id: godLovesUglyTracks.albumId, type: "studio" },
    { ...sevensTravelsTracks, id: sevensTravelsTracks.albumId, type: "studio" },
    { ...youCantImagineTracks, id: youCantImagineTracks.albumId, type: "studio" },
    { ...whenLifeGivesYouLemonsTracks, id: whenLifeGivesYouLemonsTracks.albumId, type: "studio" },
    { ...theFamilySignTracks, id: theFamilySignTracks.albumId, type: "studio" },
    { ...southsidersTracks, id: southsidersTracks.albumId, type: "studio" },
    { ...fishingBluesTracks, id: fishingBluesTracks.albumId, type: "studio" },
    { ...miVidaLocalTracks, id: miVidaLocalTracks.albumId, type: "studio" },
    { ...wheneverTracks, id: wheneverTracks.albumId, type: "studio" },
    { ...theDayBeforeHalloweenTracks, id: theDayBeforeHalloweenTracks.albumId, type: "studio" },
    { ...wordTracks, id: wordTracks.albumId, type: "studio" },
    { ...soManyOtherRealitiesTracks, id: soManyOtherRealitiesTracks.albumId, type: "studio" },
    { ...jesturesTracks, id: jesturesTracks.albumId, type: "studio" },

    //  EPs (sorted oldest → newest)
    { id: "ford-one", title: "Ford One", year: 2000, cover: null, type: "ep" },
    { id: "ford-two", title: "Ford Two", year: 2000, cover: null, type: "ep" },
    { id: "lucy-ep", title: "The Lucy EP", year: 2001, cover: null, type: "ep" },
    { id: "strictly-leakage", title: "Strictly Leakage", year: 2007, cover: null, type: "ep" },
    { id: "leak-at-will", title: "Leak at Will", year: 2009, cover: null, type: "ep" },
    { id: "to-all-my-friends", title: "To All My Friends, Blood Makes The Blade Holy", year: 2010, cover: null, type: "ep" },
    { id: "demosexual-7", title: "Demosexual 7\"", year: 2013, cover: null, type: "ep" },
    { id: "lake-nokomis-maxi-single", title: "The Lake Nokomis Maxi Single", year: 2014, cover: null, type: "ep" },
    { id: "frida-kahlo-vs-ezra-pound", title: "Frida Kahlo vs. Ezra Pound", year: 2016, cover: null, type: "ep" },
    { id: "talk-talk", title: "Talk Talk", year: 2023, cover: null, type: "ep" },

    //  COMPILATIONS (sorted oldest → newest)
    { id: "lucy-ford", title: "Lucy Ford: The Atmosphere EPs", year: 2001, cover: null, type: "compilation" },
    { id: "headshots-se7en", title: "Headshots: SE7EN", year: 2005, cover: null, type: "compilation" },
    { id: "sad-clown-bad-year", title: "Sad Clown Bad Year (#9-#12 Collection)", year: 2018, cover: null, type: "compilation" },
    { id: "triple-x-years", title: "Triple X Years In The Game", year: 2025, cover: null, type: "compilation" }
  ]
};
