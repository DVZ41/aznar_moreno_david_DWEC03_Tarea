#Tarea DWEC03 - Algoritmos y manejo del DOM en JavaScript

Este proyecto forma parte de la **tarea 3** del módulo **Desarrollo Web en Entorno Cliente (DWEC)**.  
Aquí he ido aplicando lo aprendido en clase sobre **manipulación del DOM, fechas, cadenas de texto, eventos y almacenamiento local**, creando una pequeña web con **cuatro ejercicios prácticos** hechos con HTML, CSS y JavaScript.

**Repositorio en GitHub:** [DVZ41/aznar_moreno_david_DWEC03_Tarea](https://github.com/DVZ41/aznar_moreno_david_DWEC03_Tarea)  
**Versión desplegada en Netlify:** [https://ra3dam.netlify.app/](https://ra3dam.netlify.app/)

---

##Estructura del proyecto

- `index.html` → Página principal con los enlaces a los 4 ejercicios.  
- `ej1.html` → Ventana nueva con la fecha actual y días restantes para fin de año.  
- `ej2.html` → Algoritmo de compresión y descompresión de cadenas.  
- `ej3.html` → Contador de clics con `localStorage`.  
- `ej4.html` → Redirección automática con `setTimeout()`.  
- `style.css` → Hoja de estilos general para todas las páginas.  
- `script.js` → Archivo JavaScript con todas las funciones de los ejercicios.

---

##Ejercicio 1: Ventana nueva con la fecha actual y los días que quedan hasta fin de año

En este ejercicio se utiliza **`window.open()`** para abrir una nueva ventana del navegador, y dentro se muestra la fecha actual junto con los días que faltan hasta fin de año.

Aprendí a trabajar con el objeto **`Date()`**, a sacar el día, mes y año con:
- `getDate()`
- `getMonth() + 1` (porque empieza desde 0)
- `getFullYear()`

También aprendí que si restas dos fechas en JavaScript, el resultado te da **la diferencia en milisegundos**, y para pasarla a días se divide entre `(1000 * 60 * 60 * 24)`.

Por último, se usa **`Math.ceil()`** para redondear hacia arriba por si queda algún día parcial.

---

##Ejercicio 2: Algoritmo compresor y descompresor de cadenas

En este ejercicio se pedía crear un **algoritmo de compresión de cadenas**, sustituyendo letras repetidas por el número de repeticiones seguido de la letra.  
Por ejemplo:  
`"aaabbcaaaa"` → `"3a2bc4a"`  
y los espacios se sustituyen por `?`.

También se pedía una función para **descomprimir** la cadena, volviendo a su forma original.

Al principio pensé hacerlo con un solo campo de entrada y salida, pero me parecía lioso porque el texto se cambiaba al comprimir y luego no podía volver a ver el original.  
Por eso decidí poner **dos grupos de campos**:
- Uno para **comprimir cadenas normales**.
- Otro para **descomprimir cadenas comprimidas**.

Así el usuario puede ver ambos resultados a la vez de forma más clara.

También añadí un botón para **copiar automáticamente el resultado comprimido** y pegarlo en el campo de descompresión, para no tener que hacerlo manualmente.

---

##Ejercicio 3: Contador de clics con `localStorage`

Este ejercicio me sirvió para aprender a **guardar datos en el navegador** usando `localStorage`.  
Cada vez que el usuario hace clic en el botón, el contador aumenta y se guarda, de modo que **aunque se recargue la página, el valor sigue ahí**.

Usé estas funciones:
- `localStorage.setItem("clicks", contador)` para guardar el número de clics.
- `localStorage.getItem("clicks")` para recuperarlo cuando se carga la página.
- También añadí una condición con `Number.MAX_SAFE_INTEGER` para evitar que el número crezca infinitamente.

---

##Ejercicio 4: Redirección automática con `setTimeout()`

En este ejercicio se pedía usar **`setTimeout()`** para redirigir la página **pasados 3 segundos desde la carga**, no al pulsar un botón.

Al principio lo interpreté mal y lo hice para que se redirigiera **3 segundos después de pulsar un botón**, pero al repasar el enunciado y el temario entendí que debía hacerse automáticamente al cargar la página.

Intenté solucionarlo usando:

```js
document.addEventListener("DOMContentLoaded", redirigir);
```

De esa forma, la redirección se ejecutaba automáticamente cuando se cargaba el documento.
Pero me di cuenta de que como todas las páginas usaban el mismo archivo script.js, todas las páginas empezaban a redirigir, no solo ej4.html.

Entonces, para que solo se aplique en la página correcta, añadí una comprobación con:
```js
if (window.location.pathname.includes("ej4.html")) { ... }
