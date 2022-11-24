window.onload = ()=>{
    const btnMenuHamburguer = document.querySelector('.menu__hamburguer')
    const btnMenuClose = document.querySelector('.menu__close')
    const menuContent = document.querySelector('.menu__content')

    btnMenuHamburguer.onclick = ()=>{
        menuContent.classList.add('visible')
    }
    btnMenuClose.onclick = ()=>{
        menuContent.classList.remove('visible')
    }

}