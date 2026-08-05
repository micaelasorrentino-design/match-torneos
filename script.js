/* ==========================================
   SOMOS MATCH
   SCRIPT PRINCIPAL — SUPABASE
========================================== */

let torneoSeleccionado = "";
let eventoSeleccionado = null;


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

const bloqueModalidad =
  document.getElementById("bloque-modalidad");

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

const botonWhatsapp =
  document.getElementById(
    "boton-comprobante-whatsapp"
  );

const instruccionComprobante =
  document.getElementById(
    "instruccion-comprobante"
  );

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

const confirmacionEvento =
  document.getElementById(
    "confirmacion-evento"
  );

const confirmacionFecha =
  document.getElementById(
    "confirmacion-fecha"
  );

const confirmacionHorario =
  document.getElementById(
    "confirmacion-horario"
  );

const confirmacionLugar =
  document.getElementById(
    "confirmacion-lugar"
  );

const confirmacionPrecio =
  document.getElementById(
    "confirmacion-precio"
  );

const archivoComprobante =
  document.getElementById(
    "archivo-comprobante"
  );

const botonSubirComprobante =
  document.getElementById(
    "boton-subir-comprobante"
  );

const estadoSubidaComprobante =
  document.getElementById(
    "estado-subida-comprobante"
  );


/* ==========================================
   UTILIDADES
========================================== */

function normalizarTelefono(valor = "") {

  return String(valor)
    .replace(/\D/g, "");

}


function normalizarPosicion(valor = "") {

  const posicion =
    String(valor)
      .trim()
      .toLowerCase();

  if (
    posicion === "revés" ||
    posicion === "reves"
  ) {
    return "reves";
  }

  if (posicion === "drive") {
    return "drive";
  }

  if (posicion === "indistinto") {
    return "indistinto";
  }

  return null;

}


function esCanchaAbierta() {

  return (
    eventoSeleccionado?.tipo ===
    "cancha_abierta"
  );

}


function obtenerDatosVisualesTorneo(
  idEvento
) {

  const tarjeta =
    document.querySelector(
      `.tarjeta-torneo[data-torneo="${idEvento}"]`
    );

  if (!tarjeta) {

    return {

      nombre:
        eventoSeleccionado?.titulo ||
        "Evento MATCH",

      sede:
        eventoSeleccionado?.lugar ||
        ""

    };

  }

  const titulo =
    tarjeta.querySelector("h3");

  let sede = "";

  tarjeta
    .querySelectorAll(".info-item")
    .forEach((item) => {

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
      titulo?.textContent.trim() ||
      eventoSeleccionado?.titulo ||
      "Evento MATCH",

    sede:
      sede ||
      eventoSeleccionado?.lugar ||
      ""

  };

}


/* ==========================================
   OPCIONES DE POSICIÓN
========================================== */

function restaurarOpcionesPosicion() {

  opcionesPosicion.forEach(
    (opcion) => {

      opcion.disabled = false;

      const span =
        opcion
          .closest("label")
          ?.querySelector("span");

      if (!span) {
        return;
      }

      if (opcion.value === "Drive") {
        span.textContent = "Drive";
      }

      if (opcion.value === "Revés") {
        span.textContent = "Revés";
      }

      if (opcion.value === "Indistinto") {
        span.textContent = "Indistinto";
      }

    }
  );

}


/* ==========================================
   FORMULARIO SEGÚN MODALIDAD
========================================== */

function actualizarModalidad() {

  if (esCanchaAbierta()) {
    return;
  }

  const modalidadSeleccionada =
    document.querySelector(
      'input[name="modalidad"]:checked'
    )?.value;

  const tienePareja =
    modalidadSeleccionada ===
    "Con pareja";

  datosPareja?.classList.toggle(
    "oculto",
    !tienePareja
  );

  mensajeBuscoPareja?.classList.toggle(
    "oculto",
    tienePareja
  );

  bloquePosicion?.classList.toggle(
    "oculto",
    tienePareja
  );

  if (nombrePareja) {
    nombrePareja.required =
      tienePareja;
  }

  if (apellidoPareja) {
    apellidoPareja.required =
      tienePareja;
  }

  if (whatsappPareja) {
    whatsappPareja.required =
      tienePareja;
  }

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

    if (nombrePareja) {
      nombrePareja.value = "";
    }

    if (apellidoPareja) {
      apellidoPareja.value = "";
    }

    if (whatsappPareja) {
      whatsappPareja.value = "";
    }

  }

}


/* ==========================================
   FORMULARIO SEGÚN TIPO DE EVENTO
========================================== */

