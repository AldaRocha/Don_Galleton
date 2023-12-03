export function inicializar() {
    getAll();
}

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
            columna.classList.add('col-md-3','mt-2');

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
         imagen.addEventListener('click', function() {
                // Verificar si la imagen ya está seleccionada
                if (!imagenesSeleccionadas.has(producto.nombreProducto)) {
                    mostrarNombreYPrecio(producto.nombreProducto, producto.precioVenta);
                    // Agregar la imagen seleccionada al conjunto
                    imagenesSeleccionadas.add(producto.nombreProducto);
                }
            });
            });
    }
}

export function mostrarImg(base64data) {
    const imagen = document.createElement('img');
    imagen.classList.add('img-thumbnail', 'imagen-pequena');
    imagen.src = base64data;
    return imagen;
}

function mostrarNombreYPrecio(nombre, precio) {
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
    inputMedida.type = 'text';
    inputMedida.classList.add('input-medida'); // Agrega una clase al input para identificarlo
    cellMedida.appendChild(inputMedida);
    
    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('btnEliminar');
    botonEliminar.innerHTML = '<i class="fa-solid fa-trash" style="color: #c20003;"></i>';

    // Agregar evento 'click' al botón para eliminar la fila
    botonEliminar.addEventListener('click', function() {
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
    inputMedida.addEventListener('change', function(event) {
        const medidaIngresada = parseFloat(event.target.value); // Obtener el valor ingresado en el input y convertirlo a número

        if (!isNaN(medidaIngresada) && selectMedida.value === 'pieza') {
            const precioUnitario = parseFloat(precio); // Convertir el precio a número
            const total = medidaIngresada * precioUnitario; // Calcular el total

            cellTotal.textContent = total.toFixed(2); // Mostrar el total en la celda correspondiente, con dos decimales
        } else {
            cellTotal.textContent = 'Error'; // Mostrar un mensaje de error si la medida no es un número válido o la medida no es "Piezas"
        }
        calcularTotal();
        mostrarTotal();
    });
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
