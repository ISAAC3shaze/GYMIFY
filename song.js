const playButton = document.querySelector('.fa-play');
const backwardButton = document.querySelector('.fa-backward');
const forwardButton = document.querySelector('.fa-forward');
const progressBar = document.getElementById('progressbar');
const songInfo = document.querySelector('.songinfo');
const songItems = document.querySelectorAll('.songItem');

const songs = [
    {
        title: 'Ecstacy',
        file: 'ESCTACY.mp3',
        image: 'escactsy.jpg',
    },
    {
        title: 'Dangal',
        file: 'DANGAL.mp3',
        image: 'dangal.jpg',
    },
    {
        title: 'Zinda',
        file: 'ZINDA.mp3',
        image: 'zindaaa.jpg',
    },
    {
        title: 'Bloody Mary',
        file: 'BLOODYMARY.mp3',
        image: 'bloodymary.jpg',
    },
    {
        title: 'Little Dark Age',
        file: 'LITTLEDARKAGE.mp3',
        image: 'images.jpg',
    }
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio(songs[currentSongIndex].file);

function updateSongInfo() {
    songInfo.innerHTML = `<img src="${songs[currentSongIndex].image}" width="42px" alt="">${songs[currentSongIndex].title}`;
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
    } else {
        audio.play();
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

function changeSong(index) {
    audio.src = songs[index].file;
    updateSongInfo();
    progressBar.value = 0; 
    audio.play();
    isPlaying = true;
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause');
}

playButton.addEventListener('click', () => {
    togglePlay();
});

forwardButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    changeSong(currentSongIndex);
});

backwardButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; 
    changeSong(currentSongIndex);
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener('input', (e) => {
    const seekTime = (audio.duration * e.target.value) / 100;
    audio.currentTime = seekTime;
});

audio.addEventListener('loadedmetadata', updateSongInfo);
