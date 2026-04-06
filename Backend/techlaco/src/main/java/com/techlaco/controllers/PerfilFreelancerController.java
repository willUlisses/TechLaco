package com.techlaco.controllers;

import com.techlaco.dtos.request.FiltroBuscarFreelancer;
import com.techlaco.dtos.response.PageResponse;
import com.techlaco.dtos.response.PageablePerfilFreelancerResponse;
import com.techlaco.services.PerfilFreelancerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/perfis/freelancer")
@RequiredArgsConstructor
public class PerfilFreelancerController {

    private final PerfilFreelancerService perfilFreelancerService;

    @GetMapping
    public ResponseEntity<PageResponse<PageablePerfilFreelancerResponse>> buscarFreelancers(
            @RequestParam(required = false) String busca,
            @RequestParam(defaultValue = "0") Integer pagina,
            @RequestParam(defaultValue = "10") Integer limite) {

        Integer limiteSeguro = Math.min(limite, 50);

        FiltroBuscarFreelancer filtro = FiltroBuscarFreelancer.builder()
                .busca(busca)
                .build();

        return new ResponseEntity<>(perfilFreelancerService.listarFreelancers(filtro, pagina, limiteSeguro), HttpStatus.OK);
    }

}
