const changeTheme = (theme)=>{
    localStorage.setItem('theme', theme)
    updateTheme()
}
const updateTheme = ()=>{
    let isDark = localStorage.getItem('isDark') === 'true' ? 'dark' : 'light'
    document.documentElement.setAttribute("data-theme", `${localStorage.getItem('theme')}-${isDark}`)
}

window.onload = ()=>{

    var preferenceThemeSystem = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.getItem('isDark') ? null : localStorage.setItem('isDark', preferenceThemeSystem)
    localStorage.getItem('theme') ? null : localStorage.setItem('theme', 'default')
    updateTheme()

    //Mostrando menu
    const btnMenuHamburguer = document.querySelector('.menu__hamburguer')
    const btnMenuClose = document.querySelector('.menu__close')
    const menuContent = document.querySelector('.menu__content')

    btnMenuHamburguer.onclick = ()=>{
        menuContent.classList.add('visible')
    }
    btnMenuClose.onclick = ()=>{
        menuContent.classList.remove('visible')
    }

    //Mostrando paleta de colores
    document.getElementById("btn-colors").addEventListener("click", (function() {
        document.querySelector(".menu__preset-colors").classList.toggle("show")
    }
    ))

    //Cambiar el tema
    const toggleTheme = document.getElementById('toggle-theme')

    toggleTheme.onchange = ()=>{
        localStorage.setItem('isDark', localStorage.getItem('isDark') === 'true' ? false : true)
        updateTheme()
    }

    //Validando si debe estar checked o no el input
    localStorage.getItem('isDark') === 'true' ? toggleTheme.checked = true : null

}