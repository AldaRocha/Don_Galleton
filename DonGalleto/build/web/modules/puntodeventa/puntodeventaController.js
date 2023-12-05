export function inicializar() {
    getAll();
}
let datosFilas = [];

const imagenesSeleccionadas = new Set();


// Toda la funcionalidad del punto de venta
function getAll() {
    let url = "../../api/producto/getAll";
    fetch(url)
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                cargarTabla(data);
                if (data.exception != null) {
                    Swal.fire("", "Error interno del servidor. Intente nuevamente más tarde.", "error");
                    return;
                }

                if (data.error != null) {
                    Swal.fire("", data.error, "warning");
                    return;
                }

                if (data.errorsec != null) {
                    Swal.fire("", data.errorsec, "error");
                }
            });
}

function cargarTabla(data) {
    if (data && data.length > 0) {
        const contenedor = document.getElementById('contenedorGalletas');
        contenedor.innerHTML = ''; // Vacía el contenedor antes de agregar nuevos elementos

        data.forEach(producto => {
            const columna = document.createElement('div');
            columna.classList.add('col-md-3', 'mt-2');
            
            const fila = document.createElement('div');
            fila.classList.add('row');

            const divImagen = document.createElement('div');
            divImagen.classList.add('col-md-6');

            const imagen = mostrarImg(producto.fotografia); // Llama a mostrarImg y obtén el elemento <img>

            divImagen.appendChild(imagen);

            const divCantidad = document.createElement('div');
            divCantidad.classList.add('col-md-6');

            const labelCantidad = document.createElement('label');
            labelCantidad.setAttribute('for', 'txtCantGall');
            labelCantidad.textContent = 'Cantidad';
            columna.setAttribute('data-id', producto.idProducto);

            const inputCantidad = document.createElement('input');
            inputCantidad.setAttribute('type', 'text');
            inputCantidad.setAttribute('id', 'txtCantGall');
            inputCantidad.setAttribute('value', producto.cantidadExistentes); // Supongamos que tu objeto producto tiene una propiedad 'cantidad'
            inputCantidad.setAttribute('readonly', 'readonly');

            divCantidad.appendChild(labelCantidad);
            divCantidad.appendChild(inputCantidad);

            fila.appendChild(divImagen);
            fila.appendChild(divCantidad);
            columna.appendChild(fila);
            contenedor.appendChild(columna);

            const selectMedida = document.getElementById('txtMedida');

            // Añadir evento 'click' a la imagen generada
            imagen.addEventListener('click', function () {
    if (!imagenesSeleccionadas.has(producto.nombreProducto)) {
        mostrarNombreYPrecio(producto.nombreProducto, producto.precioVenta,producto.idProducto);
        imagenesSeleccionadas.add(producto.nombreProducto);

        // Resaltar la fila seleccionada
        const filas = document.querySelectorAll('.fila-producto');
        filas.forEach(fila => fila.classList.remove('fila-seleccionada'));
        columna.classList.add('fila-seleccionada');
    }
});
        });
    }
}



