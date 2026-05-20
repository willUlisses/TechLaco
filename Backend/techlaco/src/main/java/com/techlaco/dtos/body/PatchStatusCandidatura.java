package com.techlaco.dtos.body;

import com.techlaco.entities.Enums.StatusCandidatura;
import jakarta.validation.constraints.NotNull;

public record PatchStatusCandidatura(
        @NotNull(message = "Você deve informar um novo status")
        StatusCandidatura status
) {
}
