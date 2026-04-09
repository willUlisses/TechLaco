package com.techlaco.controllers;

import com.techlaco.dtos.body.CriarCandidaturaRequest;
import com.techlaco.dtos.body.FiltroCandidaturasRequest;
import com.techlaco.dtos.body.PatchStatusCandidatura;
import com.techlaco.dtos.response.CandidaturaAtualizadaResponse;
import com.techlaco.dtos.response.CandidaturasProjetoResponse;
import com.techlaco.dtos.response.DadosCandidaturaResponse;
import com.techlaco.entities.Enums.StatusCandidatura;
import com.techlaco.entities.PerfilCliente;
import com.techlaco.entities.PerfilFreelancer;
import com.techlaco.entities.Usuario;
import com.techlaco.exceptions.ForbiddenException;
import com.techlaco.services.CandidaturaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/candidaturas")
@RequiredArgsConstructor
public class CandidaturaController {

    private final CandidaturaService candidaturaService;

    @PostMapping("/{projetoId}")
    public ResponseEntity<DadosCandidaturaResponse> fazerCandidatura(
            @PathVariable("projetoId") Long projetoId,
            @AuthenticationPrincipal Usuario usuario,
            @RequestBody CriarCandidaturaRequest body) {

        return new ResponseEntity<>(candidaturaService.fazerCandidatura(projetoId, usuario, body), HttpStatus.CREATED);
    }


    @GetMapping("/minhas")
    public ResponseEntity<List<DadosCandidaturaResponse>> minhasCandidaturas(
            @AuthenticationPrincipal Usuario usuario,
            @RequestParam(required = false) StatusCandidatura status) {

        if (usuario.getPerfilFreelancer() == null) {
            throw new ForbiddenException("O usuário não possui um perfil de freelancer");
        }

        PerfilFreelancer perfilUsuarioLogado = usuario.getPerfilFreelancer();

        FiltroCandidaturasRequest filtro = FiltroCandidaturasRequest.builder()
                .statusCandidatura(status)
                .build();

        return new ResponseEntity<>(candidaturaService.listarCandidaturasDoFreelancerLogado(perfilUsuarioLogado, filtro), HttpStatus.OK);
    }

    @GetMapping("/projeto/{projetoId}")
    public ResponseEntity<List<CandidaturasProjetoResponse>> listarCandidaturasDoProjeto(
            @PathVariable("projetoId") Long projetoId,
            @AuthenticationPrincipal Usuario usuario) {

        if (usuario.getPerfilCliente() == null) { throw new ForbiddenException("O usuário não possui um perfil de cliente"); }

        PerfilCliente perfilUsuarioLogado = usuario.getPerfilCliente();

        return new ResponseEntity<>(candidaturaService.listarCandidaturasDosProjetosDoClienteLogado(projetoId, perfilUsuarioLogado), HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<CandidaturaAtualizadaResponse> atualizarStatus(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal Usuario usuario,
            @RequestBody PatchStatusCandidatura body) {

        if (usuario.getPerfilCliente() == null) {
            throw new ForbiddenException("O usuario não possui um perfil de cliente");
        }

        PerfilCliente perfilUsuarioLogado = usuario.getPerfilCliente();

        return new ResponseEntity<>(candidaturaService.atualizarStatus(id, perfilUsuarioLogado, body), HttpStatus.OK);
    }


}
