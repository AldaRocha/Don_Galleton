export function inicializar(){
    console.log("js");
}

$(document).ready(function() {
    fetch('../producto/productos.json')
    .then(response => response.json())
    .then(data => { 
        console.log(data['productos'].length);
        
        // agregar galletas horneadas dinamico en select
        for (let i = 0; i <data['productos'].length; i++) {        
            let fila = `<option value="${data['productos'][i]['nombre']}">${data['productos'][i]['nombre']}</option>`;
            $('#txtGalleta').append(fila);
        }

        // generar tabla dinamica
        for (let i = 0; i <data['productos'].length; i++) {        
            let fila = `<tr>
                <td>${data['productos'][i]['nombre']}</td>
                <td>${data['productos'][i]['medida']}</td>
                <td>${data['productos'][i]['costoProduccion']}</td>
                <td>${data['productos'][i]['precioVenta']}</td>`;
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
    })
    .catch(error => console.error('Error al obtener el archivo JSON:', error));

    $('#agregarGalletasHorneadas').on('click', 'button', function () {
        $('#modalProductos').modal('show');
    });

    $('#agregarGalletaNueva').on('click', 'button', function () {
        $('#modalProductosNuevos').modal('show');
    });

});