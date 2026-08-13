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

  const botonImprimirInscripciones =
  document.getElementById(
    "boton-imprimir-inscripciones"
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

let partidosActuales = [];

let fixtureTemporal = null;

let partidoEditandoId = "";

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
  estadoPago,
  medioPago = ""
) {

  if (
    estadoPago === "confirmado" &&
    medioPago === "transferencia"
  ) {
    return "Pago confirmado · Transferencia";
  }

  if (
    estadoPago === "confirmado" &&
    medioPago === "efectivo"
  ) {
    return "Pago confirmado · Efectivo";
  }

  const textos = {
    pendiente: "Pago pendiente",
    comprobante_recibido: "Comprobante recibido",
    confirmado: "Pago confirmado",
    rechazado: "Pago rechazado"
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
        evento.id === eventoId
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

  await cargarPartidosEvento();

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
medio_pago,
estado_pago_companera,
medio_pago_companera,
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

      // Ocultar inscripciones canceladas del listado
if (inscripcion.estado === "cancelada") {
  return false;
}

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

  const cantidadJugadoras =
    inscripciones.reduce(
      (total, inscripcion) => {

        if (
          inscripcion.modalidad === "pareja" &&
          inscripcion.nombre_companera
        ) {
          return total + 2;
        }

        return total + 1;

      },
      0
    );


  textoCantidadInscripciones.textContent =
    `${inscripciones.length} inscripción${
      inscripciones.length === 1
        ? ""
        : "es"
    } · ${cantidadJugadoras} jugadora${
      cantidadJugadoras === 1
        ? ""
        : "s"
    }`;

}


tablaInscripciones.innerHTML =
  inscripciones
    .map(
      (inscripcion) => {

        let filas =
          crearFilaInscripcion(
            inscripcion
          );

        if (
          inscripcion.modalidad === "pareja" &&
          inscripcion.nombre_companera
        ) {

          filas +=
            crearFilaCompanera(
              inscripcion
            );

        }

        return filas;

      }
    )
    .join("");

}

/* ==========================================
   IMPRIMIR LISTADO DE INSCRIPCIONES
========================================== */

