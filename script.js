/* ==========================================
   MATCH BRAGADO
   SCRIPT PRINCIPAL
========================================== */


/* ==========================================
   CONEXIÓN CON GOOGLE SHEETS
========================================== */

const URL_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbyrujCB2TBLurC71BlpPTAm6OiWIVMexOiJvkmJTzCpetq7W4hyWAShBxaw255absjfmQ/exec";


/* ==========================================
   TORNEO SELECCIONADO
========================================== */

let torneoSeleccionado = "";


/* ==========================================
   ELEMENTOS DE LOS TORNEOS
========================================== */

const tarjetasTorneos =
  document.querySelectorAll(".tarjeta-torneo");

const tarjetasTorneosActivos =
  document.querySelectorAll(
    '.tarjeta-torneo[data-activo="true"]'
  );

const botonesInscripcion =
  document.querySelectorAll(
    '.tarjeta-torneo[data-activo="true"] .boton-inscripcion-torneo'
  );


/* ==========================================
   ELEMENTOS DEL FORMULARIO
========================================== */

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

const torneoSeleccionadoInput =
  document.getElementById("torneo-seleccionado");

const tituloFormulario =
  document.getElementById("titulo-formulario");

const torneoSeleccionadoTexto =
  document.getElementById(
    "torneo-seleccionado-texto"
  );

const botonEnviar =
  document.querySelector(".boton-enviar");

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


/* ==========================================
   MOSTRAR CUPOS DE UN TORNEO
========================================== */

function actualizarTarjetaTorneo(
  codigo,
  ocupados,
  cuposTotales
) {
  const elementoInscriptas =
    document.getElementById(
      `inscriptas-${codigo}`
    );

  const elementoCupos =
    document.getElementById(
      `cupos-${codigo}`
    );

  const elementoLugares =
    document.getElementById(
      `lugares-${codigo}`
    );

  const elementoProgreso =
    document.getElementById(
      `progreso-${codigo}`
    );

  const elementoEstado =
    document.getElementById(
      `estado-${codigo}`
    );

  const boton =
    document.querySelector(
      `.boton-inscripcion-torneo[data-torneo="${codigo}"]`
    );

  if (
    !elementoInscriptas ||
    !elementoCupos ||
    !elementoLugares ||
    !elementoProgreso ||
    !elementoEstado ||
    !boton
  ) {
    return;
  }

  ocupados =
    Number(ocupados) || 0;

  cuposTotales =
    Number(cuposTotales) || 32;

  const disponibles =
    Math.max(
      cuposTotales - ocupados,
      0
    );

  const porcentaje =
    cuposTotales > 0
      ? (ocupados / cuposTotales) * 100
      : 0;

  elementoInscriptas.textContent =
    ocupados;

  elementoCupos.textContent =
    cuposTotales;

  elementoProgreso.style.width =
    `${Math.min(porcentaje, 100)}%`;

  if (disponibles > 1) {
    elementoLugares.textContent =
      `Quedan ${disponibles} lugares`;
  } else if (disponibles === 1) {
    elementoLugares.textContent =
      "Queda un solo lugar";
  } else {
    elementoLugares.textContent =
      "Torneo completo";
  }

  if (disponibles <= 0) {
    elementoEstado.textContent =
      "Inscripciones cerradas";

    boton.textContent =
      "Torneo completo";

    boton.disabled = true;
  } else {
    elementoEstado.textContent =
      "Inscripciones abiertas";

    boton.textContent =
      "Inscribirme";

    boton.disabled = false;
  }
}


/* ==========================================
   ESTADO DE CARGA
========================================== */

function mostrarCargandoTorneos() {
  tarjetasTorneosActivos.forEach(
    (tarjeta) => {

      const codigo =
        tarjeta.dataset.torneo;

      const lugares =
        document.getElementById(
          `lugares-${codigo}`
        );

      const boton =
        tarjeta.querySelector(
          ".boton-inscripcion-torneo"
        );

      if (lugares) {
        lugares.textContent =
          "Cargando disponibilidad...";
      }

      if (boton) {
        boton.disabled = true;
      }

    }
  );
}


