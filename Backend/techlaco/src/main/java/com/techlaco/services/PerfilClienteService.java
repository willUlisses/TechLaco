package com.techlaco.services;

import com.techlaco.dtos.request.PatchPerfilClienteRequest;
import com.techlaco.dtos.response.PerfilClienteCompletoResponse;
import com.techlaco.dtos.response.PerfilClienteResponse;
import com.techlaco.entities.PerfilCliente;
import com.techlaco.entities.Usuario;
import com.techlaco.exceptions.NotFoundException;
import com.techlaco.repositories.PerfilClienteRepository;
import com.techlaco.repositories.ProjetosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerfilClienteService {

    private final PerfilClienteRepository perfilClienteRepository;
    private final ProjetosRepository projetosRepository;

    public PerfilClienteCompletoResponse buscarPerfilPorIdUsuario(Usuario usuario) {
        PerfilCliente perfil = perfilClienteRepository.findByUsuario(usuario).orElseThrow(() -> new NotFoundException("Perfil nao encontrado"));

        return PerfilClienteCompletoResponse.from(perfil, projetosRepository.countByPerfilClienteId(perfil.getId()));
    }

    public PerfilClienteResponse atualizarBio(Usuario usuario, PatchPerfilClienteRequest body) {
        PerfilCliente perfil = perfilClienteRepository.findByUsuario(usuario).orElseThrow(() -> new NotFoundException("Perfil nao encontrado"));

        body.getBio().ifPresent(perfil::setBio);

        perfilClienteRepository.save(perfil);
        return PerfilClienteResponse.from(perfil);
    }


}


