package com.techlaco.entities.Enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum StatusCandidatura {
    PENDENTE("PENDENTE"),

    ACEITA("ACEITA"),
    RECUSADA("RECUSADA");

    private final String value;

}
