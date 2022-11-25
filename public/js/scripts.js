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

window.onload = () => {
    var preferenceThemeSystem =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.getItem("isDark")
        ? null
        : localStorage.setItem("isDark", preferenceThemeSystem);
    localStorage.getItem("theme")
        ? null
        : localStorage.setItem("theme", "default");
    updateTheme();

    //Mostrando menu
    const btnMenuHamburguer = document.querySelector(".menu__hamburguer");
    const btnMenuClose = document.querySelector(".menu__close");
    const menuContent = document.querySelector(".menu__content");

    btnMenuHamburguer.onclick = () => {
        menuContent.classList.add("visible");
    };
    btnMenuClose.onclick = () => {
        menuContent.classList.remove("visible");
    };

    //Mostrando paleta de colores
    document
        .getElementById("btn-colors")
        .addEventListener("click", function () {
            document
                .querySelector(".menu__preset-colors")
                .classList.toggle("show");
        });

    //Cambiar el tema modo día/noche
    const toggleTheme = document.getElementById("toggle-theme");
    toggleTheme.onchange = () => {
        changeModeDark();
    };

    //Validando si debe estar checked o no el input
    localStorage.getItem("isDark") === "true"
        ? (toggleTheme.checked = true)
        : null;

    // Mostrando mensaje de cambiar tema modo día/noche
    const messageSpan = document.querySelector(".menu__toggle span");
    localStorage.getItem("isDark") === "true"
        ? (messageSpan.innerHTML = "Cambiar a modo día")
        : (messageSpan.innerHTML = "Cambiar a modo noche");
    messageSpan.onclick = () => {
        changeModeDark();
    };
    setTimeout(() => {
        messageSpan.classList.add('hide')
    }, 3000);
};
