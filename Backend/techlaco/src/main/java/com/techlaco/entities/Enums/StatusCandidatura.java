package com.techlaco.entities.Enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum StatusCandidatura {

    PENDENTE("pendente"),
    ACEITA("aceita"),
    RECUSADA("recusada");

    private final String value;

}
