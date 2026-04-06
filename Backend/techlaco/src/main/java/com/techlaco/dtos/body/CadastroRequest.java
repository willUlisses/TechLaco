package com.techlaco.dtos.body;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CadastroRequest(
        @NotBlank String nome,
        @NotBlank String sobrenome,
        @NotBlank String email,
        @NotBlank String senha,

        @JsonProperty("isFreelancer")
        @NotNull Boolean isFreelancer) {
}
