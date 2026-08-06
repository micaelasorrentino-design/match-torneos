/* ==========================================
   MI MATCH — MIS INSCRIPCIONES
========================================== */


/* ==========================================
   ELEMENTOS
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
    numero = numero.slice(3);
  } else if (numero.startsWith("54")) {
    numero = numero.slice(2);
  }

  if (numero.startsWith("0")) {
    numero = numero.slice(1);
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

  return String(hora).slice(0, 5);

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

  const estados = {
    pendiente: "Pendiente",
    confirmada: "Confirmada",
    cancelada: "Cancelada"
  };

  return (
    estados[estado] ||
    estado ||
    "Pendiente"
  );

}


function textoPago(estadoPago) {

  const pagos = {
    pendiente: "Pago pendiente",
    comprobante_recibido:
      "Comprobante recibido",
    confirmado: "Pago confirmado",
    rechazado: "Pago rechazado"
  };

  return (
    pagos[estadoPago] ||
    estadoPago ||
    "Pago pendiente"
  );

}


function textoTipo(tipo) {

  const tipos = {
    torneo: "Torneo MATCH",
    encuentro: "Encuentro MATCH",
    cancha_abierta: "Cancha abierta"
  };

  return (
    tipos[tipo] ||
    "Evento MATCH"
  );

}


/* ==========================================
   CREAR TARJETA
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
      : (
          formatearHora(
            inscripcion.evento_hora_inicio
          ) ||
          "A confirmar"
        );


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


  const comprobanteEnviado =
    Boolean(
      inscripcion.comprobante_enviado ||
      inscripcion.comprobante_path
    );


  const comprobante =
    comprobanteEnviado
      ? "Comprobante recibido"
      : "Todavía no enviado";


  const claseEstado =
    inscripcion.estado ||
    "pendiente";


  const clasePago =
    inscripcion.estado_pago ||
    "pendiente";


  const inscripcionId =
    inscripcion.inscripcion_id ||
    inscripcion.id ||
    "";


  const puedeSubirComprobante =
    inscripcion.estado !== "cancelada" &&
    inscripcion.estado_pago !== "confirmado";


  const textoSubida =
    inscripcion.estado_pago === "rechazado"
      ? "El comprobante fue rechazado. Podés subir uno nuevo."
      : (
          comprobanteEnviado
            ? "Ya recibimos tu comprobante. Podés reemplazarlo si necesitás corregirlo."
            : "Seleccioná una imagen o PDF de hasta 5 MB."
        );


  return `
    <article
      class="inscripcion-card"
      data-inscripcion-id="${escaparHTML(
        inscripcionId
      )}"
    >

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
              claseEstado
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
              clasePago
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


      ${
        puedeSubirComprobante
          ? `
            <div class="carga-comprobante">

              <div class="carga-comprobante-texto">

                <span class="carga-comprobante-sobrelinea">
                  COMPROBANTE DE PAGO
                </span>

                <h4>
                  ${
                    comprobanteEnviado
                      ? "Reemplazar comprobante"
                      : "Subir comprobante"
                  }
                </h4>

                <p>
                  ${escaparHTML(textoSubida)}
                </p>

              </div>


              <div class="carga-comprobante-controles">

                <label
                  class="selector-comprobante-panel"
                  for="comprobante-${escaparHTML(
                    inscripcionId
                  )}"
                >

                  <span class="selector-comprobante-icono">
                    ↑
                  </span>

                  <span
                    class="selector-comprobante-nombre"
                    data-nombre-archivo="${escaparHTML(
                      inscripcionId
                    )}"
                  >
                    Seleccionar archivo
                  </span>

                  <small>
                    JPG, PNG, WEBP o PDF
                  </small>

                </label>


                <input
                  type="file"
                  id="comprobante-${escaparHTML(
                    inscripcionId
                  )}"
                  class="input-comprobante-panel"
                  data-input-comprobante="${escaparHTML(
                    inscripcionId
                  )}"
                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                >


                <button
                  type="button"
                  class="boton-subir-comprobante-panel"
                  data-subir-comprobante="${escaparHTML(
                    inscripcionId
                  )}"
                  disabled
                >
                  ${
                    comprobanteEnviado
                      ? "Reemplazar comprobante"
                      : "Subir comprobante"
                  }
                </button>

              </div>


              <p
                class="mensaje-subida-panel"
                data-mensaje-subida="${escaparHTML(
                  inscripcionId
                )}"
                role="status"
              ></p>

            </div>
          `
          : ""
      }


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
   SUBIR COMPROBANTE DESDE MI MATCH
========================================== */

function obtenerExtensionArchivo(
  archivo
) {

  const partes =
    archivo.name
      .toLowerCase()
      .split(".");

  return (
    partes.length > 1
      ? partes.pop()
      : ""
  );

}


