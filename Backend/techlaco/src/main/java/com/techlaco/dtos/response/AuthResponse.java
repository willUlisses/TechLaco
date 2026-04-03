package com.techlaco.dtos.response;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AuthResponse(
        @NotBlank String token,
        @NotNull Long id,
        @NotBlank String email,
        @NotBlank String nome,
        @NotBlank String sobrenome,
        @NotNull List<String> tipo)
{ }
