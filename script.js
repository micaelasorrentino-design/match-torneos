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
  const porcentaje =
    (torneo.inscriptas / torneo.cuposTotales) * 100;

  numeroInscriptas.textContent = torneo.inscriptas;
  numeroTotal.textContent = torneo.cuposTotales;

  barraProgreso.style.width =
    `${Math.min(porcentaje, 100)}%`;

  textoCupos.textContent =
    `${torneo.inscriptas} de ${torneo.cuposTotales} jugadoras`;

  if (torneo.inscriptas >= torneo.cuposTotales) {
    botonInscripcion.textContent = "TORNEO COMPLETO";
    botonInscripcion.disabled = true;
    textoCupos.textContent = "No quedan cupos disponibles";
  }
}

botonInscripcion.addEventListener("click", () => {
  alert("En el próximo paso conectaremos acá el formulario de inscripción 💜");
});

actualizarCupos();