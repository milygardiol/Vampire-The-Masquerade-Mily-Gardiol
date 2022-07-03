/* INICIO DEL PROYECTO FINAL */

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

submit.addEventListener("click", guardarDatosDeUsr)


function recuperoDatosDeUsr() {
        if (localStorage.getItem("datosDeUsr")) {
            const datosDeUsr = JSON.parse(localStorage.getItem("datosDeUsr"))
                  inputNombre.value = datosDeUsr.nombre
                  inputEdad.value = datosDeUsr.edad
                  inputEmail.value  = datosDeUsr.email
        }    
    }

recuperoDatosDeUsr()


