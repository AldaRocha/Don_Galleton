
package org.utl.idgs.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.idgs.core.ControllerUsuario;
import org.utl.idgs.model.Usuario;

/**
 *
 * @author Alda
 */
@Path("log")
public class RESTUsuario {
    @Path("in")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response login(@FormParam("datos") @DefaultValue("") String datos) throws Exception{
        String out = null;
        Gson gson = new Gson();
        Usuario u = new Usuario();
        ControllerUsuario cu = new ControllerUsuario();
        
        try{
            u = gson.fromJson(datos, Usuario.class);
            
            if(u == null){
                out = """
                      {"error": "Debe ingresar usuario y contraseña para continuar."}
                      """;
                return Response.status(Response.Status.OK).entity(out).build();
            }
            if(u.getNombreUsuario() == null || u.getNombreUsuario() == ""){
                out = """
                      {"error": "Ingrese su nombre de usuario para continuar."}
                      """;
                return Response.status(Response.Status.OK).entity(out).build();
            }
            if(u.getContrasenia() == null || u.getContrasenia() == ""){
                out = """
                      {"error": "Ingrese su contraseña para continuar."}
                      """;
                return Response.status(Response.Status.OK).entity(out).build();
            }
            
            u = cu.login(u.getNombreUsuario(), u.getContrasenia());
            
            if(u == null){
                out = """
                      {"error": "Usuario no encontrado, revise su usuario y contraseña."}
                      """;
            } else{
                if(u.getEstatus() == 1){
                    out = gson.toJson(u);
                } else{
                    out = """
                        {"error": "El usuario esta inactivo."}
                    """;
                }
            }
            
        } catch(Exception ex){
            ex.printStackTrace();
            out = """
                  {"exception": "%s"}
                  """;
            out = String.format(out, ex.getMessage());
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
