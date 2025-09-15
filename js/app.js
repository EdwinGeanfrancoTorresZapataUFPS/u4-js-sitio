// ===============================
// 3. Constantes
// ===============================
const APP_NOMBRE = "Mi Sitio Web";
const APP_VERSION = "1.0.0";
const ANIO = 2025;

// ===============================
// 4. Variables
// ===============================
let contadorVisitas = 0;
let usuarioActivo = "Invitado";
let esMovil = /Mobi/.test(navigator.userAgent);

// ===============================
// 5. Funciones básicas
// ===============================
function sumar(a, b) {
  return a + b;
}

function multiplicar(a, b) {
  return a * b;
}

// ===============================
// 15. Función evaluarNumero(n) con if/else
// ===============================
function evaluarNumero(n) {
  if (n > 0) return "El número es positivo.";
  else if (n < 0) return "El número es negativo.";
  else return "El número es cero.";
}

// ===============================
// 16. Función obtenerDia(numero) con switch
// ===============================
function obtenerDia(numero) {
  switch (numero) {
    case 1: return "Lunes";
    case 2: return "Martes";
    case 3: return "Miércoles";
    case 4: return "Jueves";
    case 5: return "Viernes";
    case 6: return "Sábado";
    case 7: return "Domingo";
    default: return "Número inválido. Ingrese un valor del 1 al 7.";
  }
}

// ===============================
// 19. Clase Util
// ===============================
class Util {
  static formatearMoneda(valor) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(valor);
  }
}

