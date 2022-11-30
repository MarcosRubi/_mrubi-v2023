const changeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    updateTheme();
};
const updateTheme = () => {
    let isDark = localStorage.getItem("isDark") === "true" ? "dark" : "light";
    document.documentElement.setAttribute(
        "data-theme",
        `${localStorage.getItem("theme")}-${isDark}`
    );
};
const changeModeDark = () => {
    localStorage.setItem(
        "isDark",
        localStorage.getItem("isDark") === "true" ? false : true
    );
    updateTheme();
};

//Animaciones con GSAP
const gsapAnimationText = (element, character)=>{
    new SplitType(element)
    gsap.to(character,{
        y: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.1
    })
}
//Fondo del banner
const effectMatrix = ()=>{
    const bannerBg = document.getElementById('effectMatrix')
    const context = bannerBg.getContext('2d')

    bannerBg.setAttribute('height', window.screen.height)
    bannerBg.width = document.body.offsetWidth
    
    let w = bannerBg.width
    let h = bannerBg.height
    
    let cols = Math.floor(w/20)+1
    let positionY = Array(cols).fill(0)


    let repeater = setInterval(() => {
        effect()
    }, 100);
    
    window.onresize = ()=>{
        clearInterval(repeater)
        effectMatrix()
    }

    const effect = ()=>{
        context.clearRect(0,0,w,h)

        context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-link');
        context.font = '10pt Telex'

        positionY.forEach((y, index)=>{
            const text = String.fromCharCode(Math.random()*128)
            const x = index * 20
            context.fillText(text, x, y)
            y > 100 + Math.random() * 10000 ? positionY[index] = 0 : positionY[index]  += 20
        })
    }
}

window.onload = () => {
    //Inicializando variables y detectando el tema del sistema para seleccionarlo por defecto
    var preferenceThemeSystem = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.getItem("isDark") ? null : localStorage.setItem("isDark", preferenceThemeSystem);
    localStorage.getItem("theme") ? null : localStorage.setItem("theme", "default");
    updateTheme();

    //Mostrando menu
    const btnMenuHamburguer = document.querySelector(".menu__hamburguer");
    const btnMenuClose = document.querySelector(".menu__close");
    const menuContent = document.querySelector(".menu__content");

    btnMenuHamburguer.onclick = () => {
        menuContent.classList.add("visible");
        gsapAnimationText('.menu li a', '.word') //Efecto del menu con GSAP
    };
    btnMenuClose.onclick = () => menuContent.classList.remove("visible");

    //Mostrando paleta de colores
    document.getElementById("btn-colors").addEventListener("click", function () {
        document.querySelector(".menu__preset-colors").classList.toggle("show");
    });

    //Cambiar el tema modo día/noche
    const toggleTheme = document.getElementById("toggle-theme");
    toggleTheme.onchange = () => changeModeDark();

    //Validando si debe estar checked o no el input
    localStorage.getItem("isDark") === "true" ? (toggleTheme.checked = true) : null;

    // Mostrando mensaje de cambiar tema modo día/noche
    const messageSpan = document.querySelector(".menu__toggle span");
    localStorage.getItem("isDark") === "true"
        ? (messageSpan.innerHTML = "Cambiar a modo día")
        : (messageSpan.innerHTML = "Cambiar a modo noche");
        
    messageSpan.onclick = () => changeModeDark();

    setTimeout(() => {
        messageSpan.classList.remove('hide')
        setTimeout(() => {
            messageSpan.classList.add('hide')
        }, 5000);
    }, 2000);

    effectMatrix()
    gsapAnimationText('.banner h1', '.char')
    gsapAnimationText('footer h2', '.char')

    //Mostrar formulario en vista desktop
    const btnContact = document.querySelector('#show-contact')
    btnContact.onclick = ()=>{
        document.querySelector('footer').classList.toggle('show-form')
        btnContact.textContent.includes('Enviar') 
        ? btnContact.querySelector('span').innerText = "Ver Repositorios" 
        : btnContact.querySelector('span').innerText = "Enviar Correo"     
    }
};

const startAnimation = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
};

const observer = new IntersectionObserver(startAnimation, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
});

const banner = document.querySelector('.banner')

observer.observe(banner)