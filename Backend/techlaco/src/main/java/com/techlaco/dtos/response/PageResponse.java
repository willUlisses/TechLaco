package com.techlaco.dtos.response;

import org.springframework.data.domain.Page;

import java.util.List;

public record PageResponse<T>(
        Long totalElementos,
        Integer totalPaginas,
        Integer pagina,
        List<T> dados
) {
    public static <T> PageResponse<T> from(Page<T> page) {
       return new PageResponse<>(
               page.getTotalElements(),
               page.getTotalPages(),
               page.getNumber(),
               page.getContent()
       );
    }


}
