package com.techlaco.services;

import com.techlaco.dtos.body.AtualizarPerfilFreelancerRequest;
import com.techlaco.dtos.body.FiltroBuscarFreelancer;
import com.techlaco.dtos.response.PageResponse;
import com.techlaco.dtos.response.PerfilFreelancerCompletoResponse;
import com.techlaco.entities.PerfilFreelancer;
import com.techlaco.entities.Usuario;
import com.techlaco.exceptions.NotFoundException;
import com.techlaco.repositories.PerfilFreelancerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PerfilFreelancerService {

    private final PerfilFreelancerRepository perfilFreelancerRepository;

    public PageResponse<PerfilFreelancerCompletoResponse> listarFreelancers(FiltroBuscarFreelancer filtro, Integer pagina, Integer size) {
        Pageable pageable = PageRequest.of(pagina, size);
        Page<PerfilFreelancer> paginas = perfilFreelancerRepository.buscarTodosFreelancers(filtro.busca(), pageable);

        return PageResponse.from(paginas.map(PerfilFreelancerCompletoResponse::from));
    }

    public PerfilFreelancerCompletoResponse buscarPerfilFreelancer(Long id) {
        PerfilFreelancer perfil = perfilFreelancerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Perfil não encontrado"));

        return  PerfilFreelancerCompletoResponse.from(perfil);
    }

    public PerfilFreelancerCompletoResponse getPerfilFreelancerLogado(Usuario usuario) {
        PerfilFreelancer perfil = perfilFreelancerRepository.findByUsuario(usuario)
                .orElseThrow(() -> new NotFoundException("Perfil não encontrado a partir do usuário"));

        return PerfilFreelancerCompletoResponse.from(perfil);
    }

    @Transactional
    public PerfilFreelancerCompletoResponse atualizarPerfilFreelancerLogado(Usuario usuario, AtualizarPerfilFreelancerRequest body) {
        PerfilFreelancer perfil = perfilFreelancerRepository.findByUsuario(usuario).orElseThrow(() -> new NotFoundException("Perfil freelancer não encontrado."));

        Optional.ofNullable(body.especialidade()).ifPresent(perfil::setEspecialidade);
        Optional.ofNullable(body.faculdade()).ifPresent(perfil::setFaculdade);
        Optional.ofNullable(body.bio()).ifPresent(perfil::setBio);
        Optional.ofNullable(body.githubUrl()).ifPresent(perfil::setGithubUrl);

        perfil = perfilFreelancerRepository.save(perfil);
        return PerfilFreelancerCompletoResponse.from(perfil);
    }

}
