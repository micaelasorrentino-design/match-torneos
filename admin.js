/* ==========================================
   MATCH — PANEL ADMINISTRADOR
========================================== */

const pantallaLogin =
  document.getElementById(
    "pantalla-login"
  );

const panelAdministrador =
  document.getElementById(
    "panel-administrador"
  );

const formularioLogin =
  document.getElementById(
    "formulario-login"
  );

const adminEmail =
  document.getElementById(
    "admin-email"
  );

const adminPassword =
  document.getElementById(
    "admin-password"
  );

const botonLogin =
  document.getElementById(
    "boton-login"
  );

const errorLogin =
  document.getElementById(
    "error-login"
  );

const botonCerrarSesion =
  document.getElementById(
    "boton-cerrar-sesion"
  );

const botonActualizar =
  document.getElementById(
    "boton-actualizar"
  );

const selectorEvento =
  document.getElementById(
    "selector-evento"
  );

const buscadorInscripciones =
  document.getElementById(
    "buscador-inscripciones"
  );

const filtroEstado =
  document.getElementById(
    "filtro-estado"
  );

const filtroPago =
  document.getElementById(
    "filtro-pago"
  );

const tablaInscripciones =
  document.getElementById(
    "tabla-inscripciones"
  );

const textoCantidadInscripciones =
  document.getElementById(
    "texto-cantidad-inscripciones"
  );

const resumenTotal =
  document.getElementById(
    "resumen-total"
  );

const resumenPendientes =
  document.getElementById(
    "resumen-pendientes"
  );

const resumenComprobantes =
  document.getElementById(
    "resumen-comprobantes"
  );

const resumenConfirmadas =
  document.getElementById(
    "resumen-confirmadas"
  );

const modalComprobante =
  document.getElementById(
    "modal-comprobante"
  );

const cerrarModalComprobante =
  document.getElementById(
    "cerrar-modal-comprobante"
  );

const visorComprobante =
  document.getElementById(
    "visor-comprobante"
  );

const tituloModalComprobante =
  document.getElementById(
    "titulo-modal-comprobante"
  );

const botonNuevoEvento =
  document.getElementById(
    "boton-nuevo-evento"
  );

const modalNuevoEvento =
  document.getElementById(
    "modal-nuevo-evento"
  );

const cerrarModalNuevoEvento =
  document.getElementById(
    "cerrar-modal-nuevo-evento"
  );

const cancelarNuevoEvento =
  document.getElementById(
    "cancelar-nuevo-evento"
  );

const formularioNuevoEvento =
  document.getElementById(
    "formulario-nuevo-evento"
  );

const guardarNuevoEvento =
  document.getElementById(
    "guardar-nuevo-evento"
  );

const mensajeNuevoEvento =
  document.getElementById(
    "mensaje-nuevo-evento"
  );

const eventoTitulo =
  document.getElementById(
    "evento-titulo"
  );

const eventoTipo =
  document.getElementById(
    "evento-tipo"
  );

const eventoCategoria =
  document.getElementById(
    "evento-categoria"
  );

const eventoCupos =
  document.getElementById(
    "evento-cupos"
  );

const eventoFecha =
  document.getElementById(
    "evento-fecha"
  );

const eventoHoraInicio =
  document.getElementById(
    "evento-hora-inicio"
  );

const eventoHoraFin =
  document.getElementById(
    "evento-hora-fin"
  );

const eventoSede =
  document.getElementById(
    "evento-sede"
  );

const eventoComplejo =
  document.getElementById(
    "evento-complejo"
  );

const eventoPrecio =
  document.getElementById(
    "evento-precio"
  );

const eventoInscripcionesAbiertas =
  document.getElementById(
    "evento-inscripciones-abiertas"
  );

const eventoDescripcion =
  document.getElementById(
    "evento-descripcion"
  );

let inscripcionesActuales = [];
let eventoActual = "";
let sedesDisponibles = [];
let complejosDisponibles = [];


