package com.techlaco.services;

import com.techlaco.dtos.body.CriarCandidaturaRequest;
import com.techlaco.dtos.body.FiltroCandidaturasRequest;
import com.techlaco.dtos.response.DadosCandidaturaResponse;
import com.techlaco.entities.Candidatura;
import com.techlaco.entities.Enums.StatusCandidatura;
import com.techlaco.entities.Enums.StatusProjeto;
import com.techlaco.entities.PerfilFreelancer;
import com.techlaco.entities.Projeto;
import com.techlaco.entities.Usuario;
import com.techlaco.exceptions.ApplyAlreadyExists;
import com.techlaco.exceptions.BadRequestException;
import com.techlaco.exceptions.ForbiddenException;
import com.techlaco.exceptions.NotFoundException;
import com.techlaco.repositories.CandidaturasRepository;
import com.techlaco.repositories.ProjetosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CandidaturaService {

    private final CandidaturasRepository candidaturasRepository;
    private final ProjetosRepository projetoRepository;

    @Transactional
    public DadosCandidaturaResponse fazerCandidatura(Long projetoId, Usuario usuario, CriarCandidaturaRequest body) {
        Projeto projeto  = projetoRepository.findById(projetoId).orElseThrow(() -> new NotFoundException("Projeto não encontrado"));


        if (usuario.getPerfilFreelancer() == null) {
            throw new ForbiddenException("O usuario logado não possui um perfil de freelancer");
        }

        if (!projeto.getStatus().equals(StatusProjeto.ATIVO)) { throw new BadRequestException("Você não pode se candidatar em projetos inativos"); }

        PerfilFreelancer perfil = usuario.getPerfilFreelancer();

        if (projeto.getPerfilCliente().getUsuario().getId().equals(usuario.getId())) {
            throw new BadRequestException("Você não pode se candidatar no seu próprio projeto");
        }

        if (candidaturasRepository.existsByProjetoIdAndPerfilFreelancerId(projeto.getId(), usuario.getPerfilFreelancer().getId())) {
            throw new ApplyAlreadyExists("Você já se candidatou à esta vaga");
        }

        Candidatura candidatura = Candidatura.builder()
                .projeto(projeto)
                .perfilFreelancer(perfil)
                .mensagem(body.mensagem())
                .status(StatusCandidatura.PENDENTE)
                .build();
        return DadosCandidaturaResponse.from(candidaturasRepository.save(candidatura));
    }

    public List<DadosCandidaturaResponse> listarCandidaturasDoFreelancerLogado(PerfilFreelancer perfilFreelancer, FiltroCandidaturasRequest filtro) {

        List<Candidatura> candidaturas;

        if (filtro.statusCandidatura() == null) {
            candidaturas = candidaturasRepository.findByPerfilFreelancerId(perfilFreelancer.getId());
        } else {
            candidaturas = candidaturasRepository.findByPerfilFreelancerIdAndStatus(perfilFreelancer.getId(), filtro.statusCandidatura());
        }

        return candidaturas.stream().map(DadosCandidaturaResponse::from).toList();
    }


}
