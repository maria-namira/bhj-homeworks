class Menu{
	constructor(menu){
const menu__link = document.getElementsByClassName('menu__link');
const menu__item = document.getElementsByClassName('menu__item');

for (let menuSub of menu__link) {
    menuSub.closest('.menu__sub').getElementByTagName('a')[0].onclick = (sub) => {
        if (menuSub.classList.contains ('menu__item')) {
            menuSub.classList.remove('menu__item')
        }else{
        	if (menuSub.length) menu__item[0].classList.remove('menu__item');
                menuSub.classList.add ('menu__item');
        }
         return false;
      }
    }
  }
} 
Array.from(document.getElementsByClassName('menu_main')).forEach((menu) => new Menu(menu));