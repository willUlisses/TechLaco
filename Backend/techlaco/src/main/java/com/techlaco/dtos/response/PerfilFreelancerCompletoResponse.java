package com.techlaco.dtos.response;

import com.techlaco.entities.PerfilFreelancer;

public record PerfilFreelancerCompletoResponse(
        Long id,
        String nome,
        String sobrenome,
        String especialidade,
        String faculdade,
        String bio,
        String githubUrl
) {
    public static PerfilFreelancerCompletoResponse from(PerfilFreelancer perfil) {
        return new PerfilFreelancerCompletoResponse(
                perfil.getId(),
                perfil.getUsuario().getNome(),
                perfil.getUsuario().getSobrenome(),
                perfil.getEspecialidade(),
                perfil.getFaculdade(),
                perfil.getBio(),
                perfil.getGithubUrl()
        );
    }
}
