package com.techlaco.dtos.response;

import com.techlaco.entities.Candidatura;

public record CandidaturaAtualizadaResponse(
        Long id,
        String status,
        Long projetoId,
        String tituloProjeto
) {
    public static CandidaturaAtualizadaResponse from(Candidatura candidatura) {
        return new CandidaturaAtualizadaResponse(
                candidatura.getId(),
                candidatura.getStatus().getValue(),
                candidatura.getProjeto().getId(),
                candidatura.getProjeto().getTitulo()
        );
    }
}
