//FILTRADO AL CARGAR PAGINA
function filtrado(){
    if (localStorage.filtrar == "true"){
        localStorage.filtrar = "false";
        eval(localStorage.marca).checked = true;
        eval(localStorage.categoria).checked = true;
        eval(localStorage.sexo).checked = true;
    } else{
        document.getElementById('marca').checked = true;
        document.getElementById('categoria').checked = true;
        document.getElementById('sexo').checked = true;
    }
    filtrarPorClases();
}

addEventListener("load",filtrado);

const articulos = document.querySelectorAll('article');
const nombre = document.querySelectorAll('article figcaption');
const btnComprar = document.querySelectorAll('article input');

//FILTROS
const filtrarPorBuscar = ()=>{
    document.getElementById('sexo').checked = true;
    document.getElementById('categoria').checked = true;
    document.getElementById('marca').checked = true;
    filtrarPorClases();
}
const filtrarTexto = ()=>{
    let texto = document.getElementById('buscar');
    for (let i = 0; i < nombre.length; i++) {
        if (nombre[i].textContent.toLowerCase().indexOf(texto.value.toLowerCase()) === -1){
            articulos[i].style.display = "none";
        } else {
            articulos[i].style.display = "block";
        }
    }
}

const filtrarPorClases = ()=>{
    filtrarTexto();
    let articulosVisibles = [];
    for (const articulo of articulos) {
        if (articulo.style.display.indexOf("block") !== -1)
            articulosVisibles.push(articulo);
    }
    let tipos = document.querySelectorAll('input[type="radio"]:checked');
    let filtro = [tipos[2].id,tipos[1].id,tipos[0].id];
    for (let i = 0; i < articulosVisibles.length; i++) {
        let c = 0;
        for (let j = 0; j < filtro.length; j++) {
            if (/^(marca|categoria|sexo)$/.test(filtro[j]) || articulosVisibles[i].classList[j] == filtro[j])
            c++;
        }
        c == 3 ? articulosVisibles[i].style.display = "block" : articulosVisibles[i].style.display = "none";
    }
}

document.getElementById('buscar').addEventListener("keyup",(e)=>{
    if (e.key == "Enter"){
        filtrarPorBuscar();
    }
});

const inputsFiltro = document.querySelectorAll('input[type="radio"]');
for (let i = 0; i < inputsFiltro.length; i++) {
    inputsFiltro[i].addEventListener("click",filtrarPorClases);
}

// AGREGAR/ELIMINAR PRODUCTOS AL CARRITO
const carrito = document.querySelector('.otros a div');

const agregarAlCarrito = (e)=>{
    const producto = {
        imagen: e.target.previousElementSibling.firstElementChild.getAttribute('src'),
        titulo: e.target.previousElementSibling.lastElementChild.textContent.split("Precio: S/.")[0],
        precio: e.target.previousElementSibling.lastElementChild.textContent.split("Precio: S/.")[1]
    };
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        if (productosLS[i].titulo === producto.titulo){
            alert("El producto ya está agregado al carrito");
            return;
        }
    }
    const vista = document.createElement('p');
    vista.innerHTML = `
        <img src="${producto.imagen}">
        <span class="titulo">${producto.titulo}</span>
        <span class="precio">S/.${producto.precio}</span>
        <a href="#" class="borrar">x</a>
    `;
    carrito.appendChild(vista);
    guardarProductoLS(producto);
}
const eliminarDelCarrito = (e)=>{
    if (e.target.classList.contains('borrar')){
        let nombreProd = e.target.previousElementSibling.previousElementSibling.textContent;
        e.target.parentElement.remove();
        eliminarProductoLS(nombreProd);
    }
}

for (let i = 0; i < btnComprar.length; i++) {
    btnComprar[i].addEventListener("click",(e)=>{agregarAlCarrito(e)});
}
carrito.addEventListener("click",(e)=>{eliminarDelCarrito(e)});



function guardarProductoLS(producto){
    let productosLS = obtenerProductosLS();
    productosLS.push(producto);
    localStorage.setItem('productos',JSON.stringify(productosLS));
}

function obtenerProductosLS(){
    let productosLS;
    if (localStorage.getItem('productos') === null)
        productosLS = [];
    else
        productosLS = JSON.parse(localStorage.getItem('productos'));
    return productosLS;
}
function eliminarProductoLS(nombre){
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        if (productosLS[i].titulo === nombre)
            productosLS.splice(i,1);
    }
    localStorage.setItem('productos',JSON.stringify(productosLS));
}
function leerLS(){
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        const vista = document.createElement('p');
        vista.innerHTML = `
            <img src="${productosLS[i].imagen}">
            <span class="titulo">${productosLS[i].titulo}</span>
            <span class="precio">S/.${productosLS[i].precio}</span>
            <a href="#" class="borrar">x</a>
        `;
        carrito.appendChild(vista);
    }
}

addEventListener("load",leerLS);