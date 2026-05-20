package com.techlaco.dtos.body;

import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record AtualizarPerfilFreelancerRequest(

        @Size(max = 100, message = "Você pode digitar no máximo 100 caracteres na especialidade")
        String especialidade,

        @Size(max = 100)
        String faculdade,

        @Size(max = 500)
        String bio,

        @URL(message = "A URL do Github deve ser válida.")
        String githubUrl
) {
}
