// VARIABLES

    const librosRol = [
        {
            id : 0,
            nombre: "Vampiro La Mascarada",
            cantidad: 1,
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 200
        },
        {
            id: 1,
            nombre: "Camarilla" ,
            cantidad: 1,
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 170
        },
        {
            id: 2,
            nombre: "Anarquistas",
            cantidad: 1,
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 3,
            nombre: "Chicago By Night",
            cantidad: 1,
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 4,
            nombre: "Chicago Folios",
            cantidad: 1,
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 150
        },
        {
            id: 5,
            nombre:  "Let the Streets Run Red",
            cantidad: 1,
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 158
        },
        {
            id: 6,
            nombre:  "La Caída de Londres",
            cantidad: 1,
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 180
        },
        {
            id: 7,
            nombre:  "Companion",
            cantidad: 1,
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 150
        },
        {
            id: 8,
            nombre:  "Cults of the Blood Gods",
            cantidad: 1,
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 190
        },
        {
            id: 9,
            nombre:  "Trails of Ash and Bone",
            cantidad: 1,
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 10,
            nombre:  "Children of the Blood",
            cantidad: 1,
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 11,
            nombre:  "Forbidden Religions",
            cantidad: 1,
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 12,
            nombre:  "Sabbat La Mano Negra",
            cantidad: 1,
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 190
        },
        {
            id: 13,
            nombre:  "Segunda Inquisición",
            cantidad: 1,
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 190
        }
    ];


function mostrarProd (librosRol) {
        container.innerHTML=""
        librosRol.forEach(el => {
        let div = document.createElement('div')
        div.className = 'producto'
        div.setAttribute('class', 'producto')
        div.classList.add('producto')
        div.innerHTML= `<div class="card">
                        <div class="card-image">
                            <img src="${el.img}">
                            <p class="card-title">${el.nombre}</p>
                            </div>
                            <div class="card-content">
                            <p>${el.descripcion}</p>
                            <p>Talle: ${el.edicion}</p>
                            <p>Idioma: ${el.idioma}</p>
                            <p> $${el.precio}</p>
                            <button id="boton${el.id}" class="btn btn-danger"></button>
                        </div>
                    </div> `
    
        container.appendChild(div);
        
        let btnAgregar = document.getElementById(`boton${el.id}`)
        console.log(btnAgregar);
        btnAgregar.addEventListener('click',()=>{
            addStorage(el.id);
        })
        
    })
    
}

let carrito = [];
const divisa = '$';
const items = document.querySelector('#items');
const miCarrito = document.querySelector('#carrito');
const total = document.querySelector('#total');
const botonVaciar = document.querySelector('#boton-vaciar');
let container = document.getElementById("#tipos")

    const localStorage = window.localStorage;

    let btnFunc = document.querySelectorAll(".btn-buy");

    for (let i = 0; i < btnFunc.length; i++) {
        btnFunc[i].addEventListener("click", () => addStorage(btnFunc[i]));
        btnFunc[i].addEventListener("click", () => carShop(btnFunc[i]));
    }

    //slice() , findIndex() , indice en los arrays

    function addStorage(param) {
        let getId = param.id;
        let getNum = getId.slice(4);
        let find = librosRol.findIndex(index => index.id == parseInt(getNum))
        let obj = librosRol[find]
        let findCar = carrito.findIndex(index => index.id == parseInt(getNum));
        if(findCar == -1) {
            carrito.push(obj);
        }else {
            carrito[findCar].cantidad += 1;
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // localStorage.getItem("carrito") ? carShop() : emptyCar();

    function carShop() {
        let car = localStorage.getItem("carrito");
        if(car) {
            let stringToObj = JSON.parse(car);
            let map = stringToObj.map((x) => {
                const {id, nombre, idioma, cantidad, edicion, precio} = x;
                return (
                    `<li>${nombre}
                        <ul>
                            <li>idioma: ${idioma}</li>
                            <li>edicion: ${edicion}</li>
                            <li>cantidad: ${cantidad}</li>
                            <li>precio: ${precio}</li>
                            <li>total: ${precio * cantidad}</li>
                        </ul>
                    </li>
                    <button class="btn btn-danger" id= "btn-eliminar" style="width: 80px">Eliminar</button>`
                )
            })
            miCarrito.innerHTML = map.join("");
        }else {
            miCarrito.innerHTML = `<li>No hay productos agregados</li>`
        }
    }

    

    function removeCar(prod) {
        // Selecciono los botones de eliminar
        let btnElim = document.querySelectorAll(`.btn btn-danger`);
        // Recorro los botones para agregar los eventos
        btnElim.forEach(btnElim => {
            btnElim.addEventListener("click", ()=>{
            removeCar(prod);
            })
        });
        // 
        let id = prod.id;
        let numero = id.slice(4);
        let find = miCarrito.findIndex(index => index.id == parseInt(numero))
        if (find >= 0 ) {
            miCarrito.splice(find, 1)
            addStorage()
        }
        console.warn("Se eliminó correctamente")
    }

    mostrarProd();
    /* Para eliminar un solo productos del array, necesitaras dar uso al metodo findIndex() y splice()*/