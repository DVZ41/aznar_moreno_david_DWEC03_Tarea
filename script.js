
//  SCRIPT EJERCICIO 1: VENTANA  NUEVA CON LA FECHA ACTUAL  Y LOS DIAS QUE QUEDAN HASTA FIN DE AÑO

function abrirVentana() { //he usado window.open() para abrir una nueva ventana del navegador
  let nuevaVentana = window.open("", "", "width=600,height=400");//no quiero abrir ninguna pagina,ni nombrarla , solo crear una ventana nueva por eso dejo las comillas vacias y solo pongo las medidas

  let hoy = new Date();// creo un objeto Date para coger la fechaa actual del sistema
  let dia = hoy.getDate();// con getDate saco el dia, con getMonth el mes (le sumo 1 porque empieza en 0) y con getFullYear el año completo
  let mes = hoy.getMonth() + 1;
  let año = hoy.getFullYear();
  let finAño = new Date(año, 11, 31); // Creo otro objeto Date para el 31 de diciembre del mismo año, eso me sirve para calcular los días que faltan para acabar el año.
  let diferencia = finAño - hoy;// resto las dos fechas, javascript me devuelve el resultado  en milisegundos automaticamente
  let diasRestantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));// hago la conversion de milisegundos a dias y con Math.ceil redondeo hacia arriba por si no es un numero entero
// uso document.write() para escribir dentro de la nueva ventana y escribo el mensaje con el dia actual y los que falta para el fin de ano
nuevaVentana.document.write(`<h3>Hoy es ${dia}/${mes}/${año} y faltan ${diasRestantes} dias para fin de año.</h3>`);
}


// EJERCICIO 2: ALGORITMO  COMPRESOR Y DESCOMPRESOR DE CADENAS
/* 
En este ejercicio he decidido poner dos campos de entrada y dos campos de salida:
un grupo sirve para comprimir y otro para descomprimir. 
Tambien he creado un boton extra para copiar el resultado comprimido directamente al campo de entrada del descompresor
 y asi hacerla mas facil de entender para el usuario.
no se si es la manera mas eficiente o correcta de hacerlo, pero me parece mas claro

Al principio pense en usar un solo campo para introducir y mostrar el texto,
pero me parecia un poco lioso, porque al comprimir la cadena el texto original
se sustituia por el comprimido, y luego no podia volver a descomprimirlo sin
volver a escribirlo otra vez.

Por eso he separado las funciones: 
el usuario puede introducir una cadena normal para comprimirla 
y también escribir o pegar (con la funcion que he creado aunque no se pedia en el enunciado de la tarea) directamente una cadena ya comprimida para descomprimirla.
asi se pueden ver los dos resultados a la vez, de una forma mas  clara y ordenada.
*/

function comprimir(cadena) { // creo una funcion que sirve para comprimir una cadena de texto.
// lo que hace es detectar letras repetidas y sustituirlas por el numero de veces que se repite seguido de la letra
// Primero comprobamos con la expresion regular /\d/ si la cadena contiene numeros para evitar errores.
// Si hay numeros, mostramos un mensaje de error y salimos de la funcion devolviendo una cadena vacia.
 if (/\d/.test(cadena)) {
    alert("ERROR: la cadena no puede contener numeros");
    return "";
  }
  // Cambiamos los espacios por el símbolo "?" con el metodo replace() y la expresion regular / /g
  cadena = cadena.replace(/ /g, "?");
  // Creamos una variable vaciaa para ir guardando el resultado y un contador para contar cuantas veces se repite una letra seguida.
  let resultado = "";
  let contador = 1;
  //con un bucle for se recorre la cadena de texto  letra por letra.
  for (let i = 0; i < cadena.length; i++) {
    // se compara la letra actual con la siguiente,si la letra actual es igual a la siguiente aumento el contador.
    if (cadena[i] === cadena[i + 1]) {
      contador++;
    } else {
      // Si la letra ya no se repite,pongo el resultado de cuantas veces se repite (si hay repetición)
      // y la letra actual, uso el operador ternario para no poner el 1 si no hay repeticion.
      resultado += (contador > 1 ? contador : "") + cadena[i];
      //reinicio  el contador para la siguiente letra.
      contador = 1;
    }
  }
  //con u nreturn devuelvo el resultado ya comprimido.
  return resultado;
}
//Lugo hago la funcion de descomprimir que sirve para DESCOMPRIMIR una cadena de caracteres  en formato comprimido.
// Hace lo contrario a la anterior, resconstruye el texto original.
function descomprimir(cadena) {
  //creo una  variable donde guardare la cadena reconstruida.
  let resultado = "";

  //con un for se recorre  la cadena letra a letra.
  for (let i = 0; i < cadena.length; i++) {
    //  compruebo con isNaN si el caracter actual es un numero,si es un numero significa que la siguiente letra se repite ese numero de veces.
    if (!isNaN(cadena[i])) {
      let repeticiones = parseInt(cadena[i]);//uso parseInt() para convertir ese texto en numero.
      let caracter = cadena[i + 1];//guardo la letra que se va a repetir.
      resultado += caracter.repeat(repeticiones); //uso el metodo repeat() para repetirla las veces que haga falta.
      i++; // salto una posicion paera que no se repita la letra que ya he procesado.
    } else {
      // si no es un numero , anado  la letra tal cual.
      resultado += cadena[i];
    }
  }

  // por ultimo reemplazo las ? por los espacios originales con el metodo replace y devuelvo el resultado.
  return resultado.replace(/\?/g, " ");
}


