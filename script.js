async function probarSupabase() {

    const { data, error } = await window.db
        .from("eventos")
        .select("*");

    console.log("EVENTOS:", data);
    console.log("ERROR:", error);

}

probarSupabase();

/* ==========================================
   MATCH BRAGADO
   SCRIPT PRINCIPAL
========================================== */


/* ==========================================
   CONEXIÓN CON GOOGLE SHEETS
========================================== */

const URL_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbxqKwR50LZzkeexptYniJncGfJLOUBwumD-K1TCgdrXTvom3z8d8NjN6ZyusCe86XL1OQ/exec";


/* ==========================================
   TORNEO SELECCIONADO
========================================== */

let torneoSeleccionado = "";


/* ==========================================
   ESTADO CANCHA ABIERTA
========================================== */

let estadoCanchaAbierta = {
  drive: 0,
  reves: 0,

  driveDisponibles: 6,
  revesDisponibles: 6,

  driveCompleto: false,
  revesCompleto: false
};


/* ==========================================
   ELEMENTOS DE LOS TORNEOS
========================================== */

const tarjetasTorneos =
  document.querySelectorAll(
    ".tarjeta-torneo"
  );

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
  document.getElementById(
    "modal-inscripcion"
  );

const cerrarModal =
  document.getElementById(
    "cerrar-modal"
  );

const cerrarConfirmacion =
  document.getElementById(
    "cerrar-confirmacion"
  );

const formulario =
  document.getElementById(
    "formulario-inscripcion"
  );

const mensajeConfirmacion =
  document.getElementById(
    "mensaje-confirmacion"
  );

const datosPareja =
  document.getElementById(
    "datos-pareja"
  );

const mensajeBuscoPareja =
  document.getElementById(
    "mensaje-busco-pareja"
  );

const bloquePosicion =
  document.getElementById(
    "bloque-posicion"
  );

const bloqueModalidad =
  document.getElementById(
    "bloque-modalidad"
  );

const torneoSeleccionadoInput =
  document.getElementById(
    "torneo-seleccionado"
  );

const tituloFormulario =
  document.getElementById(
    "titulo-formulario"
  );

const torneoSeleccionadoTexto =
  document.getElementById(
    "torneo-seleccionado-texto"
  );

const botonEnviar =
  document.querySelector(
    ".boton-enviar"
  );

const modalidades =
  document.querySelectorAll(
    'input[name="modalidad"]'
  );

const opcionesPosicion =
  document.querySelectorAll(
    'input[name="posicion"]'
  );

const opcionDrive =
  document.querySelector(
    'input[name="posicion"][value="Drive"]'
  );

const opcionReves =
  document.querySelector(
    'input[name="posicion"][value="Revés"]'
  );

const opcionIndistinto =
  document.querySelector(
    'input[name="posicion"][value="Indistinto"]'
  );

const nombrePareja =
  document.getElementById(
    "nombre-pareja"
  );

const apellidoPareja =
  document.getElementById(
    "apellido-pareja"
  );

const whatsappPareja =
  document.getElementById(
    "whatsapp-pareja"
  );

const botonWhatsapp =
  document.getElementById(
    "boton-comprobante-whatsapp"
  );

const instruccionComprobante =
  document.getElementById(
    "instruccion-comprobante"
  );


/* ==========================================
   DATOS VISUALES DE UNA TARJETA

   Esto permite cambiar nombre, categoría
   o sede desde HTML sin tocar este script.
========================================== */

function obtenerDatosVisualesTorneo(codigo) {

  const tarjeta =
    document.querySelector(
      `.tarjeta-torneo[data-torneo="${codigo}"]`
    );

  if (!tarjeta) {
    return {
      nombre: codigo,
      sede: ""
    };
  }


  const titulo =
    tarjeta.querySelector("h3");


  let sede = "";

  const items =
    tarjeta.querySelectorAll(
      ".info-item"
    );

  items.forEach((item) => {

    const etiqueta =
      item.querySelector("small");

    const valor =
      item.querySelector("strong");

    if (
      etiqueta &&
      valor &&
      etiqueta.textContent
        .trim()
        .toLowerCase() === "lugar"
    ) {

      sede =
        valor.textContent.trim();

    }

  });


  return {

    nombre:
      titulo
        ? titulo.textContent.trim()
        : codigo,

    sede:
      sede

  };
}


