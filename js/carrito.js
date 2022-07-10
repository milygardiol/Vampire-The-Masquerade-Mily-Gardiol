// VARIABLES
document.addEventListener('DOMContentLoaded', () => { 

    let carrito = [];
    const divisa = '$';
    const items = document.querySelector('#items');
    const miCarrito = document.querySelector('#carrito');
    const total = document.querySelector('#total');
    const botonVaciar = document.querySelector('#boton-vaciar');
    const botonComprar = document.querySelectorAll("#boton-comprar")
    const localStorage = window.localStorage;

            // Funciones

    function renderizarProductos() {
                librosRol.forEach((info) => {
                    // Boton 
                    botonComprar.classList.add("btn", "btn-primary");
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