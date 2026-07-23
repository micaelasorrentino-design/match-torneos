const torneo = {
  inscriptas: 18,
  cuposTotales: 32
};


/* ELEMENTOS DEL TORNEO */

const inscriptas =
  document.getElementById("inscriptas");

const cuposTotales =
  document.getElementById("cupos-totales");

const lugaresRestantes =
  document.getElementById("lugares-restantes");

const progreso =
  document.getElementById("progreso");

const botonInscripcion =
  document.getElementById("boton-inscripcion");


/* ELEMENTOS DEL MODAL */

const modal =
  document.getElementById("modal-inscripcion");

const cerrarModal =
  document.getElementById("cerrar-modal");

const cerrarConfirmacion =
  document.getElementById("cerrar-confirmacion");

const formulario =
  document.getElementById("formulario-inscripcion");

const mensajeConfirmacion =
  document.getElementById("mensaje-confirmacion");

const datosPareja =
  document.getElementById("datos-pareja");

const mensajeBuscoPareja =
  document.getElementById("mensaje-busco-pareja");

const modalidades =
  document.querySelectorAll('input[name="modalidad"]');

const nombrePareja =
  document.getElementById("nombre-pareja");

const apellidoPareja =
  document.getElementById("apellido-pareja");

const whatsappPareja =
  document.getElementById("whatsapp-pareja");


/* ACTUALIZAR CUPOS */

function actualizarTorneo() {
  const disponibles =
    torneo.cuposTotales - torneo.inscriptas;

  const porcentaje =
    (torneo.inscriptas / torneo.cuposTotales) * 100;

  inscriptas.textContent =
    torneo.inscriptas;

  cuposTotales.textContent =
    torneo.cuposTotales;

  progreso.style.width =
    `${Math.min(porcentaje, 100)}%`;

  if (disponibles > 1) {
    lugaresRestantes.textContent =
      `Quedan ${disponibles} lugares`;
  }

  if (disponibles === 1) {
    lugaresRestantes.textContent =
      "Queda un solo lugar";
  }

  if (disponibles <= 0) {
    lugaresRestantes.textContent =
      "Torneo completo";

    botonInscripcion.textContent =
      "Torneo completo";

    botonInscripcion.disabled = true;
  }
}


/* ABRIR Y CERRAR MODAL */

function abrirModal() {
  formulario.classList.remove("oculto");
  mensajeConfirmacion.classList.add("oculto");

  modal.classList.add("abierto");
  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-abierto");
}

function cerrarFormulario() {
  modal.classList.remove("abierto");
  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-abierto");
}


/* MOSTRAR CAMPOS SEGÚN MODALIDAD */

function actualizarModalidad() {
  const modalidadSeleccionada =
    document.querySelector(
      'input[name="modalidad"]:checked'
    )?.value;

  const tienePareja =
    modalidadSeleccionada === "Con pareja";

  datosPareja.classList.toggle(
    "oculto",
    !tienePareja
  );

  mensajeBuscoPareja.classList.toggle(
    "oculto",
    tienePareja
  );

  nombrePareja.required =
    tienePareja;

  apellidoPareja.required =
    tienePareja;

  whatsappPareja.required =
    tienePareja;

  if (!tienePareja) {
    nombrePareja.value = "";
    apellidoPareja.value = "";
    whatsappPareja.value = "";
  }
}


/* ENVÍO DEL FORMULARIO */

function enviarFormulario(evento) {
  evento.preventDefault();

  if (!formulario.checkValidity()) {
    formulario.reportValidity();
    return;
  }

  const datos =
    new FormData(formulario);

  const inscripcion = {
    modalidad: datos.get("modalidad"),
    posicion: datos.get("posicion"),
    nombre: datos.get("nombre"),
    apellido: datos.get("apellido"),
    whatsapp: datos.get("whatsapp"),
    email: datos.get("email"),
    categoria: datos.get("categoria"),
    nombrePareja: datos.get("nombrePareja"),
    apellidoPareja: datos.get("apellidoPareja"),
    whatsappPareja: datos.get("whatsappPareja"),
    observaciones: datos.get("observaciones")
  };

  /*
    Por ahora mostramos los datos en la consola.

    Después reemplazaremos esta parte para guardar
    automáticamente la inscripción en Google Sheets.
  */

  console.log("Nueva inscripción:", inscripcion);

  formulario.classList.add("oculto");
  mensajeConfirmacion.classList.remove("oculto");

  modal.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  formulario.reset();

  const modalidadConPareja =
    document.querySelector(
      'input[name="modalidad"][value="Con pareja"]'
    );

  modalidadConPareja.checked = true;

  actualizarModalidad();
}


/* EVENTOS */

botonInscripcion.addEventListener(
  "click",
  abrirModal
);

cerrarModal.addEventListener(
  "click",
  cerrarFormulario
);

cerrarConfirmacion.addEventListener(
  "click",
  cerrarFormulario
);

formulario.addEventListener(
  "submit",
  enviarFormulario
);

modalidades.forEach((opcion) => {
  opcion.addEventListener(
    "change",
    actualizarModalidad
  );
});

document
  .querySelectorAll("[data-cerrar-modal]")
  .forEach((elemento) => {
    elemento.addEventListener(
      "click",
      cerrarFormulario
    );
  });

document.addEventListener(
  "keydown",
  (evento) => {
    if (
      evento.key === "Escape" &&
      modal.classList.contains("abierto")
    ) {
      cerrarFormulario();
    }
  }
);


/* INICIO */

actualizarTorneo();
actualizarModalidad();
