
# Sistema de Gestión Escolar - Panel de Control Interactivo y Autenticación Local

## 1. Portada e Integrantes del Equipo

* **Institución:** Instituto Tecnologico de Oaxaca
* **Materia:** Programación Web
* **Proyecto:** Desarrollo Front-End: Login Funcional y Panel Modular con Persistencia Local
* **Fecha de Entrega:** Julio 2026

### Integrantes y División Arquitectónica del Trabajo (50% / 50%)

Para garantizar un flujo de trabajo colaborativo óptimo y cumplir con los requisitos de control de versiones, el desarrollo se dividió en dos fases principales, reflejadas equitativamente en el historial de commits de este repositorio:

| Integrante | Rol y Responsabilidades Técnicas | Fases y Commits en GitHub |
| :--- | :--- | :--- |
| **Integrante 1:**<br>**Eduardo Manuel Martinez Lopez** | **Arquitectura de Autenticación y Seguridad:** Encargado del ecosistema público. Creación de `login.html`, `registro.html` y sus respectivos controladores JS. Implementación de expresiones regulares (RegEx) para validación de formularios, serialización de datos con JSON y almacenamiento en `localStorage`. | 1. Maquetación e interfaz base de pantallas de acceso (HTML/CSS).<br>2. Lógica de autenticación, validaciones estrictas de seguridad y persistencia de usuarios (JS). |
| **Integrante 2:**<br>**Kelly Adanari Cruz Alonso** | **Desarrollo del Dashboard y Lógica de Negocio:** Encargado del ecosistema privado. Diseño del layout del panel (`index.html`), enrutamiento de vistas internas, interactividad del DOM (Sidebar/Navbar), cálculo matemático de fechas, manipulación de ventanas modales dinámicas y redacción de la documentación. | 3. Estructura del Panel Principal, Sidebar colapsable y Navbar interactivo.<br>4. Lógica de captura de datos (Usuarios/Alumnos), motor de modales, guardián de sesión y README. |

---

## 2. Estructura de Directorios del Proyecto

El proyecto sigue una arquitectura limpia (Clean Architecture) separando responsabilidades:

```text
📦 Sistema-Escolar
┣ 📂 css
┃ ┗ 📜 login.css         # Hoja de estilos global (Variables, Grid, Flexbox, Media Queries)
┣ 📂 img
┃ ┣ 🖼️ favicon.svg       # Icono vectorial de la pestaña del navegador
┣ 📂 js
┃ ┣ 📜 index.js          # Controlador del DOM para el panel principal y formularios internos
┃ ┣ 📜 login.js          # Validador de credenciales y generador de token de sesión
┃ ┣ 📜 registro.js       # Captura de nuevos usuarios y escritura en la base local
┃ ┗ 📜 utileria.js       # Librería modular de funciones puras compartidas (RegEx, Matemáticas)
┣ 📜 index.html          # Vista protegida: Dashboard, Menús y Formularios de Captura
┣ 📜 login.html          # Vista pública: Autenticación de usuarios registrados
┣ 📜 registro.html       # Vista pública: Creación de nuevas cuentas
┗ 📜 README.md           # Documentación técnica exhaustiva del proyecto

```

---

## 3. Descripción Integral del Proyecto

Este proyecto es una **Single Page Application (SPA) Híbrida** desarrollada exclusivamente con tecnologías nativas de la web (HTML5, CSS3 y JavaScript Vanilla). Simula un entorno completo de administración escolar donde la seguridad de acceso y la captura de datos son primordiales.

La aplicación prescinde de un servidor backend real (Node.js/PHP) y bases de datos tradicionales (SQL/NoSQL) al aprovechar el **Web Storage API** del navegador moderno. Esto permite crear una experiencia completa de registro, inicio de sesión seguro, protección de rutas y un dashboard interactivo capaz de procesar lógica matemática compleja en tiempo real, todo ejecutándose del lado del cliente.

---

## 4. Explicación Técnica y Documentación

### Framework CSS y Enfoque de Estilos (CSS Vanilla Avanzado)

Decidimos no utilizar frameworks como Bootstrap o Tailwind para demostrar un dominio total sobre las hojas de estilo en cascada. El diseño se construyó desde cero utilizando:

