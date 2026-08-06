/* ==========================================
   MI MATCH
========================================== */

const formularioConsulta =
  document.getElementById(
    "formulario-consulta"
  );

const campoTelefono =
  document.getElementById(
    "consulta-telefono"
  );

const botonConsultar =
  document.getElementById(
    "boton-consultar"
  );

const mensajeConsulta =
  document.getElementById(
    "mensaje-consulta"
  );

const accesoPanel =
  document.querySelector(
    ".acceso-panel"
  );

const panelResultados =
  document.getElementById(
    "panel-resultados"
  );

const estadoVacio =
  document.getElementById(
    "estado-vacio"
  );

const listaInscripciones =
  document.getElementById(
    "lista-inscripciones"
  );

const saludoParticipante =
  document.getElementById(
    "saludo-participante"
  );

const cantidadInscripciones =
  document.getElementById(
    "cantidad-inscripciones"
  );

const botonCambiarNumero =
  document.getElementById(
    "boton-cambiar-numero"
  );

const botonIntentarNuevamente =
  document.getElementById(
    "boton-intentar-nuevamente"
  );


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


function normalizarTelefono(valor = "") {

  let numero =
    String(valor)
      .replace(/\D/g, "");

  if (numero.startsWith("549")) {
    numero =
      numero.slice(3);
  } else if (numero.startsWith("54")) {
    numero =
      numero.slice(2);
  }

  if (
    numero.startsWith("0")
  ) {
    numero =
      numero.slice(1);
  }

  return numero;

}


function formatearTelefonoVisual(valor = "") {

  const numero =
    normalizarTelefono(valor)
      .slice(0, 11);

  if (numero.length <= 4) {
    return numero;
  }

  if (numero.length <= 8) {
    return (
      numero.slice(0, 4) +
      " " +
      numero.slice(4)
    );
  }

  return (
    numero.slice(0, 4) +
    " " +
    numero.slice(4, 7) +
    " " +
    numero.slice(7)
  );

}


function formatearFecha(fecha) {

  if (!fecha) {
    return "A confirmar";
  }

  const fechaLocal =
    new Date(
      `${fecha}T12:00:00`
    );

  const texto =
    new Intl.DateTimeFormat(
      "es-AR",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    ).format(fechaLocal);

  return (
    texto.charAt(0).toUpperCase() +
    texto.slice(1)
  );

}


function formatearHora(hora) {

  if (!hora) {
    return "";
  }

  return hora.slice(0, 5);
}


function formatearPrecio(precio) {

  return new Intl.NumberFormat(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    }
  ).format(
    Number(precio) || 0
  );

}


function textoEstado(estado) {

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
    "Pendiente"
  );

}


function textoPago(estadoPago) {

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
    "Pago pendiente"
  );

}


function textoTipo(tipo) {

  const tipos = {
    torneo:
      "Torneo MATCH",

    encuentro:
      "Encuentro MATCH",

    cancha_abierta:
      "Cancha abierta"
  };

  return (
    tipos[tipo] ||
    "Evento MATCH"
  );

}


/* ==========================================
   TARJETA
========================================== */

function crearTarjetaInscripcion(
  inscripcion
) {

  const horario =
    inscripcion.evento_hora_fin
      ? `${formatearHora(
          inscripcion.evento_hora_inicio
        )} a ${formatearHora(
          inscripcion.evento_hora_fin
        )}`
      : formatearHora(
          inscripcion.evento_hora_inicio
        ) || "A confirmar";


  const modalidad =
    inscripcion.modalidad ||
    "Individual";


  const posicion =
    inscripcion.posicion ||
    "No especificada";


  const companera =
    inscripcion.nombre_companera ||
    (
      modalidad
        .toLowerCase()
        .includes("busco")
        ? "A confirmar por MATCH"
        : "No informada"
    );


  const comprobante =
    inscripcion.comprobante_enviado
      ? "Comprobante recibido"
      : "Todavía no enviado";


  return `
    <article class="inscripcion-card">

      <div class="inscripcion-cabecera">

        <div>

          <span class="inscripcion-tipo">
            ${escaparHTML(
              textoTipo(
                inscripcion.evento_tipo
              )
            )}
          </span>

          <h3>
            ${escaparHTML(
              inscripcion.evento_titulo ||
              "Evento MATCH"
            )}
          </h3>

          <p>
            ${escaparHTML(
              inscripcion.evento_categoria ||
              "Categoría a confirmar"
            )}
          </p>

        </div>


        <div class="estados-inscripcion">

          <span
            class="estado-chip estado-${escaparHTML(
              inscripcion.estado ||
              "pendiente"
            )}"
          >
            ${escaparHTML(
              textoEstado(
                inscripcion.estado
              )
            )}
          </span>

          <span
            class="estado-chip pago-${escaparHTML(
              inscripcion.estado_pago ||
              "pendiente"
            )}"
          >
            ${escaparHTML(
              textoPago(
                inscripcion.estado_pago
              )
            )}
          </span>

        </div>

      </div>


      <div class="inscripcion-detalles">

        <div class="inscripcion-dato">

          <small>Fecha</small>

          <strong>
            ${escaparHTML(
              formatearFecha(
                inscripcion.evento_fecha
              )
            )}
          </strong>

        </div>


        <div class="inscripcion-dato">

          <small>Horario</small>

          <strong>
            ${escaparHTML(horario)}
          </strong>

        </div>


        <div class="inscripcion-dato">

          <small>Lugar</small>

          <strong>
            ${escaparHTML(
              inscripcion.evento_lugar ||
              "A confirmar"
            )}
          </strong>

        </div>


        <div class="inscripcion-dato">

          <small>Valor</small>

          <strong>
            ${escaparHTML(
              formatearPrecio(
                inscripcion.evento_precio
              )
            )}
          </strong>

        </div>


        <div class="inscripcion-dato">

          <small>Modalidad</small>

          <strong>
            ${escaparHTML(modalidad)}
          </strong>

        </div>


        <div class="inscripcion-dato">

          <small>Posición</small>

          <strong>
            ${escaparHTML(posicion)}
          </strong>

        </div>


        <div class="inscripcion-dato">

          <small>Compañera</small>

          <strong>
            ${escaparHTML(companera)}
          </strong>

        </div>


        <div class="inscripcion-dato">

          <small>Comprobante</small>

          <strong>
            ${escaparHTML(comprobante)}
          </strong>

        </div>

      </div>


      <div class="inscripcion-pie">

        <span class="comprobante-indicador">

          Estado actual:
          <strong>
            ${escaparHTML(
              textoEstado(
                inscripcion.estado
              )
            )}
          </strong>

        </span>

        <span class="resultados-aviso">
          Fixture y resultados próximamente
        </span>

      </div>

    </article>
  `;

}


