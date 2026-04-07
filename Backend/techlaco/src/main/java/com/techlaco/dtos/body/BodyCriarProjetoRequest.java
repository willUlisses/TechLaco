package com.techlaco.dtos.body;

import com.techlaco.entities.Enums.NivelProjeto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record BodyCriarProjetoRequest(
        @NotBlank(message = "O titulo é obrigatório")
        String titulo,

        @NotBlank(message = "A descrição é obrigatória")
        String descricao,

        @NotNull(message = "O nível de experiência é obrigatório")
        NivelProjeto nivel,

        @NotNull(message = "O valor mínimo é obrigatório")
        @Positive(message = "O valor deve ser maior que zero")
        BigDecimal valorMin,

        @NotNull(message = "O valor máximo é obrigatório")
        @Positive(message = "O valor deve ser maior que zero")
        BigDecimal valorMax
) {
}
