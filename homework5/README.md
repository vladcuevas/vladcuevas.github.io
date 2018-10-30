# **Principales Poblaciones Afectadas por los Delitos Sexuales en Colombia entre enero de 2010 y septiembre de 2018**

![alt text](https://github.com/vladcuevas/vladcuevas.github.io/raw/master/homework5/img/shame.jpg)

- **Por**: Vladimir E. Cuevas S.
- **Curso**: Visual Analytics
- **Fecha**: Oct/30/2018
- **Licencia**: MIT

## Screenshot

![alt text](https://github.com/vladcuevas/vladcuevas.github.io/raw/master/homework5/img/screenshot.gif)

## Introducción e Insights

Gracias a la visualización me di cuenta de que:

1.	Por cada caso contra el género masculino, se comenten 6 casos contra el género femenino, ratio de 1:6 aproximado.
2.	Las zonas urbanas son las más afectadas contra las rurales con una ratio de 20:3 aproximado.
3.	Los rangos de edad más afectados son:  

Rango de Edad |Cantidad|Porcentaje
--------------|--------|----------
**0 a 4**|85290|60%
**12 a 17**|26862|19%
**5 a 11**|24893|18%
**18 a 23**|4099|3%
**23 a 64**|350|0.2%
**65 a 85**|97|0.1%

## Datos del Proyecto – What?
Los datos que se usaron para la visualización son de un dataset del tipo red (Networks), que contiene las siguientes variables (attributes):

|Variable |Tipo|
|---------|----|
**Group:**|Categórico, ordinal.
**Name:**|Categórico, ordinal.
**Count:**|Cuantitativo, secuencial.

### Datos derivados:
**Count acunado** por grupo para poder levantar el modismos de bar chart

#### Dataset Availability:  
Static.

### **Fuente de los datos**

El dataset utilizado para esta visualización fue descargado del sitio de datos abiertos de Colombia:

- [Datos Abiertos](https://www.datos.gov.co)

## Objetivos del Proyecto - Why?
- **Tarea Principal:** 
	- Why: Explore topology, locate paths, clusters de los casos de delitos sexuales en Colombia

- **Tareas Secundarias:**

	- Why: Identify Extremes de los casos de delitos sexuales.
	- Why: Lookup y compare values para el bar chart.

## Marcas y Canales – How?

### Modismo 1: Force in a Box.

#### Marcas

- Puntos para los nodos.
- Líneas (connection marks) for links.

#### Canales
- Area (2D size): que se obtiene por el valor de la cantidad de casos aplicada con una escala SQRT sobre el radio de los puntos.
- Posición para aplicar la fuerza y mantener los nodos visibles dentro del espacio del SVG. y para obtener la posición del nodo target.
- Hue - Color: para diferenciar los grupos o clusters de las diferentes categorías

#### How:

- Manipulate - Change: para hacer el cambio entre el uso de la fuerza (force) y agrupar y mostrar en treemap.
- Manipulate - Navigate: para navegar los nodos una vez se hace zoom.
- Encode: Separate and Order, para el treemap.

### Modismo 1.1: Mini Bar Chart.

#### Marcas
- Líneas.	

#### Canales
- Posición Y para ubicar las marcas que representan los atributos de valor.
- Posición X para separar los atributos categóricos.
- Largo, aplicado a las líneas dependiendo de la cantidad de casos.
- Color - Hue: para diferenciar las categorías

#### How:

- Encode: express
- Reduce: aggregate

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
- **GitHub** como administrador de código y control de versiones, así como repositorio principal de la vista.

## Prerrequisitos y Uso

- La vista requiere de un navegador de sexta generación, preferiblemente Google Chrome puesto que en este es donde se realizaron todas las pruebas.
- Se requiere de acceso a internet puesto que la vista se encuentra alojada en la siguiente dirección web [https://vladcuevas.github.io/](https://vladcuevas.github.io/)

### Uso
- Acceder a la dirección [https://vladcuevas.github.io/](https://vladcuevas.github.io/)
- Dar clic en el enlace [Tarea 5: Principales Poblaciones Afectadas por los Delitos Sexuales en Colombia](https://vladcuevas.github.io/homework5/)
- Interactuar con la vista seleccionando las formas de fuerza (force) y treemap.

- Interactuar con la vista, pasando el mouse por encima de la visualización.

- Interactuar con la vista, utilizando el scroll del mouse para hacer zoom.

- Interactuar con la vista, arrastrando los nodos.

- Interactuar con la vista, arrastrando la visualización para ver en más detalles.

## Autores
- **Autor(es) de los datos:** Datos Abiertos y La Policía de Colombia
	- El enlace a la página de los datos de datos abiertos es: [Datos Abiertos](https://www.datos.gov.co)
- **Autor de la visualización:** [Vladimir E. Cuevas S.](https://github.com/vladcuevas)
- **Autor de la fotografía y arte de esta página:** [Vladimir E. Cuevas S.](https://github.com/vladcuevas)
	- El enlace a la página del proyecto es: [https://vladcuevas.github.io/homework5/](https://vladcuevas.github.io/homework5/)

## Presentación

https://docs.google.com/presentation/d/1vl5DFxxOvTrD3lSg_flES2xL2m81PgYi0AGMXlOr5U4/edit?usp=sharing

## Vídeo

https://youtu.be/h0y_jwPGf4s

## Licencia
Este proyecto está bajo la licencia [MIT](https://github.com/vladcuevas/vladcuevas.github.io/blob/master/LICENSE).
