export const getCurrentTrack = async (accessToken: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(
    "https://api.spotify.com/v1/me/player/currently-playing?market=US",
    {
      method: "GET",
      headers: headers,
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => { throw new Error(error) });
};

export const setVolume = async (
  accessToken: string,
  volume: number,
  deviceId: string
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(
    `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}&device_id=${deviceId}`,
    {
      method: "PUT",
      headers: headers,
    }
  ).catch((error) => { throw new Error(error) });

};

export const seekPosition = async (
  accessToken: string,
  position: number,
  deviceId: string
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(
    `https://api.spotify.com/v1/me/player/seek?position_ms=${position}&device_id=${deviceId}`,
    {
      method: "PUT",
      headers: headers,
    }
  ).catch((error) => { throw new Error(error) });
};

export const skipToNext = async (accessToken: string, deviceId: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(
    `https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`,
    {
      method: "POST",
      headers: headers,
    }
    ).catch((error) => { throw new Error(error) });
};

export const skipToPrev = async (accessToken: string, deviceId: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  return fetch(
    `https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`,
    {
      method: "POST",
      headers: headers,
    }
  ).catch((error) => { throw new Error(error) });
};

export const pauseTrack = async (accessToken: string, deviceId: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);

  fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
    method: "PUT",
    headers: headers,
  }).catch((error) => { throw new Error(error) });
};
