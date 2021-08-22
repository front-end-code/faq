// ============================ Menu Settings ===================== \\
let menuItems = document.querySelectorAll('.menu_item');
let toggleMenu = document.querySelector('.burger_menu');
let menuBar = document.querySelector('.menu_bar');

toggleMenuBar = () => {
    menuBar.classList.toggle('showMenu');
    toggleMenu.classList.toggle('changeIcon');
}

window.onclick = function(e) {
    if (!e.target.matches('.burger_menu')) {
        if (menuBar.classList.contains('showMenu')) {
            menuBar.classList.remove('showMenu');
            toggleMenu.classList.remove('changeIcon');
        }
    }
}

toggleMenu.addEventListener('click', toggleMenuBar);