window.onload = function() {
    document.getElementById("empezar").addEventListener("click", function(){ generarExamen(); });
    document.getElementById("mostrar").addEventListener("click", function(){ leerCookie(); });
    document.getElementById("dni").addEventListener("keyup", function(){ activarBoton(this.value); });
}

var ventana;

function generarExamen() {
    var  p10 = new Array('Un monitor es un dispositivo de:','Entrada','Salida','Entrada/salida',0,1,0);
    var  p11 = new Array('Una disquetera es un dispositivo de:','Entrada','Salida','Entrada/salida',0,0,1);
    var  p12 = new Array('Un ratón es un dispositivo de:','Entrada','Salida','Entrada/salida',1,0,0);
    var  p13 = new Array('Un escéner es un dispositivo de:','Entrada','Salida','Entrada/salida',1,0,0);
    var  p14 = new Array('Un teclado es un dispositivo de:','Entrada','Salida','Entrada/salida',1,0,0);
    var  p15 = new Array('Un plotter es un dispositivo de:','Entrada','Salida','Entrada/salida',0,1,0);
    var  p16 = new Array('Una impresora es un dispositivo de:','Entrada','Salida','Entrada/salida',0,1,0);
    var  p17 = new Array('Un disco duro es un dispositivo de:','Entrada','Salida','Entrada/salida',0,0,1);
    var  p18 = new Array('Una pantalla táctil es un dispositivo de:','Entrada','Salida','Entrada/salida',0,0,1);
    var  p19 = new Array('Una regrabadora de cds es un dispositivo de:','Entrada','Salida','Entrada/salida',0,0,1);
    var  ex1 = new Array(p10,p11,p12,p13,p14,p15,p16,p17,p18,p19);

    ventana = window.open("","ventana","width=600,height=800,menubar,scrollbars");//ventana.focus();
    ventana.document.write("<html><head><title>Test</title></head>");
    ventana.document.write("<body bgcolor='black' text='white'><form name='examen'>");

    for (var i=0; i<ex1.length; i++) {
        ventana.document.write("<p>"+(i+1)+".- "+ex1[i][0]+"</p>");
        for (var j=1; j<4; j++) {   //ex1[i].length
            ventana.document.write("<label><input type='radio' name='"+i+"' value='"+ex1[i][j+3]+"'>"+ex1[i][j]+"</label><br/>");
        }
    }
    ventana.document.write("<br/><input type='button' value='Enviar' onclick='opener.corregir(); self.close();'>");
    ventana.document.write("</form></body></html>");
}
function corregir() {
    var nota = 0;
    var imagenes= ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez'];
    for (i=0; i<ventana.document.examen.length; i++) {
        if (ventana.document.examen.elements[i].checked) {
            nota += parseInt(ventana.document.examen.elements[i].value);
        }
    }
    document.getElementById("imgNota").src = "img/"+imagenes[nota]+".gif";
    crearCookie(document.getElementById('dni').value+"="+document.getElementById('nombre').value+"*"+nota, 1);
}
function crearCookie(dato,caducidad) {
    var d = new Date();
    d.setDate(d.getDate() + caducidad);
    document.cookie = dato + "; "+"expires=" + d.toGMTString();
}
function leerCookie() {
    if (document.cookie.length != 0) {
        var cadena = "";
        var datos = document.cookie.split(";");
        for (var i=0; i<datos.length; i++) {
            var pos = datos[i].indexOf("=");
            var dni = datos[i].substring(0,pos);
            var aux = datos[i].substring(pos+1).split('*');
            cadena += "<p>" + dni + " -> " + aux[0] + " -> " + aux[1] + "</p>";
        }
        document.getElementById('resultado').innerHTML = cadena;
    }
}
function activarBoton(dni) {
    if (validarDni(dni)) {
        document.getElementById("empezar").disabled = false;
    } else {
        document.getElementById("empezar").disabled = true;
    }
}
function validarDni(dni) {
    var sw = false;
    if (/^[0-9]{8}[a-zA-Z]{1}$/.test(dni.toUpperCase()) && ("TRWAGMYFPDXBNJZSQVHLCKE".charAt((dni.toUpperCase().substr(0, 8)) % 23) == dni.toUpperCase().charAt(8).toUpperCase()))
        sw = true;
    return sw;
}