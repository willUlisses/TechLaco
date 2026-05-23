package com.techlaco.dtos.body;

import com.techlaco.entities.Enums.StatusProjeto;
import jakarta.validation.constraints.NotNull;

public record PatchStatusProjeto(
        @NotNull(message = "Você deve informar um novo status")
        StatusProjeto status) {
}
