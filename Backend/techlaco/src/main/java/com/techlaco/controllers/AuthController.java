package com.techlaco.controllers;

import com.techlaco.dtos.request.CadastroRequest;
import com.techlaco.dtos.request.LoginRequest;
import com.techlaco.dtos.response.DadosUsuarioResponse;
import com.techlaco.entities.Usuario;
import com.techlaco.services.AuthService;
import com.techlaco.services.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final TokenService tokenService;

    @PostMapping("/cadastro")
    public ResponseEntity<DadosUsuarioResponse> cadastrarUsuario(@RequestBody CadastroRequest request){
        Usuario usuario = authService.cadastrar(request); // cria o usuário e retorna ele

        String token = tokenService.gerarToken(usuario); // gera o token com o usuário

         DadosUsuarioResponse response = new DadosUsuarioResponse(
                token,
                usuario.getId(),
                usuario.getEmail(),
                usuario.getNome(),
                usuario.getSobrenome(),
                usuario.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList()
        );

        return new ResponseEntity<DadosUsuarioResponse>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<DadosUsuarioResponse> logarUsuario(@RequestBody LoginRequest request) {
        return new ResponseEntity<>(authService.logar(request), HttpStatus.OK);
    }

}