/* ==========================================
   UTILIDADES
========================================== */

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function normalizarTexto(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}


function textoEstado(estado) {
  const textos = {
    pendiente: "Pendiente",
    confirmada: "Confirmada",
    cancelada: "Cancelada"
  };

  return textos[estado] || estado || "Sin estado";
}


function textoPago(estadoPago) {

  const textos = {
    pendiente: "Pago pendiente",
    comprobante_recibido:
      "Comprobante recibido",
    confirmado:
      "Pago confirmado",
    rechazado:
      "Pago rechazado"
  };

  return (
    textos[estadoPago] ||
    estadoPago ||
    "Sin estado"
  );

}


/* ==========================================
   SESIÓN Y ACCESO
========================================== */

async function verificarAccesoAdministrador() {
  const {
    data: {
      session
    }
  } =
    await window.db.auth.getSession();

  if (!session) {
    mostrarLogin();
    return;
  }

  const {
    data: esAdmin,
    error
  } =
    await window.db.rpc(
      "es_administrador"
    );

  if (error || !esAdmin) {
    await window.db.auth.signOut();
    mostrarLogin();

    if (errorLogin) {
      errorLogin.textContent =
        "Esta cuenta no tiene acceso al panel.";
    }

    return;
  }

  mostrarPanel();
  await cargarEventos();
}


function mostrarLogin() {
  pantallaLogin?.classList.remove(
    "oculto"
  );

  panelAdministrador?.classList.add(
    "oculto"
  );
}


function mostrarPanel() {
  pantallaLogin?.classList.add(
    "oculto"
  );

  panelAdministrador?.classList.remove(
    "oculto"
  );
}


/* ==========================================
   LOGIN
========================================== */

async function iniciarSesion(evento) {
  evento.preventDefault();

  if (errorLogin) {
    errorLogin.textContent = "";
  }

  botonLogin.disabled = true;
  botonLogin.textContent =
    "Ingresando...";

  try {
    const {
      error
    } =
      await window.db.auth
        .signInWithPassword({
          email:
            adminEmail.value.trim(),

          password:
            adminPassword.value
        });

    if (error) {
      throw error;
    }

    await verificarAccesoAdministrador();

  } catch (error) {
    console.error(
      "Error al iniciar sesión:",
      error
    );

    if (errorLogin) {
      errorLogin.textContent =
        "Email o contraseña incorrectos.";
    }

  } finally {
    botonLogin.disabled = false;
    botonLogin.textContent =
      "Ingresar";
  }
}


async function cerrarSesion() {
  await window.db.auth.signOut();

  inscripcionesActuales = [];
  eventoActual = "";

  mostrarLogin();
}
/* ==========================================
   CREAR NUEVO EVENTO
========================================== */

async function cargarSedesYComplejos() {

  const [
    respuestaSedes,
    respuestaComplejos
  ] = await Promise.all([

    window.db
      .from("sedes")
      .select(`
        id,
        nombre
      `)
      .eq("activa", true)
      .order("nombre"),

    window.db
      .from("complejos")
      .select(`
        id,
        sede_id,
        nombre
      `)
      .order("nombre")

  ]);

  if (respuestaSedes.error) {
    console.error(
      "Error al cargar sedes:",
      respuestaSedes.error
    );

    throw new Error(
      "No pudimos cargar las ciudades."
    );
  }

  if (respuestaComplejos.error) {
    console.error(
      "Error al cargar complejos:",
      respuestaComplejos.error
    );

    throw new Error(
      "No pudimos cargar los complejos."
    );
  }

  sedesDisponibles =
    respuestaSedes.data || [];

  complejosDisponibles =
    respuestaComplejos.data || [];

  eventoSede.innerHTML = `
    <option value="">
      Seleccioná una ciudad
    </option>
  `;

  sedesDisponibles.forEach(
    (sede) => {

      const opcion =
        document.createElement(
          "option"
        );

      opcion.value = sede.id;
      opcion.textContent = sede.nombre;

      eventoSede.appendChild(
        opcion
      );

    }
  );

}


