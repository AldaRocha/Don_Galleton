let movimientos = [];

export function inicializar(){
    traerDatos();
}

// Toda la funcionalidad del estado de cuenta

function traerDatos(){
    mostrarCargando();
    
    let desde = $("#txtDesde").val();
    let hasta = $("#txtHasta").val();
    
    $.ajax({
        url: "../../api/movimiento/buscar?desde='" + desde + "'&hasta='" + hasta + "'",
        type: "GET",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function (response){
            let data = response;
            
            if(data.error){
                Swal.fire('', data.error, 'warning');
                ocultarCargando();
            } else if(data.exception){
                Swal.fire('', "Error interno del servidor. Intente mas tarde.", 'error');
                ocultarCargando();
            } else{
                llenarTabla(data);
            }
        }
    });
}

function llenarTabla(data){
    
    
    ocultarCargando();
}
