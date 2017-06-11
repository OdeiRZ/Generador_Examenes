window.onload = function() {
    document.getElementById("empezar").addEventListener("click", function(){ generarExamen(); });
    document.getElementById("mostrar").addEventListener("click", function(){ leerCookie(); });
    document.getElementById("dni").addEventListener("keyup", function(){ activarBoton(this.value); });
}

var ventana;