function mostrarNombreYPrecio( nombre, precio,idProducto) {
    const tabla = document.getElementById('tblProductos').getElementsByTagName('tbody')[0];
    const newRow = tabla.insertRow();

    // Insertar celdas con nombre, medida, precio y total
    const cellNombre = newRow.insertCell();
    const cellMedida = newRow.insertCell();
    const cellPrecio = newRow.insertCell();
    const cellTotal = newRow.insertCell();
    const cellBtn = newRow.insertCell();

    cellNombre.textContent = nombre;
    cellPrecio.textContent = precio;

    const selectMedida = document.getElementById('txtMedida');
    const inputMedida = document.createElement('input');
    inputMedida.type = 'number';
    inputMedida.classList.add('input-medida'); // Agrega una clase al input para identificarlo
    inputMedida.setAttribute('data-id-producto', idProducto); // Agregar el atributo data-id-producto con el valor de idProducto
    inputMedida.id = 'idInput';
    cellMedida.appendChild(inputMedida);

    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('btnEliminar');
    botonEliminar.innerHTML = '<i class="fa-solid fa-trash" style="color: #c20003;"></i>';

    // Agregar evento 'click' al botón para eliminar la fila
    botonEliminar.addEventListener('click', function () {
        const fila = this.parentNode.parentNode; // Obtener la fila que contiene el botón
        const nombreProducto = fila.cells[0].textContent; // Obtener el nombre del producto en la primera celda

        // Eliminar el nombre del producto del conjunto de imágenes seleccionadas
        imagenesSeleccionadas.delete(nombreProducto);

        // Eliminar la fila de la tabla
        fila.parentNode.removeChild(fila);

        // Recalcular y mostrar el total actualizado
        mostrarTotal();
    });

    cellBtn.appendChild(botonEliminar);
   
    // Agregar evento 'change' al input para capturar la medida ingresada
    inputMedida.addEventListener('change', function (event) {
        const medidaSeleccionada = selectMedida.value;
        const medidaIngresada = parseFloat(event.target.value);

        if (!isNaN(medidaIngresada)) {
            const precioUnitario = parseFloat(precio);

            // Lógica para caja de 1k
            if (medidaSeleccionada === 'caja1K') {
                const cantidadPiezas = 40; // 40 piezas por caja de 1k
                const total = cantidadPiezas * precioUnitario * medidaIngresada;
                cellTotal.textContent = total.toFixed(2);
            }

            // Lógica para caja de 1/2k
            else if (medidaSeleccionada === 'cajaMedioK') {
                const cantidadPiezas = 20; // 20 piezas por caja de 1/2k
                const total = cantidadPiezas * precioUnitario * medidaIngresada;
                cellTotal.textContent = total.toFixed(2);
            }

            // Lógica para medida por pieza
else if (medidaSeleccionada === 'pieza') {
    const total = medidaIngresada * precioUnitario;
    cellTotal.textContent = total.toFixed(2);

    // No recorras las filas y agregues al arreglo aquí, sino en otro lugar donde sea apropiado.
}

// Luego, en otro lugar apropiado de tu código, recorre las filas y agrega los valores al arreglo
const tabla = document.getElementById('tblProductos');
const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
datosFilas = [];

// Iterar sobre cada fila
for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];

    const valorInput = fila.querySelector('.input-medida').value;
    const valorTotal = fila.getElementsByTagName('td')[3].textContent;
    const valorId = fila.querySelector('.input-medida').getAttribute('data-id-producto');

    // Crear un objeto con los valores y agregarlo al array
    datosFilas.push({
        cantidad: valorInput,
        subtotal: valorTotal,
        id:valorId
    });
}

console.log(datosFilas);

            
        } else {
            cellTotal.textContent = 'Error'; // Mostrar un mensaje de error si la medida no es un número válido
        }

        calcularTotal();
        mostrarTotal();
    });
}

export function mostrarImg(base64data) {
    const imagen = document.createElement('img');
    imagen.classList.add('img-thumbnail', 'imagen-pequena');
    imagen.src = base64data;
    return imagen;
}
function calcularTotal() {
    const tabla = document.getElementById('tblProductos').getElementsByTagName('tbody')[0];
    const filas = tabla.getElementsByTagName('tr');
    let sumaTotal = 0;

    for (let i = 0; i < filas.length; i++) {
        const celdaTotal = filas[i].getElementsByTagName('td')[3]; // Índice 3 para la columna "Total"
        const valorTotal = parseFloat(celdaTotal.textContent);

        if (!isNaN(valorTotal)) {
            sumaTotal += valorTotal;
        }
    }

    return sumaTotal.toFixed(2);
}

// Función para mostrar el total actualizado debajo de la tabla
function mostrarTotal() {
    const totalInput = document.getElementById('totalInput');
    totalInput.value = calcularTotal(); // Actualiza el valor del input con el total calculado
}


// Función para obtener la cantidad de una galleta seleccionada
function obtenerCantidadDeGalletaSeleccionada() {
    const inputMedida = document.querySelector('.fila-seleccionada .input-medida');
    // Supongamos que el input para la medida está dentro de la fila seleccionada y tiene una clase 'input-medida'

    if (inputMedida) {
        const cantidad = parseFloat(inputMedida.value);
        return isNaN(cantidad) ? 0 : cantidad; // Si el valor no es un número válido, devuelve 0
    }

    return 0; // Si no se encuentra el elemento, devuelve 0 como cantidad predeterminada
}




// Función para obtener el subtotal de una galleta seleccionada
function obtenerSubtotalDeGalletaSeleccionada() {
    const filaSeleccionada = document.querySelector('.fila-seleccionada'); // Obtener la fila seleccionada

    if (filaSeleccionada) {
        const cellTotal = filaSeleccionada.querySelector('td:nth-child(4)'); // Suponiendo que el subtotal está en la cuarta celda (índice 3)
        if (cellTotal) {
            const subtotal = parseFloat(cellTotal.textContent);
            console.log("SubIN"+subtotal); // Mover esta línea antes del return
            return isNaN(subtotal) ? 0 : subtotal; // Si el valor no es un número válido, devuelve 0
        }
    }

    return 0; // Si no se encuentra el elemento o la fila seleccionada, devuelve 0 como subtotal predeterminado
}

