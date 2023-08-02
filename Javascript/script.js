let mode = document.querySelector("header .mode button");

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector(".mode button svg.moon").classList.add("not-visible");
    document.querySelector(".mode button svg.sun").classList.remove("not-visible")
    document.querySelector("body").classList.add("dark-mode");
} else {
    document.querySelector(".mode button svg.moon").classList.remove("not-visible");
    document.querySelector(".mode button svg.sun").classList.add("not-visible");
    document.querySelector("body").classList.remove("dark-mode");
}


let e = window.matchMedia('(prefers-color-scheme: dark)');

console.log(e);


mode.addEventListener("click", function() {
    document.querySelectorAll(".mode button svg").forEach(function(e) {
        e.classList.toggle("not-visible");
    })

    document.querySelector("body").classList.toggle("dark-mode");
});