// ===============================
// 6 - 18. Eventos DOM
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // 6. Mensaje de bienvenida
  const salida = document.querySelector("#salida");
  if (salida) {
    salida.textContent = `Bienvenido a ${APP_NOMBRE} - Versión ${APP_VERSION} (${ANIO})`;
  }

  // 7. Botón contador visitas
  const btnVisitas = document.querySelector("#btnVisitas");
  const totalVisitas = document.querySelector("#totalVisitas");
  if (btnVisitas && totalVisitas) {
    btnVisitas.addEventListener("click", () => {
      contadorVisitas++;
      totalVisitas.textContent = `Total visitas: ${contadorVisitas}`;
    });
  }

  // 8. Reloj en header
  function mostrarHora() {
    const ahora = new Date();
    const hora = ahora.toLocaleTimeString();
    const reloj = document.querySelector("#reloj");
    if (reloj) reloj.textContent = hora;
  }
  mostrarHora();
  setInterval(mostrarHora, 1000);

  // 9. Navegación activa
  const pagina = document.body.dataset.page;
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    if (link.dataset.page === pagina) link.classList.add("activo");
  });

  // 10. Cambio de color con botones
  const btnRojo = document.querySelector("#btnRojo");
  const btnVerde = document.querySelector("#btnVerde");
  const btnAzul = document.querySelector("#btnAzul");
  const btnBlanco = document.querySelector("#btnBlanco");
  
  if (btnRojo && btnVerde && btnAzul && btnBlanco) {
    btnRojo.addEventListener("click", () => document.body.style.background = "red");
    btnVerde.addEventListener("click", () => document.body.style.background = "green");
    btnAzul.addEventListener("click", () => document.body.style.background = "blue");
    btnBlanco.addEventListener("click", () => document.body.style.background = "white");
  }

  // 11. Lista de notas
  const formNota = document.querySelector("#formNota");
  const inputNota = document.querySelector("#inputNota");
  const listaNotas = document.querySelector("#listaNotas");
  if (formNota && inputNota && listaNotas) {
    formNota.addEventListener("submit", (e) => {
      e.preventDefault();
      const texto = inputNota.value.trim();
      if (texto === "") {
        alert("La nota no puede estar vacía");
        return;
      }
      const li = document.createElement("li");
      li.textContent = texto;

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "❌";
      btnEliminar.style.marginLeft = "10px";
      btnEliminar.addEventListener("click", () => li.remove());

      li.appendChild(btnEliminar);
      listaNotas.appendChild(li);
      inputNota.value = "";
    });
  }

  // 12 & 13. Validación de formulario en contacto.html
  const formContacto = document.querySelector("#formContacto");
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.querySelector("#nombre").value.trim();
      const email = document.querySelector("#email").value.trim();
      const mensaje = document.querySelector("#mensaje").value.trim();
      const errores = [];
      if (!nombre) errores.push("El nombre es obligatorio");
      if (!email.includes("@")) errores.push("Correo inválido");
      if (!mensaje) errores.push("El mensaje es obligatorio");

      const divErrores = document.querySelector("#errores");
      const divExito = document.querySelector("#exito");
      divErrores.innerHTML = "";
      divExito.innerHTML = "";

      if (errores.length > 0) {
        errores.forEach(err => {
          const p = document.createElement("p");
          p.textContent = err;
          divErrores.appendChild(p);
        });
      } else {
        divExito.textContent = "✅ Formulario enviado correctamente.";
        formContacto.reset();
      }
    });
  }

  // 14. Buscador en servicios.html
  const inputBusqueda = document.querySelector("#buscador");
  const listaServicios = document.querySelectorAll(".servicio");
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", () => {
      const filtro = inputBusqueda.value.toLowerCase();
      listaServicios.forEach(serv => {
        const texto = serv.textContent.toLowerCase();
        serv.style.display = texto.includes(filtro) ? "block" : "none";
      });
    });
  }

  // 17. Renderizar perfil editable en acerca.html
  const perfilDiv = document.getElementById("perfil");
  const formEditarPerfil = document.getElementById("formEditarPerfil");
  if (perfilDiv && formEditarPerfil) {
    let perfil = {
      nombre: "Edwin Torres 1152325",
      rol: "Estudiante Ingeniería de Sistemas",
      intereses: "Bases de Datos, Machine Learning, Big Data"
    };

    function renderPerfil() {
      perfilDiv.innerHTML = `
        <p><b>Nombre:</b> ${perfil.nombre}</p>
        <p><b>Rol:</b> ${perfil.rol}</p>
        <p><b>Intereses:</b> ${perfil.intereses}</p>
      `;

      document.getElementById("editNombre").value = perfil.nombre;
      document.getElementById("editRol").value = perfil.rol;
      document.getElementById("editIntereses").value = perfil.intereses;
    }

    renderPerfil();

    formEditarPerfil.addEventListener("submit", (e) => {
      e.preventDefault();
      perfil.nombre = document.getElementById("editNombre").value.trim();
      perfil.rol = document.getElementById("editRol").value.trim();
      perfil.intereses = document.getElementById("editIntereses").value.trim();
      renderPerfil();

      const mensaje = document.getElementById("mensajePerfil");
      mensaje.textContent = "✅ Perfil actualizado correctamente.";
      setTimeout(() => mensaje.textContent = "", 3000);
    });
  }

  // 18. LocalStorage para visitas
  const visitasKey = "visitas_sitio";
  let visitas = localStorage.getItem(visitasKey);
  visitas = visitas ? parseInt(visitas) + 1 : 1;
  localStorage.setItem(visitasKey, visitas);

  const contadorDiv = document.createElement("div");
  contadorDiv.id = "contador-visitas";
  contadorDiv.style.position = "fixed";
  contadorDiv.style.bottom = "10px";
  contadorDiv.style.right = "10px";
  contadorDiv.style.background = "#dff9fb";
  contadorDiv.style.color = "#130f40";
  contadorDiv.style.padding = "8px 12px";
  contadorDiv.style.borderRadius = "8px";
  contadorDiv.style.border = "1px solid #00cec9";
  contadorDiv.style.fontSize = "0.9rem";
  contadorDiv.style.boxShadow = "0px 3px 8px rgba(0,0,0,0.1)";
  contadorDiv.textContent = `Número de visitas: ${visitas}`;
  document.body.appendChild(contadorDiv);
});
