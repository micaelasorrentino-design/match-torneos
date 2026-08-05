/* ==========================================
   MATCH
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
  if (!fecha) return "";

  const fechaLocal = new Date(`${fecha}T12:00:00`);

  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit"
  }).format(fechaLocal);
}

function formatearHora(hora) {
  if (!hora) return "";

  return hora.slice(0, 5);
}

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(Number(precio) || 0);
}

function textoTipo(tipo) {
  const tipos = {
    torneo: "TORNEO",
    encuentro: "ENCUENTRO",
    cancha_abierta: "CANCHA ABIERTA"
  };

  return tipos[tipo] || "EVENTO MATCH";
}

function crearTarjetaEvento(evento) {
  const activo = Boolean(evento.inscripciones_abiertas);

  const estado = activo
    ? "Inscripciones abiertas"
    : "Inscripciones cerradas";

  const textoBoton = activo
    ? "Inscribirme"
    : "Evento cerrado";

  const horario = evento.hora_fin
    ? `${formatearHora(evento.hora_inicio)} a ${formatearHora(evento.hora_fin)}`
    : formatearHora(evento.hora_inicio);

  return `
    <article
      class="tarjeta-torneo ${activo ? "" : "torneo-proximamente"}"
      data-torneo="${evento.id}"
      data-activo="${activo}"
    >

      <div class="tarjeta-torneo-superior">

        <div>
          <span class="etiqueta-categoria">
            ${escaparHTML(textoTipo(evento.tipo))}
          </span>

          <h3>
            ${escaparHTML(evento.titulo)}
          </h3>
        </div>

        <span
          class="estado-torneo ${activo ? "" : "estado-proximamente"}"
          id="estado-${evento.id}"
        >
          ${estado}
        </span>

      </div>

      <div class="info-torneo">

        <div class="info-item">
          <span class="info-icono">1</span>
          <div>
            <small>Fecha</small>
            <strong>${escaparHTML(formatearFecha(evento.fecha))}</strong>
          </div>
        </div>

        <div class="info-item">
          <span class="info-icono">3</span>
          <div>
            <small>Lugar</small>
            <strong>${escaparHTML(evento.lugar)}</strong>
          </div>
        </div>

        <div class="info-item">
          <span class="info-icono">2</span>
          <div>
            <small>Horario</small>
            <strong>${escaparHTML(horario)}</strong>
          </div>
        </div>

        <div class="info-item">
          <span class="info-icono">4</span>
          <div>
            <small>Valor</small>
            <strong>${escaparHTML(formatearPrecio(evento.precio))} por persona</strong>
          </div>
        </div>

      </div>

      <div class="cupos-torneo">

        <p>Cupos</p>

        <div class="cupos-linea">

          <div class="numero-cupos">
            <strong id="inscriptas-${evento.id}">0</strong>

            <span>
              /
              <span id="cupos-${evento.id}">
                ${Number(evento.cupos_totales) || 0}
              </span>
            </span>
          </div>

          <strong
            class="lugares"
            id="lugares-${evento.id}"
          >
            ${activo ? "Cupos disponibles" : "Evento cerrado"}
          </strong>

        </div>

        <div class="barra">
          <div
            id="progreso-${evento.id}"
            class="progreso"
          ></div>
        </div>

      </div>

      <button
        type="button"
        class="boton-inscripcion-torneo"
        data-torneo="${evento.id}"
        ${activo ? "" : "disabled"}
      >
        ${textoBoton}
      </button>

    </article>
  `;
}

async function cargarEventos() {
  const contenedor = document.getElementById("lista-torneos");

  if (!contenedor) return;

  const { data, error } = await window.db
    .from("eventos")
    .select("*")
    .order("fecha", { ascending: true });

  if (error) {
    console.error("Error al cargar eventos:", error);

    contenedor.innerHTML = `
      <p>No pudimos cargar los encuentros.</p>
    `;

    return;
  }

  if (!data || data.length === 0) {
    contenedor.innerHTML = `
      <p>Próximamente publicaremos nuevos encuentros 💜</p>
    `;

    return;
  }

  contenedor.innerHTML = data
    .map(crearTarjetaEvento)
    .join("");

  cargarScriptPrincipal();
}

function cargarScriptPrincipal() {
  const script = document.createElement("script");

  script.src = "./script.js?v=12";
  script.defer = true;

  document.body.appendChild(script);
}

cargarEventos();