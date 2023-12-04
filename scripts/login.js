


window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const email = document.getElementById("inputEmail");
  const password = document.getElementById("inputPassword");
  const form = document.forms[0];
  const url = "https://todo-api.ctd.academy/v1";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    

    const payload = {
      email: email.value,
      password: password.value,
    };

    const settings = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(payload);
    realizarLogin(settings);
  });

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarLogin(settings) {
    fetch(`${url}/users/login`, settings)
      .then((response) => {
        console.log(response);
        if (response.ok != true) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingresa correctamente la contraseña !',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("Promesa realizada");

        if (data.jwt) {
          localStorage.setItem("jwt", JSON.stringify(data.jwt));
          location.replace("/mis-tareas.html");
        }
      })
      .catch((error) => {
        console.log("Promesa Rechazada");
        console.log(error);
        
      });
  }
});
