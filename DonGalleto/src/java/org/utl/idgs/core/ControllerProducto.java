
package org.utl.idgs.core;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import org.utl.idgs.connection.ConexionMySQL;
import org.utl.idgs.model.Medida;
import org.utl.idgs.model.Producto;

/**
 *
 * @author jorgemorales
 */
public class ControllerProducto {
    public int insertarProducto(Producto p) throws Exception {
        String sql = "{call insertarProducto(?, ?,"
                                            + "?, ?, "
                                            + "?, ?)}";
       
        int idProductoGenerado = -1;
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);
        
        cstmt.setString(1, p.getNombreProducto());
        cstmt.setDouble(2, p.getCantidadExistentes());
        cstmt.setDouble(3, p.getPrecioVenta());
        cstmt.setDouble(4, p.getPrecioProduccion());
        cstmt.setInt(5, p.getMedida().getIdMedida());
        cstmt.registerOutParameter(6, Types.INTEGER);
        cstmt.executeUpdate();
        idProductoGenerado = cstmt.getInt(6);
        p.setIdProducto(idProductoGenerado);

        cstmt.close();
        connMySQL.close();

        return idProductoGenerado;
    }
    
        public void actualizarProducto(Producto p) throws Exception {
        String sql = "{call actualizarProducto(?, ?,"
                                            + "?, ?, "
                                            + "?, ?)}"; 

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql); 
        
        cstmt.setString(2, p.getNombreProducto());
        cstmt.setDouble(3, p.getCantidadExistentes());
        cstmt.setDouble(4, p.getPrecioVenta());
        cstmt.setDouble(5, p.getPrecioProduccion());
        cstmt.setInt(6, p.getMedida().getIdMedida());
        
        cstmt.setInt(1, p.getIdProducto());

        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();
    }
        
    public void eliminarProducto(int idProducto) throws Exception {

    String sql = "DELETE FROM producto WHERE idProducto="+idProducto;
    
    ConexionMySQL connMySQL = new ConexionMySQL();

    Connection conn = connMySQL.open();

    PreparedStatement pstm = conn.prepareStatement(sql);

     pstm.executeUpdate();

    pstm.close();
    connMySQL.close();

    }
    
    public List<Producto> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM v_producto;" ;

        ConexionMySQL connMySQL = new ConexionMySQL(); 

        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(sql);

        ResultSet rs = pstmt.executeQuery();
        List<Producto> productos = new ArrayList<>();

        while (rs.next()) {
            productos.add(fill(rs));
        }

        rs.close();
        pstmt.close();
        connMySQL.close();

        return productos;
    }
    
    private Producto fill(ResultSet rs) throws Exception {
        Producto p = new Producto();
        Medida m = new Medida();
        
        m.setIdMedida(rs.getInt("idMedida"));
        m.setTipoMedida(rs.getString("tipoMedida"));
        p.setMedida(m);
        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombreProducto(rs.getString("nombreProducto"));
        p.setCantidadExistentes(rs.getDouble("cantidadExistentes"));
        p.setPrecioVenta(rs.getDouble("precioVenta"));
        p.setPrecioProduccion(rs.getDouble("precioProduccion"));
        

        
        return p;
    }
    
}
