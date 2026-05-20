package com.techlaco.dtos.response;

import com.techlaco.entities.PerfilCliente;

public record PerfilClienteResponse(
        Long id,
        String bio
) {
    public static PerfilClienteResponse from(PerfilCliente perfil) {
        return new PerfilClienteResponse(
                perfil.getId(),
                perfil.getBio()
        );
    }
}
