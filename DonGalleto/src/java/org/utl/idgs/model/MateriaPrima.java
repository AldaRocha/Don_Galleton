
package org.utl.idgs.model;

import java.util.Date;

/**
 *
 * @author Alda
 */
public class MateriaPrima {
    private int idMateriaPrima;
    private String nombreMateria;
    private Date fechaCompra;
    private Date fechaVencimiento;
    private int estatus;
    private float cantidadExistentes;
    private float precioCompra;
    private int porcentaje;
    private Medida medida;

    public MateriaPrima(int idMateriaPrima, String nombreMateria, Date fechaCompra, Date fechaVencimiento, int estatus, float cantidadExistentes, float precioCompra, int porcentaje, Medida medida) {
        this.idMateriaPrima = idMateriaPrima;
        this.nombreMateria = nombreMateria;
        this.fechaCompra = fechaCompra;
        this.fechaVencimiento = fechaVencimiento;
        this.estatus = estatus;
        this.cantidadExistentes = cantidadExistentes;
        this.precioCompra = precioCompra;
        this.porcentaje = porcentaje;
        this.medida = medida;
    }

    public MateriaPrima() {
    }

    public int getIdMateriaPrima() {
        return idMateriaPrima;
    }

    public void setIdMateriaPrima(int idMateriaPrima) {
        this.idMateriaPrima = idMateriaPrima;
    }

    public String getNombreMateria() {
        return nombreMateria;
    }

    public void setNombreMateria(String nombreMateria) {
        this.nombreMateria = nombreMateria;
    }

    public Date getFechaCompra() {
        return fechaCompra;
    }

    public void setFechaCompra(Date fechaCompra) {
        this.fechaCompra = fechaCompra;
    }

    public Date getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(Date fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    public float getCantidadExistentes() {
        return cantidadExistentes;
    }

    public void setCantidadExistentes(float cantidadExistentes) {
        this.cantidadExistentes = cantidadExistentes;
    }

    public float getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(float precioCompra) {
        this.precioCompra = precioCompra;
    }

    public int getPorcentaje() {
        return porcentaje;
    }

    public void setPorcentaje(int porcentaje) {
        this.porcentaje = porcentaje;
    }

    public Medida getMedida() {
        return medida;
    }

    public void setMedida(Medida medida) {
        this.medida = medida;
    }
}
