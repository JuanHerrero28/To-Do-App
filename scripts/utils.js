/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
  console.log("Llamada a validarTexto");
  console.log("Texto recibido:", texto);

  const campos = [
    {
      inputId: "inputNombre",
      errorId: "error-nombre",
      mensajeError: "Por favor, ingrese su nombre correctamente.",
    },
    {
      inputId: "inputApellido",
      errorId: "error-apellido",
      mensajeError: "Por favor, ingrese su apellido correctamente.",
    },
  ];

  let isValid = true;

  campos.forEach((campo) => {
    const elementoInput = document.getElementById(campo.inputId);
    const valorInput = texto || elementoInput.value.trim();
    const contieneSoloLetras = /^[a-zA-Z\s]+$/.test(valorInput);
    let mensajeError = document.getElementById(campo.errorId);

    if (valorInput === "" || !contieneSoloLetras) {
      elementoInput.style.borderColor = "red";
      if (!mensajeError) {
        mensajeError = document.createElement("div");
        mensajeError.id = campo.errorId;
        mensajeError.className = "error-message";
        elementoInput.parentNode.insertBefore(
          mensajeError,
          elementoInput.nextSibling
        );
      }
      mensajeError.innerHTML = `<i class="fa fa-times"></i> ${campo.mensajeError}`;
      mensajeError.style.color = "red";
      isValid = false;
    } else {
      elementoInput.style.borderColor = "";
      if (mensajeError) {
        mensajeError.parentNode.removeChild(mensajeError);
      }
    }
  });

  return isValid;
}

function normalizarTexto(texto) {
  // texto a minuscula
  const textoNormalizado = texto.toLowerCase();
  // elimino espacios adicionales
  const textoSinEspaciosAdicionales = textoNormalizado.trim();
  // elimino caracteres especiales
  const textoSinEspeciales = textoSinEspaciosAdicionales.replace(
    /[^a-z0-9\s]/g,
    ""
  );

  return textoSinEspeciales;
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
  console.log("llamada a verificar email");
  console.log("Email reicibido:", email);

  const expReg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  let esValido = expReg.test(email);

  const elementoInputEmail = document.getElementById("inputEmail");
  let mensajeErrorEmail = document.getElementById("error-email");

  if (mensajeErrorEmail) {
    mensajeErrorEmail.parentNode.removeChild(mensajeErrorEmail);
  }

  if (!esValido) {
    elementoInputEmail.style.borderColor = "red";
    mensajeErrorEmail = document.createElement("div");
    mensajeErrorEmail.id = "error-email";
    mensajeErrorEmail.className = "error-message";
    elementoInputEmail.parentNode.insertBefore(
      mensajeErrorEmail,
      elementoInputEmail.nextSibling
    );
    mensajeErrorEmail.innerHTML = `<i class="fa fa-times"></i> Por favor, ingrese un correo electrónico válido.`;
    mensajeErrorEmail.style.color = "red";
    esValido = false;
  } else {
    elementoInputEmail.style.borderColor = "";
    // Si el email es válido, elimina el mensaje de error
    if (mensajeErrorEmail) {
      mensajeErrorEmail.innerHTML = "";
    }
  }
  return esValido;
}

function normalizarEmail(email) {
  const emailNormalizado = email.toLowerCase().trim();
  return emailNormalizado;
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
  console.log("llamada a validar contrasenia");
  console.log("Contraseña recibida: ", contrasenia);

  const campos = [
    {
      inputId: "inputPassword",
      errorId: "error-contrasenia",
      mensajeError: "Por favor, ingrese su contraseña correctamente.",
    },
    {
      inputId: "inputPasswordRepetida",
      errorId: "error-contraseniaRepetida",
      mensajeError: "Por favor, ingrese su contraseña correctamente.",
    },
  ];

  let isValid = true;

  campos.forEach((campo) => {
    const elementoInput = document.getElementById(campo.inputId);
    const valorInput = contrasenia || elementoInput.value.trim();
    const longitudMinima = 8;
    const contieneNumero = /\d/.test(contrasenia);
    const contieneCaracterEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(contrasenia);
    let mensajeError = document.getElementById(campo.errorId);

    if (valorInput === "" || contrasenia.length < longitudMinima || !contieneNumero || !contieneCaracterEspecial) {
      elementoInput.style.borderColor = "red";
      if (!mensajeError) {
        mensajeError = document.createElement("div");
        mensajeError.id = campo.errorId;
        mensajeError.className = "error-message";
        elementoInput.parentNode.insertBefore(
          mensajeError,
          elementoInput.nextSibling
        );
      }
      mensajeError.innerHTML = `<i class="fa fa-times"></i> ${campo.mensajeError}`;
      mensajeError.style.color = "red";
      isValid = false;
    } else {
      elementoInput.style.borderColor = "";
      if (mensajeError) {
        mensajeError.parentNode.removeChild(mensajeError);
      }
    }
  });

  return isValid;
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
  return contrasenia_1 === contrasenia_2;
}
