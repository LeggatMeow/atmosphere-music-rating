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
    // Studio Albums
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
    jesturesTracks,
    
    // EPs
    { id: "ford-one", title: "Ford One", year: 2000, cover: null },
    { id: "ford-two", title: "Ford Two", year: 2000, cover: null },
    { id: "lucy-ep", title: "The Lucy EP", year: 2001, cover: null },
    { id: "strictly-leakage", title: "Strictly Leakage", year: 2007, cover: null },
    { id: "leak-at-will", title: "Leak at Will", year: 2009, cover: null },
    { id: "to-all-my-friends", title: "To All My Friends, Blood Makes The Blade Holy", year: 2010, cover: null },
    { id: "demosexual-7", title: "Demosexual 7\"", year: 2013, cover: null },
    { id: "lake-nokomis-maxi-single", title: "The Lake Nokomis Maxi Single", year: 2014, cover: null },
    { id: "frida-kahlo-vs-ezra-pound", title: "Frida Kahlo vs. Ezra Pound", year: 2016, cover: null },
    { id: "talk-talk", title: "Talk Talk", year: 2023, cover: null },

    // Compilations
    { id: "lucy-ford", title: "Lucy Ford: The Atmosphere EPs", year: 2001, cover: null },
    { id: "headshots-se7en", title: "Headshots: SE7EN", year: 2005, cover: null },
    { id: "sad-clown-bad-year", title: "Sad Clown Bad Year (#9-#12 Collection)", year: 2018, cover: null },
    { id: "triple-x-years", title: "Triple X Years In The Game", year: 2025, cover: null }
  ]
};
