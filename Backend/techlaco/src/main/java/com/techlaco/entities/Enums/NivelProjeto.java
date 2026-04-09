package com.techlaco.entities.Enums;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum NivelProjeto {

    INICIANTE("INICIANTE"),
    INTERMEDIARIO("INTERMEDIARIO"),
    AVANCADO("AVANCADO");

    private final String value;

}