/* ==========================================
   CONSULTAR CUPOS EN GOOGLE SHEETS
========================================== */

async function consultarCupos() {
  mostrarCargandoTorneos();

  try {
    const respuesta =
      await fetch(
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

    if (resultado.torneos) {
      tarjetasTorneosActivos.forEach(
        (tarjeta) => {

          const codigo =
            tarjeta.dataset.torneo;

          const datosTorneo =
            resultado.torneos[codigo];

          if (datosTorneo) {
            actualizarTarjetaTorneo(
              codigo,
              datosTorneo.ocupados,
              datosTorneo.cuposTotales
            );
          } else {
            actualizarTarjetaTorneo(
              codigo,
              0,
              32
            );
          }

        }
      );
    } else {
      const primeraTarjetaActiva =
        tarjetasTorneosActivos[0];

      if (primeraTarjetaActiva) {
        const codigo =
          primeraTarjetaActiva.dataset.torneo;

        actualizarTarjetaTorneo(
          codigo,
          resultado.ocupados || 0,
          resultado.cuposTotales || 32
        );
      }
    }

  } catch (error) {
    console.error(
      "Error al consultar los cupos:",
      error
    );

    tarjetasTorneosActivos.forEach(
      (tarjeta) => {

        const codigo =
          tarjeta.dataset.torneo;

        const lugares =
          document.getElementById(
            `lugares-${codigo}`
          );

        const boton =
          tarjeta.querySelector(
            ".boton-inscripcion-torneo"
          );

        if (lugares) {
          lugares.textContent =
            "No pudimos consultar los cupos";
        }

        if (boton) {
          boton.textContent =
            "Reintentar";

          boton.disabled = false;
        }

      }
    );
  }
}


/* ==========================================
   ABRIR FORMULARIO
========================================== */

function abrirModal(codigo) {
  torneoSeleccionado =
    codigo;

  torneoSeleccionadoInput.value =
    codigo;

  const categoriaVisible =
    codigo
      .replace("VA", "va")
      .replace("MA", "ma");

  tituloFormulario.textContent =
    `Torneo Femenino ${categoriaVisible}`;

  torneoSeleccionadoTexto.textContent =
    "MATCH | Bragado";

  formulario.classList.remove(
    "oculto"
  );

  mensajeConfirmacion.classList.add(
    "oculto"
  );

  modal.classList.add(
    "abierto"
  );

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-abierto"
  );
}


/* ==========================================
   CERRAR FORMULARIO
========================================== */

function cerrarFormulario() {
  modal.classList.remove(
    "abierto"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-abierto"
  );
}


/* ==========================================
   CAMPOS SEGÚN MODALIDAD
========================================== */

function actualizarModalidad() {
  const modalidadSeleccionada =
    document.querySelector(
      'input[name="modalidad"]:checked'
    )?.value;

  const tienePareja =
    modalidadSeleccionada ===
    "Con pareja";

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

  opcionesPosicion.forEach(
    (opcion) => {

      opcion.required =
        !tienePareja;

      if (tienePareja) {
        opcion.checked = false;
      }

    }
  );

  if (!tienePareja) {
    nombrePareja.value = "";
    apellidoPareja.value = "";
    whatsappPareja.value = "";
  }
}


/* ==========================================
   BLOQUEAR BOTÓN DE ENVÍO
========================================== */

function cambiarEstadoEnvio(enviando) {
  botonEnviar.disabled =
    enviando;

  botonEnviar.textContent =
    enviando
      ? "Registrando inscripción..."
      : "Reservar mi lugar";
}


/* ==========================================
   ENVIAR INSCRIPCIÓN
========================================== */

