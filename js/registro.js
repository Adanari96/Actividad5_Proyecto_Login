/**
 * LÓGICA DE LA PANTALLA DE REGISTRO
 * * Este archivo atrapa los datos que escribimos para crear la cuenta, los manda a revisar
 * a utileria.js, y si todo está perfecto, los guarda en el 'localStorage' del navegador.
 * Esto nos permite simular una base de datos sin tener un servidor real.
 */

// Jalamos los elementos del HTML usando sus IDs para poder controlarlos con JS
const registroForm = document.getElementById('registroForm');
const inputNombre = document.getElementById('reg-nombre');
const inputCorreo = document.getElementById('reg-correo');
const inputPassword = document.getElementById('reg-password');

const errorNombre = document.getElementById('error-nombre');
const errorCorreo = document.getElementById('error-correo');
const errorPassword = document.getElementById('error-password');
const errorGeneral = document.getElementById('error-general');

// Pequeña función para esconder todos los mensajes rojos antes de volver a validar
function limpiarErrores() {
    [errorNombre, errorCorreo, errorPassword, errorGeneral].forEach(el => el.style.display = 'none');
}

// Escuchamos cuando el usuario le da clic al botón "Registrarme"
registroForm.addEventListener('submit', function (e) {
    // Evitamos que la página se recargue automáticamente (comportamiento por defecto del HTML)
    e.preventDefault();
    
    // Limpiamos alertas de intentos anteriores
    limpiarErrores();

    // Obtenemos los textos ingresados quitando espacios vacíos en los extremos con .trim()
    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const password = inputPassword.value;

    let todoValido = true; // Nuestra variable bandera. Si algo falla, la cambiaremos a false.

    // 1. Validamos que el nombre contenga solo letras y espacios
    if (!soloLetras(nombre) || nombre.length < 3) {
        errorNombre.style.display = 'block';
        todoValido = false;
    }

    // 2. Validamos el formato del correo electrónico usando nuestra utilería
    if (!validarCorreo(correo)) {
        errorCorreo.style.display = 'block';
        todoValido = false;
    }

    // 3. Validamos que la contraseña cumpla con los requisitos complejos de seguridad
    if (!validarPassword(password)) {
        errorPassword.style.display = 'block';
        todoValido = false;
    }

    // Si alguna de las validaciones falló, detenemos el proceso aquí mismo
    if (!todoValido) {
        errorGeneral.textContent = 'Por favor, corrige los campos marcados en rojo.';
        errorGeneral.style.display = 'block';
        return;
    }

    /**
     * ¡REGLAS PASADAS CON ÉXITO!
     * Guardamos los datos en el 'localStorage'. Como este espacio solo almacena texto plano,
     * convertimos nuestro objeto de JavaScript a una cadena de texto usando JSON.stringify.
     */
    const nuevoUsuario = {
        nombre: capitalizarTexto(nombre), // Guardamos el nombre formateado bonito
        correo: correo.toLowerCase(),     // Todo en minúsculas para evitar problemas al loguearse
        password: password
    };

    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));

    // Avisamos que todo salió perfecto y redirigimos de inmediato al Login
    alert('¡Cuenta creada con éxito! Ahora inicia sesión con las credenciales que registraste.');
    window.location.href = 'login.html';
});