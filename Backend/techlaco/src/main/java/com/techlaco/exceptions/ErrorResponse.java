package com.techlaco.exceptions;

import lombok.Builder;

@Builder
public record ErrorResponse(
        String message,
        Integer status
) { }