function cargarComplejosPorSede() {

  const sedeId =
    eventoSede.value;

  eventoComplejo.innerHTML = "";

  if (!sedeId) {

    eventoComplejo.disabled = true;

    eventoComplejo.innerHTML = `
      <option value="">
        Primero seleccioná una ciudad
      </option>
    `;

    return;
  }

  const complejosFiltrados =
    complejosDisponibles.filter(
      (complejo) =>
        complejo.sede_id === sedeId
    );

  eventoComplejo.disabled = false;

  eventoComplejo.innerHTML = `
    <option value="">
      Seleccioná un complejo
    </option>
  `;

  complejosFiltrados.forEach(
    (complejo) => {

      const opcion =
        document.createElement(
          "option"
        );

      opcion.value =
        complejo.id;

      opcion.textContent =
        complejo.nombre;

      eventoComplejo.appendChild(
        opcion
      );

    }
  );

}


async function abrirModalNuevoEvento() {

  if (mensajeNuevoEvento) {
    mensajeNuevoEvento.textContent = "";
  }

  formularioNuevoEvento?.reset();

  eventoInscripcionesAbiertas.checked =
    true;

  eventoComplejo.disabled =
    true;

  eventoComplejo.innerHTML = `
    <option value="">
      Primero seleccioná una ciudad
    </option>
  `;

  try {

    await cargarSedesYComplejos();

    modalNuevoEvento?.classList.remove(
      "oculto"
    );

    document.body.style.overflow =
      "hidden";

  } catch (error) {

    console.error(
      "Error al abrir formulario:",
      error
    );

    alert(
      error.message ||
      "No pudimos abrir el formulario."
    );

  }

}


function cerrarNuevoEvento() {

  modalNuevoEvento?.classList.add(
    "oculto"
  );

  document.body.style.overflow =
    "";

  formularioNuevoEvento?.reset();

  if (mensajeNuevoEvento) {
    mensajeNuevoEvento.textContent = "";
  }

}


async function crearNuevoEvento(evento) {

  evento.preventDefault();

  if (mensajeNuevoEvento) {
    mensajeNuevoEvento.textContent = "";
  }

  if (
    eventoHoraFin.value &&
    eventoHoraFin.value <=
      eventoHoraInicio.value
  ) {

    mensajeNuevoEvento.textContent =
      "La hora de finalización debe ser posterior a la hora de inicio.";

    return;
  }

  const complejoSeleccionado =
    complejosDisponibles.find(
      (complejo) =>
        complejo.id ===
        eventoComplejo.value
    );

  if (!complejoSeleccionado) {

    mensajeNuevoEvento.textContent =
      "Seleccioná un complejo.";

    return;
  }

  const registro = {

    titulo:
      eventoTitulo.value.trim(),

    tipo:
      eventoTipo.value,

    categoria:
      eventoCategoria.value,

    fecha:
      eventoFecha.value,

    hora_inicio:
      eventoHoraInicio.value,

    hora_fin:
      eventoHoraFin.value || null,

    lugar:
      complejoSeleccionado.nombre,

    precio:
      Number(eventoPrecio.value),

    cupos_totales:
      Number(eventoCupos.value),

    inscripciones_abiertas:
      eventoInscripcionesAbiertas.checked,

    descripcion:
      eventoDescripcion.value.trim() ||
      null,

    sede_id:
      eventoSede.value,

    complejo_id:
      eventoComplejo.value

  };

  guardarNuevoEvento.disabled =
    true;

  guardarNuevoEvento.textContent =
    "Creando evento...";

  try {

    const {
      data,
      error
    } =
      await window.db
        .from("eventos")
        .insert(registro)
        .select("id")
        .single();

    if (error) {
      throw error;
    }

    mensajeNuevoEvento.textContent =
      "✓ Evento creado correctamente.";

    mensajeNuevoEvento.style.color =
      "#4e8b68";

    await cargarEventos();

    if (data?.id) {

      selectorEvento.value =
        data.id;

      eventoActual =
        data.id;

      await cargarInscripciones();

    }

    window.setTimeout(
      cerrarNuevoEvento,
      900
    );

  } catch (error) {

    console.error(
      "Error al crear evento:",
      error
    );

    mensajeNuevoEvento.style.color =
      "";

    mensajeNuevoEvento.textContent =
      error.message ||
      "No pudimos crear el evento.";

  } finally {

    guardarNuevoEvento.disabled =
      false;

    guardarNuevoEvento.textContent =
      "Crear evento";

  }

}

