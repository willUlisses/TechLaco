package com.techlaco.entities.Enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TipoEnum {

    CLIENTE("cliente"),
    FREELANCER("freelancer");

    private final String value;


}
