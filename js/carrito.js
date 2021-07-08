//MOSTRAR LOS PRODUCTOS DEL CARRITO
const carritoCompras = document.querySelector('section');
function cargarCarritoLS(){
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        const articulo = document.createElement('article');
        articulo.innerHTML = `
            <figure>
                <img src="${productosLS[i].imagen}" alt="">
                <div>
                    <table>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                        <tr>
                            <td>${productosLS[i].titulo}</td>
                            <td>S/.${productosLS[i].precio}</td>
                            <td><input type="number" name="cantidad" min="1" value="1"></td>
                            <td class="subtotal">S/.${productosLS[i].precio}</td>
                            <td><a href="#" class="borrar">x</a>
                        </tr>
                    </table>
                </div>
            </figure>
    `;
        carritoCompras.appendChild(articulo);
    }
}
function obtenerProductosLS(){
    let productosLS;
    if (localStorage.getItem('productos') === null)
        productosLS = [];
    else
        productosLS = JSON.parse(localStorage.getItem('productos'));
    return productosLS;
}

addEventListener("load",cargarCarritoLS);

//MODIFICAR PRODUCTOS DEL CARRITO
const eliminarDelCarrito = (e)=>{
    if (e.target.classList.contains('borrar')){
        let nombreProd = e.target.parentElement.parentElement.firstElementChild.textContent;
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        eliminarProductoLS(nombreProd);
    }
}
function eliminarProductoLS(nombre){
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        if (productosLS[i].titulo === nombre)
            productosLS.splice(i,1);
    }
    localStorage.setItem('productos',JSON.stringify(productosLS));
}
function subtotal(e){
    if (e.target.name == "cantidad"){
        let precio = e.target.parentElement.previousElementSibling.innerHTML.substring(3);
        let cant = e.target.value;
        let subtotal = precio*cant;
        e.target.parentElement.nextElementSibling.innerHTML = `S/.${subtotal.toFixed(2)}`;
    }
}
function costoTotal(){
    let subtotales = document.querySelectorAll('.subtotal');
    let total = document.querySelector('.total');
    let suma = 0;
    for (let i = 0; i < subtotales.length; i++) {
        suma += parseFloat(subtotales[i].innerHTML.substring(3));
    }
    total.innerHTML = `S/.${suma.toFixed(2)}`;
}

carritoCompras.addEventListener("click",(e)=>{
    eliminarDelCarrito(e);
    subtotal(e);
    costoTotal();
});

addEventListener("load",costoTotal);

//VALIDAR COMPRA
const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const comprar = document.getElementById('comprar');
nombre.addEventListener("keypress",(e)=>{
    if (/\d/.test(e.key)){
        e.preventDefault();
        return;
    }
});
comprar.addEventListener("click",(e)=>{
    let confirmar = confirm("¿Está seguro que desea hacer la compra?");
    if (confirmar){
        if (/^\s*$/.test(nombre.value)){
            e.preventDefault();
            alert("Ingrese su nombre para continuar");
            return
        }
        if (!/^[a-zA-Z0-9_-]+@[a-z]+\.[a-z]{2,3}$/.test(correo.value)){
            e.preventDefault();
            alert("Ingrese un correo válido para continuar");
            correo.select();
            return
        }
        alert(`Estimado(a) ${nombre.value}, gracias por comprar en Dirico.
Le hemos enviado un mensaje con la boleta y algunas indicaciones a ${correo.value}, la cual deberá cancelar para enviarle sus productos deseados.
¡QUE TENGAS UN BUEN DÍA!`);
        localStorage.clear();
        document.location.href = "../index.html";
    } else{
        e.preventDefault();
    }
})