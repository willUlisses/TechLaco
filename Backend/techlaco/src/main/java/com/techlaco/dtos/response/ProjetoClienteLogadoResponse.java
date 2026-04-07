package com.techlaco.dtos.response;


import com.techlaco.entities.Projeto;

import java.math.BigDecimal;

public record ProjetoClienteLogadoResponse(
        Long id,
        String titulo,
        String descricao,
        String status,
        BigDecimal valorMin,
        BigDecimal valorMax,
        Integer totalCandidaturas,
        String nivel
) {
    public static ProjetoClienteLogadoResponse from(Projeto projeto) {
        return new ProjetoClienteLogadoResponse(
                projeto.getId(),
                projeto.getTitulo(),
                projeto.getDescricao(),
                projeto.getStatus().getValue(),
                projeto.getValorMin(),
                projeto.getValorMax(),
                projeto.getTotalCandidaturas() != null ? projeto.getTotalCandidaturas().intValue() : 0,
                projeto.getNivel().getValue()
        );
    }
}
