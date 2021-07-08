let correo1 = document.frm1.correo;

let nombre = document.frm1.nombre;
nombre.addEventListener("keypress",function(e){
    if (/\d/.test(e.key)){
        e.preventDefault();
        return;
    }
});


function registrar1(e){
    if (/^\s*$/.test(nombre.value)){
        e.preventDefault();
        alert("Escriba su nombre");
        return;
    }
    if (!/^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}$/.test(correo1.value)){
        e.preventDefault();
        alert("Escriba un email válido");
        return;
    }
    alert("Datos ingresados correctamente");
}

document.frm1.addEventListener("submit",(e)=>registrar1(e));