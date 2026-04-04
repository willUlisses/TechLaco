package com.techlaco.dtos.response;

import com.techlaco.entities.Usuario;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

public record UsuarioCompletoResponse(
     Long id,
     String nome,
     String sobrenome,
     String email,
     List<String> role,
     Boolean isCliente,
     Boolean isFreelancer,
     PerfilFreelancerResponse perfilFreelancerResponse,
     PerfilClienteResponse perfilClienteResponse
) {
    public static UsuarioCompletoResponse from(Usuario usuario) {
        return new UsuarioCompletoResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getSobrenome(),
                usuario.getEmail(),
                usuario.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList(),
                usuario.isCliente(),
                usuario.isFreelancer(),
                usuario.isFreelancer()
                        ? PerfilFreelancerResponse.from(usuario.getPerfilFreelancer())
                        : null,
                usuario.isCliente()
                        ? PerfilClienteResponse.from(usuario.getPerfilCliente())
                        : null
        );
    }


}