function archivoComprobanteValido(
  archivo
) {

  const extensionesPermitidas = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "pdf"
  ];


  const extension =
    obtenerExtensionArchivo(
      archivo
    );


  if (
    !extensionesPermitidas.includes(
      extension
    )
  ) {
    return {
      valido: false,
      mensaje:
        "El archivo debe ser JPG, PNG, WEBP o PDF."
    };
  }


  const tamanioMaximo =
    5 * 1024 * 1024;


  if (
    archivo.size >
    tamanioMaximo
  ) {
    return {
      valido: false,
      mensaje:
        "El archivo no puede superar los 5 MB."
    };
  }


  return {
    valido: true,
    mensaje: ""
  };

}


function prepararCargaComprobantes() {

  const inputs =
    document.querySelectorAll(
      "[data-input-comprobante]"
    );


  inputs.forEach(
    (input) => {

      input.addEventListener(
        "change",
        () => {

          const inscripcionId =
            input.dataset
              .inputComprobante;


          const boton =
            document.querySelector(
              `[data-subir-comprobante="${inscripcionId}"]`
            );


          const nombreArchivo =
            document.querySelector(
              `[data-nombre-archivo="${inscripcionId}"]`
            );


          const mensaje =
            document.querySelector(
              `[data-mensaje-subida="${inscripcionId}"]`
            );


          const archivo =
            input.files?.[0];


          if (mensaje) {
            mensaje.textContent = "";
            mensaje.className =
              "mensaje-subida-panel";
          }


          if (!archivo) {

            if (nombreArchivo) {
              nombreArchivo.textContent =
                "Seleccionar archivo";
            }

            if (boton) {
              boton.disabled = true;
            }

            return;
          }


          const validacion =
            archivoComprobanteValido(
              archivo
            );


          if (!validacion.valido) {

            input.value = "";

            if (nombreArchivo) {
              nombreArchivo.textContent =
                "Seleccionar archivo";
            }

            if (boton) {
              boton.disabled = true;
            }

            if (mensaje) {
              mensaje.textContent =
                validacion.mensaje;

              mensaje.classList.add(
                "mensaje-error"
              );
            }

            return;
          }


          if (nombreArchivo) {
            nombreArchivo.textContent =
              archivo.name;
          }


          if (boton) {
            boton.disabled = false;
          }

        }
      );

    }
  );


  const botones =
    document.querySelectorAll(
      "[data-subir-comprobante]"
    );


  botones.forEach(
    (boton) => {

      boton.addEventListener(
        "click",
        async () => {

          const inscripcionId =
            boton.dataset
              .subirComprobante;


          await subirComprobante(
            inscripcionId
          );

        }
      );

    }
  );

}


async function subirComprobante(
  inscripcionId
) {

  const input =
    document.querySelector(
      `[data-input-comprobante="${inscripcionId}"]`
    );


  const boton =
    document.querySelector(
      `[data-subir-comprobante="${inscripcionId}"]`
    );


  const mensaje =
    document.querySelector(
      `[data-mensaje-subida="${inscripcionId}"]`
    );


  const archivo =
    input?.files?.[0];


  if (!archivo) {

    if (mensaje) {
      mensaje.textContent =
        "Seleccioná un archivo.";

      mensaje.className =
        "mensaje-subida-panel mensaje-error";
    }

    return;
  }


  const validacion =
    archivoComprobanteValido(
      archivo
    );


  if (!validacion.valido) {

    if (mensaje) {
      mensaje.textContent =
        validacion.mensaje;

      mensaje.className =
        "mensaje-subida-panel mensaje-error";
    }

    return;
  }


  const extension =
    obtenerExtensionArchivo(
      archivo
    );


  const telefono =
    normalizarTelefono(
      campoTelefono?.value ||
      sessionStorage.getItem(
        "match_telefono_consulta"
      ) ||
      ""
    );


  const nombreArchivo =
    `${Date.now()}-${crypto.randomUUID()}.${extension}`;


  const rutaArchivo =
    `${inscripcionId}/${nombreArchivo}`;


  if (boton) {
    boton.disabled = true;
    boton.textContent =
      "Subiendo...";
  }


  if (mensaje) {
    mensaje.textContent =
      "Subiendo comprobante...";

    mensaje.className =
      "mensaje-subida-panel";
  }


  try {

    const {
      error: errorSubida
    } =
      await window.db.storage
        .from("comprobantes")
        .upload(
          rutaArchivo,
          archivo,
          {
            cacheControl: "3600",
            upsert: false,
            contentType:
              archivo.type ||
              undefined
          }
        );


    if (errorSubida) {
      throw errorSubida;
    }


    const {
      error: errorActualizacion
    } =
      await window.db.rpc(
        "actualizar_comprobante_inscripcion",
        {
          p_inscripcion_id:
            inscripcionId,
          p_telefono:
            telefono,
          p_comprobante_path:
            rutaArchivo
        }
      );


    if (errorActualizacion) {

      await window.db.storage
        .from("comprobantes")
        .remove([
          rutaArchivo
        ]);

      throw errorActualizacion;
    }


    if (mensaje) {
      mensaje.textContent =
        "¡Comprobante enviado correctamente! Ya quedó pendiente de revisión.";

      mensaje.className =
        "mensaje-subida-panel mensaje-exito";
    }


    input.value = "";


    if (boton) {
      boton.textContent =
        "Comprobante enviado";
    }


    setTimeout(
      () => {

        formularioConsulta?.requestSubmit();

      },
      1200
    );


  } catch (error) {

    console.error(
      "Error al subir comprobante:",
      error
    );


    if (mensaje) {
      mensaje.textContent =
        "No pudimos subir el comprobante. Intentá nuevamente.";

      mensaje.className =
        "mensaje-subida-panel mensaje-error";
    }


    if (boton) {
      boton.disabled = false;
      boton.textContent =
        "Subir comprobante";
    }

  }

}

