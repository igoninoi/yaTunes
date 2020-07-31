import { videoPlayerInit } from './videoPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';


// fonts see at https://fontawesome.bootstrapcheatsheets.com/

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');


const deactivationPlayer = () => {
    temp.getElementsByClassName.display = 'none';
    
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));

    videoPlayerInit.stop();
    musicPlayerInit.stop();
    radioPlayerInit.stop();
};


playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
}));


videoPlayerInit();
musicPlayerInit();
radioPlayerInit();
