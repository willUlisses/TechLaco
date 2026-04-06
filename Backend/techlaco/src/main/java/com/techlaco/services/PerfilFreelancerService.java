package com.techlaco.services;

import com.techlaco.dtos.request.FiltroBuscarFreelancer;
import com.techlaco.dtos.response.PageResponse;
import com.techlaco.dtos.response.PageablePerfilFreelancerResponse;
import com.techlaco.entities.PerfilFreelancer;
import com.techlaco.repositories.PerfilFreelancerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerfilFreelancerService {

    private final PerfilFreelancerRepository perfilFreelancerRepository;

    public PageResponse<PageablePerfilFreelancerResponse> listarFreelancers(FiltroBuscarFreelancer filtro, Integer pagina, Integer size) {
        Pageable pageable = PageRequest.of(pagina, size);
        Page<PerfilFreelancer> paginas = perfilFreelancerRepository.buscarTodosFreelancers(filtro.busca(), pageable);

        return PageResponse.from(paginas.map(PageablePerfilFreelancerResponse::from));
    }

}
