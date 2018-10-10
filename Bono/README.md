# Incremento de la Temperatura desde 1950 (Promedio de cada 5 años)

![alt text](https://c1.staticflickr.com/3/2922/14141611115_7bcfdc2ab0_c.jpg)

- **Estudiante**: Vladimir E. Cuevas S.
- **Curso**: Visual Analytics
- **Midterm** Bonus
- **Fecha**: 9/10/2018
- **Licencia**: MIT

Esta visualización confirma la afirmación original: la temperatura global continuó aumentando rápidamente en el siglo XXI, alcanzando nuevos niveles récord en cada década. También muestra que los datos del hemisferio norte en el invierno meteorológico son los más turbulentos, y hubo un gran aumento en la desviación a mediados de la década de 1970’s y en el año de 1995.

## Datos del Proyecto – What?
Los datos que se usaron para la visualización son de un dataset del tipo tabla (tables) - temporal, con varias líneas de tiempo, que contiene las siguientes variables (attributes):

|Variable |Tipo|
|---------|----|
**Year:**|Ordenado, Cuantitativo, Secuencial
**Glob:**|Ordenado, Cuantitativo, Divérgete
**NHem:**|Ordenado, Cuantitativo, Divérgete
**SHem:**|Ordenado, Cuantitativo, Divérgete
**24N-90N:**|Ordenado, Cuantitativo, Divérgete
**24S-24N:**|Ordenado, Cuantitativo, Divérgete
**90S-24S:**|Ordenado, Cuantitativo, Divérgete
**64N-90N:**|Ordenado, Cuantitativo, Divérgete
**44N-64N:**|Ordenado, Cuantitativo, Divérgete
**24N-44N:**|Ordenado, Cuantitativo, Divérgete
**EQU-24N:**|Ordenado, Cuantitativo, Divérgete
**24S-EQU:**|Ordenado, Cuantitativo, Divérgete
**44S-24S:**|Ordenado, Cuantitativo, Divérgete
**64S-44S:**|Ordenado, Cuantitativo, Divérgete
**90S-64S:**|Ordenado, Cuantitativo, Divérgete

### **Se descartan los valores anteriores a 1950 para entregar la vista con respecto a los requerimientos solicitados por la jefa**

El dataset utilizado para esta visualización fue descargado del sitio del National Aeronautics and Space Administration (NASA) - Goddard Institute for Space Studies, específicamente del sitio de:

- [GISS Surface Temperature Analysis (GISTEMP)](https://data.giss.nasa.gov/gistemp/)

## Objetivos del Proyecto - Why?
- **Tarea Principal:** Resumir (**summarize**) la tendencia (**trend**) de la temperatura de la tierra utilizando la información recolectada sobre la superficie y mar a través del tiempo (**1950-2018**), para educar a la gente acerca del calentamiento global.

- **Tareas Secundarias:**

	- Comparar (**compare**) la similitud (**similarity**) entre las tendencias (**trends**) de la temperatura promedio, para los hemisferios norte y sur utilizando la información recolectada sobre la superficie y mar a través del tiempo (**1950-2018**), para educar a la gente acerca del calentamiento global.

	- Localizar outliers / **Locate Outliers** o desviaciones sobre la línea de tiempo.

## Marcas y Canales – How?

### Marcas

 - Puntos, para mostrar el promedio en cada intervalo de tiempo y para ser usados de manera interactiva en la visualización.
 - Líneas, para conectar los puntos en la visualización y dejar clara la tendencia que ha tomado la temperatura desde los años 50's.
 - Líneas, para mostrar la data real, no promediada y tener una vista de detalle más fino.
 - Líneas, para mostrar una retícula que permita tener una visión de los periodos o intervalos que se estipularon para la vista. Todas ordenadas con el eje X y Y con escalas lineares y de tiempo que representan el tiempo en años y la temperatura.
 - Área, para ayudar a distinguir el comportamiento de la temperatura con respecto al tiempo. Este se mezcla con el degradé en color saturation como canal.

### Canales

- Color Hue - para categorizar los hemisferios y el promedio global, utilizando la escala de colores de d3
- Color saturation, para levantar un degradé que permitiese comparar las tendencias entre los hemisferios y el calentamiento global desde los años 50's.

## Insights

- Se logra demostrar que el calentamiento global es inminente, no solo ha incrementado, sino que no se ha detenido.
- Se nota en la vista que desde los años 70’s el incremento es mucho más pronunciado
- El hemisferio norte es el mayor afectado.
- Esta visualización confirma la afirmación original: la temperatura global continuó aumentando rápidamente en el siglo XXI, alcanzando nuevos niveles récord en cada década. También muestra que los datos del hemisferio norte en el invierno meteorológico son los más turbulentos, y hubo un gran aumento en la desviación a mediados de la década de 1970’s y en el año de 1995.

## Tecnologías Usadas
Para el desarrollo del proyecto se usaron las siguientes tecnologías:
-	***Sublime Text 3*** como editor de código con los siguientes paquetes.
	- Emmet
	- eslint
	- HTML-CSS-JS Prettify
	- Pretty JSON
	- SublimeLinter
	- SublimeLinter-eslint
- **HTML5** como lenguaje de marcas.
- **CSS3** como lenguaje de diseño gráfico para definir y crear la presentación del documento estructurado escrito en un lenguaje de marcas, HTML.
- **Javascript - ECMAScript 2018** como lenguaje de programación de alto nivel.
- **d3 v5** para producir, a partir de datos, infogramas dinámicos e interactivos en navegadores web.
- **GitHub** como admministrador de código y control de versiones, así como repositorio principal de la vista.

## Prerrequisitos y Uso

- La vista requiere de un navegador de sexta generación, preferiblemente Google Chrome puesto que en este es donde se realizaron todas las pruebas.
- Se requiere de acceso a internet puesto que la vista se encuentra alojada en la siguiente dirección web [https://vladcuevas.github.io/](https://vladcuevas.github.io/)

### Uso
- Acceder a la dirección [https://vladcuevas.github.io/](https://vladcuevas.github.io/)
- Dar clic en el enlace [Bono: Incremento de la Temperatura desde 1950 (Promedio de cada 5 años)]()
- Interactuar con la vista, seleccionando la escala de temperatura que desea utilizar (Centígrados (C) o Fahrenheit (F))

- Interactuar con la vista, pasando el mouse por los puntos que marcan el promedio de cada intervalo de tiempo.

- Interactuar con la vista, pasando el mouse por los puntos de la leyenda (Global Mean, Southern Hemisphere, Northern Hemisphere)

## Autores
- **Autor(es) de los datos:** National Aeronautics and Space Administration (NASA) - Goddard Institute for Space Studies
	- El enlace a la página de los datos de la NASA es: [(GISTEMP)](https://data.giss.nasa.gov/gistemp/)
- **Autor(es) de la visualización:** [Vladimir E. Cuevas S.](https://github.com/vladcuevas)
	- El enlace a la página del proyecto es: [https://vladcuevas.github.io/](https://vladcuevas.github.io/)

## Screenshot

![alt text](https://github.com/vladcuevas/Visual-Analytics/raw/master/Bono/img/Capture01.gif)

## Licencia
Este proyecto está bajo la licencia [MIT](https://github.com/vladcuevas/vladcuevas.github.io/blob/master/LICENSE).
