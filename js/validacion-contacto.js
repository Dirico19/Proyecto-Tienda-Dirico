let nombre = document.frm.nombre;
nombre.addEventListener("keypress",function(e){
    if (/\d/.test(e.key)){
        e.preventDefault();
        return;
    }
});

let telefono = document.frm.telefono;
telefono.addEventListener("keypress",function(e){
    if (/\D/.test(e.key)){
        e.preventDefault();
        return;
    }
});
let correo = document.frm.correo;
let asunto = document.frm.asunto;
let mensaje = document.frm.mensaje;

function registrar(e){
    if (/^\s*$/.test(nombre.value)){
        e.preventDefault();
        alert("Escriba su nombre");
        return;
    }
    if (!/^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}$/.test(correo.value)){
        e.preventDefault();
        alert("Escriba un email válido");
        return;
    }
    if (!/^[1-9]\d{8,14}$/.test(telefono.value)){
        e.preventDefault();
        alert("Número de telefono incorrecto");
        return;
    }
    if (/^\s*$/.test(asunto.value)){
        e.preventDefault();
        alert("Escriba un asunto");
        return;
    }
    if (/^\s*$/.test(mensaje.value)){
        e.preventDefault();
        alert("Escriba un mensaje");
        return;
    }
    alert("Datos ingresados correctamente");
}

document.frm.addEventListener("submit",(e)=>registrar(e));