function configurarFormularioSegunEvento() {

  restaurarOpcionesPosicion();

  if (esCanchaAbierta()) {

    bloqueModalidad?.classList.add(
      "oculto"
    );

    bloquePosicion?.classList.remove(
      "oculto"
    );

    datosPareja?.classList.add(
      "oculto"
    );

    mensajeBuscoPareja?.classList.add(
      "oculto"
    );

    opcionesPosicion.forEach(
      (opcion) => {

        opcion.required = true;

      }
    );

    if (nombrePareja) {
      nombrePareja.required = false;
    }

    if (apellidoPareja) {
      apellidoPareja.required = false;
    }

    if (whatsappPareja) {
      whatsappPareja.required = false;
    }

  } else {

    bloqueModalidad?.classList.remove(
      "oculto"
    );

    actualizarModalidad();

  }

}


/* ==========================================
   ABRIR MODAL
========================================== */

async function abrirModal(idEvento) {

  const { data, error } =
    await window.db
      .from("eventos")
      .select("*")
      .eq("id", idEvento)
      .single();

  if (error || !data) {

    console.error(
      "No se pudo obtener el evento:",
      error
    );

    alert(
      "No pudimos abrir este evento. Actualizá la página y probá nuevamente."
    );

    return;

  }

  if (!data.inscripciones_abiertas) {

    alert(
      "Las inscripciones de este evento están cerradas."
    );

    return;

  }

  torneoSeleccionado =
    idEvento;

  eventoSeleccionado =
    data;

  if (torneoSeleccionadoInput) {

    torneoSeleccionadoInput.value =
      idEvento;

  }

  const datosVisuales =
    obtenerDatosVisualesTorneo(
      idEvento
    );

  if (tituloFormulario) {

    tituloFormulario.textContent =
      datosVisuales.nombre;

  }

  if (torneoSeleccionadoTexto) {

    torneoSeleccionadoTexto.textContent =
      datosVisuales.sede ||
      "SOMOS MATCH";

  }

  configurarFormularioSegunEvento();

  formulario?.classList.remove(
    "oculto"
  );

  mensajeConfirmacion?.classList.add(
    "oculto"
  );

  modal?.classList.add(
    "abierto"
  );

  modal?.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-abierto"
  );

}


/* ==========================================
   CERRAR MODAL
========================================== */

function cerrarFormulario() {

  modal?.classList.remove(
    "abierto"
  );

  modal?.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-abierto"
  );

}


/* ==========================================
   BOTÓN DE ENVÍO
========================================== */

function cambiarEstadoEnvio(
  enviando
) {

  if (!botonEnviar) {
    return;
  }

  botonEnviar.disabled =
    enviando;

  botonEnviar.textContent =
    enviando
      ? "Registrando inscripción..."
      : "Reservar mi lugar";

}


async function registrarInscripcionSegura(datos) {

  const modalidadElegida =
    esCanchaAbierta()
      ? "individual"
      : (
          datos.get("modalidad") === "Con pareja"
            ? "pareja"
            : "individual"
        );

  const nombreCompletoPareja =
    [
      String(
        datos.get("nombrePareja") || ""
      ).trim(),

      String(
        datos.get("apellidoPareja") || ""
      ).trim()
    ]
      .filter(Boolean)
      .join(" ");

  const telefonoNormalizado =
    normalizarTelefono(
      datos.get("whatsapp")
    );

  const { data, error } =
    await window.db.rpc(
      "registrar_inscripcion",
      {
        p_evento_id:
          torneoSeleccionado,

        p_nombre:
          String(
            datos.get("nombre") || ""
          ).trim(),

        p_apellido:
          String(
            datos.get("apellido") || ""
          ).trim(),

        p_email:
          String(
            datos.get("email") || ""
          )
            .trim()
            .toLowerCase(),

        p_telefono:
          String(
            datos.get("whatsapp") || ""
          ).trim(),

        p_telefono_normalizado:
          telefonoNormalizado,

        p_modalidad:
          modalidadElegida,

        p_posicion:
          normalizarPosicion(
            datos.get("posicion")
          ) || "",

        p_nombre_companera:
          modalidadElegida === "pareja"
            ? nombreCompletoPareja
            : "",

        p_telefono_companera:
          modalidadElegida === "pareja"
            ? normalizarTelefono(
                datos.get(
                  "whatsappPareja"
                )
              )
            : "",

        p_observaciones:
          String(
            datos.get(
              "observaciones"
            ) || ""
          ).trim()
      }
    );

  if (error) {

    console.error(
      "Error al registrar inscripción:",
      error
    );

    throw new Error(
      error.message ||
      "No pudimos registrar la inscripción."
    );

  }

  const resultado =
    Array.isArray(data)
      ? data[0]
      : data;

  if (!resultado) {

    throw new Error(
      "No recibimos la confirmación de la inscripción."
    );

  }

  return {
    inscripcionId:
      resultado.inscripcion_id,

    codigoAcceso:
      resultado.codigo_acceso
  };


}


/* ==========================================
   CONFIRMACIÓN
========================================== */

