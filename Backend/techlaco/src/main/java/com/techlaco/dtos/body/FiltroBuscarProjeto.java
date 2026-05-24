package com.techlaco.dtos.body;

import com.techlaco.entities.Enums.NivelProjeto;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record FiltroBuscarProjeto(
        String busca,
        NivelProjeto nivel,
        BigDecimal valorMin,
        BigDecimal valorMax
) {
}
