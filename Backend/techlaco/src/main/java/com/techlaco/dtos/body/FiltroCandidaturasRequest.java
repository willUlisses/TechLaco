package com.techlaco.dtos.body;

import com.techlaco.entities.Enums.StatusCandidatura;
import lombok.Builder;

@Builder
public record FiltroCandidaturasRequest(
        StatusCandidatura statusCandidatura
) {
}
