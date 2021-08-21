export const getLoginURL = (scopes: string[]) => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI ?? "";

  return (
    "https://accounts.spotify.com/authorize?client_id=" +
    clientId +
    "&redirect_uri=" +
    encodeURIComponent("http://localhost:3000/home/spotify") +
    "&scope=" +
    encodeURIComponent(scopes.join(" ")) +
    "&response_type=code"
  );
};

export const getSpotifyProfileDetails = async (accessToken: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => { throw new Error(error) });
};

export const getSpotfifyUserPlaylists = async (
  accessToken: string,
  offset: number
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(
    `https://api.spotify.com/v1/me/playlists?limit=10&offset=${offset}`,
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => { throw new Error(error) });
};
