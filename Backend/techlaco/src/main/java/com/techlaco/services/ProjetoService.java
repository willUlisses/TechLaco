package com.techlaco.services;

import com.techlaco.dtos.body.FiltroBuscarProjeto;
import com.techlaco.dtos.response.PageResponse;
import com.techlaco.dtos.response.ProjetoResponse;
import com.techlaco.entities.Enums.StatusProjeto;
import com.techlaco.repositories.ProjetosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjetoService {

    private final ProjetosRepository projetosRepository;

    public PageResponse<ProjetoResponse> buscarProjetosAtivos(FiltroBuscarProjeto filtro, Integer pagina, Integer tamanho) {
        Pageable pageable = PageRequest.of(pagina, tamanho);

        Page<ProjetoResponse> paginasProjetos = projetosRepository
                .buscarProjetosDisponiveis(StatusProjeto.ATIVO, filtro.busca(), pageable)
                .map(ProjetoResponse::from);

        return PageResponse.from(paginasProjetos);
    }
}
