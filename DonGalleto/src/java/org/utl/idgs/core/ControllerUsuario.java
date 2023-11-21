
package org.utl.idgs.core;

import org.utl.idgs.connection.ConexionMySQL;
import org.utl.idgs.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Alda
 */
public class ControllerUsuario {
    public Usuario login(String usuario, String contrasenia) throws SQLException{
        String query = "SELECT * FROM v_usuario vu WHERE vu.nombreUsuario = ? AND vu.contrasenia = ?";
        
        ConexionMySQL connMySQL = new ConexionMySQL();
        
        Connection conn = connMySQL.open();
        
        PreparedStatement prepst = conn.prepareStatement(query);
        
        prepst.setString(1, usuario);
        prepst.setString(2, contrasenia);
        
        ResultSet rs = null;
        rs = prepst.executeQuery();
        
        Usuario u = null;
        
        if(rs.next())
            u = (fill(rs));
        
        rs.close();
        prepst.close();
        connMySQL.close();
        
        return u;
    }
    
    private Usuario fill(ResultSet rs) throws SQLException{
        Usuario u = new Usuario();
        
        u.setIdUsuario(rs.getInt("idUsuario"));
        u.setNombreUsuario(rs.getString("nombreUsuario"));
        u.setContrasenia(rs.getString("contrasenia"));
        u.setEstatus(rs.getInt("estatus"));
        
        return u;
    }
}
