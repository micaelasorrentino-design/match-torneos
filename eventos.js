/* ==========================================
   SOMOS MATCH
   EVENTOS DESDE SUPABASE
========================================== */

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function formatearFecha(fecha) {
  if (!fecha) {
    return "";
  }

  const fechaLocal =
    new Date(`${fecha}T12:00:00`);

  const texto =
    new Intl.DateTimeFormat(
      "es-AR",
      {
        weekday: "long",
        day: "2-digit",
        month: "2-digit"
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
  ).format(Number(precio) || 0);
}


function textoTipo(tipo) {
  const tipos = {
    torneo: "TORNEO",
    encuentro: "ENCUENTRO",
    cancha_abierta: "CANCHA ABIERTA"
  };

  return (
    tipos[tipo] ||
    "EVENTO MATCH"
  );
}


function obtenerNombreComplejo(evento) {
  return (
    evento.complejos?.nombre ||
    evento.lugar ||
    "Lugar a confirmar"
  );
}


function obtenerNombreCiudad(evento) {
  return (
    evento.sedes?.nombre ||
    ""
  );
}


/* ==========================================
   CREAR TARJETA
========================================== */

function crearTarjetaEvento(evento) {

  const activo =
    Boolean(
      evento.inscripciones_abiertas
    );

  const ocupados =
    Number(evento.ocupados) || 0;

  const cuposTotales =
    Number(evento.cupos_totales) || 0;

  const disponibles =
    Math.max(
      cuposTotales - ocupados,
      0
    );

  const permiteInscripcion =
    activo &&
    disponibles > 0;

  const porcentaje =
    cuposTotales > 0
      ? Math.min(
          (ocupados / cuposTotales) * 100,
          100
        )
      : 0;

  const estado =
    !activo
      ? "Inscripciones cerradas"
      : disponibles === 0
        ? "Evento completo"
        : "Inscripciones abiertas";

  const textoBoton =
    permiteInscripcion
      ? "Inscribirme"
      : disponibles === 0
        ? "Evento completo"
        : "Evento cerrado";

  const textoLugares =
    !activo
      ? "Evento cerrado"
      : disponibles === 0
        ? "Evento completo"
        : disponibles === 1
          ? "Queda un lugar"
          : `Quedan ${disponibles} lugares`;

  const horario =
    evento.hora_fin
      ? `${formatearHora(
          evento.hora_inicio
        )} a ${formatearHora(
          evento.hora_fin
        )}`
      : formatearHora(
          evento.hora_inicio
        );

  const nombreComplejo =
    obtenerNombreComplejo(evento);

  const ciudad =
    obtenerNombreCiudad(evento);

  const lugarCompleto =
    ciudad
      ? `${nombreComplejo} · ${ciudad}`
      : nombreComplejo;

  return `
    <article
      class="tarjeta-torneo ${
        permiteInscripcion
          ? ""
          : "torneo-proximamente"
      }"
      data-torneo="${evento.id}"
      data-activo="${permiteInscripcion}"
    >

      <div class="tarjeta-torneo-superior">

        <div>

          <span class="etiqueta-categoria">
            ${escaparHTML(
              textoTipo(evento.tipo)
            )}
          </span>

          <h3>
            ${escaparHTML(
              evento.titulo
            )}
          </h3>

        </div>

        <span
          class="estado-torneo ${
            permiteInscripcion
              ? ""
              : "estado-proximamente"
          }"
          id="estado-${evento.id}"
        >
          ${escaparHTML(estado)}
        </span>

      </div>


      <div class="info-torneo">

        <div class="info-item">

          <span class="info-icono">
            1
          </span>

          <div>
            <small>Fecha</small>

            <strong>
              ${escaparHTML(
                formatearFecha(
                  evento.fecha
                )
              )}
            </strong>
          </div>

        </div>


        <div class="info-item">

          <span class="info-icono">
            3
          </span>

          <div>
            <small>Lugar</small>

            <strong>
              ${escaparHTML(
                lugarCompleto
              )}
            </strong>
          </div>

        </div>


        <div class="info-item">

          <span class="info-icono">
            2
          </span>

          <div>
            <small>Horario</small>

            <strong>
              ${escaparHTML(
                horario
              )}
            </strong>
          </div>

        </div>


        <div class="info-item">

          <span class="info-icono">
            4
          </span>

          <div>
            <small>Valor</small>

            <strong>
              ${escaparHTML(
                formatearPrecio(
                  evento.precio
                )
              )}
              por persona
            </strong>
          </div>

        </div>

      </div>


      <div class="cupos-torneo">

        <p>Cupos</p>

        <div class="cupos-linea">

          <div class="numero-cupos">

            <strong
              id="inscriptas-${evento.id}"
            >
              ${ocupados}
            </strong>

            <span>
              /
              <span
                id="cupos-${evento.id}"
              >
                ${cuposTotales}
              </span>
            </span>

          </div>

          <strong
            class="lugares"
            id="lugares-${evento.id}"
          >
            ${escaparHTML(textoLugares)}
          </strong>

        </div>


        <div class="barra">

          <div
            id="progreso-${evento.id}"
            class="progreso"
            style="width: ${porcentaje}%"
          ></div>

        </div>

      </div>


      <button
        type="button"
        class="boton-inscripcion-torneo"
        data-torneo="${evento.id}"
        ${
          permiteInscripcion
            ? ""
            : "disabled"
        }
      >
        ${escaparHTML(textoBoton)}
      </button>

    </article>
  `;
}


/* ==========================================
   CARGAR EVENTOS
========================================== */

async function cargarEventos() {

  const contenedor =
    document.getElementById(
      "lista-torneos"
    );

  if (!contenedor) {
    return;
  }

  const [
    respuestaEventos,
    respuestaOcupacion
  ] = await Promise.all([

    window.db
      .from("eventos")
      .select(`
        *,
        sedes (
          nombre
        ),
        complejos (
          nombre,
          maps_url
        )
      `)
      .order(
        "fecha",
        {
          ascending: true
        }
      ),

    window.db.rpc(
      "obtener_ocupacion_eventos"
    )

  ]);

  if (respuestaEventos.error) {

    console.error(
      "Error al cargar eventos:",
      respuestaEventos.error
    );

    contenedor.innerHTML = `
      <p>
        No pudimos cargar los encuentros.
      </p>
    `;

    return;
  }

  if (respuestaOcupacion.error) {

    console.error(
      "Error al cargar la ocupación:",
      respuestaOcupacion.error
    );

  }

  const ocupacionPorEvento =
    new Map(
      (
        respuestaOcupacion.data || []
      ).map(
        (registro) => [
          registro.evento_id,
          Number(registro.ocupados) || 0
        ]
      )
    );

  const eventos =
    (
      respuestaEventos.data || []
    ).map(
      (evento) => ({
        ...evento,

        ocupados:
          ocupacionPorEvento.get(
            evento.id
          ) || 0
      })
    );

  if (eventos.length === 0) {

    contenedor.innerHTML = `
      <p>
        Próximamente publicaremos nuevos encuentros 💜
      </p>
    `;

    return;
  }

  contenedor.innerHTML =
    eventos
      .map(crearTarjetaEvento)
      .join("");

  cargarScriptPrincipal();

}


/* ==========================================
   CARGAR SCRIPT PRINCIPAL
========================================== */

function cargarScriptPrincipal() {

  const scriptAnterior =
    document.querySelector(
      'script[data-script-match="principal"]'
    );

  if (scriptAnterior) {
    return;
  }

  const script =
    document.createElement(
      "script"
    );

  script.src =
    "./script.js?v=18";

  script.defer =
    true;

  script.dataset.scriptMatch =
    "principal";

  document.body.appendChild(
    script
  );

}


/* ==========================================
   INICIO
========================================== */

cargarEventos();


/* ==========================================
   CUPOS EN TIEMPO REAL
========================================== */

const canalInscripciones =
  window.db
    .channel(
      "cupos-eventos-en-vivo"
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "inscripciones"
      },
      async (payload) => {

        console.log(
          "Cambio recibido en inscripciones:",
          payload
        );

        await cargarEventos();

      }
    )
    .subscribe(
      (estado, error) => {

        if (
          estado === "SUBSCRIBED"
        ) {

          console.log(
            "Cupos en tiempo real activados."
          );

        }

        if (
          estado === "CHANNEL_ERROR" ||
          estado === "TIMED_OUT"
        ) {

          console.error(
            "Error en Realtime:",
            estado,
            error
          );

        }

      }
    );