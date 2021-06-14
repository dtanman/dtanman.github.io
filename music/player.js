// images
const PAUSE_PNG = "assets/icons/pause.png"
const PLAY_PNG = "assets/icons/play.png"

const SHIP_PNG = [[
    ], [
        "./assets/icons/aim_b&w.png",
        "./assets/icons/aim.png",
    ], [
        "./assets/icons/bubble_b&w.png",
        "./assets/icons/bubble.png",
    ], [
        "./assets/icons/gatling_b&w.png",
        "./assets/icons/gatling.png",
    ], [
        "./assets/icons/spread_b&w.png",
        "./assets/icons/spread.png",
    ],
]


// DOM elements
const test = document.getElementById("debugging-text")
const pp = document.getElementById("button-pp") // pp = play pause
const aim = document.getElementById("ship-aim")
const bubble = document.getElementById("ship-bubble")
const gatling = document.getElementById("ship-gatling")
const spread = document.getElementById("ship-spread")

const dom_ab = [[
    ], [
        document.getElementById("aim-a"),
        document.getElementById("aim-b"),
    ], [
        document.getElementById("bubble-a"),
        document.getElementById("bubble-b"),
    ], [
        document.getElementById("gatling-a"),
        document.getElementById("gatling-b"),
    ], [
        document.getElementById("spread-a"),
        document.getElementById("spread-b"),
    ]
]


// variables
let playing = false;
let intro_done = false;
let A = 0;
let B = 0;
let st_audio = [true, false, false, false, false]


// audio
const audio_names = [
    "base",
    "aim",
    "bubble",
    "gatling",
    "spread",
]
let audios = []

for(let i=0; i<audio_names.length; i++) {
    let song = document.createElement("AUDIO")
    song.src = `./assets/music/1-${audio_names[i]}.mp3`
    song.loop = true
    song.volume = 0
    song.preload = "auto"
    audios.push(song)
}
audios[0].volume = 0.8

const au_intro = document.createElement("AUDIO")
au_intro.src = "./assets/music/0-intro.mp3"
au_intro.preload = "auto"
au_intro.onended = () => {
    test.innerHTML = "Done!"
    intro_done = true
    audios.forEach(audio=>{audio.play()})
}


// beeps
let beeps = [null]

for (let i = 1; i < audio_names.length; i++) {
    let beep = document.createElement("AUDIO")
    beep.src = `./assets/music/2-${audio_names[i]}_beep.mp3`
    beeps.push(beep)
}


// functions
function playPause() {
    if(!playing) {
        test.innerHTML = "Play was pressed!"
        pp.src = PAUSE_PNG
        playing = true

        if(intro_done){
            audios[0].play();
            for(let i=1; i<audios.length; i++) {
                audios[i].volume = 1 * st_audio[i]
                audios[i].play();
            }
        } else {
            au_intro.play()
        }
    } else {
        test.innerHTML = "Pause was pressed!"
        pp.src = PLAY_PNG
        playing = false

        if(!intro_done) {
            au_intro.pause();
        } else {
            audios.forEach(audio => { audio.pause() })
        }
    }
}

function check_states() {
    console.log(`${1*st_audio[0]}, ${1*st_audio[1]}, ${1*st_audio[2]}, ${1*st_audio[3]}, ${1*st_audio[4]}`)
}

function toggleGatling() {
    let id = 3
    test.innerHTML = "Gatling was pressed!"

    if(!playing && !st_audio[id]) {
        beeps[id].play()
    }

    st_audio[id] = !st_audio[id]
    gatling.src = SHIP_PNG[id][st_audio[id]*1]
    audios[id].volume = st_audio[id] * 1
}

function toggleAim() {
    test.innerHTML = "Aim was pressed!"
    let id = 1
    if(!playing && !st_audio[id]) {
        beeps[id].play()
    }
    st_audio[id] = !st_audio[id]
    aim.src = SHIP_PNG[id][st_audio[id]*1]
    audios[id].volume = st_audio[id] * 1
}

function toggleSpread() {
    test.innerHTML = "Spread was pressed!"
    let id = 4
    if(!playing && !st_audio[id]) {
        beeps[id].play()
    }
    st_audio[id] = !st_audio[id]
    spread.src = SHIP_PNG[id][st_audio[id]*1]
    audios[id].volume = st_audio[id] * 1
}

function toggleBubble() {
    test.innerHTML = "Bubble was pressed!"
    let id = 2
    if(!playing && !st_audio[id]) {
        beeps[id].play()
    }
    st_audio[id] = !st_audio[id]
    bubble.src = SHIP_PNG[id][st_audio[id]*1]
    audios[id].volume = st_audio[id] * 1
}