* **Variables Globales (`:root`):** Para mantener una paleta de colores coherente y facilitar futuros temas oscuros (Dark Mode).
* **Flexbox & CSS Grid:** Para alinear elementos del Navbar y estructurar el layout general del Dashboard (Sidebar + Contenido principal).
* **Media Queries (Mobile-First):** Se implementaron puntos de quiebre (`@media`) para transformar el panel en pantallas menores a 900px, convirtiendo el menú lateral en un panel superpuesto (`overlay`) táctil.
* **Tipografía:** Integración de *Google Fonts (Poppins)* para una interfaz de usuario moderna (UI/UX).

### Flujo del Sistema y Protección de Rutas

El sistema maneja dos estados de memoria para simular una base de datos y un sistema de tokens (JWT):

1. **Memoria Persistente (`localStorage`):** Usada en `registro.js`. Toma el objeto JavaScript del usuario, lo convierte a texto con `JSON.stringify()` y lo guarda. Estos datos sobreviven aunque se apague la computadora.
2. **Memoria Temporal (`sessionStorage`):** Usada en `login.js`. Si las credenciales coinciden con el registro, se crea la variable `usuarioActivo`. Esta memoria se borra automáticamente al cerrar la pestaña.
3. **Guardián de Sesión (Ruta Protegida):** En la primera línea de `index.js`, el sistema pregunta si existe `usuarioActivo`. Si devuelve `null`, significa que un intruso escribió la URL directamente, por lo que el script intercepta la carga y fuerza un `window.location.href = 'login.html'`.

### Traspaso y Renderizado del Usuario Activo

Dado que HTML no comparte variables entre páginas, la comunicación se logra leyendo el `sessionStorage`. Una vez que el guardián de `index.js` aprueba el acceso, captura el nombre guardado y realiza una manipulación del DOM (Document Object Model):

```javascript
// Localizamos los nodos HTML mediante su ID
const nombreUsuarioNav = document.getElementById('nombreUsuarioNav');
const avatarUsuario = document.getElementById('avatarUsuario');

// Inyectamos dinámicamente el nombre y extraemos la inicial para el avatar usando charAt(0)
if (usuarioActivo) {
    nombreUsuarioNav.textContent = usuarioActivo;
    avatarUsuario.textContent = usuarioActivo.charAt(0).toUpperCase();
}

```

### Métodos Principales y Lógica de Negocio (`utileria.js`)