function imprimirInscripcionesEvento() {

  if (!eventoActual) {
    alert(
      "Seleccioná un evento antes de imprimir."
    );
    return;
  }

  const evento =
    eventosAdministrables.find(
      (item) =>
        item.id === eventoActual
    );

  if (!evento) {
    alert(
      "No encontramos el evento."
    );
    return;
  }

  const inscripciones =
    inscripcionesActuales.filter(
      (inscripcion) =>
        inscripcion.estado !== "cancelada"
    );

  if (!inscripciones.length) {
    alert(
      "Este evento no tiene inscripciones para imprimir."
    );
    return;
  }


  /* ==========================================
     ARMAR LISTA DE JUGADORAS
  ========================================== */

  const jugadoras = [];

  inscripciones.forEach(
    (inscripcion) => {

      const participante =
        inscripcion.participantes || {};

      const nombreTitular =
        [
          participante.nombre,
          participante.apellido
        ]
          .filter(Boolean)
          .join(" ");

      const nombreCompanera =
        inscripcion.nombre_companera ||
        "";

      /* TITULAR */

      jugadoras.push({

        nombre:
          nombreTitular ||
          "Sin nombre",

        telefono:
          participante.telefono ||
          participante.telefono_normalizado ||
          "",

        pareja:
          nombreCompanera ||
          (
            inscripcion.modalidad ===
            "individual"
              ? "Individual"
              : "Pendiente"
          ),

        estadoPago:
          inscripcion.estado_pago ||
          "pendiente",

        medioPago:
          inscripcion.medio_pago ||
          ""

      });


      /* COMPAÑERA */

      if (
        inscripcion.modalidad === "pareja" &&
        nombreCompanera
      ) {

        jugadoras.push({

          nombre:
            nombreCompanera,

          telefono:
            inscripcion.telefono_companera ||
            "",

          pareja:
            nombreTitular ||
            "Pareja",

          estadoPago:
            inscripcion
              .estado_pago_companera ||
            "pendiente",

          medioPago:
            inscripcion
              .medio_pago_companera ||
            ""

        });

      }

    }
  );


  /* ORDENAR ALFABÉTICAMENTE */

  jugadoras.sort(
    (a, b) =>
      a.nombre.localeCompare(
        b.nombre,
        "es"
      )
  );


  function obtenerEstadoImpresion(
    jugadora
  ) {

    if (
      jugadora.estadoPago ===
        "confirmado" &&
      jugadora.medioPago ===
        "transferencia"
    ) {

      return {
        clase: "transferencia",
        texto: "✓ TRANSFERENCIA",
        admision: "✓ PAGADO"
      };

    }


    if (
      jugadora.estadoPago ===
        "confirmado" &&
      jugadora.medioPago ===
        "efectivo"
    ) {

      return {
        clase: "efectivo",
        texto: "EFECTIVO",
        admision: "☐ COBRAR"
      };

    }


    if (
      jugadora.estadoPago ===
      "comprobante_recibido"
    ) {

      return {
        clase: "pendiente",
        texto: "COMPROBANTE",
        admision: "☐ REVISAR"
      };

    }


    return {
      clase: "pendiente",
      texto: "PENDIENTE",
      admision: "☐ REVISAR"
    };

  }


  const filas =
    jugadoras
      .map(
        (jugadora, indice) => {

          const pago =
            obtenerEstadoImpresion(
              jugadora
            );

          return `
            <tr>

              <td class="numero">
                ${indice + 1}
              </td>

              <td>
                <strong>
                  ${escaparHTML(
                    jugadora.nombre
                  )}
                </strong>
              </td>

              <td>
                ${escaparHTML(
                  jugadora.telefono
                )}
              </td>

              <td>
                ${escaparHTML(
                  jugadora.pareja
                )}
              </td>

              <td>
                <span class="pago ${pago.clase}">
                  ${pago.texto}
                </span>
              </td>

              <td class="admision">
                ${pago.admision}
              </td>

            </tr>
          `;

        }
      )
      .join("");


  const cantidadTransferencias =
    jugadoras.filter(
      (jugadora) =>
        jugadora.estadoPago ===
          "confirmado" &&
        jugadora.medioPago ===
          "transferencia"
    ).length;


  const cantidadEfectivo =
    jugadoras.filter(
      (jugadora) =>
        jugadora.estadoPago ===
          "confirmado" &&
        jugadora.medioPago ===
          "efectivo"
    ).length;


  const cantidadPendientes =
    jugadoras.length -
    cantidadTransferencias -
    cantidadEfectivo;


  /* ==========================================
     VENTANA DE IMPRESIÓN
  ========================================== */

  const ventana =
    window.open(
      "",
      "_blank",
      "width=1100,height=800"
    );


  if (!ventana) {

    alert(
      "El navegador bloqueó la ventana de impresión."
    );

    return;

  }


  ventana.document.write(`
    <!DOCTYPE html>

    <html lang="es">

    <head>

      <meta charset="UTF-8">

      <title>
        Admisión · ${escaparHTML(
          evento.titulo || "MATCH"
        )}
      </title>

      <style>

        * {
          box-sizing: border-box;
        }

        body {
          font-family:
            Arial,
            Helvetica,
            sans-serif;

          color: #1C1327;
          margin: 30px;
        }

        .cabecera {
          border-bottom:
            3px solid #A66CC9;

          padding-bottom: 14px;
          margin-bottom: 22px;
        }

        .marca {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #3D255B;
        }

        h1 {
          font-size: 22px;
          margin:
            10px 0 4px;
        }

        .datos-evento {
          font-size: 14px;
          color: #555;
        }

        .resumen {
          display: flex;
          gap: 12px;
          margin:
            20px 0;
        }

        .resumen-item {
          border:
            1px solid #ddd;

          border-radius: 8px;
          padding:
            8px 12px;

          font-size: 13px;
        }

        .resumen-item strong {
          font-size: 17px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        th {
          background: #F0E9F7;
          color: #3D255B;
          text-align: left;
          padding: 9px;
          border:
            1px solid #d8cbe2;
        }

        td {
          padding: 9px;
          border:
            1px solid #ddd;
          vertical-align: middle;
        }

        .numero {
          width: 28px;
          text-align: center;
        }

        .pago {
          font-weight: 700;
          white-space: nowrap;
        }

        .transferencia {
          color: #266a45;
        }

        .efectivo {
          color: #7b5700;
        }

        .pendiente {
          color: #8b3434;
        }

        .admision {
          font-weight: 800;
          white-space: nowrap;
          font-size: 13px;
        }

        @media print {

          body {
            margin: 12mm;
          }

        }

      </style>

    </head>

    <body>

      <div class="cabecera">

        <div class="marca">
          MATCH
        </div>

        <h1>
          Lista de admisión
        </h1>

        <div class="datos-evento">

          <strong>
            ${escaparHTML(
              evento.titulo ||
              "Evento MATCH"
            )}
          </strong>

          ·

          ${escaparHTML(
            evento.categoria ||
            ""
          )}

          ·

          ${escaparHTML(
            formatearFechaAdmin(
              evento.fecha
            )
          )}

        </div>

      </div>


      <div class="resumen">

        <div class="resumen-item">
          Jugadoras:
          <strong>
            ${jugadoras.length}
          </strong>
        </div>

        <div class="resumen-item">
          Transferencia:
          <strong>
            ${cantidadTransferencias}
          </strong>
        </div>

        <div class="resumen-item">
          Cobrar efectivo:
          <strong>
            ${cantidadEfectivo}
          </strong>
        </div>

        <div class="resumen-item">
          Pendientes:
          <strong>
            ${cantidadPendientes}
          </strong>
        </div>

      </div>


      <table>

        <thead>

          <tr>
            <th>#</th>
            <th>Jugadora</th>
            <th>Teléfono</th>
            <th>Pareja</th>
            <th>Pago</th>
            <th>Admisión</th>
          </tr>

        </thead>

        <tbody>
          ${filas}
        </tbody>

      </table>


      <script>

        window.onload = () => {

          window.print();

        };

      <\/script>

    </body>

    </html>
  `);


  ventana.document.close();

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


 const accionesConfirmacion = `
  <button
    type="button"
    class="boton-tabla boton-tabla-principal"
    data-confirmar="${
      inscripcion.id
    }"
  >
    Transferencia
  </button>

  <button
    type="button"
    class="boton-tabla"
    data-efectivo="${
      inscripcion.id
    }"
  >
    💵 Efectivo
  </button>

  ${
    inscripcion.estado_pago === "confirmado"
      ? `
        <button
          type="button"
          class="boton-tabla"
          data-titular-pendiente="${
            inscripcion.id
          }"
        >
          ↩ Pendiente
        </button>
      `
      : ""
  }
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
  inscripcion.estado_pago,
  inscripcion.medio_pago
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
   CREAR FILA DE COMPAÑERA
========================================== */

function crearFilaCompanera(
  inscripcion
) {

  const participante =
    inscripcion.participantes ||
    {};


  const nombreTitular =
    [
      participante.nombre,
      participante.apellido
    ]
      .filter(Boolean)
      .join(" ");


  const nombreCompanera =
    inscripcion.nombre_companera ||
    "Compañera";


  const telefonoCompanera =
    inscripcion.telefono_companera ||
    "";


  const modalidadTexto =
    nombreTitular
      ? `Con ${nombreTitular}`
      : "Con pareja";


  const estadoPagoCompanera =
    inscripcion.estado_pago_companera ||
    "pendiente";


  const medioPagoCompanera =
    inscripcion.medio_pago_companera ||
    "";


  let textoPagoCompanera =
    "Pago pendiente";


  if (
    estadoPagoCompanera === "confirmado" &&
    medioPagoCompanera === "transferencia"
  ) {

    textoPagoCompanera =
      "Pago confirmado · Transferencia";

  }


  if (
    estadoPagoCompanera === "confirmado" &&
    medioPagoCompanera === "efectivo"
  ) {

    textoPagoCompanera =
      "Pago confirmado · Efectivo";

  }


  const botonWhatsapp =
    telefonoCompanera
      ? `
        <a
          href="https://wa.me/54${escaparHTML(
            telefonoCompanera.replace(
              /\D/g,
              ""
            )
          )}"
          target="_blank"
          rel="noopener noreferrer"
          class="boton-tabla"
        >
          WhatsApp
        </a>
      `
      : "";


  const accionesPago = `
    <button
      type="button"
      class="boton-tabla boton-tabla-principal"
      data-companera-transferencia="${
        inscripcion.id
      }"
    >
      Transferencia
    </button>

    <button
      type="button"
      class="boton-tabla"
      data-companera-efectivo="${
        inscripcion.id
      }"
    >
      💵 Efectivo
    </button>

    ${
      estadoPagoCompanera === "confirmado"
        ? `
          <button
            type="button"
            class="boton-tabla"
            data-companera-pendiente="${
              inscripcion.id
            }"
          >
            ↩ Pendiente
          </button>
        `
        : ""
    }
  `;


  return `
    <tr>

      <td>

        <div class="participante-celda">

          <strong>
            ${escaparHTML(
              nombreCompanera
            )}
          </strong>

          <small>
            Compañera
          </small>

        </div>

      </td>


      <td>

        <div class="contacto-celda">

          <strong>
            ${escaparHTML(
              telefonoCompanera
            )}
          </strong>

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
            estadoPagoCompanera
          )}"
        >
          ${escaparHTML(
            textoPagoCompanera
          )}
        </span>

      </td>


      <td>

        <span
          class="estado-chip ${
            estadoPagoCompanera === "confirmado"
              ? "estado-confirmada"
              : "estado-pendiente"
          }"
        >
          ${
            estadoPagoCompanera === "confirmado"
              ? "Confirmada"
              : "Pendiente"
          }
        </span>

      </td>


      <td>

        <span>
          ${
            medioPagoCompanera === "transferencia"
              ? "Transferencia"
              : medioPagoCompanera === "efectivo"
                ? "Efectivo"
                : "—"
          }
        </span>

      </td>


      <td>

        <div class="acciones-tabla">

          ${accionesPago}

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

  const inscripcionesActivas =
    inscripcionesActuales.filter(
      (item) =>
        item.estado !== "cancelada"
    );

  const total =
    inscripcionesActivas.length;


  const pendientes =
    inscripcionesActivas.filter(
      (item) =>
        item.estado === "pendiente"
    ).length;


  const comprobantes =
    inscripcionesActivas.filter(
      (item) =>
        Boolean(
          item.comprobante_path
        )
    ).length;


  const confirmadas =
    inscripcionesActivas.reduce(
      (total, item) => {

        if (item.estado !== "confirmada") {
          return total;
        }

        if (item.modalidad === "pareja") {
          return total + 2;
        }

        return total + 1;

      },
      0
    );

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


await Promise.all([
  cargarInscripciones(),
  cargarPartidosEvento()
]);

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
  estado: "confirmada",
  estado_pago: "confirmado",
  medio_pago: "transferencia"
}
      
    );


  if (actualizado) {

    alert(
      "Inscripción y pago confirmados."
    );

  }

}

/* ==========================================
   CONFIRMAR EFECTIVO EN ADMISIÓN
========================================== */

async function marcarPagoEfectivo(
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
      `¿Confirmar a ${
        nombreCompleto ||
        "esta participante"
      } con pago en efectivo en admisión?`
    );


  if (!confirmar) {
    return;
  }


  const actualizado =
    await actualizarInscripcion(
      inscripcionId,
      {
  estado: "confirmada",
  estado_pago: "confirmado",
  medio_pago: "efectivo"
}
    );


  if (actualizado) {

    alert(
      "Inscripción confirmada · Pago en efectivo pendiente para admisión."
    );

  }

}
async function marcarTitularPendiente(
  inscripcionId
) {

  const actualizado =
    await actualizarInscripcion(
      inscripcionId,
      {
        estado_pago: "pendiente",
        medio_pago: null
      }
    );

  if (actualizado) {
    alert(
      "Pago de la titular marcado como pendiente."
    );
  }

}

