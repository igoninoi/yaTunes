import { addZero } from './supScript.js';

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoFullscreen = document.querySelector('.video-fullscreen');



    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        //toggleIcon(); can be used instead Play and Pause event listeners
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    // const addZero = n => n < 10 ? '0' + n : n; -- moved to supScript.js

    // Play and Pause handling
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon)
    videoPlayer.addEventListener('pause', toggleIcon)

    // Stop control handling
    videoButtonStop.addEventListener('click', stopPlay);

    // Time output handling
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutesPassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minutesTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;        
    });
    
    // Time change handling
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        
        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused) {
            videoPlayer.pause(); //stopPlay();
        }
    }

}



//export default videoPlayerInit;