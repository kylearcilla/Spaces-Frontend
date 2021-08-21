import { isTooEarly, scoreUserPerformance, performanceFeedback } from "./Pomodoro/PomodoroScore"
import { calcProgressWidthInSession, calcProgressWidthEmptySession } from "./Pomodoro/CalculateBarWidth"
import { displayTodaySession, displayWeekSessions, displayMonthSessions } from "./Sessions/DisplaySessions"
import { calulateTimePeriod, calculateTimePeriodWithEnd, makeTimePeriodString, calculateEndTime } from "./Pomodoro/CalculateTimePeriod"
import { getUserPlaylists, getPlayListDetails, getVideoDetails, getChannelDetails } from "./YoutubeAPI/ytRequests"
import firebase from "./misc/firebase"
import { shortenNumber, addCommasToNum, convertToTime, uiState } from "./misc/helpers"
import useForm from "./hooks/useForm"
import useSpotify from "./hooks/useSpotify"
import useSpotifyAuth from "./hooks/useSpotifyAuth"
import useWindow from "./hooks/useWindow"
import useYoutube from "./hooks/useYoutube"
import { setShuffle, playPlaylist, getPlaylistTracks } from "./SpotifyAPI/listControlRequests"
import { getCurrentTrack, setVolume, seekPosition, skipToNext, skipToPrev, pauseTrack } from "./SpotifyAPI/trackControlRequests"
import { getLoginURL, getSpotifyProfileDetails, getSpotfifyUserPlaylists } from "./SpotifyAPI/userRequests"
import { logInUser, createNewSession, deleteAccount, getUserSessions, registerUser, replaceAccount } from "./App"


export {
    isTooEarly,
    scoreUserPerformance,
    performanceFeedback,
    calulateTimePeriod,
    calculateTimePeriodWithEnd,
    makeTimePeriodString,
    calculateEndTime,
    getUserPlaylists,
    getPlayListDetails,
    getVideoDetails,
    getChannelDetails,
    firebase,
    shortenNumber,
    addCommasToNum,
    convertToTime,
    uiState,
    displayTodaySession,
    displayWeekSessions,
    displayMonthSessions,
    calcProgressWidthInSession,
    calcProgressWidthEmptySession,
    useForm,
    useSpotify,
    useYoutube,
    useSpotifyAuth,
    useWindow,
    setShuffle,
    playPlaylist,
    getPlaylistTracks,
    getCurrentTrack,
    setVolume,
    seekPosition,
    skipToNext,
    skipToPrev,
    pauseTrack,
    getLoginURL,
    getSpotifyProfileDetails,
    getSpotfifyUserPlaylists,
    logInUser,
    createNewSession,
    deleteAccount,
    getUserSessions,
    registerUser,
    replaceAccount
}