function obtenerIdProductoDeGalletaSeleccionada() {
    const filaSeleccionada = document.querySelector('.fila-seleccionada'); // Clase para identificar la fila seleccionada

    if (filaSeleccionada) {
        const idProducto = filaSeleccionada.getAttribute('data-id');
        return idProducto ? parseInt(idProducto) : 0; // Si hay un id válido, conviértelo a entero
    }

    return 0; // Si no se encuentra la fila, devuelve 0 como ID predeterminado
}



function obtenerIdMedidaDeGalletaSeleccionada() {
    const selectMedida = document.getElementById('txtMedida'); // Obtener el elemento select para la medida

    if (selectMedida) {
        const opcionSeleccionada = selectMedida.value; // Obtener el valor de la opción seleccionada

        // Asignar el ID según la opción seleccionada
        let idMedida;
        switch (opcionSeleccionada) {
            case 'pieza':
                idMedida = 1; // ID para la opción de pieza
                break;
            case 'caja1K':
                idMedida = 3; // ID para la opción de caja de 1K
                break;
            case 'cajaMedioK':
                idMedida = 3; // ID para la opción de caja de 1/2K (en este caso, también usamos el ID 3)
                break;
            default:
                idMedida = 0; // En caso de que no se encuentre ninguna opción válida
                break;
        }

        return idMedida;
    }

    return 0; // Si no se encuentra el elemento, devuelve 0 como ID de medida predeterminado
}


export function guardarVenta() {
    let datos = null;
    let params = null;
    
    const totalVenta = calcularTotal();

    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();

// Asegurar que el día y el mes tengan dos dígitos
    var diaFormateado = dia < 10 ? '0' + dia : dia;
    var mesFormateado = mes < 10 ? '0' + mes : mes;

    var fechaFormateada = diaFormateado + '/' + mesFormateado + '/' + anio;

    // Crear objeto con los datos de la venta principal
    let venta = {
        total: calcularTotal(),
        fechaVenta: fechaFormateada
    };

    let datosVenta = {
        datosVenta: JSON.stringify(venta)
    };

    let paramsVenta = new URLSearchParams(datosVenta);

    // Enviar la solicitud para guardar la venta principal
    fetch("../../api/venta/save", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: paramsVenta
    })
    .then(response => {
        return response.json();
    })
    .then(function(data) {
        // Verificar el éxito de la operación y proceder con el detalle de venta
        if (data.idVenta) {
                    console.log(data);
            // Crear objeto con los datos del detalle de venta
                    console.log("DatosFilas"+datosFilas);
                for (var i = 0; i < datosFilas.length; i++) {  
                    console.log("DatosFilasIn"+datosFilas[i]);
                    let detalleVenta = {
                    cantidad: parseFloat(datosFilas[i]['cantidad']),
                    subtotal: parseFloat(datosFilas[i]['subtotal']),
                    venta:{
                    idVenta: data.idVenta},
                    producto:{
                    idProducto: parseInt(datosFilas[i]['id'])},
                    medida:{
                    idMedida: obtenerIdMedidaDeGalletaSeleccionada()}

                    // Otras propiedades del detalle de venta...
                };

                let datosDetalleVenta = {
                    datosDetalleVenta: JSON.stringify(detalleVenta)
                };

                let paramsDetalleVenta = new URLSearchParams(datosDetalleVenta);

                // Enviar la solicitud para guardar el detalle de venta
                fetch("../../api/detalleventa/save", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: paramsDetalleVenta
                })
                .then(response => {
                    return response.json();
                })
                .then(function(dataDetalle) {
                    // Manejar la respuesta del servidor después de insertar el detalle de venta
                    console.log(dataDetalle);
                     Swal.fire('', 'Compra realizada correctamente', 'success');
                limpiarTabla();
                getAll();
                });
                }
            
           
        } else {
            // Manejar el caso en que la venta principal no se haya guardado correctamente
            console.log("Error al guardar la venta principal");
        }
        
    });
}

export function limpiarTabla() {
    const tabla = document.getElementById('tblProductos').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Vacía el contenido del cuerpo de la tabla
    mostrarTotal(); // Actualiza el total después de limpiar la tabla
}