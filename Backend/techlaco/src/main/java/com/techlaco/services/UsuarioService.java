package com.techlaco.services;

import com.techlaco.entities.Usuario;
import com.techlaco.exceptions.BadRequestException;
import com.techlaco.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email).orElseThrow(() -> new BadRequestException("Usuário não encontrado com o email " + email));
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new BadRequestException("Usuário não encontrado com o id " + id));
    }



}
