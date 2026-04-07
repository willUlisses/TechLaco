package com.techlaco.controllers;

import com.techlaco.dtos.body.FiltroBuscarProjeto;
import com.techlaco.dtos.response.PageResponse;
import com.techlaco.dtos.response.ProjetoResponse;
import com.techlaco.services.ProjetoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projetos")
@RequiredArgsConstructor
public class ProjetoController {

    private final ProjetoService projetoService;

    @GetMapping
    public ResponseEntity<PageResponse<ProjetoResponse>> buscarProjetosAtivos(
            @RequestParam(required = false) String busca,
            @RequestParam(defaultValue = "0") Integer pagina,
            @RequestParam(defaultValue = "10") Integer tamanho
    ){
        Integer tamanhoSeguro = Math.min(tamanho, 50);

        FiltroBuscarProjeto filtro = FiltroBuscarProjeto.builder()
                .busca(busca)
                .build();

        return new ResponseEntity<>(
                projetoService.buscarProjetosAtivos(filtro, pagina, tamanhoSeguro),
                HttpStatus.OK
        );
    }

}
