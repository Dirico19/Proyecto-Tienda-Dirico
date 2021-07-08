let nombre = document.frm.nombre;
nombre.addEventListener("keypress",function(e){
    if (/\d/.test(e.key)){
        e.preventDefault();
        return;
    }
});

let apellidos = document.frm.apellidos;
apellidos.addEventListener("keypress",function(e){
    if (/\d/.test(e.key)){
        e.preventDefault();
        return;
    }
});

let correo = document.frm.correo;
let contraseña = document.frm.contraseña;
let confirmar = document.frm.confirmar;

function registrar(e){
    if (/^\s*$/.test(nombre.value)){
        e.preventDefault();
        alert("Escriba su nombre");
        return;
    }
    if (/^\s*$/.test(apellidos.value)){
        e.preventDefault();
        alert("Escriba sus apellidos");
        return;
    }
    if (!/^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}$/.test(correo.value)){
        e.preventDefault();
        alert("Escriba un email válido");
        return;
    }
    if (!/^.{8,}$/.test(contraseña.value)){
        e.preventDefault();
        alert("Escriba una contraseña de mínimo 8 caracteres");
        return;
    }
    if (confirmar.value != contraseña.value){
        e.preventDefault();
        alert("Debe confirmar la misma contraseña");
        return;
    }
    alert("Datos ingresados correctamente");
}

document.frm.addEventListener("submit",(e)=>registrar(e));