El código se modularizó aplicando el principio DRY (Don't Repeat Yourself), aislando la lógica compleja en un archivo externo:

* **`validarCorreo(correo)`:** Evalúa la entrada mediante la Expresión Regular `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
* **`validarPassword(password)`:** Exige alta seguridad criptográfica forzando la inclusión de letras minúsculas, mayúsculas, dígitos y símbolos especiales (mínimo 8 caracteres).
* **`validarLongitud(valor, longitudExacta)`:** Crucial para la captura del número de control del alumno, verificando que contenga exactamente 6 dígitos numéricos sin letras intercaladas.
* **`calcularEdad(fecha)`:** Crea una instancia de `new Date()`, compara los años y aplica un condicional que resta `1` a la edad si el mes y día actuales son menores a los de la fecha de nacimiento.

---
tia
## 5. Proceso de Creación Paso a Paso

### Paso 1: Interfaz de Accesos (HTML `novalidate`)

Se codificaron los archivos `registro.html` y `login.html`. Una decisión técnica clave fue agregar la etiqueta `novalidate` en las etiquetas `<form>`. Esto desactiva las molestas burbujas de error genéricas de Google Chrome y nos permitió diseñar nuestros propios mensajes de error dinámicos (`<span class="error-msg">`) que se encienden o apagan usando `element.style.display = 'block'`.

### Paso 2: Interactividad del Layout y Sidebar

En el archivo `index.html` se maquetó el Dashboard. El reto principal fue la responsividad. En `js/index.js` se programó la función `esMovil()`. Al presionar el **Botón Hamburguesa**, el código detecta el ancho de la ventana:

* **En PC:** Alterna la clase `.colapsado`, reduciendo el ancho del Sidebar y expandiendo el área de contenido fluido.
* **En Celular:** Agrega la clase `.abierto-movil` al Sidebar para que se deslice sobre la pantalla, junto con un `.overlay-movil` oscuro que detecta clics fuera del menú para cerrarlo automáticamente.

### Paso 3: Componente Dropdown y Cierre de Sesión

El botón de usuario en el Navbar incluye un submenú oculto. Para lograr el efecto desplegable sin librerías externas, se utilizó el método `classList.toggle('abierto')`. Se programó un bloqueador de propagación de eventos (`e.stopPropagation()`) para evitar conflictos de clics con el resto del documento. Al presionar "Salir", se ejecuta `sessionStorage.removeItem('usuarioActivo')`, destruyendo la sesión y redirigiendo al login.

### Paso 4: Enrutador Interno y Captura de Alumnos

Para simular el cambio de páginas sin recargar el navegador, las diferentes pantallas (`.seccion`) se apilaron en el HTML pero se ocultaron con CSS. Al hacer clic en un enlace del Sidebar, el script extrae el atributo `data-seccion`, oculta todas las secciones eliminando la clase `.activa`, y se la añade únicamente a la sección seleccionada.

En el formulario de alumnos, se agregó la validación matemática de **6 dígitos exactos** solicitada en la rúbrica, frenando el evento `submit` con `e.preventDefault()` si las reglas no se cumplen.

### Paso 5: Algoritmo de Edades y Modales Dinámicos

Se eliminaron las alertas nativas (`alert()`) por ventanas modales diseñadas con CSS (`.modal-overlay`). Al procesar a un alumno, el JS ejecuta la utilería `esMayorDeEdad()`. Dependiendo del retorno booleano, se altera el DOM inyectando una clase `ok` (Icono verde) o una clase `no` (Icono rojo), demostrando una interfaz de usuario altamente reactiva a los datos de entrada.

---

## 6. Capturas de Pantalla del Flujo Completo Operativo

### A. Creación de una cuenta nueva en la base local

El usuario llena el formulario, las validaciones aprueban el formato y los datos se serializan en el LocalStorage.
<img width="1917" height="970" alt="image" src="https://github.com/user-attachments/assets/7c698eec-f197-4eb7-934c-db123853479b" />

### B. Validación de Login y generación de Sesión

El sistema compara las credenciales ingresadas contra la memoria del equipo. Si son correctas, otorga el acceso.
<img width="1918" height="971" alt="image" src="https://github.com/user-attachments/assets/f9fb5e44-4a37-4200-aeda-8c78b7156af6" />

### C. Dashboard de Bienvenida e inyección de datos

Ingreso exitoso al sistema. El nombre capturado durante el registro se visualiza en la barra de navegación superior derecha.
<img width="1918" height="972" alt="image" src="https://github.com/user-attachments/assets/59aa0b51-638e-4edd-b78c-8f9dd0466546" />

### D. Submenús, Validaciones y Ventanas Emergentes

Ejecución del algoritmo de validación de 6 dígitos para el número de control escolar y cálculo automatizado de la mayoría de edad reflejado en el Modal personalizado.
<img width="1917" height="971" alt="image" src="https://github.com/user-attachments/assets/71396a64-34d3-4176-86f4-2f92bb4aaf7a" />
<img width="1918" height="971" alt="image" src="https://github.com/user-attachments/assets/4e4f99f4-1a82-45d3-a12e-7311fc9a1ff9" />
<img width="1918" height="972" alt="image" src="https://github.com/user-attachments/assets/0ca57a08-8fe1-4721-b8ff-05e757e89421" />
<img width="1918" height="971" alt="image" src="https://github.com/user-attachments/assets/0584ffad-98d2-4b09-90d6-6cfdad0c7deb" />

### E. Destrucción de la Sesión

Al hacer clic en "Salir del sistema", el token temporal se borra y el usuario es expulsado a la pantalla pública, asegurando que no se pueda retroceder al sistema cerrado mediante las flechas del navegador.
<img width="1918" height="967" alt="image" src="https://github.com/user-attachments/assets/a8f25684-3d1d-4036-96cf-0b5fbdb97772" />
<img width="1918" height="965" alt="image" src="https://github.com/user-attachments/assets/76df38c2-0f1f-453f-aa59-7394e4bddbb6" />

```

```
