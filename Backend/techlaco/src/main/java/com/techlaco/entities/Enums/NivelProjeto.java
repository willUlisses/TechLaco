package com.techlaco.entities.Enums;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum NivelProjeto {

    INICIANTE("iniciante"),
    INTERMEDIARIO("intermediario"),
    AVANCADO("avancado");

    private final String value;


}