// esta es la funcion que se ejecuta cuando el usuario pulsa el boton COMPRIMIR
function codificar() {
  // coj oel texto que el usuario ha escrito en el campo de entrada de compresion
  let texto = document.getElementById("entradaComprimir").value;
  // llamo a la funcion comprimir() y guardo el resultado.
  let resultado = comprimir(texto);
  //Muestro  el resultado en el campo de salida.
  document.getElementById("salidaComprimir").value = resultado;
}

// Esta es la funcion que se ejcuta  cuando el usuario pulsa el boton de  DESCOMPRIMIR.
function decodificar() {
  // cojo  el texto comprimido que el usuario haya escrito.
  let textoComprimido = document.getElementById("entradaDescomprimir").value;
  // Si el campo esta vacio, se manda un alert avbisando al usuario.
  if (!textoComprimido) {
    alert("Por favor, escribe una cadena comprimida para descomprimirla.");
    return;
  }
  // dexcomprimo la cadena llamando a la funcion descomprimir().
  let resultadoDescomprimido = descomprimir(textoComprimido);
  // Mostramos el texto descomprimido en el campo de salida.
  document.getElementById("salidaDescomprimir").value = resultadoDescomprimido;
}

// Anado esta funcion para que el usuario pueda copiar el resultado comprimido directamente al campo de entrada del descompresor
function copiarResultado() {
  // cojo el texto del campo  de salida del compresor
  let textoComprimido = document.getElementById("salidaComprimir").value;
  // si no hay nada, muestro un alrte por si acso el usuario le da al boton si haber hecho la conversion antes.
  if (!textoComprimido) {
    alert("Primero hay que comprimir una cadena antes de copiarla.");
    return;
  }
  // lo pego directamente en el campo de entrada del descompresor
  document.getElementById("entradaDescomprimir").value = textoComprimido;
}


// EJERCICIO 3: CONTADOR DE CLICS CON LA PROPIEDAD DE WINDOW: LOCALSTORAGE

// creo una variable global para contar los clics.
let contador = 0;

function iniciarContador() { // creo una funcion que se ejecuta al cargar la pagina para iniciar  el contador.
  contador = Number(localStorage.getItem("clicks")) || 0;//con localStorage se guardala informacion de los clicks al cargar la pagina.
  let resultado = document.getElementById("resultado"); // con document.getElementById obtengo el elemento donde se muestra el contador.
  if (resultado) resultado.textContent = contador; // si el elemento existe, lo actualizo con el valor del contadore.
}

function contarClick() {// creo una funcion que se ejecuta cada vez que el usuario hace click en el boton.
  if (contador >= Number.MAX_SAFE_INTEGER) {// con max_safe_integer compruebo si el contador ha llegado al numero maximo que puede manejar JS.
    alert("HAS SUPERRADO EL NUMERO MAXIMO DE CLICS, ERES UN MAQUINA!");
    return;// si se llega a ese numero le muestro un alert y salgo de la funcion.
  }
  contador++;// y si no se ha llegado al maximo  aumento el contador en 1.
  localStorage.setItem("clicks", contador); // guardo el valor en localStorage para que  no se pierda cuando se recargue la pagina
  let resultado = document.getElementById("resultado"); // actualizo el valor mostrado en la pagina con el nuevo resultado.
  if (resultado) resultado.textContent = contador;
}


// EJERCICIO 4: REDIRECCION AUTOMATICA A OTRA PAGINA(W3SCHOOLS) CON SETTIMEOUT

function redirigir() { // creo la funcion redirigir que se ejecuta al cargar la pagina.
  // uso setTimeout para esperar 3 segundos antes de redirigir a la nueva pagina en m icaso  la web de w3schools.
  setTimeout(() => {
    window.location.href = "https://www.w3schools.com/js/default.asp";// con window.location.href cambio la pagina actual por la nueva.
  }, 3000);
}
// uso el evento DOMContentLoaded  para que la funcion se ejcute justo cuando ha terminado de cargar la pagina en mi caso 3 segundos.
document.addEventListener('DOMContentLoaded', redirigir);
