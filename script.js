const torneo = {
  inscriptas: 18,
  cuposTotales: 32
};

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


function actualizarTorneo() {
  const disponibles =
    torneo.cuposTotales - torneo.inscriptas;

  const porcentaje =
    (torneo.inscriptas / torneo.cuposTotales) * 100;

  inscriptas.textContent =
    torneo.inscriptas;

  cuposTotales.textContent =
    torneo.cuposTotales;

  progreso.style.width =
    `${Math.min(porcentaje, 100)}%`;

  if (disponibles > 1) {
    lugaresRestantes.textContent =
      `Quedan ${disponibles} lugares`;
  } else if (disponibles === 1) {
    lugaresRestantes.textContent =
      "Queda un solo lugar";
  } else {
    lugaresRestantes.textContent =
      "Torneo completo";

    botonInscripcion.textContent =
      "Torneo completo";

    botonInscripcion.removeAttribute("href");
    botonInscripcion.style.pointerEvents = "none";
    botonInscripcion.style.opacity = "0.55";
  }
}


actualizarTorneo();