async function confirmarTransferenciaCompanera(
  inscripcionId
) {

  const actualizado =
    await actualizarInscripcion(
      inscripcionId,
      {
        estado_pago_companera: "confirmado",
        medio_pago_companera: "transferencia"
      }
    );

  if (actualizado) {
    alert(
      "Pago de la compañera confirmado por transferencia."
    );
  }

}


async function confirmarEfectivoCompanera(
  inscripcionId
) {

  const actualizado =
    await actualizarInscripcion(
      inscripcionId,
      {
        estado_pago_companera: "confirmado",
        medio_pago_companera: "efectivo"
      }
    );

  if (actualizado) {
    alert(
      "Pago de la compañera confirmado en efectivo."
    );
  }

}


async function marcarCompaneraPendiente(
  inscripcionId
) {

  const actualizado =
    await actualizarInscripcion(
      inscripcionId,
      {
        estado_pago_companera: "pendiente",
        medio_pago_companera: null
      }
    );

  if (actualizado) {
    alert(
      "Pago de la compañera marcado como pendiente."
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
   PESTAÑAS Y RESULTADOS DEL EVENTO
========================================== */

const tabsEventoAdmin =
  document.querySelectorAll(
    "[data-tab-evento]"
  );

const panelTabInscripciones =
  document.getElementById(
    "panel-tab-inscripciones"
  );

  const panelTabFixture =
  document.getElementById(
    "panel-tab-fixture"
  );
  const listaFixtureAdmin =
  document.getElementById(
    "lista-fixture-admin"
  );

const textoCantidadFixture =
  document.getElementById(
    "texto-cantidad-fixture"
  );

const botonImprimirFixture =
  document.getElementById(
    "boton-imprimir-fixture"
  );

  const botonGenerarFixture =
  document.getElementById(
    "boton-generar-fixture"
  );

  const botonConfirmarFixture =
  document.getElementById(
    "boton-confirmar-fixture"
  );

const panelTabResultados =
  document.getElementById(
    "panel-tab-resultados"
  );

const botonAgregarPartido =
  document.getElementById(
    "boton-agregar-partido"
  );

  const listaPartidosAdmin =
  document.getElementById(
    "lista-partidos-admin"
  );

const textoCantidadPartidos =
  document.getElementById(
    "texto-cantidad-partidos"
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

const formularioPartido =
  document.getElementById(
    "formulario-partido"
  );


/* SELECTORES DE JUGADORAS */

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


/* CAMBIAR DE PESTAÑA */

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


  panelTabFixture
    ?.classList.toggle(
      "oculto",
      tabSeleccionada !==
        "fixture"
    );


  if (
    tabSeleccionada ===
    "fixture"
  ) {

    renderizarFixtureEvento();

  }

}

/* CARGAR JUGADORAS DEL EVENTO */

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


  actualizarJugadorasDeshabilitadas();

}

/* ==========================================
   CARGAR PARTIDOS DEL EVENTO
========================================== */

async function cargarPartidosEvento() {

  actualizarEstadoBotonFixture();

  if (!eventoActual) {

    partidosActuales = [];

    renderizarPartidosEvento();
    renderizarFixtureEvento();

    return;

  }


  if (listaPartidosAdmin) {

    listaPartidosAdmin.innerHTML = `
      <div class="estado-resultados-vacio">
        <strong>
          Cargando partidos...
        </strong>
      </div>
    `;

  }


  try {

    const {
      data,
      error
    } =
      await window.db.rpc(
        "listar_partidos_evento",
        {
          p_evento_id:
            eventoActual
        }
      );


    if (error) {
      throw error;
    }


    partidosActuales =
      data || [];


    renderizarPartidosEvento();
    renderizarFixtureEvento();


  } catch (error) {

    console.error(
      "Error al cargar partidos:",
      error
    );


    partidosActuales = [];


    renderizarFixtureEvento();


    if (listaPartidosAdmin) {

      listaPartidosAdmin.innerHTML = `
        <div class="estado-resultados-vacio">

          <strong>
            No pudimos cargar los partidos
          </strong>

          <p>
            Revisá la consola e intentá nuevamente.
          </p>

        </div>
      `;

    }


    if (textoCantidadPartidos) {

      textoCantidadPartidos.textContent =
        "Error al cargar los partidos.";

    }

  }

}


/* ==========================================
   RENDERIZAR PARTIDOS
========================================== */

function renderizarPartidosEvento() {

  if (!listaPartidosAdmin) {
    return;
  }


  if (!eventoActual) {

    listaPartidosAdmin.innerHTML = `
      <div class="estado-resultados-vacio">

        <strong>
          Seleccioná un evento
        </strong>

        <p>
          Elegí un evento para ver sus partidos.
        </p>

      </div>
    `;


    if (textoCantidadPartidos) {

      textoCantidadPartidos.textContent =
        "Seleccioná un evento para cargar sus partidos.";

    }


    return;

  }


  if (!partidosActuales.length) {

    listaPartidosAdmin.innerHTML = `
      <div class="estado-resultados-vacio">

        <strong>
          Todavía no hay partidos cargados
        </strong>

        <p>
          Agregá el primer partido del evento.
        </p>

      </div>
    `;


    if (textoCantidadPartidos) {

      textoCantidadPartidos.textContent =
        "0 partidos cargados.";

    }


    return;

  }


  if (textoCantidadPartidos) {

    textoCantidadPartidos.textContent =
      `${partidosActuales.length} partido${
        partidosActuales.length === 1
          ? ""
          : "s"
      } cargado${
        partidosActuales.length === 1
          ? ""
          : "s"
      }.`;

  }


  listaPartidosAdmin.innerHTML =
    partidosActuales
      .map(
        crearTarjetaPartido
      )
      .join("");

}

function actualizarEstadoBotonFixture() {

  if (!botonGenerarFixture) {
    return;
  }

  botonGenerarFixture.disabled =
    !eventoActual;

}


/* ==========================================
   RENDERIZAR FIXTURE
========================================== */

function renderizarFixtureEvento() {

  if (!listaFixtureAdmin) {
    return;
  }


  if (!eventoActual) {

    listaFixtureAdmin.innerHTML = `
      <div class="estado-resultados-vacio">

        <strong>
          Seleccioná un evento
        </strong>

        <p>
          Elegí un evento para ver su fixture.
        </p>

      </div>
    `;


    if (textoCantidadFixture) {

      textoCantidadFixture.textContent =
        "Seleccioná un evento para ver su fixture.";

    }


    return;

  }

  if (
  fixtureTemporal &&
  fixtureTemporal.partidos.length
) {

  const nombrePareja = (pareja) =>
    `${pareja.jugadora1} / ${pareja.jugadora2}`;


const crearPartidoHTML = (
  numero,
  subtitulo,
  pareja1,
  pareja2,
  hora = "",
  cancha = ""
) => `
    <article class="fixture-partido-item">

<div class="fixture-horario">

  <strong>
    ${hora || numero}
  </strong>

  <span>
    ${
      cancha
        ? `${escaparHTML(cancha)} · ${escaparHTML(subtitulo)}`
        : escaparHTML(subtitulo)
    }
  </span>

</div>

      <div class="fixture-partido-centro">

        <div class="fixture-enfrentamiento">

          <span class="fixture-pareja">
            ${escaparHTML(pareja1)}
          </span>

          <strong class="fixture-marcador">
            VS
          </strong>

          <span class="fixture-pareja">
            ${escaparHTML(pareja2)}
          </span>

        </div>

      </div>

    </article>
  `;


 const zonasHTML =
  fixtureTemporal.zonas
    .map(
      (zona) => {

        const partidosZona =
          fixtureTemporal.partidos.filter(
            (partido) =>
              partido.zona === zona.letra
          );

        const partidosHTML =
          partidosZona
            .map(
              (partido, indice) =>
                crearPartidoHTML(
                  indice + 1,
                  `Zona ${zona.letra}`,
                  nombrePareja(
                    partido.pareja1
                  ),
                  nombrePareja(
                    partido.pareja2
                  ),
                  partido.hora,
                  partido.cancha
                )
            )
            .join("");

        return `
          <section class="fixture-etapa">

            <div class="fixture-etapa-titulo">
              <span>FASE DE GRUPOS</span>
              <h3>Zona ${escaparHTML(
                zona.letra
              )}</h3>
            </div>

            <div class="fixture-etapa-partidos">
              ${partidosHTML}
            </div>

          </section>
        `;

      }
    )
    .join("");


  const zonaAHTML =
    partidosZonaA
      .map(
        (partido, indice) =>
          crearPartidoHTML(
            indice + 1,
            "Zona A",
            nombrePareja(
              partido.pareja1
            ),
            nombrePareja(
              partido.pareja2
            ),
            partido.hora,
            partido.cancha
          
          )
      )
      .join("");


  const zonaBHTML =
    partidosZonaB
      .map(
        (partido, indice) =>
          crearPartidoHTML(
            partidosZonaA.length +
              indice +
              1,
            "Zona B",
            nombrePareja(
              partido.pareja1
            ),
            nombrePareja(
              partido.pareja2
            ),
            partido.hora,
            partido.cancha
          )
      )
      .join("");


  /* ==========================================
     ELIMINACIÓN
  ========================================== */

  const cuartosHTML = [

    [
      "C1",
      "1° Zona A",
      "4° Zona B"
    ],

    [
      "C2",
      "2° Zona A",
      "3° Zona B"
    ],

    [
      "C3",
      "1° Zona B",
      "4° Zona A"
    ],

    [
      "C4",
      "2° Zona B",
      "3° Zona A"
    ]

  ]
    .map(
      (partido) =>
        crearPartidoHTML(
          partido[0],
          "Cuartos de final",
          partido[1],
          partido[2]
        )
    )
    .join("");


  const semifinalesHTML = [

    [
      "S1",
      "Ganador C1",
      "Ganador C2"
    ],

    [
      "S2",
      "Ganador C3",
      "Ganador C4"
    ]

  ]
    .map(
      (partido) =>
        crearPartidoHTML(
          partido[0],
          "Semifinal",
          partido[1],
          partido[2]
        )
    )
    .join("");


  const finalHTML =
    crearPartidoHTML(
      "F",
      "Final",
      "Ganador S1",
      "Ganador S2"
    );


  listaFixtureAdmin.innerHTML = `

  ${zonasHTML}

  <section class="fixture-etapa">

    <div class="fixture-etapa-titulo">
      <span>ELIMINACIÓN</span>
      <h3>Cuartos de final</h3>
    </div>

    <div class="fixture-etapa-partidos">
      ${cuartosHTML}
    </div>

  </section>


  <section class="fixture-etapa">

    <div class="fixture-etapa-titulo">
      <span>ELIMINACIÓN</span>
      <h3>Semifinales</h3>
    </div>

    <div class="fixture-etapa-partidos">
      ${semifinalesHTML}
    </div>

  </section>


  <section class="fixture-etapa">

    <div class="fixture-etapa-titulo">
      <span>DEFINICIÓN</span>
      <h3>Final</h3>
    </div>

    <div class="fixture-etapa-partidos">
      ${finalHTML}
    </div>

  </section>

`;

  if (textoCantidadFixture) {

    textoCantidadFixture.textContent =
      `${fixtureTemporal.partidos.length} partidos de zona + fase eliminatoria.`;

  }

  return;
}
  if (!partidosActuales.length) {

    listaFixtureAdmin.innerHTML = `
      <div class="estado-resultados-vacio">

        <strong>
          Todavía no hay partidos
        </strong>

        <p>
          Primero cargá los partidos desde Resultados.
        </p>

      </div>
    `;


    if (textoCantidadFixture) {

      textoCantidadFixture.textContent =
        "0 partidos programados.";

    }


    return;

  }


  const partidosOrdenados =
    [...partidosActuales].sort(
      (partidoA, partidoB) => {

        const horaA =
          partidoA.hora_programada ||
          "99:99";

        const horaB =
          partidoB.hora_programada ||
          "99:99";


        if (horaA !== horaB) {

          return horaA.localeCompare(
            horaB
          );

        }


        return (
          Number(
            partidoA.numero_partido
          ) -
          Number(
            partidoB.numero_partido
          )
        );

      }
    );


  if (textoCantidadFixture) {

    textoCantidadFixture.textContent =
      `${partidosOrdenados.length} partido${
        partidosOrdenados.length === 1
          ? ""
          : "s"
      } programado${
        partidosOrdenados.length === 1
          ? ""
          : "s"
      }.`;

  }


  listaFixtureAdmin.innerHTML =
    partidosOrdenados
      .map(
        crearFilaFixture
      )
      .join("");

}


/* ==========================================
   FILA DEL FIXTURE
========================================== */

function crearFilaFixture(
  partido
) {

  const hora =
    partido.hora_programada
      ? String(
          partido.hora_programada
        ).slice(0, 5)
      : "Sin hora";


  const cancha =
    partido.cancha ||
    "Sin cancha";


  const instancia =
    formatearInstanciaPartido(
      partido.instancia
    );


  const tieneResultado =
    partido.pareja_1_games !== null &&
    partido.pareja_2_games !== null;


  const marcador =
    tieneResultado
      ? `${partido.pareja_1_games} - ${partido.pareja_2_games}`
      : "VS";


  return `
    <article class="fixture-partido-item">

      <div class="fixture-horario">

        <strong>
          ${escaparHTML(hora)}
        </strong>

        <span>
          ${escaparHTML(cancha)}
        </span>

      </div>


      <div class="fixture-partido-centro">

        <div class="fixture-instancia">

          Partido ${escaparHTML(
            partido.numero_partido
          )}

          ·

          ${escaparHTML(instancia)}

        </div>


        <div class="fixture-enfrentamiento">

          <span class="fixture-pareja">

            ${escaparHTML(
              partido.pareja_1_nombre
            )}

          </span>

          <strong class="fixture-marcador">

            ${escaparHTML(marcador)}

          </strong>

          <span class="fixture-pareja">

            ${escaparHTML(
              partido.pareja_2_nombre
            )}

          </span>

        </div>

      </div>


      <span
        class="estado-chip estado-${escaparHTML(
          partido.estado
        )}"
      >

        ${escaparHTML(
          formatearEstadoPartido(
            partido.estado
          )
        )}

      </span>

    </article>
  `;

}

/* ==========================================
   CREAR TARJETA DE PARTIDO
========================================== */

function crearTarjetaPartido(
  partido
) {

  const tieneResultado =
    partido.pareja_1_games !== null &&
    partido.pareja_2_games !== null;


  const marcador =
    tieneResultado
      ? `${partido.pareja_1_games} - ${partido.pareja_2_games}`
      : "vs";


  const hora =
    partido.hora_programada
      ? String(
          partido.hora_programada
        ).slice(0, 5)
      : "Sin hora";


  const cancha =
    partido.cancha ||
    "Sin cancha";


  const instancia =
    formatearInstanciaPartido(
      partido.instancia
    );


  return `
    <article class="partido-admin-item">

      <div class="partido-admin-info">

        <small>
          Partido ${escaparHTML(
            partido.numero_partido
          )}
        </small>

        <strong>
          ${escaparHTML(hora)}
          ·
          ${escaparHTML(cancha)}
        </strong>

        <small>
          ${escaparHTML(instancia)}
        </small>

      </div>


      <div class="partido-admin-enfrentamiento">

        <div class="partido-admin-pareja">
          ${escaparHTML(
            partido.pareja_1_nombre
          )}
        </div>

        <div class="partido-admin-marcador">
          ${escaparHTML(marcador)}
        </div>

        <div class="partido-admin-pareja">
          ${escaparHTML(
            partido.pareja_2_nombre
          )}
        </div>

      </div>


      <div class="partido-admin-acciones">

  <span
    class="estado-chip estado-${escaparHTML(
      partido.estado
    )}"
  >
    ${escaparHTML(
      formatearEstadoPartido(
        partido.estado
      )
    )}
  </span>

  <button
    type="button"
    class="boton-tabla boton-editar-partido"
    data-editar-partido="${escaparHTML(
      partido.id
    )}"
  >
    Editar
  </button>

</div>
    </article>
  `;

}


/* ==========================================
   TEXTOS DE PARTIDOS
========================================== */

function formatearInstanciaPartido(
  instancia
) {

  const textos = {

    zona:
      "Zona",

    octavos:
      "Octavos de final",

    cuartos:
      "Cuartos de final",

    semifinal:
      "Semifinal",

    final:
      "Final",

    desempate:
      "Desempate",

    amistoso:
      "Partido recreativo"

  };

  return (
    textos[instancia] ||
    instancia ||
    "Partido"
  );
}

function formatearEstadoPartido(
  estado
) {

  const textos = {

    pendiente:
      "Pendiente",

    en_juego:
      "En juego",

    finalizado:
      "Finalizado",

    cancelado:
      "Cancelado"

  };


  return (
    textos[estado] ||
    estado ||
    "Sin estado"
  );

}

/* ABRIR MODAL */

function abrirModalPartido() {

    partidoEditandoId = "";

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


  formularioPartido?.reset();

  const guardarPartido =
  document.getElementById(
    "guardar-partido"
  );

if (guardarPartido) {

  guardarPartido.textContent =
  partidoEditandoId
    ? "Guardar cambios"
    : "Guardar partido";
}

  cargarJugadorasEnPartido();


  modalPartido?.classList.remove(
    "oculto"
  );

  document.body.style.overflow =
    "hidden";

}

/* ==========================================
   EDITAR PARTIDO
========================================== */

function abrirModalEditarPartido(
  partidoId
) {

  const partido =
    partidosActuales.find(
      (item) =>
        item.id === partidoId
    );


  if (!partido) {

    alert(
      "No encontramos el partido seleccionado."
    );

    return;

  }


  partidoEditandoId =
    partido.id;


  cargarJugadorasEnPartido();


  const partidoNumero =
    document.getElementById(
      "partido-numero"
    );

  const partidoCancha =
    document.getElementById(
      "partido-cancha"
    );

  const partidoHora =
    document.getElementById(
      "partido-hora"
    );

  const partidoInstancia =
    document.getElementById(
      "partido-instancia"
    );
  
  const campoPartidoZona =
  document.getElementById(
    "campo-partido-zona"
  );

const partidoZona =
  document.getElementById(
    "partido-zona"
  );

  const equipo1Games =
    document.getElementById(
      "equipo-1-games"
    );

  const equipo2Games =
    document.getElementById(
      "equipo-2-games"
    );

  const partidoEstado =
    document.getElementById(
      "partido-estado"
    );

  const partidoObservaciones =
    document.getElementById(
      "partido-observaciones"
    );

  const guardarPartido =
    document.getElementById(
      "guardar-partido"
    );


  if (partidoNumero) {

    partidoNumero.value =
      partido.numero_partido ?? "";

  }


  if (partidoCancha) {

    partidoCancha.value =
      partido.cancha || "";

  }


  if (partidoHora) {

    partidoHora.value =
      partido.hora_programada
        ? String(
            partido.hora_programada
          ).slice(0, 5)
        : "";

  }


  if (partidoInstancia) {

    partidoInstancia.value =
      partido.instancia ||
      "zona";

  }


  if (equipo1Games) {

    equipo1Games.value =
      partido.pareja_1_games ?? "";

  }


  if (equipo2Games) {

    equipo2Games.value =
      partido.pareja_2_games ?? "";

  }


  if (partidoEstado) {

    partidoEstado.value =
      partido.estado ||
      "pendiente";

  }


  if (partidoObservaciones) {

    partidoObservaciones.value =
      partido.observaciones || "";

  }


  /*
    Necesitamos que listar_partidos_evento también devuelva
    los IDs de las cuatro inscripciones. Eso lo agregamos
    en el SQL del siguiente paso.
  */

  if (equipo1Jugadora1) {

    equipo1Jugadora1.value =
      partido.equipo_1_jugadora_1 ||
      "";

  }


  if (equipo1Jugadora2) {

    equipo1Jugadora2.value =
      partido.equipo_1_jugadora_2 ||
      "";

  }


  if (equipo2Jugadora1) {

    equipo2Jugadora1.value =
      partido.equipo_2_jugadora_1 ||
      "";

  }


  if (equipo2Jugadora2) {

    equipo2Jugadora2.value =
      partido.equipo_2_jugadora_2 ||
      "";

  }


  actualizarJugadorasDeshabilitadas();


  if (guardarPartido) {

    guardarPartido.textContent =
      "Guardar cambios";

  }


  modalPartido?.classList.remove(
    "oculto"
  );

  document.body.style.overflow =
    "hidden";

}


/* CERRAR MODAL */

function cerrarPartido() {

  modalPartido?.classList.add(
    "oculto"
  );

  document.body.style.overflow =
    "";

  formularioPartido?.reset();

  partidoEditandoId = "";

}


/* EVITAR JUGADORAS REPETIDAS */

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


/* LISTENERS DE LAS PESTAÑAS */

tabsEventoAdmin.forEach(
  (boton) => {

    boton.addEventListener(
      "click",
      () => {

        if (boton.disabled) {
          return;
        }

        cambiarTabEvento(
          boton.dataset.tabEvento
        );

      }
    );

  }
);


/* LISTENERS DEL MODAL */

botonAgregarPartido?.addEventListener(
  "click",
  abrirModalPartido
);

/* ==========================================
   GENERAR FIXTURE
========================================== */

botonGenerarFixture?.addEventListener(
  "click",
  () => {

    if (!eventoActual) {

      alert(
        "Seleccioná un evento antes de generar el fixture."
      );

      return;
    }

/* ==========================================
   CONFIGURACIÓN DEL FIXTURE
========================================== */

const campoHoraInicio =
  document.getElementById(
    "fixture-hora-inicio"
  );

const campoDuracionEvento =
  document.getElementById(
    "fixture-duracion-evento"
  );

const campoCantidadCanchas =
  document.getElementById(
    "fixture-cantidad-canchas"
  );

  const campoCantidadZonas =
  document.getElementById(
    "fixture-cantidad-zonas"
  );

const campoDuracionPartido =
  document.getElementById(
    "fixture-duracion-partido"
  );


const horaInicio =
  campoHoraInicio?.value ||
  "10:00";

const duracionEvento =
  Number(
    campoDuracionEvento?.value
  );

const cantidadCanchas =
  Number(
    campoCantidadCanchas?.value
  );

  const cantidadZonas =
  Number(
    campoCantidadZonas?.value
  );

const duracionPartido =
  Number(
    campoDuracionPartido?.value
  );


if (
  !duracionEvento ||
  duracionEvento <= 0
) {

  alert(
    "Ingresá una duración válida para el evento."
  );

  return;
}


if (
  !cantidadCanchas ||
  cantidadCanchas < 1
) {

  alert(
    "Ingresá una cantidad válida de canchas."
  );

  return;
}

if (
  !cantidadZonas ||
  cantidadZonas < 1 ||
  cantidadZonas > 6
) {

  alert(
    "Ingresá una cantidad de zonas entre 1 y 6."
  );

  return;
}


if (
  !duracionPartido ||
  duracionPartido < 1
) {

  alert(
    "Ingresá una duración válida por partido."
  );

  return;
}

    const inscripcionesConfirmadas =
  inscripcionesActuales.filter(
    (inscripcion) =>
      inscripcion.estado !== "cancelada"
  );


    if (!inscripcionesConfirmadas.length) {

      alert(
        "Este evento todavía no tiene inscripciones confirmadas."
      );

      return;
    }


    let cantidadJugadoras = 0;

    inscripcionesConfirmadas.forEach(
      (inscripcion) => {

        if (
          inscripcion.modalidad === "pareja"
        ) {

          cantidadJugadoras += 2;

        } else {

          cantidadJugadoras += 1;

        }

      }
    );


    const cantidadParejas =
      cantidadJugadoras / 2;
    
const parejasConfirmadas = [];

const individuales = [];


inscripcionesConfirmadas.forEach(
  (inscripcion) => {

    const participante =
      inscripcion.participantes || {};

    const nombreTitular =
      [
        participante.nombre,
        participante.apellido
      ]
        .filter(Boolean)
        .join(" ");


    if (
      inscripcion.modalidad === "pareja"
    ) {

parejasConfirmadas.push({
  id: inscripcion.id,

  inscripciones: [
    inscripcion.id
  ],

  jugadora1:
    nombreTitular,

  jugadora2:
    inscripcion.nombre_companera ||
    "PENDIENTE"
});

      return;

    }


    individuales.push({
      id: inscripcion.id,
      nombre:
        nombreTitular ||
        "Jugadora sin nombre"
    });

  }
);


/* ARMAR PAREJAS CON LAS INDIVIDUALES */

for (
  let i = 0;
  i < individuales.length;
  i += 2
) {

  const jugadora1 =
    individuales[i];

  const jugadora2 =
    individuales[i + 1];


parejasConfirmadas.push({
  id:
    `${jugadora1.id}-${
      jugadora2?.id || "pendiente"
    }`,

  inscripciones:
    [
      jugadora1.id,
      jugadora2?.id
    ].filter(Boolean),

  jugadora1:
    jugadora1.nombre,

  jugadora2:
    jugadora2?.nombre ||
    "PENDIENTE"
});

}
const textoParejas =
  parejasConfirmadas
    .map(
      (pareja, indice) =>
        `P${indice + 1}: ${pareja.jugadora1} / ${pareja.jugadora2}`
    )
    .join("\n");


/* ==========================================
   ARMAR ZONAS
========================================== */

const letrasZonas =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("");

const zonas =
  Array.from(
    { length: cantidadZonas },
    (_, indice) => ({
      letra: letrasZonas[indice],
      parejas: []
    })
  );

parejasConfirmadas.forEach(
  (pareja, indice) => {

    const parejaConNumero = {
      ...pareja,
      numero: indice + 1
    };

    const indiceZona =
      indice % cantidadZonas;

    zonas[indiceZona]
      .parejas
      .push(
        parejaConNumero
      );

  }
);


/* ==========================================
   GENERAR TODOS CONTRA TODOS
========================================== */

function generarPartidosZona(
  parejas,
  zona
) {

  const partidos = [];

  for (
    let i = 0;
    i < parejas.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < parejas.length;
      j++
    ) {

      partidos.push({
        zona,
        pareja1: parejas[i],
        pareja2: parejas[j]
      });

    }

  }

  return partidos;
}


const partidosPorZona =
  zonas.map(
    (zona) => ({
      letra:
        zona.letra,

      partidos:
        generarPartidosZona(
          zona.parejas,
          zona.letra
        )
    })
  );


/* ==========================================
   INTERCALAR ZONAS + ASIGNAR HORARIOS
========================================== */

function horaAMinutos(hora) {

  const [horas, minutos] =
    hora.split(":").map(Number);

  return horas * 60 + minutos;
}


function minutosAHora(totalMinutos) {

  const horas =
    Math.floor(totalMinutos / 60) % 24;

  const minutos =
    totalMinutos % 60;

  return (
    String(horas).padStart(2, "0") +
    ":" +
    String(minutos).padStart(2, "0")
  );
}


/* ==========================================
   INTERCALAR ZONAS + ASIGNAR HORARIOS
========================================== */

const pendientesPorZona =
  partidosPorZona.map(
    (zona) => ({
      letra: zona.letra,
      partidos: [...zona.partidos]
    })
  );

const partidosFixture = [];

const inicioEnMinutos =
  horaAMinutos(horaInicio);

let numeroBloque = 0;


/*
  En cada horario:
  - intenta repartir partidos entre todas las zonas
  - ninguna pareja juega dos veces en el mismo horario
  - la prioridad de las zonas va rotando
*/

while (
  pendientesPorZona.some(
    (zona) =>
      zona.partidos.length > 0
  )
) {

  const parejasOcupadas =
    new Set();

  const partidosDelBloque = [];


  /*
    Rotamos el orden de prioridad.
    Ejemplo:
    bloque 1: A B C
    bloque 2: B C A
    bloque 3: C A B
  */

  const desplazamiento =
    numeroBloque %
    pendientesPorZona.length;

  const prioridadZonas = [
    ...pendientesPorZona.slice(
      desplazamiento
    ),
    ...pendientesPorZona.slice(
      0,
      desplazamiento
    )
  ];


  function buscarPartidoDisponible(
    lista
  ) {

    return lista.findIndex(
      (partido) => {

        const pareja1 =
          partido.pareja1.numero;

        const pareja2 =
          partido.pareja2.numero;

        return (
          !parejasOcupadas.has(
            pareja1
          ) &&
          !parejasOcupadas.has(
            pareja2
          )
        );

      }
    );

  }


  while (
    partidosDelBloque.length <
    cantidadCanchas
  ) {

    let partidoElegido = null;


    for (
      const zonaPrioritaria
      of prioridadZonas
    ) {

      const indice =
        buscarPartidoDisponible(
          zonaPrioritaria.partidos
        );

      if (indice !== -1) {

        partidoElegido =
          zonaPrioritaria.partidos.splice(
            indice,
            1
          )[0];

        break;

      }

    }


    if (!partidoElegido) {
      break;
    }


    partidosDelBloque.push(
      partidoElegido
    );


    parejasOcupadas.add(
      partidoElegido
        .pareja1.numero
    );

    parejasOcupadas.add(
      partidoElegido
        .pareja2.numero
    );

  }


  /*
    Seguridad:
    evita un bucle infinito si por algún
    motivo no se pudo asignar ningún partido.
  */

  if (!partidosDelBloque.length) {

    console.warn(
      "No se pudo asignar ningún partido en el bloque."
    );

    break;

  }


  const horaPartido =
    inicioEnMinutos +
    numeroBloque *
    duracionPartido;


  partidosDelBloque.forEach(
    (partido, indiceCancha) => {

      partido.hora =
        minutosAHora(
          horaPartido
        );

      partido.cancha =
        `Cancha ${
          indiceCancha + 1
        }`;

      partidosFixture.push(
        partido
      );

    }
  );


  numeroBloque++;

}

/* ==========================================
   GUARDAR FIXTURE TEMPORAL
========================================== */

const textoZonas =
  zonas
    .map(
      (zona) => {

        const parejasTexto =
          zona.parejas
            .map(
              (pareja) =>
                `P${pareja.numero}: ${pareja.jugadora1} / ${pareja.jugadora2}`
            )
            .join("\n");

        return (
          `Zona ${zona.letra}\n` +
          parejasTexto
        );

      }
    )
    .join("\n\n");


const textoPartidos =
  partidosFixture
    .map(
      (partido, indice) =>
        `${indice + 1}. Zona ${partido.zona}: ` +
        `P${partido.pareja1.numero} vs P${partido.pareja2.numero}`
    )
    .join("\n");


fixtureTemporal = {

  zonas:
    zonas,

  partidos:
    partidosFixture,

  configuracion: {

    horaInicio,

    duracionEvento,

    cantidadCanchas,

    cantidadZonas,

    duracionPartido

  }

};
/* ==========================================
   IMPRIMIR FIXTURE
========================================== */

botonImprimirFixture?.addEventListener(
  "click",
  () => {

    if (
      !fixtureTemporal ||
      !fixtureTemporal.partidos?.length
    ) {

      alert(
        "Primero generá el fixture."
      );

      return;
    }


    const evento =
      eventosAdministrables.find(
        (item) =>
          item.id === eventoActual
      );


    const tituloEvento =
      evento?.titulo ||
      "Encuentro MATCH";


    const categoriaEvento =
      evento?.categoria ||
      "";


    const fechaEvento =
      evento?.fecha
        ? formatearFechaAdmin(
            evento.fecha
          )
        : "";


    const nombrePareja = (
      pareja
    ) =>
      `${pareja.jugadora1} / ${pareja.jugadora2}`;


    const zonasImpresion =
  fixtureTemporal.zonas.map(
    (zona) => ({

      letra:
        zona.letra,

      parejas:
        zona.parejas,

      partidos:
        fixtureTemporal.partidos.filter(
          (partido) =>
            partido.zona === zona.letra
        )

    })
  );


    const crearPartidos = (
      partidos
    ) =>
      partidos
        .map(
          (partido) => `
            <div class="partido">

              <div class="hora">

                <strong>
                  ${escaparHTML(
                    partido.hora ||
                    "--:--"
                  )}
                </strong>

                <span>
                  ${escaparHTML(
                    partido.cancha ||
                    ""
                  )}
                </span>

              </div>


              <div class="pareja">
                ${escaparHTML(
                  nombrePareja(
                    partido.pareja1
                  )
                )}
              </div>


              <div class="vs">
                VS
              </div>


              <div class="pareja derecha">
                ${escaparHTML(
                  nombrePareja(
                    partido.pareja2
                  )
                )}
              </div>

            </div>
          `
        )
        .join("");


    const crearParejas = (
      parejas
    ) =>
      parejas
        .map(
          (pareja) => `
            <div class="pareja-listado">

              <strong>
                P${pareja.numero}
              </strong>

              <span>
                ${escaparHTML(
                  nombrePareja(
                    pareja
                  )
                )}
              </span>

            </div>
          `
        )
        .join("");


    const crearZona = (
      zona,
      parejas,
      partidos
    ) => `
      <section class="pagina">

        <header>

          <div>

            <div class="marca-con-logo">

  <img
    src="./logo-match.png"
    alt="Logo MATCH"
    class="logo-print"
  >

  <div>
    <div class="marca">
      MATCH
    </div>
  </div>

</div>

            <h1>
              ${escaparHTML(
                tituloEvento
              )}
            </h1>

            <p>
              ${escaparHTML(
                categoriaEvento
              )}

              ·

              ${escaparHTML(
                fechaEvento
              )}
            </p>

          </div>


          <div class="titulo-zona">
            ZONA ${zona}
          </div>

        </header>


        <div class="zona-layout">

          <aside>

            <h2>
              Parejas
            </h2>

            ${crearParejas(
              parejas
            )}

          </aside>


          <main>

            <h2>
              Partidos
            </h2>

            ${crearPartidos(
              partidos
            )}

          </main>

        </div>

      </section>
    `;


    const faseFinal = `
      <section class="pagina">

        <header>

          <div>

            <div class="marca">
              MATCH
            </div>

            <h1>
              ${escaparHTML(
                tituloEvento
              )}
            </h1>

            <p>
              ${escaparHTML(
                categoriaEvento
              )}

              ·

              ${escaparHTML(
                fechaEvento
              )}
            </p>

          </div>


          <div class="titulo-zona">
            FASE FINAL
          </div>

        </header>


        <div class="cuadro">


          <div class="ronda">

            <h2>
              Cuartos
            </h2>

            <div class="cruce">
              <span>1° Zona A</span>
              <b>C1</b>
              <span>4° Zona B</span>
            </div>

            <div class="cruce">
              <span>2° Zona A</span>
              <b>C2</b>
              <span>3° Zona B</span>
            </div>

            <div class="cruce">
              <span>1° Zona B</span>
              <b>C3</b>
              <span>4° Zona A</span>
            </div>

            <div class="cruce">
              <span>2° Zona B</span>
              <b>C4</b>
              <span>3° Zona A</span>
            </div>

          </div>


          <div class="ronda semis">

            <h2>
              Semifinales
            </h2>

            <div class="cruce">
              <span>Ganador C1</span>
              <b>S1</b>
              <span>Ganador C2</span>
            </div>

            <div class="cruce">
              <span>Ganador C3</span>
              <b>S2</b>
              <span>Ganador C4</span>
            </div>

          </div>


          <div class="ronda final">

            <h2>
              Final
            </h2>

            <div class="cruce">
              <span>Ganador S1</span>
              <b>FINAL</b>
              <span>Ganador S2</span>
            </div>

          </div>


        </div>

      </section>
    `;


    const ventana =
      window.open(
        "",
        "_blank"
      );


    if (!ventana) {

      alert(
        "El navegador bloqueó la ventana de impresión."
      );

      return;
    }


    ventana.document.write(`
      <!DOCTYPE html>

      <html lang="es">

      <head>

        <meta charset="UTF-8">

        <title>
          Fixture MATCH
        </title>

        <style>

          @page {
            size: A4 landscape;
            margin: 10mm;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;

            color: #1c1327;

            font-family:
              Arial,
              sans-serif;

            background: white;
          }


          .pagina {
            width: 100%;

            min-height: 185mm;

            page-break-after: always;

            break-after: page;
          }


          .pagina:last-child {
            page-break-after: auto;

            break-after: auto;
          }


          header {
            display: flex;

            align-items: flex-end;

            justify-content:
              space-between;

            padding-bottom: 7mm;

            margin-bottom: 7mm;

            border-bottom:
              3px solid #a66cc9;
          }


          .marca {
            margin-bottom: 2mm;

            color: #a66cc9;

            font-size: 10pt;
            font-weight: 800;

            letter-spacing: 2px;
          }


          h1 {
            margin: 0;

            font-size: 22pt;
          }


          header p {
            margin: 2mm 0 0;

            font-size: 9pt;
          }


          .titulo-zona {
            color: #3d255b;

            font-size: 28pt;
            font-weight: 800;
          }


          .zona-layout {
            display: grid;

            grid-template-columns:
              62mm
              1fr;

            gap: 8mm;
          }


          aside {
            padding-right: 6mm;

            border-right:
              1px solid #ded2e6;
          }


          h2 {
            margin:
              0
              0
              4mm;

            font-size: 14pt;
          }


          .pareja-listado {
            display: grid;

            grid-template-columns:
              10mm
              1fr;

            gap: 2mm;

            margin-bottom: 4mm;

            font-size: 9pt;
          }


          .pareja-listado strong {
            color: #a66cc9;
          }


          .partido {
            display: grid;

            grid-template-columns:
              28mm
              1fr
              12mm
              1fr;

            align-items: center;

            min-height: 12mm;

            margin-bottom: 2.5mm;

            padding:
              2.5mm
              3mm;

            border:
              1px solid #dfd2e7;

            border-radius: 3mm;
          }


          .hora strong {
            display: block;

            font-size: 10pt;
          }


          .hora span {
            display: block;

            margin-top: 1mm;

            color: #746c79;

            font-size: 7pt;
          }


          .pareja {
            font-size: 8.5pt;

            font-weight: 600;
          }


          .derecha {
            text-align: right;
          }


          .vs {
            text-align: center;

            color: #a66cc9;

            font-weight: 800;
          }


          .cuadro {
            display: grid;

            grid-template-columns:
              1.2fr
              1fr
              0.8fr;

            gap: 12mm;

            min-height: 135mm;
          }


          .ronda {
            display: flex;

            flex-direction: column;

            justify-content:
              space-around;
          }


          .cruce {
            padding: 4mm;

            border:
              1px solid #dfd2e7;

            border-radius: 3mm;
          }


          .cruce span {
            display: block;

            min-height: 8mm;

            padding: 2mm 0;

            font-size: 9pt;
            font-weight: 600;
          }


          .cruce b {
            display: block;

            padding: 2mm 0;

            color: #a66cc9;

            font-size: 8pt;

            border-top:
              1px solid #eee6f2;

            border-bottom:
              1px solid #eee6f2;
          }


          .semis {
            padding:
              20mm
              0;
          }


          .final {
            padding:
              50mm
              0;
          }

          .marca-con-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2mm;
}

.logo-print {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.marca {
  margin: 0;
  color: #a66cc9;
  font-size: 10pt;
  font-weight: 800;
  letter-spacing: 2px;
}

        </style>

      </head>


      <body>

       ${zonasImpresion
  .map(
    (zona) =>
      crearZona(
        zona.letra,
        zona.parejas,
        zona.partidos
      )
  )
  .join("")}

        ${faseFinal}


        <script>

          window.onload = () => {

            window.print();

          };

        <\/script>

      </body>

      </html>
    `);


    ventana.document.close();

  }
);

cerrarModalPartido?.addEventListener(
  "click",
  cerrarPartido
);

cancelarPartido?.addEventListener(
  "click",
  cerrarPartido
);

document
  .querySelectorAll(
    "[data-cerrar-partido]"
  )
  .forEach(
    (elemento) => {

      elemento.addEventListener(
        "click",
        cerrarPartido
      );

    }
  );


/* CAMBIOS EN SELECTORES */

selectoresJugadoras.forEach(
  (selector) => {

    selector?.addEventListener(
      "change",
      actualizarJugadorasDeshabilitadas
    );

  }
);

/* ==========================================
   GUARDAR PARTIDO EN SUPABASE
========================================== */

formularioPartido?.addEventListener(
  "submit",
  async (evento) => {

    evento.preventDefault();


    if (!eventoActual) {

      alert(
        "Seleccioná un evento."
      );

      return;

    }


    const partidoNumero =
      document.getElementById(
        "partido-numero"
      );

    const partidoCancha =
      document.getElementById(
        "partido-cancha"
      );

    const partidoHora =
      document.getElementById(
        "partido-hora"
      );

    const partidoInstancia =
      document.getElementById(
        "partido-instancia"
      );

    const equipo1Games =
      document.getElementById(
        "equipo-1-games"
      );

    const equipo2Games =
      document.getElementById(
        "equipo-2-games"
      );

    const partidoEstado =
      document.getElementById(
        "partido-estado"
      );

    const partidoObservaciones =
      document.getElementById(
        "partido-observaciones"
      );

    const guardarPartido =
      document.getElementById(
        "guardar-partido"
      );

    const mensajePartido =
      document.getElementById(
        "mensaje-partido"
      );


    const jugadorasSeleccionadas = [
      equipo1Jugadora1?.value,
      equipo1Jugadora2?.value,
      equipo2Jugadora1?.value,
      equipo2Jugadora2?.value
    ];


    if (
      jugadorasSeleccionadas.some(
        (valor) => !valor
      )
    ) {

      if (mensajePartido) {

        mensajePartido.textContent =
          "Seleccioná las cuatro jugadoras.";

      }

      return;

    }


    if (
      new Set(
        jugadorasSeleccionadas
      ).size !== 4
    ) {

      if (mensajePartido) {

        mensajePartido.textContent =
          "No podés repetir una jugadora.";

      }

      return;

    }


    if (
      !partidoNumero?.value ||
      Number(partidoNumero.value) < 1
    ) {

      if (mensajePartido) {

        mensajePartido.textContent =
          "Ingresá un número de partido válido.";

      }

      return;

    }


    if (mensajePartido) {

      mensajePartido.textContent =
        "";

      mensajePartido.style.color =
        "";

    }


    if (guardarPartido) {

      guardarPartido.disabled =
        true;

      guardarPartido.textContent =
        "Guardando...";

    }


    try {

    const nombreFuncion =
  partidoEditandoId
    ? "actualizar_partido_evento"
    : "guardar_partido_evento";


const parametros = {

  p_numero_partido:
    Number(
      partidoNumero.value
    ),

  p_instancia:
    partidoInstancia?.value ||
    "zona",

  p_cancha:
    partidoCancha?.value
      .trim() ||
    null,

  p_hora_programada:
    partidoHora?.value ||
    null,

  p_equipo_1_jugadora_1:
    equipo1Jugadora1.value,

  p_equipo_1_jugadora_2:
    equipo1Jugadora2.value,

  p_equipo_2_jugadora_1:
    equipo2Jugadora1.value,

  p_equipo_2_jugadora_2:
    equipo2Jugadora2.value,

  p_equipo_1_games:
    equipo1Games?.value !== ""
      ? Number(
          equipo1Games.value
        )
      : null,

  p_equipo_2_games:
    equipo2Games?.value !== ""
      ? Number(
          equipo2Games.value
        )
      : null,

  p_estado:
    partidoEstado?.value ||
    "pendiente",

  p_observaciones:
    partidoObservaciones?.value
      .trim() ||
    null

};


if (partidoEditandoId) {

  parametros.p_partido_id =
    partidoEditandoId;

} else {

  parametros.p_evento_id =
    eventoActual;

}


const {
  data,
  error
} =
  await window.db.rpc(
    nombreFuncion,
    parametros
  );

      if (error) {
        throw error;
      }


      if (mensajePartido) {

        mensajePartido.textContent =
  partidoEditandoId
    ? "✓ Partido actualizado correctamente."
    : "✓ Partido guardado correctamente.";

        mensajePartido.style.color =
          "#4e8b68";

      }


      console.log(
        "Partido guardado:",
        data
      );

      await cargarPartidosEvento();
      partidoEditandoId = "";


      window.setTimeout(
        () => {

          cerrarPartido();

        },
        700
      );

    } catch (error) {

      console.error(
        "Error al guardar partido:",
        error
      );


      if (mensajePartido) {

        mensajePartido.style.color =
          "#b42318";

        if (
          error.message?.includes(
            "partidos_evento_evento_id_numero_partido_key"
          ) ||
          error.message?.includes(
            "duplicate key"
          )
        ) {

          mensajePartido.textContent =
            "Ya existe un partido con ese número.";

        } else {

          mensajePartido.textContent =
            error.message ||
            "No pudimos guardar el partido.";

        }

      }

    } finally {

      if (guardarPartido) {

        guardarPartido.disabled =
          false;

        guardarPartido.textContent =
          "Guardar partido";

      }

    }

  }
);
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
const botonEfectivo =
  evento.target.closest(
    "[data-efectivo]"
  );

if (botonEfectivo) {

  marcarPagoEfectivo(
    botonEfectivo.dataset
      .efectivo
  );

  return;
}

const botonCompaneraTransferencia =
  evento.target.closest(
    "[data-companera-transferencia]"
  );

if (botonCompaneraTransferencia) {

  confirmarTransferenciaCompanera(
    botonCompaneraTransferencia.dataset
      .companeraTransferencia
  );

  return;
}


const botonCompaneraEfectivo =
  evento.target.closest(
    "[data-companera-efectivo]"
  );

if (botonCompaneraEfectivo) {

  confirmarEfectivoCompanera(
    botonCompaneraEfectivo.dataset
      .companeraEfectivo
  );

  return;
}


const botonCompaneraPendiente =
  evento.target.closest(
    "[data-companera-pendiente]"
  );

if (botonCompaneraPendiente) {

  marcarCompaneraPendiente(
    botonCompaneraPendiente.dataset
      .companeraPendiente
  );

  return;
}

const botonTitularPendiente =
  evento.target.closest(
    "[data-titular-pendiente]"
  );

if (botonTitularPendiente) {

  marcarTitularPendiente(
    botonTitularPendiente.dataset
      .titularPendiente
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

document.addEventListener(
  "click",
  (evento) => {

    const botonEditar =
      evento.target.closest(
        "[data-editar-partido]"
      );


    if (!botonEditar) {
      return;
    }


    abrirModalEditarPartido(
      botonEditar.dataset
        .editarPartido
    );

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

botonImprimirInscripciones?.addEventListener(
  "click",
  imprimirInscripcionesEvento
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
   INICIO
========================================== */

verificarAccesoAdministrador();