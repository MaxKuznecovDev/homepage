function addActiveNavMenu() {
    let arrLiElements = document.getElementsByClassName("nav")[0].children;
    let path = window.location.pathname;
    if (path == "/") {
        arrLiElements[0].children[0].classList.add('active');
    } else {
        for (let i = 0; i < arrLiElements.length; i++) {
            let aElem = arrLiElements[i].children[0];
            let pathLi = aElem.pathname;
            if (path == pathLi && path !== "/404") {
                aElem.classList.add('active');
            }
        }
    }

}
addActiveNavMenu();