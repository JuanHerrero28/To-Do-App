// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
if (!localStorage.jwt) {
  location.replace("/index.html");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const token = JSON.parse(localStorage.jwt);
  const url = "https://todo-api.ctd.academy/v1/users/getMe";
  const urlTasks = "https://todo-api.ctd.academy/v1/tasks";
  const btnCerrarSesion = document.getElementById("closeApp");
  const formCrearTarea = document.querySelector(".nueva-tarea");
  const inputNuevaTarea = document.getElementById("nuevaTarea");

  obtenerNombreUsuario();
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener("click", function () {
    Swal.fire({
        title: '¿Desea cerrar sesión?',
        text: "Esta acción no se puede revertir.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            location.replace("./index.html");
        }
    });
});


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    fetch(`${url}`, settings)
      .then((response) => {
        if (!response.ok) {
          alert("los datos ingresado son incorrectos");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.firstName);
        const nombreUsuario = data.firstName;
        const userParagraph = document.querySelector(".user-info p");
        if (userParagraph) {
          userParagraph.innerText = nombreUsuario;
        }
      })
      .catch((error) => {
        console.error("Error al oñtener el nombre del usuario: ", error);
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    fetch(`${urlTasks}`, settings)
      .then((response) => {
        if (!response.ok) {
          alert("los datos ingresado son incorrectos");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        renderizarTareas(data);
        botonesCambioEstado();
        botonBorrarTarea();
      })
      .catch((error) => {
        console.error("Error al oñtener el nombre del usuario: ", error);
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener("submit", function (event) {
    event.preventDefault();

    const descripcion = inputNuevaTarea.value;

    if (!descripcion) {
      alert("La descripción no puede estar vacía");
      return;
    }

    const payload = {
      description: descripcion,
      completed: false,
    };

    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch(`${urlTasks}`, settings)
      .then((response) => response.json())
      .then((tarea) => {
        console.log(tarea);
        consultarTareas();
      })
      .catch((error) => {
        console.error("Error al obtener el nombre del usuario: ", error);
      });

    formCrearTarea.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    // Declarar las listas de tareas pendientes y finalizadas
    const tareaPendiente = document.querySelector(".tareas-pendientes");
    const tareaFinalizada = document.querySelector(".tareas-terminadas");
    tareaPendiente.innerHTML = "";
    tareaFinalizada.innerHTML = "";

    const cantidadFinalizadas = document.getElementById("cantidad-finalizadas");
    let contador = 0;
    cantidadFinalizadas.innerText = contador;

    listado.forEach((tarea) => {
      let fecha = new Date(tarea.createdAt);

      if (tarea.completed) {
        contador++;
        //lo mandamos al listado de tareas completas
        tareaFinalizada.innerHTML += `
          <li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
                        `;
      } else {
        //lo mandamos al listado de tareas sin terminar
        tareaPendiente.innerHTML += `
          <li class="tarea">
            <button class="change" id="${
              tarea.id
            }"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
          </li>
                        `;
      }
      // actualizamos el contador en la pantalla
      cantidadFinalizadas.innerText = contador;
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    const btnCambioDeEstado = document.querySelectorAll(".change");

    btnCambioDeEstado.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        console.log("cambio de estado de la tarea ");
        console.log(event);

        const id = event.target.id;
        const urlTasksId = `${urlTasks}/${id}`;
        const payload = {};

        if (event.target.classList.contains("incompleta")) {
          payload.completed = false;
        } else {
          payload.completed = true;
        }
        const settings = {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        };
        fetch(urlTasksId, settings)
          .then((response) => {
            console.log(response.status);
            consultarTareas();
          })
          .then((data) => {
            console.log(data);
            console.log("Promesa Realizada");
          })
          .catch((error) => {
            console.error("Error al cambiar el estado de la tarea: ", error);
          });
      });
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
    const btnBorrarTarea = document.querySelectorAll(".borrar");

    btnBorrarTarea.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        const id = event.target.id;
        const urlTasksId = `${urlTasks}/${id}`;

        const settings = {
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
        fetch(urlTasksId, settings)
          .then((response) => {
            console.log("Borrando Tarea");
            console.log(response.status);
            consultarTareas();
          })
          .then((data) => {
            console.log(data);
            console.log("Promesa Realizada");
          })
          .catch((error) => {
            console.error("Error al cambiar el estado de la tarea: ", error);
          });
      });
    });
  }
});
