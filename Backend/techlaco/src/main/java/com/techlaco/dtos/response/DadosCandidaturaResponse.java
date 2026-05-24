package com.techlaco.dtos.response;

import com.techlaco.entities.Candidatura;

public record DadosCandidaturaResponse(
        Long id,
        Long projetoId,
        String tituloProjeto,
        String status,
        String mensagem,
        String feedbackCliente
) {
    public static DadosCandidaturaResponse from(Candidatura candidatura) {
        return new DadosCandidaturaResponse(
                candidatura.getId(),
                candidatura.getProjeto().getId(),
                candidatura.getProjeto().getTitulo(),
                candidatura.getStatus().getValue(),
                candidatura.getMensagem(),
                candidatura.getFeedbackCliente()
        );
    }
}
