window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const nombre = document.getElementById("inputNombre");
  const apellido = document.getElementById("inputApellido");
  const email = document.getElementById("inputEmail");
  const password = document.getElementById("inputPassword");
  const passwordRepetida = document.getElementById("inputPasswordRepetida");
  const form = document.forms[0];
  const urlUsers = "https://todo-api.ctd.academy/v1/users";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    

    // Compruebo si funciona la normalizacion. 
    const nombreOriginal = nombre.value;
    const apellidoOriginal = apellido.value;
  

    // Normaliza el valor de nombre y apellido
    const nombreNormalizado = normalizarTexto(nombreOriginal);
    const apellidoNormalizado = normalizarTexto(apellidoOriginal);
    

    // Imprime los valores antes y después de la normalización
    console.log("Valor original de nombre:", nombreOriginal);
    console.log("Valor normalizado de nombre:", nombreNormalizado);

    console.log("Valor original de apellido:", apellidoOriginal);
    console.log("Valor normalizado de apellido:", apellidoNormalizado);

    

    const esNombreValido = validarTexto(nombreNormalizado);
    const esApellidoValido = validarTexto(apellidoNormalizado);
    const esEmailValido = validarEmail(email.value)
    const passwordValida = validarContrasenia(password.value)
    const passwordRepetidaValida = validarContrasenia(passwordRepetida.value)

    if (esNombreValido && esApellidoValido && esEmailValido && passwordValida && passwordRepetidaValida) {
      const payload = {
        firstName: nombre.value,
        lastName: apellido.value,
        email: email.value,
        password: password.value,
      };

      const settings = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(payload);
      realizarRegister(settings);
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    fetch(`${urlUsers}`, settings)
      .then((response) => {
        
        console.log(response);
        if (!response.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("Promesa Realizada");

        if (data.jwt) {
          localStorage.setItem("jwt", JSON.stringify(data.jwt));
          location.replace("../mis-tareas.html");
        }
      })
      .catch((error) => {
        
        console.log("Promesa Rechazada");
        console.log(error);
      });
  }
});
