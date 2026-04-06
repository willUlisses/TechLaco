package com.techlaco.controllers;

import com.techlaco.dtos.body.AtualizarPerfilFreelancerRequest;
import com.techlaco.dtos.body.FiltroBuscarFreelancer;
import com.techlaco.dtos.response.PageResponse;
import com.techlaco.dtos.response.PerfilFreelancerCompletoResponse;
import com.techlaco.entities.Usuario;
import com.techlaco.services.PerfilFreelancerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/perfis/freelancer")
@RequiredArgsConstructor
public class PerfilFreelancerController {

    private final PerfilFreelancerService perfilFreelancerService;

    @GetMapping
    public ResponseEntity<PageResponse<PerfilFreelancerCompletoResponse>> buscarFreelancers(
            @RequestParam(required = false) String busca,
            @RequestParam(defaultValue = "0") Integer pagina,
            @RequestParam(defaultValue = "10") Integer limite) {

        Integer limiteSeguro = Math.min(limite, 50);

        FiltroBuscarFreelancer filtro = FiltroBuscarFreelancer.builder()
                .busca(busca)
                .build();

        return new ResponseEntity<>(perfilFreelancerService.listarFreelancers(filtro, pagina, limiteSeguro), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerfilFreelancerCompletoResponse> buscarPerfilFreelancerPorId(@PathVariable("id") Long id) {
        return new ResponseEntity<>(perfilFreelancerService.buscarPerfilFreelancer(id), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<PerfilFreelancerCompletoResponse> getPerfilFreelancerLogado(@AuthenticationPrincipal Usuario usuario) {
        return new ResponseEntity<>(perfilFreelancerService.getPerfilFreelancerLogado(usuario), HttpStatus.OK);
    }

    @PatchMapping("/me")
    public ResponseEntity<PerfilFreelancerCompletoResponse> atualizarPerfilFreelancerLogado(
            @AuthenticationPrincipal Usuario usuario,
            @RequestBody AtualizarPerfilFreelancerRequest request
    ) {
        return new ResponseEntity<>(perfilFreelancerService.atualizarPerfilFreelancerLogado(usuario, request), HttpStatus.OK);
    }

}