async function enviarFormulario(evento) {
  evento.preventDefault();

  if (!formulario.checkValidity()) {
    formulario.reportValidity();
    return;
  }

  if (!torneoSeleccionado) {
    alert(
      "No pudimos identificar el torneo seleccionado."
    );

    return;
  }

  const datos =
    new FormData(formulario);

  const inscripcion = {
    torneo:
      torneoSeleccionado,

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
    const respuesta =
      await fetch(
        URL_APPS_SCRIPT,
        {
          method: "POST",
          body: JSON.stringify(
            inscripcion
          )
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
      await consultarCupos();

      throw new Error(
        resultado.mensaje ||
        "No se pudo completar la inscripción."
      );
    }

    if (
      resultado.ocupados !== undefined
    ) {
      actualizarTarjetaTorneo(
        torneoSeleccionado,
        resultado.ocupados,
        resultado.cuposTotales || 32
      );
    } else {
      await consultarCupos();
    }


    /* ======================================
       MENSAJE DE WHATSAPP
    ====================================== */

    let mensajeWhatsapp = "";

    if (
      inscripcion.modalidad ===
      "Con pareja"
    ) {
      mensajeWhatsapp =
`Hola MATCH 👋

Soy ${inscripcion.nombre} ${inscripcion.apellido}.

Me inscribí al torneo ${torneoSeleccionado} junto a ${inscripcion.nombrePareja} ${inscripcion.apellidoPareja}.

Te envío los dos comprobantes de transferencia para confirmar nuestra inscripción.`;
    } else {
      mensajeWhatsapp =
`Hola MATCH 👋

Soy ${inscripcion.nombre} ${inscripcion.apellido}.

Me inscribí al torneo ${torneoSeleccionado} en la modalidad "Busco pareja".

Te envío el comprobante de transferencia para confirmar mi inscripción.`;
    }

    const botonWhatsapp =
  document.getElementById(
    "boton-comprobante-whatsapp"
  );

if (botonWhatsapp) {

  botonWhatsapp.href =
    "https://wa.me/5491130091615?text=" +
    encodeURIComponent(mensajeWhatsapp);

}

    /* ======================================
       MOSTRAR CONFIRMACIÓN
    ====================================== */

    formulario.classList.add(
      "oculto"
    );

    mensajeConfirmacion.classList.remove(
      "oculto"
    );

    modal.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    const codigoActual =
      torneoSeleccionado;

    formulario.reset();

    torneoSeleccionadoInput.value =
      codigoActual;

    const modalidadConPareja =
      document.querySelector(
        'input[name="modalidad"][value="Con pareja"]'
      );

    if (modalidadConPareja) {
      modalidadConPareja.checked =
        true;
    }

    const reglamento =
      document.querySelector(
        ".reglamento"
      );

    if (reglamento) {
      reglamento.open =
        false;
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


/* ==========================================
   BOTONES DE INSCRIPCIÓN
========================================== */

botonesInscripcion.forEach(
  (boton) => {

    boton.addEventListener(
      "click",
      () => {

        if (
          boton.textContent.trim() ===
          "Reintentar"
        ) {
          consultarCupos();
          return;
        }

        const codigo =
          boton.dataset.torneo;

        abrirModal(codigo);
      }
    );

  }
);


/* ==========================================
   EVENTOS DEL FORMULARIO
========================================== */

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

modalidades.forEach(
  (opcion) => {

    opcion.addEventListener(
      "change",
      actualizarModalidad
    );

  }
);

document
  .querySelectorAll(
    "[data-cerrar-modal]"
  )
  .forEach(
    (elemento) => {

      elemento.addEventListener(
        "click",
        cerrarFormulario
      );

    }
  );

document.addEventListener(
  "keydown",
  (evento) => {

    if (
      evento.key === "Escape" &&
      modal.classList.contains(
        "abierto"
      )
    ) {
      cerrarFormulario();
    }

  }
);


/* ==========================================
   INICIO
========================================== */

actualizarModalidad();
consultarCupos();