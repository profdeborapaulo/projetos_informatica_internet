// Create a canvas gradient
const ctx = document.createElement('canvas').getContext('2d')
const gradient = ctx.createLinearGradient(0, 0, 0, 150)
gradient.addColorStop(0, 'rgb(200, 0, 200)')
gradient.addColorStop(0.7, 'rgb(100, 0, 100)')
gradient.addColorStop(1, 'rgb(0, 0, 0)')

// SoundCloud-style bars
WaveSurfer.create({
  container: "#waveform",
  waveColor: gradient,
  barWidth: 4,
  barGap: 4,
  progressColor: 'rgba(0, 0, 100, 0.5)',
  url: 'audio/sinopse-it.ogg',
})