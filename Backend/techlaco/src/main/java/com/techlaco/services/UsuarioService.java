package com.techlaco.services;

import com.techlaco.dtos.response.UsuarioCompletoResponse;
import com.techlaco.entities.Usuario;
import com.techlaco.exceptions.NotFoundException;
import com.techlaco.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioCompletoResponse obterDadosCompletosUsuario(Long id){
        Usuario usuario = usuarioRepository.findByIdComPerfis(id)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));


        return UsuarioCompletoResponse.from(usuario);
    }


}
