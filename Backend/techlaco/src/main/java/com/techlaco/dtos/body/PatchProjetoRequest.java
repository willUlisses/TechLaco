package com.techlaco.dtos.body;

import com.techlaco.entities.Enums.NivelProjeto;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record PatchProjetoRequest(
        @Size(max = 100)
        String titulo,

        @Size(max = 500)
        String descricao,

        NivelProjeto nivel,

        @Positive(message = "O valor deve ser maior que zero")
        BigDecimal valorMin,

        @Positive(message = "O valor deve ser maior que zero")
        BigDecimal valorMax
) {
}
