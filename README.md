![version](https://img.shields.io/badge/Version-04.2022-green)
![dh](https://img.shields.io/badge/Materia-Frontend%20II-blue)

# ToDo App
Proyecto que reune todos los conceptos y herramientas adquiridas en la materia Frontend II.

Se trata de una clásica pero efectiva aplicación de tareas, en la cual podemos anotar distintas actividades que nos interese realizar. Como suele pasar, estas tareas están pendientes hasta que en algún momento se cumplen. 🙄 En fin, dejemos el tema de concluir pendientes de lado.

Volviendo a lo técnico, tenemos un frontend que se conecta con una API preparada específicamente para oficiar de nuestro backend. De esta manera tendremos la persistencia de los datos en una DB propia.

Este proyecto es la oportunidad de repasar todo lo aprendido y poner en práctica las herramientas que tenemos gracias a Javascript. 

## API Docs
Link con la documentación de los endpoints de la API y su funcionamiento:
👉 https://ctd-todo-api.herokuapp.com/
    
## Descripción

La To Do App es una aplicación de gestión de tareas que permite a los usuarios crear, ver, marcar como completadas y eliminar tareas. La aplicación consta de tres páginas principales:

1. Página de Inicio de Sesión (index.html)
Esta página permite a los usuarios iniciar sesión en la aplicación.
Los usuarios pueden ingresar su correo electrónico y contraseña para acceder a sus tareas.
2. Página de Registro (signup.html)
Aquí, los nuevos usuarios pueden registrarse para acceder a la aplicación.
Se solicita al usuario su nombre, apellido, correo electrónico y contraseña para crear una cuenta.
3. Página Principal de Tareas (mis-tareas.html)
Esta página muestra la lista de tareas del usuario una vez que ha iniciado sesión.
Los usuarios pueden ver sus tareas pendientes y tareas completadas.
Pueden crear nuevas tareas, marcarlas como completadas y eliminarlas.

## CRUD de Tareas
 La funcionalidad de las tareas en la aplicación sigue la lógica del CRUD (Crear, Leer, Actualizar, Eliminar):

## Crear Tareas

En la página principal de tareas (mis-tareas.html), los usuarios pueden crear nuevas tareas ingresando el nombre de la tarea en el campo correspondiente y haciendo clic en el botón "Crear tarea".
## Leer Tareas
La lista de tareas se muestra en dos secciones: "Tareas Pendientes" y "Tareas Finalizadas".
Las tareas pendientes se muestran con la opción de marcarlas como completadas.
Las tareas completadas se muestran con la opción de volver a marcarlas como pendientes o eliminarlas.

## Actualizar Tareas

Los usuarios pueden cambiar el estado de una tarea de "pendiente" a "completada" y viceversa haciendo clic en el ícono correspondiente.

## Eliminar Tareas
Existe la opción de eliminar una tarea de la lista haciendo clic en el ícono de eliminación asociado a cada tarea.

## Tecnologías Utilizadas
La aplicación se ha desarrollado utilizando HTML, CSS y JavaScript para el frontend. La interacción con la API se realiza mediante fetch para consumir los endpoints proporcionados por todo-api.ctd.academy.



