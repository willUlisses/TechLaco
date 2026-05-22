package com.techlaco.dtos.body;

import jakarta.validation.constraints.NotBlank;

public record AdicionarHabilidadesRequest(
        @NotBlank(message = "A habilidade não pode ser vazia")
        String habilidade) { }
