package com.techlaco.entities.Enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum StatusProjeto {

    EM_ANALISE("EM_ANALISE"),
    ATIVO("ATIVO"),
    CONCLUIDO("CONCLUIDO"),
    CANCELADO("CANCELADO");

    private String value;
}