/* ==========================================
   CAMBIAR PANTALLAS
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

  if (mensajeConsulta) {
    mensajeConsulta.textContent = "";
  }

  campoTelefono?.focus();

}


function mostrarEstadoVacio() {

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
   CONSULTAR SUPABASE
========================================== */

async function consultarInscripciones(
  evento
) {

  evento.preventDefault();


  const telefono =
    normalizarTelefono(
      campoTelefono?.value || ""
    );


  if (mensajeConsulta) {
    mensajeConsulta.textContent = "";
  }


  if (telefono.length < 8) {

    if (mensajeConsulta) {
      mensajeConsulta.textContent =
        "Ingresá un número de WhatsApp válido.";
    }

    campoTelefono?.focus();

    return;

  }


  botonConsultar.disabled = true;

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
          p_telefono: telefono
        }
      );


    if (error) {
      throw error;
    }


    const inscripciones =
      data || [];


    if (!inscripciones.length) {

      mostrarEstadoVacio();

      return;

    }


    const primeraInscripcion =
      inscripciones[0];


    const nombre =
      primeraInscripcion
        .participante_nombre ||
      "";


    if (saludoParticipante) {

      saludoParticipante.textContent =
        nombre
          ? `Hola, ${nombre} 💜`
          : "Hola 💜";

    }


    if (cantidadInscripciones) {

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

    }


    if (listaInscripciones) {

     listaInscripciones.innerHTML =
  inscripciones
    .map(
      crearTarjetaInscripcion
    )
    .join("");


function prepararCargaComprobantes() {

  if (!listaInscripciones) {
    return;
  }


  listaInscripciones.onchange = (
    evento
  ) => {

    const input =
      evento.target.closest(
        "[data-input-comprobante]"
      );


    if (!input) {
      return;
    }


    const inscripcionId =
      input.dataset
        .inputComprobante;


    const boton =
      listaInscripciones.querySelector(
        `[data-subir-comprobante="${inscripcionId}"]`
      );


    const nombreArchivo =
      listaInscripciones.querySelector(
        `[data-nombre-archivo="${inscripcionId}"]`
      );


    const mensaje =
      listaInscripciones.querySelector(
        `[data-mensaje-subida="${inscripcionId}"]`
      );


    const archivo =
      input.files?.[0];


    if (mensaje) {

      mensaje.textContent = "";

      mensaje.className =
        "mensaje-subida-panel";

    }


    if (!archivo) {

      if (nombreArchivo) {
        nombreArchivo.textContent =
          "Seleccionar archivo";
      }


      if (boton) {
        boton.disabled = true;
      }


      return;

    }


    const validacion =
      archivoComprobanteValido(
        archivo
      );


    if (!validacion.valido) {

      input.value = "";


      if (nombreArchivo) {

        nombreArchivo.textContent =
          "Seleccionar archivo";

      }


      if (boton) {
        boton.disabled = true;
      }


      if (mensaje) {

        mensaje.textContent =
          validacion.mensaje;

        mensaje.classList.add(
          "mensaje-error"
        );

      }


      return;

    }


    if (nombreArchivo) {

      nombreArchivo.textContent =
        archivo.name;

    }


    if (boton) {
      boton.disabled = false;
    }

  };


  listaInscripciones.onclick = async (
    evento
  ) => {

    const boton =
      evento.target.closest(
        "[data-subir-comprobante]"
      );


    if (!boton) {
      return;
    }


    evento.preventDefault();


    const inscripcionId =
      boton.dataset
        .subirComprobante;


    console.log(
      "Subiendo comprobante para:",
      inscripcionId
    );


    if (!inscripcionId) {

      alert(
        "No encontramos el identificador de la inscripción."
      );

      return;

    }


    await subirComprobante(
      inscripcionId
    );

  };

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

    campoTelefono.value = "";

    sessionStorage.removeItem(
      "match_telefono_consulta"
    );

    mostrarAcceso();

  }
);


botonIntentarNuevamente?.addEventListener(
  "click",
  () => {

    campoTelefono.value = "";

    mostrarAcceso();

  }
);


/* ==========================================
   RECUPERAR ÚLTIMO NÚMERO
========================================== */

const telefonoGuardado =
  sessionStorage.getItem(
    "match_telefono_consulta"
  );


if (
  telefonoGuardado &&
  campoTelefono
) {

  campoTelefono.value =
    formatearTelefonoVisual(
      telefonoGuardado
    );

}