package com.techlaco.dtos.body;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatchPerfilClienteRequest {
    private Optional<String> bio = Optional.empty();
}
