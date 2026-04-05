package com.techlaco.controllers;

import com.techlaco.dtos.request.PatchPerfilClienteRequest;
import com.techlaco.dtos.response.PerfilClienteCompletoResponse;
import com.techlaco.dtos.response.PerfilClienteResponse;
import com.techlaco.entities.Usuario;
import com.techlaco.services.PerfilClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/perfis/cliente")
@RequiredArgsConstructor
public class PerfilClienteController {

    private final PerfilClienteService perfilClienteService;

    @GetMapping("/me")
    public ResponseEntity<PerfilClienteCompletoResponse> obterPerfilDoClienteLogado(@AuthenticationPrincipal Usuario usuario) {
        return new ResponseEntity<>(perfilClienteService.buscarPerfilPorIdUsuario(usuario), HttpStatus.OK);
    }

    @PatchMapping("/me")
    public ResponseEntity<PerfilClienteResponse> atualizarBioPerfil(@AuthenticationPrincipal Usuario usuario, @RequestBody PatchPerfilClienteRequest body) {
        return new ResponseEntity<>(perfilClienteService.atualizarBio(usuario, body), HttpStatus.OK);
    }
}