/* ==========================================
   EVENTOS
========================================== */

async function cargarEventos() {
  selectorEvento.innerHTML = `
    <option value="">
      Seleccioná un evento
    </option>
  `;

  const {
    data,
    error
  } =
    await window.db
      .from("eventos")
      .select(`
        id,
        titulo,
        fecha,
        categoria
      `)
      .order(
        "fecha",
        {
          ascending: false
        }
      );

  if (error) {
    console.error(
      "Error al cargar eventos:",
      error
    );

    alert(
      "No pudimos cargar los eventos."
    );

    return;
  }

  (data || []).forEach(
    (evento) => {
      const option =
        document.createElement(
          "option"
        );

      option.value =
        evento.id;

      option.textContent =
        `${evento.titulo} · ${evento.fecha}`;

      selectorEvento.appendChild(
        option
      );
    }
  );

  if (data?.length) {
    selectorEvento.value =
      data[0].id;

    eventoActual =
      data[0].id;

    await cargarInscripciones();
  }
}


/* ==========================================
   INSCRIPCIONES
========================================== */

async function cargarInscripciones() {
  eventoActual =
    selectorEvento.value;

  if (!eventoActual) {
    inscripcionesActuales = [];
    renderizarTabla();
    actualizarResumen();
    return;
  }

  tablaInscripciones.innerHTML = `
    <tr>
      <td
        colspan="7"
        class="tabla-vacia"
      >
        Cargando inscripciones...
      </td>
    </tr>
  `;

  const {
    data,
    error
  } =
    await window.db
      .from("inscripciones")
      .select(`
        id,
        created_at,
        modalidad,
        posicion,
        nombre_companera,
        telefono_companera,
        estado,
        estado_pago,
        comprobante_path,
        observaciones_participante,

        participantes (
          nombre,
          apellido,
          telefono,
          telefono_normalizado,
          email
        )
      `)
      .eq(
        "evento_id",
        eventoActual
      )
      .order(
        "created_at",
        {
          ascending: true
        }
      );

  if (error) {
    console.error(
      "Error al cargar inscripciones:",
      error
    );

    tablaInscripciones.innerHTML = `
      <tr>
        <td
          colspan="7"
          class="tabla-vacia"
        >
          No pudimos cargar las inscripciones.
        </td>
      </tr>
    `;

    return;
  }

  inscripcionesActuales =
    data || [];

  aplicarFiltros();
  actualizarResumen();
}


/* ==========================================
   FILTROS
========================================== */

function obtenerInscripcionesFiltradas() {
  const busqueda =
    normalizarTexto(
      buscadorInscripciones.value
    );

  const estado =
    filtroEstado.value;

  const pago =
    filtroPago.value;

  return inscripcionesActuales.filter(
    (inscripcion) => {

      const participante =
        inscripcion.participantes ||
        {};

      const textoBusqueda =
        normalizarTexto(
          [
            participante.nombre,
            participante.apellido,
            participante.telefono,
            participante.email,
            inscripcion.nombre_companera,
            inscripcion.telefono_companera
          ]
            .filter(Boolean)
            .join(" ")
        );

      const coincideBusqueda =
        !busqueda ||
        textoBusqueda.includes(
          busqueda
        );

      const coincideEstado =
        !estado ||
        inscripcion.estado ===
          estado;

      const coincidePago =
        !pago ||
        inscripcion.estado_pago ===
          pago;

      return (
        coincideBusqueda &&
        coincideEstado &&
        coincidePago
      );
    }
  );
}


