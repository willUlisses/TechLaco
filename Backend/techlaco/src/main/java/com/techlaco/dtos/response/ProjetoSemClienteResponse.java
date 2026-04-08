package com.techlaco.dtos.response;


import com.techlaco.entities.Projeto;

import java.math.BigDecimal;

public record ProjetoSemClienteResponse(
        Long id,
        String titulo,
        String descricao,
        String status,
        BigDecimal valorMin,
        BigDecimal valorMax,
        Integer totalCandidaturas,
        String nivel
) {
    public static ProjetoSemClienteResponse from(Projeto projeto) {
        return new ProjetoSemClienteResponse(
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
