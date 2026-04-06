package com.techlaco.dtos.response;

import com.techlaco.entities.PerfilFreelancer;

public record PageablePerfilFreelancerResponse(
        Long id,
        String nome,
        String sobrenome,
        String especialidade,
        String faculdade,
        String bio,
        String githubUrl
) {
    public static PageablePerfilFreelancerResponse from(PerfilFreelancer perfil) {
        return new PageablePerfilFreelancerResponse(
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
