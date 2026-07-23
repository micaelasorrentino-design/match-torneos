const estadoInscripciones =
  document.getElementById("estado-inscripciones");

/* ==========================
   CONEXIÓN CON GOOGLE SHEETS
========================== */

const URL_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbxhW-6_RVdPilf9btmW3E_xPodvRbAH-F7CRf7CyT5Vp0sYS3eb2Ge8_bAnchIFZaRktw/exec";


/* ==========================
   DATOS INICIALES
========================== */

const torneo = {
  inscriptas: 0,
  cuposTotales: 32
};


/* ==========================
   ELEMENTOS DEL TORNEO
========================== */

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


/* ==========================
   ELEMENTOS DEL FORMULARIO
========================== */

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

const bloquePosicion =
  document.getElementById("bloque-posicion");

const modalidades =
  document.querySelectorAll(
    'input[name="modalidad"]'
  );

const opcionesPosicion =
  document.querySelectorAll(
    'input[name="posicion"]'
  );

const nombrePareja =
  document.getElementById("nombre-pareja");

const apellidoPareja =
  document.getElementById("apellido-pareja");

const whatsappPareja =
  document.getElementById("whatsapp-pareja");

const botonEnviar =
  document.querySelector(".boton-enviar");
  
  const instruccionComprobante =
  document.getElementById(
    "instruccion-comprobante"
  );

const botonComprobanteWhatsapp =
  document.getElementById(
    "boton-comprobante-whatsapp"
  );


/* ==========================
   MOSTRAR CUPOS
========================== */

