let nombre;
let cantidadExistentes;
let totalCantidadExis;
let precioVenta;
let precioProduccion;
let idMedida = 1;

export function inicializar(){
    getAll();
    $("#txtGalleta").change(function () {
        var idProducto = $(this).find("option:selected").attr("idproducto");
        nombre = $(this).find("option:selected").attr("value");
        cantidadExistentes = $(this).find("option:selected").attr("cantidadExistentes");
        precioVenta = $(this).find("option:selected").attr("precioVenta");
        precioProduccion = $(this).find("option:selected").attr("precioProduccion");

        document.getElementById("txtIdProducto").value = idProducto;        
    });
}

export function guardarGalleta(){
    
    let datos = null;
    let params = null;

    let producto = new Object();
    producto.medida = {};

    let len = parseInt(document.getElementById("txtIdProducto").value.trim().length);
    if (len === 0){
            producto.idProducto = 0;
    }

    producto.nombreProducto = document.getElementById("txtNuevaGalleta").value;
    producto.cantidadExistentes = 0;
    producto.precioProduccion = document.getElementById("txtPrecioProdGalleta").value;
    producto.precioVenta = document.getElementById("txtPrecioVentaGalleta").value;
    producto.medida.idMedida = 1;


    datos = {
        datosProducto: JSON.stringify(producto)
    };

    params = new URLSearchParams(datos);
    console.log(params);
    fetch("../../api/producto/save",
            {method: "POST",

                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })

            .then(response => {
                return response.json();
            })
            .then(function (data)
            {
                if (data.exception != null)
                {
                    Swal.fire('', "Error interno del servidor. Intente nuevamente más tarde", 'warning');

                    return;
                }
                if (data.error != null)
                {
                    Swal.fire('', data.error, 'warning');

                    return;
                }
                if (data.errorperm != null)
                {
                    Swal.fire('', "No tiene permiso para realizar esta operación.", 'warning');

                }

                Swal.fire('', 'Galleta registrada correctamente', 'success');
                getAll();
            });
}

export function agregarGalletaHorneada(){
    let datos = null;
    let params = null;

    let producto = {};
    producto.medida = {};
    
    let len = parseInt(document.getElementById("txtIdProducto").value.trim().length);
    if (len === 0){
            producto.idProducto = 0;
    } else{
        console.log("ACTUALIZAR");
    producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    }
        
        
        var valueMerma = $('#txtMerma').val();
        console.log(valueMerma);
        if (valueMerma !== "") {
            let total = 120 - parseInt(valueMerma);
            totalCantidadExis = parseInt(cantidadExistentes) + total;
    } else {
            totalCantidadExis = (parseInt(cantidadExistentes) + 120);
    }
        console.log(totalCantidadExis);

        
        producto.nombreProducto = nombre;
        producto.cantidadExistentes = totalCantidadExis;
        producto.precioVenta = precioVenta;
        producto.precioProduccion = precioProduccion;
        
        producto.medida.idMedida = idMedida;
            
        datos = {
        datosProducto: JSON.stringify(producto) 
        };
        
        console.log(datos);

    params = new URLSearchParams(datos);
    fetch("../../api/producto/save",
            {method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })

            .then(response => {
                return response.json();
            })
            .then(function (data)
            {
                if (data.exception != null)
                {
                    Swal.fire('', "Error interno del servidor. Intente nuevamente más tarde", 'warning');

                    return;
                }
                if (data.error != null)
                {
                    Swal.fire('', data.error, 'warning');

                    return;
                }
                if (data.errorperm != null)
                {
                    Swal.fire('', "No tiene permiso para realizar esta operación.", 'warning');

                }

                document.getElementById("txtIdProducto").value = data.idProducto;

                Swal.fire('', 'Datos actualizados correctamente', 'success');

            });

}

export function cargarTabla(data) {
    console.log(data);
    
    $('#txtGalleta').empty();
    
    // agregar galletas horneadas dinamico en select
    let fila = `<option selected>Elige la galleta</option>`;
    for (let i = 0; i <data.length; i++) {
        fila += `<option precioVenta="${data[i]['precioVenta']}" precioProduccion="${data[i]['precioProduccion']}" cantidadExistentes="${data[i]['cantidadExistentes']}" idProducto="${data[i]['idProducto']}" value="${data[i]['nombreProducto']}">${data[i]['nombreProducto']}</option>`;
    }
    $('#txtGalleta').append(fila);
    
    // Destruye la tabla
    if ($.fn.DataTable.isDataTable('#tblProductos')) {
        $('#tblProductos').DataTable().destroy();
        $('#tblProductos tbody').empty();
    }

    // generar tabla dinamica
    for (let i = 0; i <data.length; i++) {        
        let fila = `<tr>
            <td>${data[i]['nombreProducto']}</td>
            <td>${data[i]['cantidadExistentes']}</td>
            <td>${data[i]['precioProduccion']}</td>
            <td>${data[i]['precioVenta']}</td>`;
        $('#tblProductos tbody').append(fila);
    }

    $('#tblProductos').DataTable({
        dom: "<'row' <'col-sm-6'l><'col-sm-5'f>>  <'row' <'col-sm-12'tr>>  <'row' <'col-4'i><'col'p>>",
        initComplete: function(){
            $('.dataTables_filter').addClass('text-end');
        },
        language: {
            decimal: "",
            emptyTable: "No hay información",
            info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            infoEmpty: "Mostrando 0 Entradas",
            infoFiltered: "(Filtrado de _MAX_ total entradas)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Mostrar   _MENU_  Entradas",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: " ",
            searchPlaceholder: "Buscar",
            zeroRecords: "Sin resultados encontrados",
            paginate: {
                first: "Primero",
                last: "Ultimo",
                next: "Siguiente",
                previous: "Anterior",
            }
        },

        "ordering": false,
        retrieve: true
    }); 

    $('#agregarGalletasHorneadas').on('click', 'button', function () {
        $('#modalProductos').modal('show');
    });

    $('#agregarGalletaNueva').on('click', 'button', function () {
        $('#modalProductosNuevos').modal('show');
    });
    




};

function getAll(){
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