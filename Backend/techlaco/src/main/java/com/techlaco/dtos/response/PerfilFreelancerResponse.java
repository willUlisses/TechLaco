package com.techlaco.dtos.response;


import com.techlaco.entities.PerfilFreelancer;

public record PerfilFreelancerResponse(
    Long id,
    String especialidade,
    String faculdade,
    String bio,
    String githubUrl
) {
    public static PerfilFreelancerResponse from(PerfilFreelancer perfil) {
        return new PerfilFreelancerResponse(
                perfil.getId(),
                perfil.getEspecialidade(),
                perfil.getFaculdade(),
                perfil.getBio(),
                perfil.getGithubUrl()
        );
    }

}
