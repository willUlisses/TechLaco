package com.techlaco.dtos.body;

import lombok.Builder;

@Builder
public record FiltroBuscarProjeto(
        String busca
) {
}
