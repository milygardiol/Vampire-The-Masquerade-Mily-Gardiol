// VARIABLES
document.addEventListener('DOMContentLoaded', () => { 
    const librosRol = [
        {
            id : 1,
            nombre: "Vampiro La Mascarada",
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 200
        },
        {
            id: 2,
            nombre: "Camarilla" ,
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 170
        },
        {
            id: 3,
            nombre: "Anarquistas",
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 4,
            nombre: "Chicago By Night",
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 5,
            nombre: "Chicago Folios",
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 150
        },
        {
            id: 6,
            nombre:  "Let the Streets Run Red",
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 158
        },
        {
            id: 7,
            nombre:  "La Caída de Londres",
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 180
        },
        {
            id: 8,
            nombre:  "Companion",
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 150
        },
        {
            id: 9,
            nombre:  "Cults of the Blood Gods",
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 190
        },
        {
            id: 10,
            nombre:  "Trails of Ash and Bone",
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 11,
            nombre:  "Children of the Blood",
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 12,
            nombre:  "Forbidden Religions",
            idioma: "Inglés",
            edicion: "5ta Edición",
            precio: 160
        },
        {
            id: 13,
            nombre:  "Sabbat La Mano Negra",
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 190
        },
        {
            id: 14,
            nombre:  "Segunda Inquisición",
            idioma: "Español",
            edicion: "5ta Edición",
            precio: 190
        }
    ];

    let carrito = [];
            const divisa = '$';
            const items = document.querySelector('#items');
            const miCarrito = document.querySelector('#carrito');
            const total = document.querySelector('#total');
            const botonVaciar = document.querySelector('#boton-vaciar');
            const botonComprar = document.querySelector("#botonComprar");
            const localStorage = window.localStorage;

            // Funciones

            function renderizarProductos() {
                librosRol.forEach((info) => {
                    // Boton 
                    botonComprar.classList.add('btn', 'btn-primary');
                    botonComprar.setAttribute('marcador', info.id);
                    botonComprar.addEventListener('click', comprarCarrito);
                });
            }

            function comprarCarrito(evento) {
                carrito.push(evento.target.getAttribute('marcador'))
                renderizarCarrito();
                guardarCarritoEnLocalStorage();
            }

            function renderizarCarrito() {
                miCarrito.textContent = '';
                const carritoSinDuplicados = [...new Set(carrito)];
                carritoSinDuplicados.forEach((item) => {
                    const miItem = librosRol.filter((itemlibrosRol) => {
                        return itemlibrosRol.id === parseInt(item);
                    });
                    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                        return itemId === item ? total += 1 : total;
                    }, 0);

                    const miNodo = document.createElement('li');
                    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
                    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

                    // Boton de borrar
                    const miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
                    miBoton.textContent = 'X';
                    miBoton.style.marginLeft = '1rem';
                    miBoton.dataset.item = item;
                    miBoton.addEventListener('click', borrarItemCarrito);

                    // Mezclamos nodos
                    miNodo.appendChild(miBoton);
                    miCarrito.appendChild(miNodo);
                });
                total.textContent = calcularTotal();
            }

            function borrarItemCarrito(evento) {
                const id = evento.target.dataset.item;
                carrito = carrito.filter((carritoId) => {
                    return carritoId !== id;
                });
                renderizarCarrito();
                guardarCarritoEnLocalStorage();

            }

            function calcularTotal() {
                return carrito.reduce((total, item) => {
                    const miItem = librosRol.filter((itemlibrosRol) => {
                        return itemlibrosRol.id === parseInt(item);
                    });
                    return total + miItem[0].precio;
                }, 0).toFixed(2);
            }

            function vaciarCarrito() {
                carrito = [];
                renderizarCarrito();
                localStorage.clear();
            }

            function guardarCarritoEnLocalStorage () {
                localStorage.setItem('carrito', JSON.stringify(carrito));
            }

            function cargarCarritoDeLocalStorage () {
                if (localStorage.getItem('carrito') !== null) {
                    carrito = JSON.parse(localStorage.getItem('carrito'));
                }
            }

            botonVaciar.addEventListener('click', vaciarCarrito);

            cargarCarritoDeLocalStorage();
            renderizarProductos();
            renderizarCarrito();
        });