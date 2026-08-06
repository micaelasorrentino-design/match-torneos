/* ==========================================
   MATCH — PANEL ADMINISTRADOR
   PARTE 1 DE 4
========================================== */


/* ==========================================
   ELEMENTOS GENERALES
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


/* ==========================================
   EVENTOS — LISTADO Y SIDEBAR
========================================== */

const selectorEvento =
  document.getElementById(
    "selector-evento"
  );

const botonNuevoEvento =
  document.getElementById(
    "boton-nuevo-evento"
  );

const listaEventosAdmin =
  document.getElementById(
    "lista-eventos-admin"
  );

const buscadorEventos =
  document.getElementById(
    "buscador-eventos"
  );

const filtrosEventosSidebar =
  document.querySelectorAll(
    "[data-filtro-eventos]"
  );

const tituloEventoAdministrado =
  document.getElementById(
    "titulo-evento-administrado"
  );

const descripcionEventoAdministrado =
  document.getElementById(
    "descripcion-evento-administrado"
  );

const botonEditarEvento =
  document.getElementById(
    "boton-editar-evento"
  );


/* ==========================================
   ESTADO DEL EVENTO
========================================== */

const adminEventoPublicado =
  document.getElementById(
    "admin-evento-publicado"
  );

const adminInscripcionesAbiertas =
  document.getElementById(
    "admin-inscripciones-abiertas"
  );

const adminEventoArchivado =
  document.getElementById(
    "admin-evento-archivado"
  );

const guardarEstadoEvento =
  document.getElementById(
    "guardar-estado-evento"
  );

const botonEliminarEvento =
  document.getElementById(
    "eliminar-evento"
  );

const textoEstadoPublicacion =
  document.getElementById(
    "texto-estado-publicacion"
  );


/* ==========================================
   INSCRIPCIONES
========================================== */

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


/* ==========================================
   MODAL DE COMPROBANTE
========================================== */

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


/* ==========================================
   MODAL NUEVO EVENTO
========================================== */

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

const eventoPublicado =
  document.getElementById(
    "evento-publicado"
  );

const eventoInscripcionesAbiertas =
  document.getElementById(
    "evento-inscripciones-abiertas"
  );

const eventoDescripcion =
  document.getElementById(
    "evento-descripcion"
  );


/* ==========================================
   VARIABLES GENERALES
========================================== */

let inscripcionesActuales = [];

let eventosAdministrables = [];

let eventoActual = "";

let filtroEventosActual = "todos";

let sedesDisponibles = [];

let complejosDisponibles = [];


/* ==========================================
   UTILIDADES
========================================== */

function escaparHTML(
  valor = ""
) {

  return String(valor)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}


function normalizarTexto(
  valor = ""
) {

  return String(valor)
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .trim();

}


function formatearFechaAdmin(
  fecha
) {

  if (!fecha) {
    return "Sin fecha";
  }

  const fechaLocal =
    new Date(
      `${fecha}T12:00:00`
    );

  return new Intl.DateTimeFormat(
    "es-AR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }
  ).format(
    fechaLocal
  );

}


function textoEstado(
  estado
) {

  const textos = {
    pendiente:
      "Pendiente",

    confirmada:
      "Confirmada",

    cancelada:
      "Cancelada"
  };

  return (
    textos[estado] ||
    estado ||
    "Sin estado"
  );

}


