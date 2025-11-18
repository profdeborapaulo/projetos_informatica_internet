let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active'); /*Quando o darkmode estiver abilitado, ele será salvo localmente*/
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null); /*Quando o darkmode estiver desabilitado, ele será salvo localmente*/
}

if(darkmode === "active"){
  enableDarkmode(); /*Se o darkmode estiver ativo, o código ligará o modo escuro*/
}

themeSwitch
.addEventListener('click', () => {
  darkmode = localStorage.getItem('darkmode');
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
}) /*Se o botão "Darkmode" estiver  com estatus de ativo, o código ligará o modo escuro, senão(representado pelos dois pontos) não será ativo*/
