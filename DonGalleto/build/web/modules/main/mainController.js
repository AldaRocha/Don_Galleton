export function inicializar(){
    console.log("Pantalla punto de venta cargada");
}

let moduloProducto;


function cargarModuloProductos() {
    fetch("../../modules/producto/vista_producto.html")
            .then(
                    function (response) {
                        console.log(response);
                        return response.text();
                    }
            )
            .then(
                    function (html) {
                        document.getElementById("contenedorPrincipal").innerHTML = html;
                        import("../producto//productoController.js").then(
                                function (controller) {
                                    moduloProducto = controller;
                                    moduloProducto.inicializar();
                                }
                        );
                    }
            );
}

// Aqui van las funciones que mandan a llamar a las vistas solamente