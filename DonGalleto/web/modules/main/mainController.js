let moduloProducto;
let moduloEstadoDeCuenta;

function inicializar(){
    console.log("Pantalla punto de venta cargada");
}

// Aqui van las funciones que mandan a llamar a las vistas solamente

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

function cargarModuloEstadoDeCuenta(){
    fetch("../estadodecuenta/vista_estadodecuenta.html")
            .then(
                function(response){
                    return response.text();
                }
            )
                .then(
                    function(html){
                        document.getElementById("contenedorPrincipal").innerHTML = html;
                        import("../estadodecuenta/estadodecuentaController.js")
                                .then(
                                    function(controller){
                                        moduloEstadoDeCuenta = controller;
                                        moduloEstadoDeCuenta.inicializar();
                                    }
                                );
                    }
                );
}