function textoPago(
  estadoPago
) {

  const textos = {
    pendiente:
      "Pago pendiente",

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
   LOGIN Y SESIÓN
========================================== */

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


async function verificarAccesoAdministrador() {

  const {
    data: {
      session
    }
  } =
    await window.db.auth
      .getSession();

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

  if (
    error ||
    !esAdmin
  ) {

    await window.db.auth
      .signOut();

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


async function iniciarSesion(
  evento
) {

  evento.preventDefault();

  if (errorLogin) {
    errorLogin.textContent = "";
  }

  botonLogin.disabled =
    true;

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

    botonLogin.disabled =
      false;

    botonLogin.textContent =
      "Ingresar";

  }

}


async function cerrarSesion() {

  await window.db.auth
    .signOut();

  inscripcionesActuales = [];

  eventosAdministrables = [];

  eventoActual = "";

  mostrarLogin();

}


/* ==========================================
   CARGAR SEDES Y COMPLEJOS
========================================== */

async function cargarSedesYComplejos() {

  const [
    respuestaSedes,
    respuestaComplejos
  ] =
    await Promise.all([

      window.db
        .from("sedes")
        .select(`
          id,
          nombre
        `)
        .eq(
          "activa",
          true
        )
        .order(
          "nombre"
        ),

      window.db
        .from("complejos")
        .select(`
          id,
          sede_id,
          nombre
        `)
        .order(
          "nombre"
        )

    ]);

  if (
    respuestaSedes.error
  ) {

    console.error(
      "Error al cargar sedes:",
      respuestaSedes.error
    );

    throw new Error(
      "No pudimos cargar las ciudades."
    );

  }

  if (
    respuestaComplejos.error
  ) {

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

  if (!eventoSede) {
    return;
  }

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

      opcion.value =
        sede.id;

      opcion.textContent =
        sede.nombre;

      eventoSede.appendChild(
        opcion
      );

    }
  );

}


function cargarComplejosPorSede() {

  if (
    !eventoSede ||
    !eventoComplejo
  ) {
    return;
  }

  const sedeId =
    eventoSede.value;

  eventoComplejo.innerHTML =
    "";

  if (!sedeId) {

    eventoComplejo.disabled =
      true;

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
        complejo.sede_id ===
        sedeId
    );

  eventoComplejo.disabled =
    false;

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


/* ==========================================
   ABRIR Y CERRAR NUEVO EVENTO
========================================== */

async function abrirModalNuevoEvento() {

  if (mensajeNuevoEvento) {

    mensajeNuevoEvento.textContent =
      "";

    mensajeNuevoEvento.style.color =
      "";

  }

  formularioNuevoEvento?.reset();

  if (eventoPublicado) {

    eventoPublicado.checked =
      false;

  }

  if (
    eventoInscripcionesAbiertas
  ) {

    eventoInscripcionesAbiertas.checked =
      false;

    eventoInscripcionesAbiertas.disabled =
      Boolean(eventoPublicado);

  }

  if (eventoComplejo) {

    eventoComplejo.disabled =
      true;

    eventoComplejo.innerHTML = `
      <option value="">
        Primero seleccioná una ciudad
      </option>
    `;

  }

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

    mensajeNuevoEvento.textContent =
      "";

    mensajeNuevoEvento.style.color =
      "";

  }

}
/* ==========================================
   MATCH — PANEL ADMINISTRADOR
   PARTE 2 DE 4
========================================== */


/* ==========================================
   CREAR NUEVO EVENTO
========================================== */

async function crearNuevoEvento(
  evento
) {

  evento.preventDefault();

  if (mensajeNuevoEvento) {

    mensajeNuevoEvento.textContent =
      "";

    mensajeNuevoEvento.style.color =
      "";

  }


  if (
    !eventoTitulo?.value.trim() ||
    !eventoTipo?.value ||
    !eventoCategoria?.value ||
    !eventoFecha?.value ||
    !eventoHoraInicio?.value ||
    !eventoSede?.value ||
    !eventoComplejo?.value ||
    !eventoPrecio?.value ||
    !eventoCupos?.value
  ) {

    if (mensajeNuevoEvento) {

      mensajeNuevoEvento.textContent =
        "Completá todos los campos obligatorios.";

    }

    return;

  }


  if (
    eventoHoraFin?.value &&
    eventoHoraFin.value <=
      eventoHoraInicio.value
  ) {

    if (mensajeNuevoEvento) {

      mensajeNuevoEvento.textContent =
        "La hora de finalización debe ser posterior a la hora de inicio.";

    }

    return;

  }


  const complejoSeleccionado =
    complejosDisponibles.find(
      (complejo) =>
        complejo.id ===
        eventoComplejo.value
    );


  if (!complejoSeleccionado) {

    if (mensajeNuevoEvento) {

      mensajeNuevoEvento.textContent =
        "Seleccioná un complejo.";

    }

    return;

  }


  const publicado =
    Boolean(
      eventoPublicado?.checked
    );


  const inscripcionesAbiertas =
    publicado &&
    Boolean(
      eventoInscripcionesAbiertas
        ?.checked
    );


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
      eventoHoraFin.value ||
      null,

    lugar:
      complejoSeleccionado.nombre,

    precio:
      Number(
        eventoPrecio.value
      ),

    cupos_totales:
      Number(
        eventoCupos.value
      ),

    publicado:
      publicado,

    archivado:
      false,

    inscripciones_abiertas:
      inscripcionesAbiertas,

    descripcion:
      eventoDescripcion?.value
        .trim() ||
      null,

    sede_id:
      eventoSede.value,

    complejo_id:
      eventoComplejo.value

  };


  if (
    registro.cupos_totales < 1
  ) {

    if (mensajeNuevoEvento) {

      mensajeNuevoEvento.textContent =
        "Los cupos deben ser mayores que cero.";

    }

    return;

  }


  if (
    registro.precio < 0
  ) {

    if (mensajeNuevoEvento) {

      mensajeNuevoEvento.textContent =
        "El precio no puede ser negativo.";

    }

    return;

  }


  if (guardarNuevoEvento) {

    guardarNuevoEvento.disabled =
      true;

    guardarNuevoEvento.textContent =
      "Creando evento...";

  }


  try {

    const {
      data,
      error
    } =
      await window.db
        .from("eventos")
        .insert(
          registro
        )
        .select(
          "id"
        )
        .single();


    if (error) {
      throw error;
    }


    if (mensajeNuevoEvento) {

      mensajeNuevoEvento.textContent =
        "✓ Evento creado correctamente.";

      mensajeNuevoEvento.style.color =
        "#4e8b68";

    }


    eventoActual =
      data?.id || "";


    await cargarEventos();


    window.setTimeout(
      () => {

        cerrarNuevoEvento();

      },
      800
    );

  } catch (error) {

    console.error(
      "Error al crear evento:",
      error
    );


    if (mensajeNuevoEvento) {

      mensajeNuevoEvento.style.color =
        "";

      mensajeNuevoEvento.textContent =
        error.message ||
        "No pudimos crear el evento.";

    }

  } finally {

    if (guardarNuevoEvento) {

      guardarNuevoEvento.disabled =
        false;

      guardarNuevoEvento.textContent =
        "Crear evento";

    }

  }

}


/* ==========================================
   ESTADO VISUAL DE LOS EVENTOS
========================================== */

function obtenerEstadoEvento(
  evento
) {

  if (
    evento.archivado
  ) {

    return {

      texto:
        "Archivado",

      clase:
        "estado-evento-archivado"

    };

  }


  if (
    !evento.publicado
  ) {

    return {

      texto:
        "Borrador",

      clase:
        "estado-evento-borrador"

    };

  }


  if (
    evento.inscripciones_abiertas
  ) {

    return {

      texto:
        "Publicado",

      clase:
        "estado-evento-publicado"

    };

  }


  return {

    texto:
      "Inscripciones cerradas",

    clase:
      "estado-evento-publicado"

  };

}


/* ==========================================
   FILTRAR EVENTOS DEL SIDEBAR
========================================== */

function obtenerEventosFiltrados() {

  const busqueda =
    normalizarTexto(
      buscadorEventos?.value ||
      ""
    );


  return eventosAdministrables.filter(
    (evento) => {

      const textoEvento =
        normalizarTexto(
          [
            evento.titulo,
            evento.categoria,
            evento.fecha,
            evento.descripcion
          ]
            .filter(Boolean)
            .join(" ")
        );


      const coincideBusqueda =
        !busqueda ||
        textoEvento.includes(
          busqueda
        );


      let coincideEstado =
        true;


      if (
        filtroEventosActual ===
        "publicados"
      ) {

        coincideEstado =
          Boolean(
            evento.publicado
          ) &&
          !evento.archivado;

      }


      if (
        filtroEventosActual ===
        "borradores"
      ) {

        coincideEstado =
          !evento.publicado &&
          !evento.archivado;

      }


      if (
        filtroEventosActual ===
        "archivados"
      ) {

        coincideEstado =
          Boolean(
            evento.archivado
          );

      }


      return (
        coincideBusqueda &&
        coincideEstado
      );

    }
  );

}


/* ==========================================
   RENDERIZAR SIDEBAR DE EVENTOS
========================================== */

function renderizarListaEventos() {

  if (!listaEventosAdmin) {
    return;
  }


  const eventos =
    obtenerEventosFiltrados();


  if (!eventos.length) {

    listaEventosAdmin.innerHTML = `
      <p class="sidebar-vacio">
        No hay eventos para mostrar.
      </p>
    `;

    return;

  }


  listaEventosAdmin.innerHTML =
    eventos
      .map(
        (evento) => {

          const estado =
            obtenerEstadoEvento(
              evento
            );


          const seleccionado =
            evento.id ===
            eventoActual;


          return `
            <button
              type="button"
              class="evento-sidebar-item ${
                seleccionado
                  ? "activo"
                  : ""
              }"
              data-seleccionar-evento="${
                evento.id
              }"
            >

              <strong>
                ${escaparHTML(
                  evento.titulo ||
                  "Evento sin título"
                )}
              </strong>

              <small>
                ${escaparHTML(
                  evento.categoria ||
                  "Sin categoría"
                )}

                ·

                ${escaparHTML(
                  formatearFechaAdmin(
                    evento.fecha
                  )
                )}
              </small>

              <span
                class="estado-evento-sidebar ${
                  estado.clase
                }"
              >
                ${escaparHTML(
                  estado.texto
                )}
              </span>

            </button>
          `;

        }
      )
      .join("");

}


/* ==========================================
   CABECERA DEL EVENTO SELECCIONADO
========================================== */

function actualizarCabeceraEvento() {

  const evento =
    eventosAdministrables.find(
      (item) =>
        item.id === eventoActual
    );


  /* SIN EVENTO SELECCIONADO */

  if (!evento) {

    if (
      tituloEventoAdministrado
    ) {

      tituloEventoAdministrado
        .textContent =
        "Hola, Mica 💜";

    }


    if (
      descripcionEventoAdministrado
    ) {

      descripcionEventoAdministrado
        .textContent =
        "Seleccioná un evento para administrar sus inscripciones, pagos y configuración.";

    }


    if (botonEditarEvento) {

      botonEditarEvento.disabled =
        true;

    }


    if (botonAgregarPartido) {

      botonAgregarPartido.disabled =
        true;

    }


    return;

  }


  /* EVENTO SELECCIONADO */

  if (
    tituloEventoAdministrado
  ) {

    tituloEventoAdministrado
      .textContent =
      evento.titulo ||
      "Evento MATCH";

  }


  if (
    descripcionEventoAdministrado
  ) {

    const partes = [

      evento.categoria,

      formatearFechaAdmin(
        evento.fecha
      )

    ].filter(Boolean);


    descripcionEventoAdministrado
      .textContent =
      partes.join(" · ");

  }


  if (botonEditarEvento) {

    botonEditarEvento.disabled =
      false;

  }


  if (botonAgregarPartido) {

    botonAgregarPartido.disabled =
      false;

  }

}

/* ==========================================
   CONTROLES DE PUBLICACIÓN
========================================== */

function actualizarControlesPublicacion() {

  const evento =
    eventosAdministrables.find(
      (item) =>
        item.id ===
        eventoActual
    );


  if (!evento) {

    if (adminEventoPublicado) {

      adminEventoPublicado.checked =
        false;

      adminEventoPublicado.disabled =
        true;

    }


    if (
      adminInscripcionesAbiertas
    ) {

      adminInscripcionesAbiertas.checked =
        false;

      adminInscripcionesAbiertas.disabled =
        true;

    }


    if (adminEventoArchivado) {

      adminEventoArchivado.checked =
        false;

      adminEventoArchivado.disabled =
        true;

    }


    if (guardarEstadoEvento) {

      guardarEstadoEvento.disabled =
        true;

    }


    if (botonEliminarEvento) {

      botonEliminarEvento.disabled =
        true;

    }


    if (
      textoEstadoPublicacion
    ) {

      textoEstadoPublicacion.textContent =
        "Seleccioná un evento.";

    }


    return;

  }


  if (adminEventoPublicado) {

    adminEventoPublicado.disabled =
      false;

    adminEventoPublicado.checked =
      Boolean(
        evento.publicado
      );

  }


  if (adminEventoArchivado) {

    adminEventoArchivado.disabled =
      false;

    adminEventoArchivado.checked =
      Boolean(
        evento.archivado
      );

  }


  if (
    adminInscripcionesAbiertas
  ) {

    adminInscripcionesAbiertas.checked =
      Boolean(
        evento.inscripciones_abiertas
      );

    adminInscripcionesAbiertas.disabled =
      !evento.publicado ||
      evento.archivado;

  }


  if (guardarEstadoEvento) {

    guardarEstadoEvento.disabled =
      false;

  }


  if (botonEliminarEvento) {

    botonEliminarEvento.disabled =
      false;

  }


  if (
    textoEstadoPublicacion
  ) {

    if (evento.archivado) {

      textoEstadoPublicacion.textContent =
        "Evento archivado: no aparece en la web, pero continúa guardado en el panel.";

    } else if (
      !evento.publicado
    ) {

      textoEstadoPublicacion.textContent =
        "Borrador privado: solo aparece en el administrador.";

    } else if (
      evento.inscripciones_abiertas
    ) {

      textoEstadoPublicacion.textContent =
        "Publicado y aceptando inscripciones.";

    } else {

      textoEstadoPublicacion.textContent =
        "Publicado con las inscripciones cerradas.";

    }

  }

}


/* ==========================================
   SELECCIONAR EVENTO
========================================== */

async function seleccionarEventoAdmin(
  eventoId
) {

  const existe =
    eventosAdministrables.some(
      (evento) =>
        evento.id ===
        eventoId
    );


  if (!existe) {
    return;
  }


  eventoActual =
    eventoId;


  if (selectorEvento) {

    selectorEvento.value =
      eventoId;

  }


  renderizarListaEventos();

  actualizarCabeceraEvento();

  actualizarControlesPublicacion();


  await cargarInscripciones();

}


/* ==========================================
   CARGAR EVENTOS DEL ADMINISTRADOR
========================================== */

async function cargarEventos() {

  if (selectorEvento) {
    selectorEvento.innerHTML = `
      <option value="">
        Seleccioná un evento
      </option>
    `;
  }

  if (listaEventosAdmin) {
    listaEventosAdmin.innerHTML = `
      <p class="sidebar-vacio">
        Cargando eventos...
      </p>
    `;
  }

  try {

    const {
      data,
      error
    } =
      await window.db
        .from("eventos")
        .select(`
          id,
          titulo,
          tipo,
          categoria,
          descripcion,
          fecha,
          hora_inicio,
          hora_fin,
          precio,
          cupos_totales,
          lugar,
          sede_id,
          complejo_id,
          publicado,
          archivado,
          inscripciones_abiertas
        `)
        .order(
          "fecha",
          {
            ascending: false
          }
        );

    if (error) {
      throw error;
    }

    eventosAdministrables =
      data || [];

    if (!eventosAdministrables.length) {

      eventoActual = "";
      inscripcionesActuales = [];

      renderizarListaEventos();
      actualizarCabeceraEvento();
      actualizarControlesPublicacion();
      renderizarTabla([]);
      actualizarResumen();

      return;
    }

    eventosAdministrables.forEach(
      (evento) => {

        if (!selectorEvento) {
          return;
        }

        const opcion =
          document.createElement(
            "option"
          );

        opcion.value =
          evento.id;

        opcion.textContent =
          `${evento.titulo} · ${formatearFechaAdmin(
            evento.fecha
          )}`;

        selectorEvento.appendChild(
          opcion
        );

      }
    );

    const eventoAnteriorExiste =
      eventosAdministrables.some(
        (evento) =>
          evento.id === eventoActual
      );

    const eventoInicial =
      eventoAnteriorExiste
        ? eventoActual
        : eventosAdministrables[0].id;

    renderizarListaEventos();

    await seleccionarEventoAdmin(
      eventoInicial
    );

  } catch (error) {

    console.error(
      "Error al cargar eventos del administrador:",
      error
    );

    eventosAdministrables = [];
    eventoActual = "";

    if (listaEventosAdmin) {
      listaEventosAdmin.innerHTML = `
        <p class="sidebar-vacio">
          No pudimos cargar los eventos.
        </p>
      `;
    }

    actualizarCabeceraEvento();
    actualizarControlesPublicacion();
    renderizarTabla([]);
    actualizarResumen();

  }

}

/* ==========================================
   GUARDAR ESTADO DEL EVENTO
========================================== */

async function guardarEstadoPublicacion() {

  if (!eventoActual) {

    alert(
      "Seleccioná un evento."
    );

    return;

  }

  const archivado =
    Boolean(
      adminEventoArchivado?.checked
    );

  const publicado =
    archivado
      ? false
      : Boolean(
          adminEventoPublicado?.checked
        );

  const inscripcionesAbiertas =
    !archivado &&
    publicado &&
    Boolean(
      adminInscripcionesAbiertas?.checked
    );

  if (guardarEstadoEvento) {

    guardarEstadoEvento.disabled =
      true;

    guardarEstadoEvento.textContent =
      "Guardando...";

  }

  try {

    const {
      error
    } =
      await window.db
        .from("eventos")
        .update({
          publicado:
            publicado,

          archivado:
            archivado,

          inscripciones_abiertas:
            inscripcionesAbiertas
        })
        .eq(
          "id",
          eventoActual
        );

    if (error) {
      throw error;
    }

    const eventoSeleccionado =
      eventoActual;

    await cargarEventos();

    if (
      eventosAdministrables.some(
        (evento) =>
          evento.id ===
          eventoSeleccionado
      )
    ) {

      await seleccionarEventoAdmin(
        eventoSeleccionado
      );

    }

    if (archivado) {

      alert(
        "Evento archivado y ocultado de la web."
      );

    } else if (!publicado) {

      alert(
        "Evento guardado como borrador."
      );

    } else if (
      inscripcionesAbiertas
    ) {

      alert(
        "Evento publicado con inscripciones abiertas."
      );

    } else {

      alert(
        "Evento publicado con inscripciones cerradas."
      );

    }

  } catch (error) {

    console.error(
      "Error al guardar estado del evento:",
      error
    );

    alert(
      "No pudimos actualizar el evento."
    );

  } finally {

    if (guardarEstadoEvento) {

      guardarEstadoEvento.disabled =
        false;

      guardarEstadoEvento.textContent =
        "Guardar estado";

    }

  }

}

/* ==========================================
   ELIMINAR EVENTO
========================================== */

async function eliminarEventoSeleccionado() {

  if (!eventoActual) {

    alert(
      "Seleccioná un evento."
    );

    return;

  }


  const evento =
    eventosAdministrables.find(
      (item) =>
        item.id ===
        eventoActual
    );


  if (!evento) {

    alert(
      "No encontramos el evento."
    );

    return;

  }


  const {
    count,
    error: errorConteo
  } =
    await window.db
      .from("inscripciones")
      .select(
        "id",
        {
          count:
            "exact",

          head:
            true
        }
      )
      .eq(
        "evento_id",
        eventoActual
      );


  if (errorConteo) {

    console.error(
      "Error al verificar inscripciones:",
      errorConteo
    );


    alert(
      "No pudimos verificar si el evento tiene inscripciones."
    );

    return;

  }


  if (
    Number(count) > 0
  ) {

    alert(
      `Este evento tiene ${count} inscripción${
        Number(count) === 1
          ? ""
          : "es"
      } y no se puede eliminar.\n\nUsá “Archivado” para ocultarlo sin perder los datos.`
    );

    return;

  }


  const primeraConfirmacion =
    window.confirm(
      `¿Eliminar definitivamente "${evento.titulo}"?\n\nEsta acción no se puede deshacer.`
    );


  if (!primeraConfirmacion) {
    return;
  }


  const textoConfirmacion =
    window.prompt(
      "Para confirmar, escribí ELIMINAR"
    );


  if (
    textoConfirmacion
      ?.trim()
      .toUpperCase() !==
    "ELIMINAR"
  ) {

    alert(
      "El evento no fue eliminado."
    );

    return;

  }


  if (botonEliminarEvento) {

    botonEliminarEvento.disabled =
      true;

    botonEliminarEvento.textContent =
      "Eliminando...";

  }


  try {

    const {
      error
    } =
      await window.db
        .from("eventos")
        .delete()
        .eq(
          "id",
          eventoActual
        );


    if (error) {
      throw error;
    }


    eventoActual =
      "";

    inscripcionesActuales =
      [];


    alert(
      "Evento eliminado correctamente."
    );


    await cargarEventos();

  } catch (error) {

    console.error(
      "Error al eliminar evento:",
      error
    );


    alert(
      "No pudimos eliminar el evento."
    );

  } finally {

    if (botonEliminarEvento) {

      botonEliminarEvento.disabled =
        false;

      botonEliminarEvento.textContent =
        "Eliminar";

    }

  }

}
/* ==========================================
   MATCH — PANEL ADMINISTRADOR
   PARTE 3 DE 4
========================================== */


/* ==========================================
   CARGAR INSCRIPCIONES
========================================== */

async function cargarInscripciones() {

  if (!eventoActual) {

    inscripcionesActuales = [];

    renderizarTabla();

    actualizarResumen();

    return;

  }


  if (tablaInscripciones) {

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

  }


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
          ascending:
            true
        }
      );


  if (error) {

    console.error(
      "Error al cargar inscripciones:",
      error
    );


    if (tablaInscripciones) {

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

    }


    if (
      textoCantidadInscripciones
    ) {

      textoCantidadInscripciones.textContent =
        "Error al cargar inscripciones";

    }


    return;

  }


  inscripcionesActuales =
    data || [];


  aplicarFiltros();

  actualizarResumen();

}


