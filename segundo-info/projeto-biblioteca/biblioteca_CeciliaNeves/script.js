function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("show-modal");
    }
}

function hideModal(modalId, audioId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show-modal");
  }
  if (wavePlayers[audioId]) {
        wavePlayers[audioId].stop();
    }
}
