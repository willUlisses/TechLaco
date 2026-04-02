package com.techlaco.entities.Enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum StatusProjeto {

    EM_ANALISE("em_analise"),
    ATIVO("ativo"),
    CONCLUIDO("concluido"),
    CANCELADO("cancelado");

    private String value;
}
