/* INICIO DEL PROYECTO FINAL */

window.addEventListener("DOMContentLoaded", ()=> {
    fetch("http://localhost:3000/librosRol")
    .then (response => response.json())
    .then (librosRol => {
        // Función asincrónica
        renderizarLibros(librosRol);

    })
    .catch(er=> console.log(er))
    .finally[() => console.log ("final")]
})

function renderizarLibros(librosRol) {
    // Utilizo la forma de desestructurar el .forEach() para practicar este método
    librosRol.forEach(({img, nombre, descripcion, edicion, idioma, precio}) => {   
        const librosHTML = `
        <ul>
            <li>
              <div class="card" style="width: 18rem;">
                <img src=" ${img} " class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">${descripcion}</p>
                  <p class="edition">${edicion}</p>
                  <p class="card-idiom"> ${idioma}</p>
                  <span>$${precio} USD</span>
                  <button class="btn-buy btn btn-primary">Buy it</button>
                </div>
              </div>
            </li>
        </ul>
        `;
        document.getElementById("books").innerHTML += librosHTML;
    })

    // Establezco el filtrado de idiomas de los libros
    const tipoIdioma = ["Spanish", "English", "All"]


    tipoIdioma.forEach(idioma => {
        // Creo los botones para los idiomas
        const btnTipo = document.createElement("button");
        btnTipo.innerHTML = idioma;
        btnTipo.classList.add("btn", "btn-primary", "m-2");

        // Botón para "All"
        btnTipo.addEventListener("click", () => {
            // Opción "All"
            if (idioma === "All"){
                // Vacío el HTML antes de reponer las opciones en la página
                document.getElementById("books").innerHTML="";
                // Vuelvo a invocar la rest API para que me devuelva los libros cargados
                fetch("http://localhost:3000/librosRol")
                .then((response) => response.json())
                .then(librosRol => {

                    librosRol.forEach(librosRol => {

                        const librosHTML = `
                                <li>
                                    <div class="card" style="width: 18rem;">
                                        <img src=" ${librosRol.img} " class="card-img-top">
                                        <div class="card-body">
                                        <h5 class="card-title">${librosRol.nombre}</h5>
                                        <p class="card-text">${librosRol.descripcion}</p>
                                        <p class="edition">${librosRol.edicion}</p>
                                        <p class="card-idiom"> ${librosRol.idioma}</p>
                                        <span>$${librosRol.precio} USD</span>
                                        <button class="btn btn-primary" id="boton-comprar">Buy it</button>
                                        </div>
                                    </div>
                                </li>
                            `;
                            document.getElementById("books").innerHTML += librosHTML;

                    })

                .catch((err) => console.error);

                })
                // Continúo el if, para los otros botones
                // Empleo el método .filter() para que me devuelva los datos de mi array según el idioma 
            } else {
                const librosFiltrados = librosRol.filter(lib => lib.idioma === idioma);
                console.log(librosFiltrados);
                document.getElementById("books").innerHTML="";

                // Recorro los libros para filtrar por idioma seleccionado y devolver las cards
                librosFiltrados.forEach(librosRol => {

                    const librosHTML = `
                            <li>
                                <div class="card" style="width: 18rem;">
                                    <img src=" ${librosRol.img} " class="card-img-top">
                                    <div class="card-body">
                                    <h5 class="card-title">${librosRol.nombre}</h5>
                                    <p class="card-text">${librosRol.descripcion}</p>
                                    <p class="edition">${librosRol.edicion}</p>
                                    <p class="card-idiom"> ${librosRol.idioma}</p>
                                    <span>$${librosRol.precio} USD</span>
                                    <button class="btn btn-primary" id="boton-comprar">Buy it</button>
                                    </div>
                                </div>
                            </li>
                        `;
                        document.getElementById("books").innerHTML += librosHTML;
                    })
                }
            })
            // Coloco los botones de los idiomas debajo de el div class= "tipos"
        document.getElementById("tipos").appendChild(btnTipo);
    })
}


// Funciones para el formulario de inicio
// Guardar los datos del usuario en localStorage
function guardarDatosDeUsr() {
    const datosDeUsr = {nombre: inputNombre.value,
                        edad: inputEdad.value,
                        email: inputEmail.value
    }
    let user = JSON.stringify(datosDeUsr)
    localStorage.setItem("datosDeUsr", user)

    let aviso = document.querySelector("#log")
    aviso.textContent = "The form was sent!"
}

submit.addEventListener("click", guardarDatosDeUsr);

// Devolver los datos del usuario registrado como objeto
function recuperoDatosDeUsr() {
        if (localStorage.getItem("datosDeUsr")) {
            const datosDeUsr = JSON.parse(localStorage.getItem("datosDeUsr"))
                  inputNombre.value = datosDeUsr.nombre
                  inputEdad.value = datosDeUsr.edad
                  inputEmail.value  = datosDeUsr.email
        }    
    }

recuperoDatosDeUsr();


