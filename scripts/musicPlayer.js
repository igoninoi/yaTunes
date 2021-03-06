import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioVolume = document.querySelector('.audio-volume');

    const playlist = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = !audioPlayer.paused;

        const track = playlist[trackIndex];
        audioHeader.textContent = track.toUpperCase();

        audioImg.src = `./audio/${track}.jpg`;
        audioPlayer.src = `./audio/${track}.mp3`;
        audioPlayer.currentTime = 0;
        
        //updateTime();
        //setTimeout(updateTime, 500); 
        audioPlayer.addEventListener('canplay', () => {
            updateTime();
        })

        if (isPlayed) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    };

    const audioTogglePlay = () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }

        audio.classList.toggle('play');
        audioButtonPlay.classList.toggle('fa-play');
        audioButtonPlay.classList.toggle('fa-pause');
    };


    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };


    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {

            audioTogglePlay();

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }   
    });
    
    audioImg.addEventListener('click', () => {
        audioTogglePlay();
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();  // needed  because  player will stop after end of track
    });

    // updateTime(); -- calling in loadTrack();

    const updateTime = () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%'; // '%' needed

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';
        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    };

    audioPlayer.addEventListener('timeupdate', updateTime);
    
    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        
        const progress = (x/allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
    });

    
    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            
            audio.classList.remove('play');
            audioButtonPlay.classList.add('fa-play');
            audioButtonPlay.classList.remove('fa-pause');
        }
    };

    loadTrack();

}
