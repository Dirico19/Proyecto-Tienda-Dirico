//generar un zoom al pasar el mouse sobre la imagen(productos y promociones)
function zoomProductos(){
    let p2;
    if (document.querySelectorAll('.parte-chica').length > 0){
        p2 = document.querySelectorAll(".parte-chica");    
    } else{
        p2 = document.querySelectorAll("article");
    }
    for (let pr = 0; pr < p2.length; pr++) {
        p2[pr].onmouseover=function(){
            this.style.transition=".5s";
            this.style.transform="scale(1.2)";
            this.style.zIndex=2;
        };
        p2[pr].onmouseout=function(){     
            this.style.transition=".5s";
            this.style.transform="scale(1)"
            this.style.zIndex=1;
        };
    }
}
zoomProductos();