function aplicarFiltros() {
  renderizarTabla(
    obtenerInscripcionesFiltradas()
  );
}


/* ==========================================
   TABLA
========================================== */

function renderizarTabla(
  inscripciones =
    inscripcionesActuales
) {
  if (!inscripciones.length) {
    tablaInscripciones.innerHTML = `
      <tr>
        <td
          colspan="7"
          class="tabla-vacia"
        >
          No hay inscripciones para mostrar.
        </td>
      </tr>
    `;

    textoCantidadInscripciones.textContent =
      "0 inscripciones";

    return;
  }

  textoCantidadInscripciones.textContent =
    `${inscripciones.length} inscripciones`;

  tablaInscripciones.innerHTML =
    inscripciones
      .map(crearFilaInscripcion)
      .join("");
}


function crearFilaInscripcion(
  inscripcion
) {
  const participante =
    inscripcion.participantes ||
    {};

  const nombreCompleto =
    [
      participante.nombre,
      participante.apellido
    ]
      .filter(Boolean)
      .join(" ");

  const modalidadTexto =
    inscripcion.modalidad === "pareja"
      ? (
          inscripcion.nombre_companera
            ? `Con ${inscripcion.nombre_companera}`
            : "Con pareja"
        )
      : (
          inscripcion.posicion
            ? `Individual · ${inscripcion.posicion}`
            : "Individual"
        );

  const botonComprobante =
    inscripcion.comprobante_path
      ? `
        <button
          type="button"
          class="boton-tabla"
          data-ver-comprobante="${inscripcion.id}"
        >
          Ver archivo
        </button>
      `
      : `
        <span>
          Sin comprobante
        </span>
      `;

  return `
    <tr>

      <td>
        <div class="participante-celda">

          <strong>
            ${escaparHTML(
              nombreCompleto ||
              "Sin nombre"
            )}
          </strong>

          <small>
            ${escaparHTML(
              participante.email ||
              "Sin email"
            )}
          </small>

        </div>
      </td>

      <td>
        <div class="contacto-celda">

          <strong>
            ${escaparHTML(
              participante.telefono ||
              ""
            )}
          </strong>

          <small>
            ${escaparHTML(
              participante.telefono_normalizado ||
              ""
            )}
          </small>

        </div>
      </td>

      <td>
        ${escaparHTML(
          modalidadTexto
        )}
      </td>

      <td>
        <span
          class="pago-chip pago-${escaparHTML(
            inscripcion.estado_pago
          )}"
        >
          ${escaparHTML(
            textoPago(
              inscripcion.estado_pago
            )
          )}
        </span>
      </td>

      <td>
        <span
          class="estado-chip estado-${escaparHTML(
            inscripcion.estado
          )}"
        >
          ${escaparHTML(
            textoEstado(
              inscripcion.estado
            )
          )}
        </span>
      </td>

      <td>
        ${botonComprobante}
      </td>

      <td>

        <div class="acciones-tabla">

          ${
  inscripcion.estado !== "confirmada"
    ? `
      <button
        type="button"
        class="boton-tabla boton-tabla-principal"
        data-confirmar="${inscripcion.id}"
      >
        Confirmar pago
      </button>
    `
    : `
      <span class="estado-chip estado-confirmada">
        Confirmada
      </span>
    `
}

${
  inscripcion.estado !== "cancelada"
    ? `
      <button
        type="button"
        class="boton-tabla boton-cancelar"
        data-cancelar="${inscripcion.id}"
      >
        Cancelar
      </button>
    `
    : ""
}

          ${
            participante.telefono_normalizado
              ? `
                <a
                  href="https://wa.me/54${escaparHTML(
                    participante.telefono_normalizado
                  )}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="boton-tabla"
                >
                  WhatsApp
                </a>
              `
              : ""
          }

        </div>

      </td>

    </tr>
  `;
}