function actualizarTorneo() {
  const disponibles = Math.max(
    torneo.cuposTotales - torneo.inscriptas,
    0
  );

  const porcentaje =
    torneo.cuposTotales > 0
      ? (torneo.inscriptas / torneo.cuposTotales) * 100
      : 0;

  inscriptas.textContent =
    torneo.inscriptas;

  cuposTotales.textContent =
    torneo.cuposTotales;

  progreso.style.width =
    `${Math.min(porcentaje, 100)}%`;
if (disponibles <= 0) {

  lugaresRestantes.textContent =
    "Torneo completo";

  botonInscripcion.textContent =
    "Torneo completo";

  botonInscripcion.disabled = true;

  estadoInscripciones.textContent =
    "Inscripciones cerradas";

} else {

  botonInscripcion.textContent =
    "Inscribirme";

  botonInscripcion.disabled = false;

  estadoInscripciones.textContent =
    "Inscripciones abiertas";
}


/* ==========================
   CONSULTAR GOOGLE SHEETS
========================== */

async function consultarCupos() {
  lugaresRestantes.textContent =
    "Cargando cupos...";

  botonInscripcion.disabled = true;

  try {
    const respuesta = await fetch(
      `${URL_APPS_SCRIPT}?t=${Date.now()}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (!respuesta.ok) {
      throw new Error(
        "No se pudo consultar la disponibilidad."
      );
    }

    const resultado =
      await respuesta.json();

    if (!resultado.correcto) {
      throw new Error(
        resultado.mensaje ||
        "Google Sheets no devolvió los cupos."
      );
    }

    torneo.inscriptas =
      Number(resultado.ocupados) || 0;

    torneo.cuposTotales =
      Number(resultado.cuposTotales) || 32;

    actualizarTorneo();

  } catch (error) {
    console.error(
      "Error al consultar los cupos:",
      error
    );

    lugaresRestantes.textContent =
      "No pudimos consultar los cupos";

    botonInscripcion.textContent =
      "Reintentar";

    botonInscripcion.disabled = false;
  }
}


/* ==========================
   ABRIR Y CERRAR FORMULARIO
========================== */

function abrirModal() {
  /*
    Si falló la consulta inicial, el botón sirve
    para volver a intentar cargar los cupos.
  */

  if (
    lugaresRestantes.textContent ===
    "No pudimos consultar los cupos"
  ) {
    consultarCupos();
    return;
  }

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


/* ==========================
   CAMPOS SEGÚN MODALIDAD
========================== */

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

  bloquePosicion.classList.toggle(
    "oculto",
    tienePareja
  );

  nombrePareja.required =
    tienePareja;

  apellidoPareja.required =
    tienePareja;

  whatsappPareja.required =
    tienePareja;

  opcionesPosicion.forEach((opcion) => {
    opcion.required = !tienePareja;

    if (tienePareja) {
      opcion.checked = false;
    }
  });

  if (!tienePareja) {
    nombrePareja.value = "";
    apellidoPareja.value = "";
    whatsappPareja.value = "";
  }
}


/* ==========================
   BLOQUEAR BOTÓN DE ENVÍO
========================== */

function cambiarEstadoEnvio(enviando) {
  botonEnviar.disabled = enviando;

  botonEnviar.textContent =
    enviando
      ? "Registrando inscripción..."
      : "Reservar mi lugar";
}


/* ==========================
   ENVIAR A GOOGLE SHEETS
========================== */

async function enviarFormulario(evento) {
  evento.preventDefault();

  if (!formulario.checkValidity()) {
    formulario.reportValidity();
    return;
  }

  const datos =
    new FormData(formulario);

  const inscripcion = {
    modalidad:
      datos.get("modalidad"),

    posicion:
      datos.get("posicion") || "",

    nombre:
      datos.get("nombre"),

    apellido:
      datos.get("apellido"),

    whatsapp:
      datos.get("whatsapp"),

    email:
      datos.get("email") || "",

    categoria:
      datos.get("categoria"),

    nombrePareja:
      datos.get("nombrePareja") || "",

    apellidoPareja:
      datos.get("apellidoPareja") || "",

    whatsappPareja:
      datos.get("whatsappPareja") || "",

    observaciones:
      datos.get("observaciones") || "",

    reglamentoAceptado:
      datos.get("reglamento") === "on"
  };

  cambiarEstadoEnvio(true);

  try {
    /*
      No agregamos Content-Type application/json
      para evitar problemas de permisos entre
      GitHub Pages y Google Apps Script.
    */

    const respuesta = await fetch(
      URL_APPS_SCRIPT,
      {
        method: "POST",
        body: JSON.stringify(inscripcion)
      }
    );

    if (!respuesta.ok) {
      throw new Error(
        "Google no pudo registrar la inscripción."
      );
    }

    const resultado =
      await respuesta.json();

    if (!resultado.correcto) {
      if (resultado.sinCupos) {
        await consultarCupos();
      }

      throw new Error(
        resultado.mensaje ||
        "No se pudo completar la inscripción."
      );
    }

    /*
      Actualizamos el contador con los datos
      confirmados por Google Sheets.
    */

    torneo.inscriptas =
      Number(resultado.ocupados) || 0;

    torneo.cuposTotales =
      Number(resultado.cuposTotales) || 32;

    actualizarTorneo();


/*
  Preparamos el mensaje de pago
  y el enlace de WhatsApp.
*/

let mensajeWhatsapp = "";

if (
  inscripcion.modalidad === "Con pareja"
) {
  instruccionComprobante.textContent =
    "Para confirmar la inscripción, deben enviarnos ambos comprobantes por WhatsApp.";

  mensajeWhatsapp =
    `Hola MATCH 👋

Soy ${inscripcion.nombre} ${inscripcion.apellido}.

Me inscribí junto a ${inscripcion.nombrePareja} ${inscripcion.apellidoPareja}.

Te envío los dos comprobantes de transferencia para confirmar nuestra inscripción.`;

} else {
  instruccionComprobante.textContent =
    "Para confirmar tu inscripción, envianos el comprobante por WhatsApp.";

  mensajeWhatsapp =
    `Hola MATCH 👋

Soy ${inscripcion.nombre} ${inscripcion.apellido}.

Me inscribí en la modalidad Busco pareja.

Te envío el comprobante de transferencia para confirmar mi inscripción.`;
}

botonComprobanteWhatsapp.href =
  "https://wa.me/5491130091615?text=" +
  encodeURIComponent(mensajeWhatsapp);


/*
  Mostramos el mensaje de confirmación.
*/

formulario.classList.add("oculto");
mensajeConfirmacion.classList.remove("oculto");

modal.scrollTo({
  top: 0,
  behavior: "smooth"
});


    /*
      Limpiamos el formulario.
    */

    formulario.reset();

    const modalidadConPareja =
      document.querySelector(
        'input[name="modalidad"][value="Con pareja"]'
      );

    if (modalidadConPareja) {
      modalidadConPareja.checked = true;
    }

    const reglamento =
      document.querySelector(".reglamento");

    if (reglamento) {
      reglamento.open = false;
    }

    actualizarModalidad();

  } catch (error) {
    console.error(
      "Error al registrar la inscripción:",
      error
    );

    alert(
      error.message ||
      "No pudimos registrar la inscripción. Probá nuevamente."
    );

  } finally {
    cambiarEstadoEnvio(false);
  }
}


/* ==========================
   EVENTOS
========================== */

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


/* ==========================
   INICIO
========================== */

actualizarModalidad();
consultarCupos();