/* ==========================================
   CUPOS INICIALES DEL HTML
========================================== */

function obtenerCuposIniciales(codigo) {

  const elemento =
    document.getElementById(
      `cupos-${codigo}`
    );

  if (!elemento) {
    return 32;
  }

  return (
    Number(
      elemento.textContent.trim()
    ) || 32
  );
}


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
    Number(cuposTotales) ||
    obtenerCuposIniciales(codigo);


  const disponibles =
    Math.max(
      cuposTotales - ocupados,
      0
    );


  const porcentaje =
    cuposTotales > 0
      ? (
          ocupados /
          cuposTotales
        ) * 100
      : 0;


  elementoInscriptas.textContent =
    ocupados;

  elementoCupos.textContent =
    cuposTotales;

  elementoProgreso.style.width =
    `${Math.min(
      porcentaje,
      100
    )}%`;


  if (disponibles > 1) {

    elementoLugares.textContent =
      `Quedan ${disponibles} lugares`;

  } else if (disponibles === 1) {

    elementoLugares.textContent =
      "Queda un solo lugar";

  } else {

    elementoLugares.textContent =
      "Evento completo";

  }


  if (disponibles <= 0) {

    elementoEstado.textContent =
      "Inscripciones cerradas";

    boton.textContent =
      "Evento completo";

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
   GUARDAR ESTADO DRIVE / REVÉS
========================================== */

function actualizarEstadoCanchaAbierta(
  posiciones
) {

  if (!posiciones) {
    return;
  }


  estadoCanchaAbierta = {

    drive:
      Number(
        posiciones.drive
      ) || 0,

    reves:
      Number(
        posiciones.reves
      ) || 0,

    driveDisponibles:
      Number(
        posiciones.driveDisponibles
      ) || 0,

    revesDisponibles:
      Number(
        posiciones.revesDisponibles
      ) || 0,

    driveCompleto:
      Boolean(
        posiciones.driveCompleto
      ),

    revesCompleto:
      Boolean(
        posiciones.revesCompleto
      )

  };


  actualizarOpcionesPosicionCanchaAbierta();
}


/* ==========================================
   TEXTO DE LAS OPCIONES
========================================== */

function cambiarTextoOpcion(
  opcion,
  texto
) {

  if (!opcion) {
    return;
  }


  const label =
    opcion.closest("label");

  if (!label) {
    return;
  }


  const span =
    label.querySelector("span");

  if (span) {
    span.textContent = texto;
  }
}


/* ==========================================
   RESTAURAR DRIVE / REVÉS / INDISTINTO
========================================== */

function restaurarOpcionesPosicion() {

  if (opcionDrive) {

    opcionDrive.disabled = false;

    cambiarTextoOpcion(
      opcionDrive,
      "Drive"
    );

  }


  if (opcionReves) {

    opcionReves.disabled = false;

    cambiarTextoOpcion(
      opcionReves,
      "Revés"
    );

  }


  if (opcionIndistinto) {

    opcionIndistinto.disabled = false;

    cambiarTextoOpcion(
      opcionIndistinto,
      "Indistinto"
    );

  }
}


/* ==========================================
   BLOQUEAR POSICIONES COMPLETAS
========================================== */

function actualizarOpcionesPosicionCanchaAbierta() {

  restaurarOpcionesPosicion();


  /* DRIVE */

  if (
    opcionDrive &&
    estadoCanchaAbierta.driveCompleto
  ) {

    opcionDrive.disabled = true;

    opcionDrive.checked = false;

    cambiarTextoOpcion(
      opcionDrive,
      "Drive — completo"
    );

  }


  /* REVÉS */

  if (
    opcionReves &&
    estadoCanchaAbierta.revesCompleto
  ) {

    opcionReves.disabled = true;

    opcionReves.checked = false;

    cambiarTextoOpcion(
      opcionReves,
      "Revés — completo"
    );

  }


  /* INDISTINTO */

  if (
    opcionIndistinto &&
    estadoCanchaAbierta.driveCompleto &&
    estadoCanchaAbierta.revesCompleto
  ) {

    opcionIndistinto.disabled = true;

    opcionIndistinto.checked = false;

    cambiarTextoOpcion(
      opcionIndistinto,
      "Indistinto — completo"
    );

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
   CONSULTAR GOOGLE SHEETS
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
            resultado.torneos[
              codigo
            ];


          if (datosTorneo) {

            actualizarTarjetaTorneo(
              codigo,
              datosTorneo.ocupados,
              datosTorneo.cuposTotales
            );


            /*
              Si es la cancha abierta,
              guardamos también Drive / Revés.
            */

            if (
              codigo ===
                "CANCHA_ABIERTA" &&
              datosTorneo.posiciones
            ) {

              actualizarEstadoCanchaAbierta(
                datosTorneo.posiciones
              );

            }

          } else {

            /*
              Si no existe todavía en Sheets,
              conservamos los cupos que dice HTML.
            */

            actualizarTarjetaTorneo(
              codigo,
              0,
              obtenerCuposIniciales(
                codigo
              )
            );

          }

        }
      );

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


  const datosVisuales =
    obtenerDatosVisualesTorneo(
      codigo
    );


  /*
    El título y la sede salen directamente
    de la tarjeta del HTML.
  */

  tituloFormulario.textContent =
    datosVisuales.nombre;


  torneoSeleccionadoTexto.textContent =
    datosVisuales.sede ||
    "MATCH | Bragado";


  /* ======================================
     CANCHA ABIERTA
  ====================================== */

  if (
    codigo ===
    "CANCHA_ABIERTA"
  ) {

    /*
      No existe Con pareja / Busco pareja.
    */

    bloqueModalidad.classList.add(
      "oculto"
    );


    /*
      Mostramos posición.
    */

    bloquePosicion.classList.remove(
      "oculto"
    );


    /*
      No mostramos datos de pareja.
    */

    datosPareja.classList.add(
      "oculto"
    );

    mensajeBuscoPareja.classList.add(
      "oculto"
    );


    /*
      Posición obligatoria.
    */

    opcionesPosicion.forEach(
      (opcion) => {

        opcion.required = true;

      }
    );


    nombrePareja.required = false;
    apellidoPareja.required = false;
    whatsappPareja.required = false;


    /*
      Aplicamos Drive / Revés completos.
    */

    actualizarOpcionesPosicionCanchaAbierta();


  } else {

    /* ======================================
       TORNEO NORMAL
    ====================================== */

    bloqueModalidad.classList.remove(
      "oculto"
    );


    /*
      Restablecemos las posiciones,
      porque quizá antes abrió Cancha Abierta.
    */

    restaurarOpcionesPosicion();


    actualizarModalidad();

  }


  /* ======================================
     ABRIR MODAL
  ====================================== */

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

  /*
    Esta función no debe modificar
    Cancha Abierta.
  */

  if (
    torneoSeleccionado ===
    "CANCHA_ABIERTA"
  ) {
    return;
  }


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

function cambiarEstadoEnvio(
  enviando
) {

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

async function enviarFormulario(
  evento
) {

  evento.preventDefault();


  if (
    !formulario.checkValidity()
  ) {

    formulario.reportValidity();

    return;

  }


  if (!torneoSeleccionado) {

    alert(
      "No pudimos identificar el evento seleccionado."
    );

    return;

  }


  const datos =
    new FormData(
      formulario
    );


  const inscripcion = {

    torneo:
      torneoSeleccionado,


    modalidad:
      torneoSeleccionado ===
      "CANCHA_ABIERTA"
        ? "Individual"
        : datos.get(
            "modalidad"
          ),


    posicion:
      datos.get(
        "posicion"
      ) || "",


    nombre:
      datos.get(
        "nombre"
      ),


    apellido:
      datos.get(
        "apellido"
      ),


    whatsapp:
      datos.get(
        "whatsapp"
      ),


    email:
      datos.get(
        "email"
      ) || "",


    categoria:
      datos.get(
        "categoria"
      ) || "",


    nombrePareja:
      torneoSeleccionado ===
      "CANCHA_ABIERTA"
        ? ""
        : (
            datos.get(
              "nombrePareja"
            ) || ""
          ),


    apellidoPareja:
      torneoSeleccionado ===
      "CANCHA_ABIERTA"
        ? ""
        : (
            datos.get(
              "apellidoPareja"
            ) || ""
          ),


    whatsappPareja:
      torneoSeleccionado ===
      "CANCHA_ABIERTA"
        ? ""
        : (
            datos.get(
              "whatsappPareja"
            ) || ""
          ),


    observaciones:
      datos.get(
        "observaciones"
      ) || "",


    reglamentoAceptado:
      datos.get(
        "reglamento"
      ) === "on"

  };


  cambiarEstadoEnvio(
    true
  );


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

      /*
        Volvemos a consultar porque quizá
        justo se completó Drive / Revés.
      */

      await consultarCupos();


      throw new Error(
        resultado.mensaje ||
        "No se pudo completar la inscripción."
      );

    }


    /* ======================================
       ACTUALIZAR CONTADOR
    ====================================== */

    if (
      resultado.ocupados !==
      undefined
    ) {

      actualizarTarjetaTorneo(
        torneoSeleccionado,
        resultado.ocupados,
        resultado.cuposTotales ||
          obtenerCuposIniciales(
            torneoSeleccionado
          )
      );

    }


    /*
      Actualizamos Drive / Revés después
      de una inscripción en Cancha Abierta.
    */

    if (
      torneoSeleccionado ===
        "CANCHA_ABIERTA" &&
      resultado.posiciones
    ) {

      actualizarEstadoCanchaAbierta(
        resultado.posiciones
      );

    }


    /* ======================================
       MENSAJE DE WHATSAPP
    ====================================== */

    const datosVisuales =
      obtenerDatosVisualesTorneo(
        torneoSeleccionado
      );


    let mensajeWhatsapp = "";


    /*
      CANCHA ABIERTA
    */

    if (
      torneoSeleccionado ===
      "CANCHA_ABIERTA"
    ) {

      mensajeWhatsapp =
`Hola MATCH 👋

Soy ${inscripcion.nombre} ${inscripcion.apellido}.

Me inscribí a ${datosVisuales.nombre}.

Mi posición preferida es ${inscripcion.posicion}.

Te envío el comprobante de transferencia para confirmar mi inscripción.`;

      if (
        instruccionComprobante
      ) {

        instruccionComprobante.textContent =
          "Realizá la transferencia y envianos el comprobante por WhatsApp para confirmar tu lugar.";

      }


    /*
      TORNEO CON PAREJA
    */

    } else if (
      inscripcion.modalidad ===
      "Con pareja"
    ) {

      mensajeWhatsapp =
`Hola MATCH 👋

Soy ${inscripcion.nombre} ${inscripcion.apellido}.

Me inscribí a ${datosVisuales.nombre} junto a ${inscripcion.nombrePareja} ${inscripcion.apellidoPareja}.

Te envío los dos comprobantes de transferencia para confirmar nuestra inscripción.`;

      if (
        instruccionComprobante
      ) {

        instruccionComprobante.textContent =
          "Para confirmar la inscripción, envianos los dos comprobantes de transferencia por WhatsApp.";

      }


    /*
      TORNEO BUSCO PAREJA
    */

    } else {

      mensajeWhatsapp =
`Hola MATCH 👋

Soy ${inscripcion.nombre} ${inscripcion.apellido}.

Me inscribí a ${datosVisuales.nombre} en la modalidad "Busco pareja".

Mi posición preferida es ${inscripcion.posicion}.

Te envío el comprobante de transferencia para confirmar mi inscripción.`;

      if (
        instruccionComprobante
      ) {

        instruccionComprobante.textContent =
          "Realizá la transferencia y envianos el comprobante por WhatsApp para confirmar tu lugar.";

      }

    }


    if (botonWhatsapp) {

      botonWhatsapp.href =
        "https://wa.me/5491130091615?text=" +
        encodeURIComponent(
          mensajeWhatsapp
        );

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


    /*
      Guardamos el código antes de resetear.
    */

    const codigoActual =
      torneoSeleccionado;


    formulario.reset();


    torneoSeleccionadoInput.value =
      codigoActual;


    /*
      Dejamos "Con pareja" como opción
      inicial para el próximo torneo normal.
    */

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

    cambiarEstadoEnvio(
      false
    );

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
          boton.textContent
            .trim() ===
          "Reintentar"
        ) {

          consultarCupos();

          return;

        }


        const codigo =
          boton.dataset.torneo;


        abrirModal(
          codigo
        );

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

restaurarOpcionesPosicion();

consultarCupos();