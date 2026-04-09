package com.techlaco.dtos.response;

import com.techlaco.entities.PerfilCliente;

public record PerfilClienteCompletoResponse(
        Long id,
        String bio,
        Long totalProjetos
) {
    public static PerfilClienteCompletoResponse from(PerfilCliente perfil, Long totalProjetos) {
        return new PerfilClienteCompletoResponse(
                perfil.getId(),
                perfil.getBio(),
                totalProjetos
        );
    }


}
