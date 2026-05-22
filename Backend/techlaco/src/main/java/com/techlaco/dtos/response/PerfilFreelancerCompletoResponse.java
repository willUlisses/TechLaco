package com.techlaco.dtos.response;

import com.techlaco.entities.PerfilFreelancer;

import java.math.BigDecimal;
import java.util.List;

public record PerfilFreelancerCompletoResponse(
        Long id,
        String nome,
        String sobrenome,
        String especialidade,
        String faculdade,
        String bio,
        String githubUrl,
        List<String> habilidades,
        BigDecimal receitaTotal
) {
    public static PerfilFreelancerCompletoResponse from(PerfilFreelancer perfil, BigDecimal receitaTotal) {
        return new PerfilFreelancerCompletoResponse(
                perfil.getId(),
                perfil.getUsuario().getNome(),
                perfil.getUsuario().getSobrenome(),
                perfil.getEspecialidade(),
                perfil.getFaculdade(),
                perfil.getBio(),
                perfil.getGithubUrl(),
                perfil.getHabilidades().stream()
                        .sorted()
                        .toList(),
                receitaTotal
        );
    }

    public static PerfilFreelancerCompletoResponse from(PerfilFreelancer perfil) {
        return from(perfil, null);
    }
}