/* ==========================================
   RESUMEN
========================================== */

function actualizarResumen() {
  const total =
    inscripcionesActuales.length;

  const pendientes =
    inscripcionesActuales.filter(
      (item) =>
        item.estado ===
        "pendiente"
    ).length;

  const comprobantes =
    inscripcionesActuales.filter(
      (item) =>
        item.comprobante_path
    ).length;

  const confirmadas =
    inscripcionesActuales.filter(
      (item) =>
        item.estado ===
        "confirmada"
    ).length;

  resumenTotal.textContent =
    total;

  resumenPendientes.textContent =
    pendientes;

  resumenComprobantes.textContent =
    comprobantes;

  resumenConfirmadas.textContent =
    confirmadas;
}


/* ==========================================
   ACTUALIZAR ESTADOS
========================================== */

async function actualizarInscripcion(
  inscripcionId,
  cambios
) {
  const {
    error
  } =
    await window.db
      .from("inscripciones")
      .update(cambios)
      .eq(
        "id",
        inscripcionId
      );

  if (error) {
    console.error(
      "Error al actualizar inscripción:",
      error
    );

    alert(
      "No pudimos actualizar la inscripción."
    );

    return false;
  }

  await cargarInscripciones();

  return true;
}


/* ==========================================
   CONFIRMAR Y CANCELAR INSCRIPCIONES
========================================== */

async function confirmarInscripcion(
  inscripcionId
) {

  const inscripcion =
    inscripcionesActuales.find(
      (item) =>
        item.id === inscripcionId
    );

  if (!inscripcion) {
    alert(
      "No encontramos la inscripción."
    );

    return;
  }

  if (
    inscripcion.estado === "confirmada" &&
    inscripcion.estado_pago === "confirmado"
  ) {
    alert(
      "Esta inscripción ya está confirmada."
    );

    return;
  }

  const participante =
    inscripcion.participantes || {};

  const nombreCompleto =
    [
      participante.nombre,
      participante.apellido
    ]
      .filter(Boolean)
      .join(" ");

  const confirmar =
    window.confirm(
      `¿Confirmar la inscripción y el pago de ${nombreCompleto || "esta participante"}?`
    );

  if (!confirmar) {
    return;
  }

  const actualizado =
    await actualizarInscripcion(
      inscripcionId,
      {
        estado: "confirmada",
        estado_pago: "confirmado"
      }
    );

  if (actualizado) {
    alert(
      "Inscripción y pago confirmados."
    );
  }

}


async function cancelarInscripcion(
  inscripcionId
) {

  const inscripcion =
    inscripcionesActuales.find(
      (item) =>
        item.id === inscripcionId
    );

  if (!inscripcion) {
    alert(
      "No encontramos la inscripción."
    );

    return;
  }

  if (
    inscripcion.estado === "cancelada"
  ) {
    alert(
      "Esta inscripción ya está cancelada."
    );

    return;
  }

  const participante =
    inscripcion.participantes || {};

  const nombreCompleto =
    [
      participante.nombre,
      participante.apellido
    ]
      .filter(Boolean)
      .join(" ");

  const confirmar =
    window.confirm(
      `¿Cancelar la inscripción de ${nombreCompleto || "esta participante"}?\n\nEl cupo volverá a quedar disponible.`
    );

  if (!confirmar) {
    return;
  }

  const actualizado =
    await actualizarInscripcion(
      inscripcionId,
      {
        estado: "cancelada"
      }
    );

  if (actualizado) {
    alert(
      "Inscripción cancelada. El cupo quedó liberado."
    );
  }

}


/* ==========================================
   COMPROBANTE
========================================== */

