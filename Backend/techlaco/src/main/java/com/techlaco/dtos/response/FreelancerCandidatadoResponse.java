package com.techlaco.dtos.response;

import com.techlaco.entities.PerfilFreelancer;

public record FreelancerCandidatadoResponse(
        Long id,
        String nome,
        String especialidade,
        String githubUrl
) {
    public static FreelancerCandidatadoResponse from(PerfilFreelancer perfil) {
        return new FreelancerCandidatadoResponse(
                perfil.getId(),
                perfil.getUsuario().getNomeCompleto(),
                perfil.getEspecialidade(),
                perfil.getGithubUrl()
        );
    }
}
