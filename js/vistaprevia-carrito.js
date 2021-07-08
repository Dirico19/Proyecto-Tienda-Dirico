// DIV CARRITO
const carrito = document.querySelector('.otros a div');

const eliminarDelCarrito = (e)=>{
    if (e.target.classList.contains('borrar')){
        let nombreProd = e.target.previousElementSibling.previousElementSibling.textContent;
        e.target.parentElement.remove();
        eliminarProductoLS(nombreProd);
    }
}

carrito.addEventListener("click",(e)=>{eliminarDelCarrito(e)});

function obtenerProductosLS(){
    let productosLS;
    if (localStorage.getItem('productos') === null)
        productosLS = [];
    else{
        productosLS = JSON.parse(localStorage.getItem('productos'));
    }
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

//ENLACE PRODUCTOS CON FILTROS
function agregarFiltros(marca, categoria, sexo){
    localStorage.setItem("marca", marca);
    localStorage.setItem("categoria", categoria);
    localStorage.setItem("sexo", sexo);
    localStorage.filtrar = true;
    location.href = "paginas/productos.html";
}

localStorage.setItem("filtrar", false);

const enlaceProd = document.querySelectorAll('.menu li:nth-child(2) ul li a');

enlaceProd[0].addEventListener("click",()=>agregarFiltros("marca","categoria","hombre"));
enlaceProd[1].addEventListener("click",()=>agregarFiltros("marca","categoria","mujer"));
enlaceProd[2].addEventListener("click",()=>agregarFiltros("marca","categoria","niño"));