async function verComprobante(
  inscripcionId
) {
  const inscripcion =
    inscripcionesActuales.find(
      (item) =>
        item.id ===
        inscripcionId
    );

  if (
    !inscripcion ||
    !inscripcion.comprobante_path
  ) {
    alert(
      "Esta inscripción no tiene comprobante."
    );

    return;
  }

  visorComprobante.innerHTML = `
    <p>
      Cargando comprobante...
    </p>
  `;

  modalComprobante.classList.remove(
    "oculto"
  );

  const {
    data,
    error
  } =
    await window.db.storage
      .from("comprobantes")
      .createSignedUrl(
        inscripcion.comprobante_path,
        120
      );

  if (
    error ||
    !data?.signedUrl
  ) {
    console.error(
      "Error al abrir comprobante:",
      error
    );

    visorComprobante.innerHTML = `
      <p>
        No pudimos abrir el comprobante.
      </p>
    `;

    return;
  }

  const url =
    data.signedUrl;

  const esPdf =
    inscripcion.comprobante_path
      .toLowerCase()
      .endsWith(".pdf");

  tituloModalComprobante.textContent =
    "Comprobante de pago";

  visorComprobante.innerHTML =
    esPdf
      ? `
        <iframe
          src="${escaparHTML(url)}"
          title="Comprobante de pago"
        ></iframe>
      `
      : `
        <img
          src="${escaparHTML(url)}"
          alt="Comprobante de pago"
        >
      `;
}


function cerrarVisorComprobante() {

  modalComprobante?.classList.add(
    "oculto"
  );

  if (visorComprobante) {
    visorComprobante.innerHTML = "";
  }

}


/* ==========================================
   CLICS DINÁMICOS
========================================== */

document.addEventListener(
  "click",
  (evento) => {

    const botonConfirmar =
      evento.target.closest(
        "[data-confirmar]"
      );

    if (botonConfirmar) {

      confirmarInscripcion(
        botonConfirmar.dataset.confirmar
      );

      return;
    }


    const botonCancelar =
      evento.target.closest(
        "[data-cancelar]"
      );

    if (botonCancelar) {

      cancelarInscripcion(
        botonCancelar.dataset.cancelar
      );

      return;
    }


    const botonComprobante =
      evento.target.closest(
        "[data-ver-comprobante]"
      );

    if (botonComprobante) {

      verComprobante(
        botonComprobante.dataset
          .verComprobante
      );

    }

  }
);


/* ==========================================
   EVENTOS
========================================== */

formularioLogin?.addEventListener(
  "submit",
  iniciarSesion
);

botonCerrarSesion?.addEventListener(
  "click",
  cerrarSesion
);

botonActualizar?.addEventListener(
  "click",
  cargarInscripciones
);

selectorEvento?.addEventListener(
  "change",
  cargarInscripciones
);

buscadorInscripciones?.addEventListener(
  "input",
  aplicarFiltros
);

filtroEstado?.addEventListener(
  "change",
  aplicarFiltros
);

filtroPago?.addEventListener(
  "change",
  aplicarFiltros
);

cerrarModalComprobante?.addEventListener(
  "click",
  cerrarVisorComprobante
);

document
  .querySelectorAll(
    "[data-cerrar-comprobante]"
  )
  .forEach(
    (elemento) => {

      elemento.addEventListener(
        "click",
        cerrarVisorComprobante
      );

    }
  );
  botonNuevoEvento?.addEventListener(
  "click",
  abrirModalNuevoEvento
);

cerrarModalNuevoEvento?.addEventListener(
  "click",
  cerrarNuevoEvento
);

cancelarNuevoEvento?.addEventListener(
  "click",
  cerrarNuevoEvento
);

eventoSede?.addEventListener(
  "change",
  cargarComplejosPorSede
);

formularioNuevoEvento?.addEventListener(
  "submit",
  crearNuevoEvento
);

document
  .querySelectorAll(
    "[data-cerrar-nuevo-evento]"
  )
  .forEach(
    (elemento) => {

      elemento.addEventListener(
        "click",
        cerrarNuevoEvento
      );

    }
  );


/* ==========================================
   INICIO
========================================== */

verificarAccesoAdministrador();