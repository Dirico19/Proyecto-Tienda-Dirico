/* EFECTO CARRUSEL DEL BANNER */
let slider = document.getElementsByClassName('slider');
let banner = document.querySelector('.banner');
let punto = document.querySelectorAll('.puntos-sliders div');

const imagenes = [
    "imagenes/banner1.jpg",
    "imagenes/banner2.jpg",
    "imagenes/banner3.jpg",
    "imagenes/banner4.jpg"
];

banner.style.left = `-100%`;
for (let i = 0; i < slider.length; i++) {
    slider[i].style.backgroundImage = `url(${imagenes[0]})`;
}
punto[0].style.backgroundColor = "#ddf";

let stop = true;
let cambioAutomatico = setInterval(() => {cambiar(1)}, 5000);

let imgCentro = ()=>{
    clearInterval(cambioAutomatico);
    let url = slider[1].style.backgroundImage;
    let num = parseInt(url.replace(/\D/g,""));
    return num;
}
function cambiar(x){
    mostrar(imgCentro() + x);
}
function mostrar(n){
    if (stop){
        stop = false;
        clearInterval(cambioAutomatico);
        if (n > imgCentro()) banner.style.left = `-200%`;
        else if (n < imgCentro()) banner.style.left = "0";
        banner.style.transition = "left 1s ease-out";
        if (n > imagenes.length) n = 1;
        else if (n < 1) n = imagenes.length;
        slider[0].style.backgroundImage = `url(${imagenes[n-1]})`;
        slider[2].style.backgroundImage = `url(${imagenes[n-1]})`;
        pintarPunto(n);
        setTimeout(() => {
            stop = true;
            banner.style.left = "-100%";
            banner.style.transition = "";
            slider[1].style.backgroundImage = `url(${imagenes[n-1]})`;
            cambioAutomatico = setInterval(() => {cambiar(1)}, 5000);
        }, 1000);
    }
}
function pintarPunto(n){
    for (let i = 0; i < punto.length; i++) {
        punto[i].style.backgroundColor = "#14113a";
        punto[i].style.transition = "1s";
    }
    punto[n-1].style.backgroundColor = "#ddf";
    punto[n-1].style.transition = "1s";
}


/* ENLACES DIRECTOS DE LOS BANNERS */
document.querySelector('.contorno').addEventListener("click", ()=>{
    switch (imgCentro()) {
        case 1:
            location.href = "paginas/promociones.html";
            break;
        case 2:
            location.href = "paginas/promociones.html";
            break;
        case 3:
            agregarFiltros("puma","zapatillas","sexo");
            break;
        case 4:
            agregarFiltros("adidas","zapatillas","hombre");
            break;
        default:
            location.href = "paginas/promociones.html";
    }
})

/* ENLACES DIRECTOS DE LOS PRODUCTOS */
function buscarProducto(elemento){
    let cadena = elemento.classList;
    let marca = `document.getElementById('${cadena[1]}')`;
    let categoria = `document.getElementById('${cadena[2]}')`;
    let sexo = `document.getElementById('${cadena[3]}')`;
    agregarFiltros(marca, categoria, sexo);
}
function agregarFiltros(marca, categoria, sexo){
    localStorage.setItem("marca", marca);
    localStorage.setItem("categoria", categoria);
    localStorage.setItem("sexo", sexo);
    localStorage.filtrar = true;
    location.href = "paginas/productos.html";
}

localStorage.setItem("filtrar", false);
