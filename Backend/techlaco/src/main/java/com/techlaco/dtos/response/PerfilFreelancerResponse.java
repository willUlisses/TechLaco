package com.techlaco.dtos.response;


public record PerfilFreelanceResponse(
    Long id,
    String especialidade,
    String faculdade,
    String bio,
    String githubUrl
) {
}
