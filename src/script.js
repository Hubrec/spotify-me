import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "be9c648239c9405e8e9c4a025f3438cb";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

const loginButton = document.getElementById("login-button");

if (code) {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const topTracks = await fetchTopTracks(accessToken);
    const topArtists = await fetchTopArtists(accessToken);
    const playlists = await fetchPlaylists(accessToken);
    populateUIContent(profile, topTracks, topArtists, playlists);
} else {
    redirectToAuthCodeFlow(clientId);
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

async function fetchMathisProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/users/91ln68mwno9yew0utduvt2gz3", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

async function fetchTopTracks(token) {
    const res = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
}

async function fetchTopArtists(token) {
    const res = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
}

async function fetchPlaylists(token) {
    const res = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
}

//unused function
function populateUIProfile(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    document.getElementById("id").innerText = profile.id;

    if (profile.images[0]) {
        var profileImage = new Image(100, 100);
        profileImage.id = "profileImage";
        if (document.getElementById("profileImage") !== null) {
            profileImage = document.getElementById("profileImage");
        }
        profileImage.src = profile.images[0].url;
        profileImage.style.borderRadius = "50%";
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("link").setAttribute("href", profile.external_urls.spotify);
    }
}

function populateUIContent(profile, TT, TA, PU) {
    document.getElementById("displayName").innerText = profile.display_name;
    document.getElementById("id").innerText = profile.id;
    
    if (profile.images[0]) {
        var profileImage = new Image(100, 100);
        profileImage.id = "profileImage";
        if (document.getElementById("profileImage") !== null) {
            profileImage = document.getElementById("profileImage");
        }
        profileImage.src = profile.images[0].url;
        profileImage.style.borderRadius = "50%";
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("link").setAttribute("href", profile.external_urls.spotify);
    }

    const titleTracks = document.getElementById("titleTracks");
    titleTracks.innerText = "Top 50 tracks";
    const topTracksList = document.getElementById("trackContainer");
    var cpt = 1;
    TT.items.forEach((track) => {
        const link = document.createElement("a");
        link.setAttribute("href", track.external_urls.spotify);
        link.style.textDecoration = "none";
        link.style.color = "white";

        const trackItem = document.createElement("div");
        trackItem.style.display = "flex";
        trackItem.style.flexDirection = "column";
        trackItem.style.alignItems = "center";
        trackItem.style.marginBottom = "20px";
        link.appendChild(trackItem);

        const trackPic = document.createElement("div");
        trackPic.style.height = "140px";
        trackPic.style.width = "140px";
        trackPic.style.backgroundImage = `url(${track.album.images[0].url})`;
        trackPic.style.backgroundSize = "cover";
        trackPic.style.backgroundPosition = "center";
        trackPic.style.margin = "10px";
        trackPic.style.borderRadius = "10px";
        trackItem.appendChild(trackPic);
        
        const trackName = document.createElement("p");
        if (track.name.length > 15) {
            trackName.innerText = cpt + ". " + track.name.substring(0, 15) + "...";
        } else {
            trackName.innerText = cpt + ". " + track.name;
        }
        cpt++;
        trackName.style.color = "white";
        trackName.style.textAlign = "center";
        trackName.style.margin = "0";
        trackItem.appendChild(trackName);

        topTracksList.appendChild(link);
    });

    const titleArtists = document.getElementById("titleArtists");
    titleArtists.innerText = "Top 50 artists";
    const topArtistsList = document.getElementById("artistContainer");
    var cpt = 1;
    TA.items.forEach((artist) => {
        const link = document.createElement("a");
        link.setAttribute("href", artist.external_urls.spotify);
        link.style.textDecoration = "none";
        link.style.color = "white";

        const artistItem = document.createElement("div");
        artistItem.style.display = "flex";
        artistItem.style.flexDirection = "column";
        artistItem.style.alignItems = "center";
        artistItem.style.marginBottom = "20px";
        link.appendChild(artistItem);

        const artistPic = document.createElement("div");
        artistPic.style.height = "140px";
        artistPic.style.width = "140px";
        artistPic.style.backgroundImage = `url(${artist.images[0].url})`;
        artistPic.style.backgroundSize = "cover";
        artistPic.style.backgroundPosition = "center";
        artistPic.style.margin = "10px";
        artistPic.style.borderRadius = "50%";
        artistItem.appendChild(artistPic);
        
        const artistName = document.createElement("p");
        if (artist.name.length > 15) {
            artistName.innerText = cpt + ". " + artist.name.substring(0, 15) + "...";
        } else {
            artistName.innerText = cpt + ". " + artist.name;
        }
        cpt++;
        artistName.style.color = "white";
        artistName.style.textAlign = "center";
        artistName.style.margin = "0";
        artistItem.appendChild(artistName);

        topArtistsList.appendChild(link);
    });

    const titlePlaylists = document.getElementById("titlePlaylists");
    titlePlaylists.innerText = "All your playlists";
    const playlistsList = document.getElementById("playlistsContainer");
    PU.items.forEach((playlist) => {
        const link = document.createElement("a");
        link.setAttribute("href", playlist.external_urls.spotify);
        link.style.textDecoration = "none";
        link.style.color = "white";

        const playlistItem = document.createElement("div");
        playlistItem.style.display = "flex";
        playlistItem.style.flexDirection = "column";
        playlistItem.style.alignItems = "center";
        playlistItem.style.marginBottom = "20px";
        link.appendChild(playlistItem);

        const playlistPic = document.createElement("div");
        playlistPic.style.height = "140px";
        playlistPic.style.width = "140px";
        playlistPic.style.backgroundImage = `url(${playlist.images[0].url})`;
        playlistPic.style.backgroundSize = "cover";
        playlistPic.style.backgroundPosition = "center";
        playlistPic.style.margin = "10px";
        playlistPic.style.borderRadius = "10px";
        playlistItem.appendChild(playlistPic);
        
        const playlistName = document.createElement("p");
        if (playlist.name.length > 15) {
            playlistName.innerText = playlist.name.substring(0, 15) + "...";
        } else {
            playlistName.innerText = playlist.name;
        }
        playlistName.style.color = "white";
        playlistName.style.textAlign = "center";
        playlistName.style.margin = "0";
        playlistItem.appendChild(playlistName);

        playlistsList.appendChild(link);
    });
}