let correo = document.frm.correo;
let contraseña = document.frm.contraseña;

function registrar(e){
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
    alert("Datos ingresados correctamente");
}

document.frm.addEventListener("submit",(e)=>registrar(e));

