package com.techlaco.dtos.response;

import com.techlaco.entities.PerfilCliente;

public record ClienteProjetoResponse(
        Long id,
        String nome
) {
    public static ClienteProjetoResponse from(PerfilCliente perfilCliente) {
        return new ClienteProjetoResponse(
                perfilCliente.getId(),
                perfilCliente.getUsuario().getNomeCompleto()
        );
    }
}
