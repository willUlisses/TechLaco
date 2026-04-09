package com.techlaco.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.techlaco.entities.Candidatura;

public record CandidaturasProjetoResponse(
        Long id,
        String status,
        String mensagem,

        @JsonProperty("freelancer")
        FreelancerCandidatadoResponse freelancer
) {
    public static CandidaturasProjetoResponse from(Candidatura candidatura) {
        return new CandidaturasProjetoResponse(
                candidatura.getId(),
                candidatura.getStatus().getValue(),
                candidatura.getMensagem(),
                FreelancerCandidatadoResponse.from(candidatura.getPerfilFreelancer())
        );
    }
}
