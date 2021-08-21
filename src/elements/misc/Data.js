const Data = {
    landingPageText: {
        paragraphOne: "Spaces allows you to get into the best working environment to focusand get stuff done.",
        paragraphTwo: " This application leverages the Spotify and Youtube API to give you access to your curated playlists you designed to get you in the flow.",
        paragraphThree: "Like having a study buddy, but can’t get one? Put on a study with me playlist while listening to Spotify.",
        paragraphFour: "Do you like to put on white, ambient noise? Put on a 'rain sounds' video while listening to Lofi on Spotify.",
        paragraphFive: "To incentivize productivty, this application utilizes a customizable pomodoro timer and a work-session tracker designed to track how well you adhere to your tasks. You can track these sessions in a daily, weekly, and monthly basis."
    },
    pom: {
        goldResponse: {
            gif: "https://media.giphy.com/media/TvcA7FhoV7UJy/source.gif",
            title: "Wow! 🤯",
            subtitle: "You are a productivity god!"
        },
        silverResponse: {
            gif: "https://64.media.tumblr.com/cbf98018ded47b1c8bc2b645098d24a0/e68854bb16490ee6-5b/s500x750/9c135896089501ceca380d820685c1a0164999a4.gifv",
            title: "Way to Get it Done!",
            subtitle: "Great session!"
        },
        bronzeResponse: {
            gif: "https://media.giphy.com/media/kMqJ9CL7656fK/giphy.gif",
            title: "Come On, You Can Do Better!",
            subtitle: "Let's get some coffee and do this thing!"
        }
    },
    quotes: [
        "You do not rise to the level of your goals. You fall to the level of your systems.",
        "Wheresoever you go, go with all your heart.",
        "He who has a why to live for can bear almost any how.",
        "Everything beside this present moment is just an idea.",
        "If you don't take a break, the break takes itself.",
        "The man who moves a mountain begins by carrying away small stones.",
        "You cannot change your future, but you can change your habits, and surely your habits will change your future.",
        "I am an old man and have known a great many troubles, but most of them never happened",
        "You can’t become happy, you can only be happy.",
        "If you fulfill your obligations everyday you don’t need to worry about the future",
        "A ship in harbor is safe, but that's not why ships are built.",
        "Stress is caused by being 'here' but wanting to be 'there'.",
        "Stay Hungry. Stay Foolish.",
        "One day you will look back and see that all along you were blooming",
        "The quality of your life is proportional to the quality of the questions you ask yourself on a regular basis.",
        "In the first 30 years of your life, you make your habits. For the last 30 years of your life, your habits make you.",
        "We judge others by their actions and ourselves by our intentions",
        "Give me 6 hours to chop a tree, I will spend the first 4 sharpening my axe.",
        "If you don't become the ocean, you'll be seasick every day",
        "Act out being alive, like a play. And after a while, a long while, it will be true.",
        "You have power over your mind - not outside events. Realize this, and you will find strength.",
        "Lasting happiness can only be found in one place, the present moment",
        "Sometimes you never realize the value of a moment until it becomes a memory",
        "It gets easier. Every day it gets a little easier. But you gotta do it everyday, that's the hard part. But it does get easier.",
        "The master has failed more times than the beginner has even tried.",
        "No one is useless in this world who lightens the burdens of another.",
        "If not now, when?",
        "Quality means doing it right when no one is looking.",
        "If you want to conquer the anxiety of life, live in the moment, live in the breath.",
        "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
        "Each morning we are born again. What we do today is what matters most.",
        "Nothing gives one person so much advantage over another as to remain always cool and unruffled under all circumstances.",
    ],
    sessions: [
        {
            id: 0,
            name: "Math HW",
            date_created: new Date(2021, 8, 1, 12, 40),
            pomodoro_period: 45,
            cycles: 3,
            time_period: "12:40 PM - 12:50 PM",
            score: "🥉"
        },
        {
            id: 1,
            name: "PHYS HW",
            date_created: new Date(2021, 7, 20, 12, 20),
            pomodoro_period: 15,
            cycles: 2,
            time_period: "12:20 PM - 12:59 PM",
            score: "🥇"
        },
        {
            id: 2,
            name: "Painting Prct.",
            date_created: new Date(2021, 7, 19, 0, 40),
            pomodoro_period: 60,
            cycles: 3,
            time_period: "12:40 AM - 12:40 AM",
            score: "🥈"
        },
        {
            id: 3,
            name: "Sketching Prct.",
            date_created: new Date(2021, 7, 18, 19, 40),
            pomodoro_period: 25,
            cycles: 3,
            time_period: "7:40 PM - 9:40 PM",
            score: "🥉"
        },
        {
            id: 4,
            name: "Sketching Prct.",
            date_created: new Date(2021, 7, 17, 19, 40),
            pomodoro_period: 25,
            cycles: 3,
            time_period: "7:40 PM - 9:40 PM",
            score: "🥉"
        },
        {
            id: 5,
            name: "Sketching Prct.",
            date_created: new Date(2021, 7, 16, 19, 40),
            pomodoro_period: 25,
            cycles: 3,
            time_period: "7:40 PM - 9:40 PM",
            score: "🥉"
        },
        {
            id: 6,
            name: "Coding Prct.",
            date_created: new Date(2021, 7, 15, 6, 13),
            pomodoro_period: 35,
            cycles: 5,
            time_period: "6:13 AM - 9:40 AM",
            score: "🥇"
        },
        {
            id: 7,
            name: "Coding Prct.",
            date_created: new Date(),
            pomodoro_period: 35,
            cycles: 5,
            time_period: "6:13 AM - 9:40 AM",
            score: "🥇"
        }
    ]
}

export default Data;