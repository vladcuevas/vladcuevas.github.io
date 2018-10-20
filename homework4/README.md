# **Delitos Sexuales en Colombia desde 2010 a 2018**

![alt text](https://github.com/vladcuevas/vladcuevas.github.io/raw/master/homework4/img/VDXL8269.jpg)

- **Por**: Vladimir E. Cuevas S.
- **Curso**: Visual Analytics
- **Fecha**: Oct/19/2018
- **Licencia**: MIT

## Introducción e Insights

Gracias a la visualización me di cuenta de que:
1.	Junio y diciembre son los meses que menos casos de delitos sexuales a través del tiempo.
2.	En enero siempre empiezan los casos con más fuerza, muchas veces, entre un 50% y un 75% más que en diciembre.
3.	Desde el 2015 es cuándo empieza a haber una tendencia de crecimiento en cuanto la cantidad de casos.
4.	Mayo del 2018 es el mes que más casos tiene en toda la población de los datos.

## Datos del Proyecto – What?
Los datos que se usaron para la visualización son de un dataset del tipo tabla (tables) - temporal, que contiene las siguientes variables (attributes):

|Variable |Tipo|
|---------|----|
**Fecha:**|Temporales Cuantitativo, Secuencial.
**Cantidad:**|Cuantitativo, secuencial para el total de casos por día.

### Datos Derivados: 
	- Fecha acunada por año: Temporal, secuencial.  
	- Fecha acunada por mes: Temporal, cíclico.  
	- Fecha acunada por semana: Temporal, cíclico.  
	- Cantidad: Cuantitativo, secuencial para el total de casos por año y mes.  

### **Fuente de los datos**

El dataset utilizado para esta visualización fue descargado del sitio de datos abiertos de Colombia:

- [Datos Abiertos](https://www.datos.gov.co)

## Objetivos del Proyecto - Why?
- **Tarea Principal:** 
	- Why: Summarize, Distribution de los casos de delitos sexuales en Colombia a través del tiempo de manera cíclica, mes a mes, día a día..

- **Tareas Secundarias:**

	- Why: Compare Features.
	- Why: Identify Extreme Values and Identify Trends.
	- Why: Summarize and show patterns.

## Marcas y Canales – How?

### Modismo 1: Spiral Heatmap.

#### Marcas
	- Líneas.

#### Canales

	- Posición en X para representar la línea de tiempo sobre slider de selección.
	- Posición apoyada con el radio para el espiral o bobina.
	- Tilt para agregar ángulo a las líneas arqueadas y poder organizarlas sobre el modismo.
	- Curvature para poder arquear las líneas. Las líneas representan meses.
	- Color: Saturación de rojos interpolados para representar la cantidad de casos de 
	delitos sexuales, aplicado sobre las líneas arqueadas.
		- Dominio de color va desde el mes con menos casos hasta el mes con más casos.
		- El color saturado, representar el atributo de cantidad de casos por mes.

#### How:
	- Separate, order and align.
		Separate months, order by month, align them in an spiral view like, with a map of curvature type.
	- Express for the saturation.
	- Manipulate mediante Select para poder ejecutar el llamado del modismo 1.1.

### Modismo 1.1: Calendar View.

#### Marcas

	- Punto cuadrado

#### Canales

	- Color: Saturación de rojos interpolados para representar la cantidad de casos de delitos sexuales.
		- Dominio de color que va desde el día con menos casos hasta el día con más casos.
		- El color saturado, representar el atributo de cantidad de casos por día.

#### How:
	- Encode: Separate, order and align para separar las semanas y los días.
	- Express: para representar el color en los puntos tipo cuadro de los días.
	- Facet: de yuxtaposición.

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
- Dar clic en el enlace [Delitos Sexuales en Colombia desde 2010 a 2018](https://vladcuevas.github.io/homework4/)
- Interactuar con la vista utilizando el slidebar.

- Interactuar con la vista, pasando el mouse por encima de la visualización.

## Autores
- **Autor(es) de los datos:** Datos Abiertos y La Policia de Colombia
	- El enlace a la página de los datos de datos abiertos es: [Datos Abiertos](https://www.datos.gov.co)
- **Autor de la visualización:** [Vladimir E. Cuevas S.](https://github.com/vladcuevas)
- **Autor de la fotografía y arte de esta página:** [Vladimir E. Cuevas S.](https://github.com/vladcuevas)
	- El enlace a la página del proyecto es: [https://vladcuevas.github.io/homework4/](https://vladcuevas.github.io/homework4/)

## Screenshot

![alt text](https://github.com/vladcuevas/Visual-Analytics/raw/master/homework4/img/screenshot.gif)

## Presentación

https://docs.google.com/presentation/d/1tZa4DcxpSq5JME7zk8OdMgNd7syD_37MbKJ2xO3seb4/edit?usp=sharing

## Licencia
Este proyecto está bajo la licencia [MIT](https://github.com/vladcuevas/vladcuevas.github.io/blob/master/LICENSE).
