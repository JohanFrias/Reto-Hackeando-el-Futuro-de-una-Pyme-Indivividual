         /* Script principal */
document.addEventListener("DOMContentLoaded", function () {
    const pantalla = document.getElementById("pantallaError");
    const recuperar = document.getElementById("recuperar");

    if (recuperar && pantalla) {
        recuperar.addEventListener("click", () => {
            pantalla.classList.add("oculta");
            mostrarAviso("Conexion recuperada.");
        });
    }
  

    /* Modo oscuro */
    const modo = document.getElementById("modoOscuro");

    if (localStorage.getItem("novaModo") === "claro") {
        document.body.classList.add("claro");
    }
 
    if (modo) {
        modo.addEventListener("click", () => {
            document.body.classList.toggle("claro");
            const claro = document.body.classList.contains("claro");
            localStorage.setItem("novaModo", claro ? "claro" : "oscuro");
            modo.textContent = claro ? "Modo oscuro" : "Modo claro";
        });
    }

    /* Menú de navegación */

    const menuBoton = document.getElementById("menuBoton");
    const menu = document.getElementById("menu");

    if (menuBoton && menu) {
        menuBoton.addEventListener("click", () => menu.classList.toggle("abierto"));
    }

    /*chat*/

    const chat = document.getElementById("chat");
    const abrir = document.getElementById("chatAbrir");
    const cerrar = document.getElementById("chatCerrar");

    if (abrir && chat) {
        abrir.addEventListener("click", () => chat.hidden = !chat.hidden);
    }

    if (cerrar && chat) {
        cerrar.addEventListener("click", () => chat.hidden = true);
    }

    const chatForm = document.getElementById("chatFormulario");

    if (chatForm) {
        chatForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const input = document.getElementById("chatTexto");
            const mensajes = document.getElementById("chatMensajes");
            const q = input.value.trim().toLowerCase();
            let r = "Puedo ayudarte con nuestros servicios, historia o contacto.";

            if (q.includes("servicio")) {
                r = "Ofrecemos diseño web y seguridad digital.";
            } else if (q.includes("historia") || q.includes("misterio")) {
                r = "Nuestra página y redes desaparecieron.";
            } else if (q.includes("contacto")) {
                r = "Visita Contacto para ver el formulario y las pruebas.";
            } else if (q.includes("seguridad")) {
                r = "Recomendamos copias de respaldo, contraseñas seguras y verificación en dos pasos.";
            }

            mensajes.innerHTML += "<p><b>Tú:</b> " + escapar(input.value) + "</p><p><b>Nova:</b> " + r + "</p>";
            input.value = "";
        });
    }


     /* Formulario de contacto */
    const form = document.getElementById("formContacto");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (form.reportValidity()) {
                document.getElementById("respuestaFormulario").textContent = "Formulario validado. Esta demostración no envía el mensaje a un servidor.";
                form.reset();
            }
        });
    }

    document.querySelectorAll(".ver-prueba").forEach((b) => {
        b.addEventListener("click", () => mostrarAviso(b.dataset.prueba));
    });

    let n = 0;
    let t;

     /*Easter egg */
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "n") {
            n++;
            clearTimeout(t);
            t = setTimeout(() => n = 0, 1200);

            if (n === 3) {
                document.body.classList.toggle("secreto");
                mostrarAviso("¡Encontraste el secreto de Nova!");
                n = 0;
            }
        }
    });
});
  
/* Función para caracteres especiales en HTML */
function escapar(s) {
    return s.replace(/[&<>"']/g, (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[c]));
}

/* Función para mostrar avisos temporales */
let avisoTimer;

function mostrarAviso(texto) {
    const a = document.getElementById("aviso");

    if (!a) {
        return;
    }

    a.textContent = texto;
    a.classList.add("visible");
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => a.classList.remove("visible"), 3500);
}
