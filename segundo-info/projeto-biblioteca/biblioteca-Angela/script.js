class MobileNavBar{
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
    this.navLinks.forEach((link,index) => {
        link.style.animation
         ? (link.style.animation = "")
         : (link.style.animation = `navLinkFade 0.5s ease forwards ${index/7+0.3}s`);
    });
}
    

    handleClick() {
        this.navList.classList.toggle(this.activeClass)
        this.mobileMenu.classList.toggle(this.activeClass)
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init(){
        if (this.mobileMenu){
            this.addClickEvent();
        }
        return this
    }
}

const mobileNavBar = new MobileNavBar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);

mobileNavBar.init();

//slide
var radio = document.querySelector('.manual-btn')
var cont = 1

document.getElementById('radio1').checked = true

setInterval(()=> {
    proximaImg()

}, 10000)

function proximaImg(){
  cont++

  if(cont > 3){
    cont = 1
  }
  document.getElementById('radio'+cont).checked = true
}

//biblioteca slidder

const arrows = document.querySelectorAll(".arrow");
const bookLists = document.querySelectorAll(".book-list");

arrows.forEach((arrow, i) => {
  const itemNumber = bookLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      bookLists[i].style.transform = `translateX(${
        bookLists[i].computedStyleMap().get("transform")[0].x.value - 380
      }px)`;
    } else {
      bookLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//para fazer o efeito de scroll/onclick

function teste(){
    alert('teste');
}