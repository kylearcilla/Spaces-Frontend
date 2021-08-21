export const setShuffle = async (isShuffle: boolean, deviceId: string, accessToken: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(
    `https://api.spotify.com/v1/me/player/shuffle?state=${isShuffle}&device_id=${deviceId}`,
    {
      method: "PUT",
      headers: headers,
    }
  ).catch((error) => { throw new Error(error) });
};

export const playPlaylist = async (
  accessToken: string,
  deviceId: string,
  playlistURI: string,
  trackURI: string,
  position: number
) => {
  const data = {
    context_uri: `spotify:playlist:${playlistURI}`,
    offset: {
      uri: trackURI,
    },
    position_ms: position,
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  }).catch((error) => { throw new Error(error) });
};

export const getPlaylistTracks = async (
  accessToken: string,
  playlistId: string,
  offset: number
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US&limit=10&offset=${offset}`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => { throw new Error(error) });

};