/* ==========================================
   FILTRAR INSCRIPCIONES
========================================== */

function obtenerInscripcionesFiltradas() {

  const busqueda =
    normalizarTexto(
      buscadorInscripciones
        ?.value ||
      ""
    );


  const estado =
    filtroEstado?.value ||
    "";


  const pago =
    filtroPago?.value ||
    "";


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
            participante
              .telefono_normalizado,
            participante.email,
            inscripcion
              .nombre_companera,
            inscripcion
              .telefono_companera,
            inscripcion.posicion
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
   RENDERIZAR TABLA
========================================== */

function renderizarTabla(
  inscripciones =
    inscripcionesActuales
) {

  if (!tablaInscripciones) {
    return;
  }


  if (!eventoActual) {

    tablaInscripciones.innerHTML = `
      <tr>
        <td
          colspan="7"
          class="tabla-vacia"
        >
          Seleccioná un evento para ver sus inscripciones.
        </td>
      </tr>
    `;


    if (
      textoCantidadInscripciones
    ) {

      textoCantidadInscripciones.textContent =
        "Seleccioná un evento.";

    }


    return;

  }


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


    if (
      textoCantidadInscripciones
    ) {

      textoCantidadInscripciones.textContent =
        "0 inscripciones";

    }


    return;

  }


  if (
    textoCantidadInscripciones
  ) {

    textoCantidadInscripciones.textContent =
      `${inscripciones.length} inscripción${
        inscripciones.length === 1
          ? ""
          : "es"
      }`;

  }


  tablaInscripciones.innerHTML =
    inscripciones
      .map(
        crearFilaInscripcion
      )
      .join("");

}


