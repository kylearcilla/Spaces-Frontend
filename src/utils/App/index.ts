import moment from "moment";
import { SessionObject } from "../../context/types";

export const logInUser = async (email: string) => {
  return fetch(`http://localhost:3001/login/${email}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.user || !data.token) return { error: "Error loggin in user" };
      return {
        user: data.user,
        token: data.token,
      };
    })
    .catch((err) => { throw new Error(err)});
};

export const registerUser = async (email: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return fetch("http://localhost:3001/register", {
    headers,
    method: "POST",
    body: JSON.stringify({ email }),
  })
    .then((res: any) => res.json())
    .then((data) => {
      if (data.error) return { error: data.error.code };
      if (!data?.token) return { error: "Error registering user" };
      return {
        token: data.token,
      };
    })
    .catch((err) => { throw new Error(err)});
};

export const createNewSession = async (
  email: string,
  session: SessionObject,
  token: string
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const new_session = {
    name: session.sessionName,
    date_created: moment(session.startTime).format("YYYY-MM-DD HH:mm:ss"),
    pomodoro_period: session.pomodoroPeriod,
    cycles: session.cycles,
    time_period: session!.stats!.userTime.slice(0, 19),
    score: session!.stats!.medal,
    owner_email: email,
  };

  return fetch("http://localhost:3001/new-session", {
    headers,
    method: "POST",
    body: JSON.stringify({ new_session }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return { error: data.error.message };
      return "Session created successfully";
    })
    .catch((err) => { throw new Error(err)});
};

export const replaceAccount = async (
  old_email: string,
  new_email: string,
  token: string
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  return fetch("http://localhost:3001/replace", {
    headers,
    method: "POST",
    body: JSON.stringify({ old_email, new_email }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return { error: data.error.message };
      if (!data.token) return { error: "Could not get token " };
      return {
        token: data.token,
      };
    })
    .catch((err) => { throw new Error(err)});
};

export const deleteAccount = async (email: string, token: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  return fetch("http://localhost:3001/delete", {
    headers,
    method: "POST",
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return { error: data.error.message };
      return "User successfully deleted";
    })
    .catch((err) => { throw new Error(err)});
};

export const getUserSessions = async (email: string, token: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  return fetch(`http://localhost:3001/get-sessions/${email}`, {
    headers,
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return { error: data.error.message };
      return data;
    })
    .catch((err) => { throw new Error(err)});
};
