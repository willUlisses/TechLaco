package com.techlaco.dtos.body;

import jakarta.validation.constraints.Size;
import lombok.Builder;


@Builder
public record PatchPerfilClienteRequest(
        @Size(max = 500, message = "A bio deve ter no máximo 500 caracteres")
        String bio) {  }
