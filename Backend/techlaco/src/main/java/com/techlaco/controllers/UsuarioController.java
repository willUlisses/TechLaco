package com.techlaco.controllers;

import com.techlaco.dtos.response.UsuarioCompletoResponse;
import com.techlaco.entities.Usuario;
import com.techlaco.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("/me")
    public ResponseEntity<UsuarioCompletoResponse> obterDadosCompletosUsuarioPorId(@AuthenticationPrincipal Usuario usuario) {
        return new ResponseEntity<>(usuarioService.obterDadosCompletosUsuario(usuario.getId()), HttpStatus.OK);
    }

}
