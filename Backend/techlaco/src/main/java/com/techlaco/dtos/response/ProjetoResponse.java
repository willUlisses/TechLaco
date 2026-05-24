package com.techlaco.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.techlaco.entities.Projeto;

import java.math.BigDecimal;
import java.util.List;

public record ProjetoResponse(
        Long id,
        String titulo,
        String descricao,
        String status,
        String nivel,
        BigDecimal valorMin,
        BigDecimal valorMax,
        Integer totalCandidaturas,
        List<String> tecnologias,
        @JsonProperty("cliente")
        ClienteProjetoResponse clienteProjetoResponse
) {
    public static ProjetoResponse from(Projeto projeto) {
        return new  ProjetoResponse(
                projeto.getId(),
                projeto.getTitulo(),
                projeto.getDescricao(),
                projeto.getStatus().getValue(),
                projeto.getNivel().getValue(),
                projeto.getValorMin(),
                projeto.getValorMax(),
                projeto.getTotalCandidaturas() != null ? projeto.getTotalCandidaturas().intValue() : 0,
                projeto.getTecnologias().stream().sorted().toList(),
                ClienteProjetoResponse.from(projeto.getPerfilCliente())
        );
    }
}