/* ==========================================
   MOSTRAR PANTALLAS
========================================== */

function mostrarAcceso() {

  accesoPanel?.classList.remove(
    "oculto"
  );

  panelResultados?.classList.add(
    "oculto"
  );

  estadoVacio?.classList.add(
    "oculto"
  );

  mensajeConsulta.textContent =
    "";

  campoTelefono?.focus();

}


function mostrarVacio() {

  accesoPanel?.classList.add(
    "oculto"
  );

  panelResultados?.classList.add(
    "oculto"
  );

  estadoVacio?.classList.remove(
    "oculto"
  );

}


/* ==========================================
   CONSULTAR
========================================== */

async function consultarInscripciones(
  evento
) {

  evento.preventDefault();

  const telefono =
    normalizarTelefono(
      campoTelefono.value
    );


  mensajeConsulta.textContent =
    "";


  if (
    telefono.length < 8
  ) {

    mensajeConsulta.textContent =
      "Ingresá un número de WhatsApp válido.";

    campoTelefono.focus();

    return;

  }


  botonConsultar.disabled =
    true;

  botonConsultar.textContent =
    "Buscando...";


  try {

    const {
      data,
      error
    } =
      await window.db.rpc(
        "consultar_inscripciones_por_telefono",
        {
          p_telefono:
            telefono
        }
      );


    if (error) {
      throw error;
    }


    const inscripciones =
      data || [];


    if (!inscripciones.length) {

      mostrarVacio();

      return;

    }


    const primera =
      inscripciones[0];


    const nombre =
      primera.participante_nombre ||
      "";


    saludoParticipante.textContent =
      nombre
        ? `Hola, ${nombre} 💜`
        : "Hola 💜";


    cantidadInscripciones.textContent =
      `Encontramos ${
        inscripciones.length
      } inscripción${
        inscripciones.length === 1
          ? ""
          : "es"
      } asociada${
        inscripciones.length === 1
          ? ""
          : "s"
      } a tu número.`;


    listaInscripciones.innerHTML =
      inscripciones
        .map(
          crearTarjetaInscripcion
        )
        .join("");


    accesoPanel?.classList.add(
      "oculto"
    );

    estadoVacio?.classList.add(
      "oculto"
    );

    panelResultados?.classList.remove(
      "oculto"
    );


    sessionStorage.setItem(
      "match_telefono_consulta",
      telefono
    );

  } catch (error) {

    console.error(
      "Error al consultar inscripciones:",
      error
    );


    mensajeConsulta.textContent =
      "No pudimos consultar tus inscripciones. Intentá nuevamente.";

  } finally {

    botonConsultar.disabled =
      false;

    botonConsultar.textContent =
      "Buscar mis inscripciones";

  }

}


/* ==========================================
   EVENTOS
========================================== */

campoTelefono?.addEventListener(
  "input",
  () => {

    campoTelefono.value =
      formatearTelefonoVisual(
        campoTelefono.value
      );

  }
);


formularioConsulta?.addEventListener(
  "submit",
  consultarInscripciones
);


botonCambiarNumero?.addEventListener(
  "click",
  () => {

    campoTelefono.value =
      "";

    sessionStorage.removeItem(
      "match_telefono_consulta"
    );

    mostrarAcceso();

  }
);


botonIntentarNuevamente?.addEventListener(
  "click",
  () => {

    campoTelefono.value =
      "";

    mostrarAcceso();

  }
);


/* ==========================================
   RECUPERAR ÚLTIMA CONSULTA
========================================== */

const telefonoGuardado =
  sessionStorage.getItem(
    "match_telefono_consulta"
  );


if (telefonoGuardado) {

  campoTelefono.value =
    formatearTelefonoVisual(
      telefonoGuardado
    );

}