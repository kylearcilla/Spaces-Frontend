export const getUserPlaylists = async (accessToken: string) => {
  const key = process.env.REACT_APP_API_KEY ?? "";
  const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=${key}`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => { throw new Error(error) });
};

export const getPlayListDetails = async (playlistId: string, accessToken: string) => {
  const key = process.env.REACT_APP_API_KEY ?? "";
  const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${key}`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => { throw new Error(error) });
};

export const getVideoDetails = async (videoId: string) => {
  const key = process.env.REACT_APP_API_KEY ?? "";
  let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,id&id=${videoId}&key=${key}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => { throw new Error(error) });
};

export const getChannelDetails = async (channelId: string) => {
  const key = process.env.REACT_APP_API_KEY ?? "";
  const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelId}&key=${key}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => { throw new Error(error) });
};
