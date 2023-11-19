
package org.utl.idgs.model;

/**
 *
 * @author Alda
 */
public class Producto {
    private int idProducto;
    private String nombreProducto;
    private float cantidadExistentes;
    private float precioVenta;
    private float precioProduccion;
    private Medida medida;

    public Producto(int idProducto, String nombreProducto, float cantidadExistentes, float precioVenta, float precioProduccion, Medida medida) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.cantidadExistentes = cantidadExistentes;
        this.precioVenta = precioVenta;
        this.precioProduccion = precioProduccion;
        this.medida = medida;
    }

    public Producto() {
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public float getCantidadExistentes() {
        return cantidadExistentes;
    }

    public void setCantidadExistentes(float cantidadExistentes) {
        this.cantidadExistentes = cantidadExistentes;
    }

    public float getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(float precioVenta) {
        this.precioVenta = precioVenta;
    }

    public float getPrecioProduccion() {
        return precioProduccion;
    }

    public void setPrecioProduccion(float precioProduccion) {
        this.precioProduccion = precioProduccion;
    }

    public Medida getMedida() {
        return medida;
    }

    public void setMedida(Medida medida) {
        this.medida = medida;
    }
}
