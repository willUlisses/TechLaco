package com.techlaco.dtos.response;

import java.math.BigDecimal;
import java.util.List;

public record CandidaturasFreelancerResponse(
        List<DadosCandidaturaResponse> candidaturas,
        BigDecimal receitaTotal
) {
}
