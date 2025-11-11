let modalSom;

function tocarAudio(caminho) {
  if (modalSom) {
    modalSom.pause();
    modalSom.currentTime = 0;
  }
  modalSom = new Audio(caminho);
  modalSom.play();
}

document.getElementById('btn-audio-brumas')?.addEventListener('click', () => {
  tocarAudio('audio/brumas-audio.m4a');
});

document.getElementById('btn-audio-corajosas')?.addEventListener('click', () => {
  tocarAudio('audio/corajosas-audio.m4a');
});

document.getElementById('btn-audio-coraline')?.addEventListener('click', () => {
  tocarAudio('audio/coraline-audio.m4a');
});

document.getElementById('btn-audio-hobbit')?.addEventListener('click', () => {
  tocarAudio('audio/hobbit-audio.m4a');
});

document.getElementById('btn-audio-princesa')?.addEventListener('click', () => {
  tocarAudio('audio/princesa-audio.m4a');
});

document.getElementById('btn-audio-terra')?.addEventListener('click', () => {
  tocarAudio('audio/terra-audio.m4a');
});