function prepararConfirmacion(
  datos
) {

  if (confirmacionEvento) {
    confirmacionEvento.textContent =
      eventoSeleccionado?.titulo ||
      "Evento MATCH";
  }

  if (confirmacionFecha) {
    confirmacionFecha.textContent =
      eventoSeleccionado?.fecha ||
      "A confirmar";
  }

  if (confirmacionHorario) {

    const inicio =
      eventoSeleccionado?.hora_inicio?.slice(0,5) || "";

    const fin =
      eventoSeleccionado?.hora_fin?.slice(0,5) || "";

    confirmacionHorario.textContent =
      fin
        ? `${inicio} a ${fin}`
        : inicio || "A confirmar";

  }

  if (confirmacionLugar) {
    confirmacionLugar.textContent =
      eventoSeleccionado?.lugar ||
      "A confirmar";
  }

  if (confirmacionPrecio) {

    confirmacionPrecio.textContent =
      new Intl.NumberFormat(
        "es-AR",
        {
          style: "currency",
          currency: "ARS",
          maximumFractionDigits: 0
        }
      ).format(
        Number(eventoSeleccionado?.precio) || 0
      );
      const elementoCodigoAcceso =
  document.getElementById(
    "codigo-acceso-confirmacion"
  );

if (
  elementoCodigoAcceso &&
  window.inscripcionActual?.codigo
) {
  elementoCodigoAcceso.textContent =
    window.inscripcionActual.codigo;
}

  }

  const datosVisuales =
    obtenerDatosVisualesTorneo(
      torneoSeleccionado
    );

  const nombre =
    String(
      datos.get("nombre") || ""
    ).trim();

  const apellido =
    String(
      datos.get("apellido") || ""
    ).trim();

  let mensajeWhatsapp =
`Hola MATCH 👋

Soy ${nombre} ${apellido}.

Me inscribí a ${datosVisuales.nombre}.

Te envío el comprobante de transferencia para confirmar mi inscripción.`;

  if (
    !esCanchaAbierta() &&
    datos.get("modalidad") ===
      "Con pareja"
  ) {

    const nombreCompletoPareja =
      [
        String(
          datos.get(
            "nombrePareja"
          ) || ""
        ).trim(),

        String(
          datos.get(
            "apellidoPareja"
          ) || ""
        ).trim()
      ]
        .filter(Boolean)
        .join(" ");

    mensajeWhatsapp =
`Hola MATCH 👋

Soy ${nombre} ${apellido}.

Me inscribí a ${datosVisuales.nombre} junto a ${nombreCompletoPareja}.

Te envío los comprobantes de transferencia para confirmar nuestra inscripción.`;

  }

  if (instruccionComprobante) {

    instruccionComprobante.textContent =
      "Podés enviar el comprobante ahora por WhatsApp. Próximamente también vas a poder subirlo directamente desde la web.";

  }

  if (botonWhatsapp) {

    botonWhatsapp.href =
      "https://wa.me/5491130091615?text=" +
      encodeURIComponent(
        mensajeWhatsapp
      );

  }

  formulario?.classList.add(
    "oculto"
  );

  mensajeConfirmacion?.classList.remove(
    "oculto"
  );

  modal?.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==========================================
   ENVIAR FORMULARIO
========================================== */

async function enviarFormulario(
  evento
) {

  evento.preventDefault();

  if (
    !formulario?.checkValidity()
  ) {

    formulario?.reportValidity();

    return;

  }

  if (
    !torneoSeleccionado ||
    !eventoSeleccionado
  ) {

    alert(
      "No pudimos identificar el evento seleccionado."
    );

    return;

  }

  const datos =
    new FormData(
      formulario
    );

  cambiarEstadoEnvio(
    true
  );

  try {

  const resultadoInscripcion =
  await registrarInscripcionSegura(
    datos
  );

window.inscripcionActual = {
  id:
    resultadoInscripcion.inscripcionId,

  codigo:
    resultadoInscripcion.codigoAcceso
};

    prepararConfirmacion(
      datos
    );

    const codigoActual =
      torneoSeleccionado;

    formulario.reset();

    if (torneoSeleccionadoInput) {

      torneoSeleccionadoInput.value =
        codigoActual;

    }

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

      reglamento.open = false;

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
   BOTONES DINÁMICOS
========================================== */

document.addEventListener(
  "click",
  (evento) => {

    const boton =
      evento.target.closest(
        ".boton-inscripcion-torneo"
      );

    if (
      !boton ||
      boton.disabled
    ) {
      return;
    }

    const idEvento =
      boton.dataset.torneo;

    if (idEvento) {

      abrirModal(
        idEvento
      );

    }

  }
);


/* ==========================================
   EVENTOS DEL FORMULARIO
========================================== */

cerrarModal?.addEventListener(
  "click",
  cerrarFormulario
);

cerrarConfirmacion?.addEventListener(
  "click",
  cerrarFormulario
);

formulario?.addEventListener(
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
      modal?.classList.contains(
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