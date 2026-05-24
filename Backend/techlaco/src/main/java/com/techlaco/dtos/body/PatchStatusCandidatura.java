package com.techlaco.dtos.body;

import com.techlaco.entities.Enums.StatusCandidatura;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PatchStatusCandidatura(
        @NotNull(message = "Você deve informar um novo status")
        StatusCandidatura status,

        @Size(max = 1000, message = "O feedback não pode ultrapassar 1000 caracteres")
        String feedbackCliente
) {
}
