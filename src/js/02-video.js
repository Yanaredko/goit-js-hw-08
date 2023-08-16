import Vimeo from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');

const player = new Vimeo(iframe);

const saveTimeThrottled = throttle(saveTime, 1000);

function saveTime(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

function handleTimeUpdate(event) {
  const currentTime = event.seconds; 

  saveTimeThrottled(currentTime);
}

function restorePlaybackTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');

  if (savedTime !== null) {
    player.setCurrentTime(parseFloat(savedTime));
  }
}

player.ready().then(() => {
    player.on('timeupdate', handleTimeUpdate);
    
      restorePlaybackTime();
});

