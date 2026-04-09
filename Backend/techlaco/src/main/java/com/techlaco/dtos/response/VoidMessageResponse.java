package com.techlaco.dtos.response;

import lombok.Builder;

@Builder
public record VoidMessageResponse(
        String message
) {
}
