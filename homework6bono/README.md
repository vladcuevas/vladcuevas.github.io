# **D3 Tree del MOOC de Sexualidad de La Universidad de Los Andes**

- **Por**: Vladimir E. Cuevas S.
- **Curso**: Visual Analytics
- **Fecha**: Nov/06/2018
- **Licencia**: MIT

## Screenshot

![alt text](https://github.com/vladcuevas/vladcuevas.github.io/raw/master/homework6bono/img/screenshot.PNG)

## Introducción e Insights

Gracias a la visualización me di cuenta de que:

1.	Que los cursos que están siendo más atractivos para los usuarios del MOOC son los del inicio, lo que indica que no se está logrando llevar a la mayoría de la población al 75% de los ítems del MOOC.

## Datos del Proyecto – What?
Los datos que se usaron para la visualización son de un dataset del tipo tree (árbol), que contiene las siguientes variables (attributes) y están agrupados por name y children:

|Variable |Tipo|
|---------|----|
**Name:**|Categórico, ordinal.
**Size:**|Cuantitativo, secuencial.

#### Dataset Availability:  
Static.

### **Fuente de los datos**

Los datos fueron obtenidos como parte del conjunto de información de COURSERA, específicamente del curso “Sexualidad… mucho más que sexo”, publicado por la Universidad de los Andes en dicha plataforma y que distribuye sus contenidos de forma gratuita desde al año 2015.

## Objetivos del Proyecto - Why?
- **Tarea Principal:** 
	- Why: Identificar las actividades (ítems) más populares de las disponibles en el curso, a través de su calificación de tipo Like/Dislike (Identify - Extremes).

- **Tareas Secundarias:**

	- Why: Identify Extremes de los casos de delitos sexuales, Summarize Hierarchical Clustering, Explore features

## Marcas y Canales – How?

### Modismo 1: Collapsible Tree.

#### Marcas

- Puntos para los nodos.
- Líneas (connection marks) para los enlaces.

#### Canales
- Area (2D size): que se obtiene por el valor de la cantidad de casos aplicada con una escala SQRT sobre el radio de los puntos.
- Posición para establecer en donde se ubican los nodos hijos. Aka Translate.
- Hue - Color: para diferenciar los grupos o clusters de las diferentes categorías. Nodo de ítem exitoso contra nodo no exitoso, dos colores, negro y blanco.

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
- Dar clic en el enlace [Tarea 6 (Bono): Árbol de Items impartidos por el MOOC de Sexualidad  de La Universidad de Los Andes](https://vladcuevas.github.io/homework6bono/)
- Interactuar con la vista seleccionando las formas de fuerza (force) y treemap.

## Autores
- **Autor(es) de los datos:** Datos Abiertos y La Policía de Colombia
	- El enlace a la página de los datos de datos abiertos es: [Datos Abiertos](https://www.datos.gov.co)
- **Autor de la visualización:** [Vladimir E. Cuevas S.](https://github.com/vladcuevas)
- **Autor de la fotografía y arte de esta página:** [Vladimir E. Cuevas S.](https://github.com/vladcuevas)
	- El enlace a la página del proyecto es: [https://vladcuevas.github.io/homework5/](https://vladcuevas.github.io/homework5/)

## Vídeo

https://youtu.be/u9TibEc-qGY

## Licencia
Este proyecto está bajo la licencia [MIT](https://github.com/vladcuevas/vladcuevas.github.io/blob/master/LICENSE).