/* ==========================================
   CREAR FILA DE INSCRIPCIÓN
========================================== */

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
    inscripcion.modalidad ===
    "pareja"
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
          data-ver-comprobante="${
            inscripcion.id
          }"
        >
          Ver archivo
        </button>
      `
      : `
        <span>
          Sin comprobante
        </span>
      `;


  const accionesConfirmacion =
    inscripcion.estado !==
    "confirmada"
      ? `
        <button
          type="button"
          class="boton-tabla boton-tabla-principal"
          data-confirmar="${
            inscripcion.id
          }"
        >
          Confirmar pago
        </button>
      `
      : `
        <span
          class="estado-chip estado-confirmada"
        >
          Confirmada
        </span>
      `;


  const accionCancelar =
    inscripcion.estado !==
    "cancelada"
      ? `
        <button
          type="button"
          class="boton-tabla boton-cancelar"
          data-cancelar="${
            inscripcion.id
          }"
        >
          Cancelar
        </button>
      `
      : "";


  const botonWhatsapp =
    participante
      .telefono_normalizado
      ? `
        <a
          href="https://wa.me/54${escaparHTML(
            participante
              .telefono_normalizado
          )}"
          target="_blank"
          rel="noopener noreferrer"
          class="boton-tabla"
        >
          WhatsApp
        </a>
      `
      : "";


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
              participante
                .telefono_normalizado ||
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

          ${accionesConfirmacion}

          ${accionCancelar}

          ${botonWhatsapp}

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
        Boolean(
          item.comprobante_path
        )
    ).length;


  const confirmadas =
    inscripcionesActuales.filter(
      (item) =>
        item.estado ===
        "confirmada"
    ).length;


  if (resumenTotal) {

    resumenTotal.textContent =
      total;

  }


  if (resumenPendientes) {

    resumenPendientes.textContent =
      pendientes;

  }


  if (resumenComprobantes) {

    resumenComprobantes.textContent =
      comprobantes;

  }


  if (resumenConfirmadas) {

    resumenConfirmadas.textContent =
      confirmadas;

  }

}


/* ==========================================
   ACTUALIZAR INSCRIPCIÓN
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
      .update(
        cambios
      )
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
   CONFIRMAR INSCRIPCIÓN
========================================== */

async function confirmarInscripcion(
  inscripcionId
) {

  const inscripcion =
    inscripcionesActuales.find(
      (item) =>
        item.id ===
        inscripcionId
    );


  if (!inscripcion) {

    alert(
      "No encontramos la inscripción."
    );

    return;

  }


  if (
    inscripcion.estado ===
      "confirmada" &&
    inscripcion.estado_pago ===
      "confirmado"
  ) {

    alert(
      "Esta inscripción ya está confirmada."
    );

    return;

  }


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


  const confirmar =
    window.confirm(
      `¿Confirmar la inscripción y el pago de ${
        nombreCompleto ||
        "esta participante"
      }?`
    );


  if (!confirmar) {
    return;
  }


  const actualizado =
    await actualizarInscripcion(
      inscripcionId,
      {
        estado:
          "confirmada",

        estado_pago:
          "confirmado"
      }
    );


  if (actualizado) {

    alert(
      "Inscripción y pago confirmados."
    );

  }

}


/* ==========================================
   CANCELAR INSCRIPCIÓN
========================================== */

async function cancelarInscripcion(
  inscripcionId
) {

  const inscripcion =
    inscripcionesActuales.find(
      (item) =>
        item.id ===
        inscripcionId
    );


  if (!inscripcion) {

    alert(
      "No encontramos la inscripción."
    );

    return;

  }


  if (
    inscripcion.estado ===
    "cancelada"
  ) {

    alert(
      "Esta inscripción ya está cancelada."
    );

    return;

  }


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


  const confirmar =
    window.confirm(
      `¿Cancelar la inscripción de ${
        nombreCompleto ||
        "esta participante"
      }?\n\nEl cupo volverá a quedar disponible.`
    );


  if (!confirmar) {
    return;
  }


  const actualizado =
    await actualizarInscripcion(
      inscripcionId,
      {
        estado:
          "cancelada"
      }
    );


  if (actualizado) {

    alert(
      "Inscripción cancelada. El cupo quedó liberado."
    );

  }

}


/* ==========================================
   VER COMPROBANTE
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


  if (visorComprobante) {

    visorComprobante.innerHTML = `
      <p>
        Cargando comprobante...
      </p>
    `;

  }


  modalComprobante
    ?.classList.remove(
      "oculto"
    );


  const {
    data,
    error
  } =
    await window.db.storage
      .from("comprobantes")
      .createSignedUrl(
        inscripcion
          .comprobante_path,
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


    if (visorComprobante) {

      visorComprobante.innerHTML = `
        <p>
          No pudimos abrir el comprobante.
        </p>
      `;

    }


    return;

  }


  const url =
    data.signedUrl;


  const esPdf =
    inscripcion
      .comprobante_path
      .toLowerCase()
      .endsWith(
        ".pdf"
      );


  if (
    tituloModalComprobante
  ) {

    tituloModalComprobante.textContent =
      "Comprobante de pago";

  }


  if (visorComprobante) {

    visorComprobante.innerHTML =
      esPdf
        ? `
          <iframe
            src="${escaparHTML(
              url
            )}"
            title="Comprobante de pago"
          ></iframe>
        `
        : `
          <img
            src="${escaparHTML(
              url
            )}"
            alt="Comprobante de pago"
          >
        `;

  }

}


/* ==========================================
   CERRAR COMPROBANTE
========================================== */

function cerrarVisorComprobante() {

  modalComprobante
    ?.classList.add(
      "oculto"
    );


  if (visorComprobante) {

    visorComprobante.innerHTML =
      "";

  }

}
/* ==========================================
   MATCH — PANEL ADMINISTRADOR
   PARTE 4 DE 4
========================================== */
/* ==========================================
   PESTAÑAS DEL EVENTO
========================================== */

const tabsEventoAdmin =
  document.querySelectorAll(
    "[data-tab-evento]"
  );

const panelTabInscripciones =
  document.getElementById(
    "panel-tab-inscripciones"
  );

const panelTabResultados =
  document.getElementById(
    "panel-tab-resultados"
  );

const botonAgregarPartido =
  document.getElementById(
    "boton-agregar-partido"
  );

const modalPartido =
  document.getElementById(
    "modal-partido"
  );

const cerrarModalPartido =
  document.getElementById(
    "cerrar-modal-partido"
  );

const cancelarPartido =
  document.getElementById(
    "cancelar-partido"
  );

  /* ==========================================
   SELECTORES DE JUGADORAS
========================================== */

const equipo1Jugadora1 =
  document.getElementById(
    "equipo-1-jugadora-1"
  );

const equipo1Jugadora2 =
  document.getElementById(
    "equipo-1-jugadora-2"
  );

const equipo2Jugadora1 =
  document.getElementById(
    "equipo-2-jugadora-1"
  );

const equipo2Jugadora2 =
  document.getElementById(
    "equipo-2-jugadora-2"
  );

const selectoresJugadoras = [
  equipo1Jugadora1,
  equipo1Jugadora2,
  equipo2Jugadora1,
  equipo2Jugadora2
];

function cambiarTabEvento(
  tabSeleccionada
) {

  tabsEventoAdmin.forEach(
    (boton) => {

      boton.classList.toggle(
        "activo",
        boton.dataset.tabEvento ===
          tabSeleccionada
      );

    }
  );

  panelTabInscripciones
    ?.classList.toggle(
      "oculto",
      tabSeleccionada !==
        "inscripciones"
    );

  panelTabResultados
    ?.classList.toggle(
      "oculto",
      tabSeleccionada !==
        "resultados"
    );

}

/* ==========================================
   CARGAR JUGADORAS DEL EVENTO
========================================== */

function cargarJugadorasEnPartido() {

  const inscripcionesDisponibles =
    inscripcionesActuales.filter(
      (inscripcion) =>
        inscripcion.estado !==
        "cancelada"
    );

  const opciones =
    inscripcionesDisponibles
      .map(
        (inscripcion) => {

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

          return `
            <option value="${escaparHTML(
              inscripcion.id
            )}">
              ${escaparHTML(
                nombreCompleto ||
                "Participante sin nombre"
              )}
            </option>
          `;

        }
      )
      .join("");


  selectoresJugadoras.forEach(
    (selector) => {

      if (!selector) {
        return;
      }

      selector.innerHTML = `
        <option value="">
          Seleccioná una jugadora
        </option>

        ${opciones}
      `;

    }
  );

}

/* ==========================================
   CARGAR JUGADORAS DEL EVENTO SELECCIONADO
========================================== */

function cargarJugadorasEnPartido() {

  const jugadorasDisponibles =
    inscripcionesActuales.filter(
      (inscripcion) =>
        inscripcion.estado !==
        "cancelada"
    );


  const opciones =
    jugadorasDisponibles
      .map(
        (inscripcion) => {

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

          return `
            <option value="${escaparHTML(
              inscripcion.id
            )}">
              ${escaparHTML(
                nombreCompleto ||
                "Jugadora sin nombre"
              )}
            </option>
          `;

        }
      )
      .join("");


  selectoresJugadoras.forEach(
    (selector) => {

      if (!selector) {
        return;
      }

      selector.innerHTML = `
        <option value="">
          Seleccioná una jugadora
        </option>

        ${opciones}
      `;

    }
  );

}

function abrirModalPartido() {

  if (!eventoActual) {

    alert(
      "Seleccioná un evento primero."
    );

    return;

  }


  if (!inscripcionesActuales.length) {

    alert(
      "Este evento no tiene jugadoras cargadas."
    );

    return;

  }


  cargarJugadorasEnPartido();


  modalPartido?.classList.remove(
    "oculto"
  );

  document.body.style.overflow =
    "hidden";

}

/* ==========================================
   CLICS DINÁMICOS
========================================== */

document.addEventListener(
  "click",
  (evento) => {

    const botonEvento =
      evento.target.closest(
        "[data-seleccionar-evento]"
      );

    if (botonEvento) {

      seleccionarEventoAdmin(
        botonEvento.dataset
          .seleccionarEvento
      );

      return;

    }


    const botonConfirmar =
      evento.target.closest(
        "[data-confirmar]"
      );

    if (botonConfirmar) {

      confirmarInscripcion(
        botonConfirmar.dataset
          .confirmar
      );

      return;

    }


    const botonCancelar =
      evento.target.closest(
        "[data-cancelar]"
      );

    if (botonCancelar) {

      cancelarInscripcion(
        botonCancelar.dataset
          .cancelar
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
   LOGIN Y SESIÓN
========================================== */

formularioLogin?.addEventListener(
  "submit",
  iniciarSesion
);


botonCerrarSesion?.addEventListener(
  "click",
  cerrarSesion
);


/* ==========================================
   ACTUALIZAR DATOS
========================================== */

botonActualizar?.addEventListener(
  "click",
  async () => {

    await cargarEventos();

  }
);


/* ==========================================
   CREAR EVENTO
========================================== */

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


formularioNuevoEvento?.addEventListener(
  "submit",
  crearNuevoEvento
);


eventoSede?.addEventListener(
  "change",
  cargarComplejosPorSede
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
   PUBLICACIÓN, ARCHIVO Y ELIMINACIÓN
========================================== */

guardarEstadoEvento?.addEventListener(
  "click",
  guardarEstadoPublicacion
);


botonEliminarEvento?.addEventListener(
  "click",
  eliminarEventoSeleccionado
);


adminEventoPublicado?.addEventListener(
  "change",
  () => {

    if (
      adminEventoPublicado.checked
    ) {

      if (adminEventoArchivado) {

        adminEventoArchivado.checked =
          false;

      }


      if (
        adminInscripcionesAbiertas
      ) {

        adminInscripcionesAbiertas.disabled =
          false;

      }

    } else {

      if (
        adminInscripcionesAbiertas
      ) {

        adminInscripcionesAbiertas.checked =
          false;

        adminInscripcionesAbiertas.disabled =
          true;

      }

    }

  }
);


adminEventoArchivado?.addEventListener(
  "change",
  () => {

    if (
      adminEventoArchivado.checked
    ) {

      if (adminEventoPublicado) {

        adminEventoPublicado.checked =
          false;

      }


      if (
        adminInscripcionesAbiertas
      ) {

        adminInscripcionesAbiertas.checked =
          false;

        adminInscripcionesAbiertas.disabled =
          true;

      }

    } else {

      if (
        adminInscripcionesAbiertas
      ) {

        adminInscripcionesAbiertas.disabled =
          !adminEventoPublicado
            ?.checked;

      }

    }

  }
);


eventoPublicado?.addEventListener(
  "change",
  () => {

    if (
      eventoInscripcionesAbiertas
    ) {

      eventoInscripcionesAbiertas.checked =
        false;

      eventoInscripcionesAbiertas.disabled =
        !eventoPublicado.checked;

    }

  }
);


/* ==========================================
   SIDEBAR DE EVENTOS
========================================== */

buscadorEventos?.addEventListener(
  "input",
  renderizarListaEventos
);


filtrosEventosSidebar.forEach(
  (boton) => {

    boton.addEventListener(
      "click",
      () => {

        filtroEventosActual =
          boton.dataset
            .filtroEventos ||
          "todos";


        filtrosEventosSidebar.forEach(
          (item) => {

            item.classList.remove(
              "activo"
            );

          }
        );


        boton.classList.add(
          "activo"
        );


        renderizarListaEventos();

      }
    );

  }
);


selectorEvento?.addEventListener(
  "change",
  () => {

    if (
      selectorEvento.value
    ) {

      seleccionarEventoAdmin(
        selectorEvento.value
      );

    }

  }
);


/* ==========================================
   FILTROS DE INSCRIPCIONES
========================================== */

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


/* ==========================================
   MODAL DE COMPROBANTE
========================================== */

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


/* ==========================================
   ATAJOS DE TECLADO
========================================== */

document.addEventListener(
  "keydown",
  (evento) => {

    if (
      evento.key !==
      "Escape"
    ) {
      return;
    }


    if (
      modalComprobante &&
      !modalComprobante.classList
        .contains("oculto")
    ) {

      cerrarVisorComprobante();

    }


    if (
      modalNuevoEvento &&
      !modalNuevoEvento.classList
        .contains("oculto")
    ) {

      cerrarNuevoEvento();

    }

  }
);

/* ==========================================
   EVITAR JUGADORAS REPETIDAS
========================================== */

function actualizarJugadorasDeshabilitadas() {

  const valoresSeleccionados =
    selectoresJugadoras
      .map(
        (selector) =>
          selector?.value
      )
      .filter(Boolean);


  selectoresJugadoras.forEach(
    (selectorActual) => {

      if (!selectorActual) {
        return;
      }

      Array.from(
        selectorActual.options
      ).forEach(
        (opcion) => {

          if (!opcion.value) {
            return;
          }

          opcion.disabled =
            valoresSeleccionados.includes(
              opcion.value
            ) &&
            selectorActual.value !==
              opcion.value;

        }
      );

    }
  );

}


selectoresJugadoras.forEach(
  (selector) => {

    selector?.addEventListener(
      "change",
      actualizarJugadorasDeshabilitadas
    );

  }
);


/* ==========================================
   INICIO
========================================== */

verificarAccesoAdministrador();