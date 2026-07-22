const torneo = {
  inscriptas: 18,
  cuposTotales: 32
};

const numeroInscriptas = document.getElementById("inscriptas");
const numeroTotal = document.getElementById("total-cupos");
const barraProgreso = document.getElementById("progreso");
const textoCupos = document.getElementById("texto-cupos");
const botonInscripcion = document.getElementById("boton-inscripcion");

function actualizarCupos() {
  const lugaresDisponibles =
    torneo.cuposTotales - torneo.inscriptas;

  const porcentaje =
    (torneo.inscriptas / torneo.cuposTotales) * 100;

  numeroInscriptas.textContent = torneo.inscriptas;
  numeroTotal.textContent = torneo.cuposTotales;

  barraProgreso.style.width =
    `${Math.min(porcentaje, 100)}%`;

  if (lugaresDisponibles > 1) {
    textoCupos.textContent =
      `Quedan ${lugaresDisponibles} lugares`;
  } else if (lugaresDisponibles === 1) {
    textoCupos.textContent = "Queda 1 solo lugar";
  } else {
    textoCupos.textContent = "Torneo completo";
    botonInscripcion.textContent = "Torneo completo";
    botonInscripcion.disabled = true;
  }
}

botonInscripcion.addEventListener("click", () => {
  alert("Ahora vamos a conectar el formulario de inscripción 💜");
});

actualizarCupos();