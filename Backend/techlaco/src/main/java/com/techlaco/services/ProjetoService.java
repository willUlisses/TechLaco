package com.techlaco.services;

import com.techlaco.dtos.body.BodyCriarProjetoRequest;
import com.techlaco.dtos.body.FiltroBuscarProjeto;
import com.techlaco.dtos.response.PageResponse;
import com.techlaco.dtos.response.ProjetoClienteLogadoResponse;
import com.techlaco.dtos.response.ProjetoResponse;
import com.techlaco.entities.Enums.StatusProjeto;
import com.techlaco.entities.PerfilCliente;
import com.techlaco.entities.Projeto;
import com.techlaco.entities.Usuario;
import com.techlaco.exceptions.BadRequestException;
import com.techlaco.exceptions.ForbiddenException;
import com.techlaco.exceptions.NotFoundException;
import com.techlaco.repositories.ProjetosRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjetoService {

    private final ProjetosRepository projetosRepository;

    public PageResponse<ProjetoResponse> buscarProjetosAtivos(FiltroBuscarProjeto filtro, Integer pagina, Integer tamanho) {
        Pageable pageable = PageRequest.of(pagina, tamanho);

        String termoBusca = (filtro.busca() == null || filtro.busca().isBlank())
                ? "%"
                : "%" + filtro.busca() + "%";

        Page<ProjetoResponse> paginasProjetos = projetosRepository
                .buscarProjetosDisponiveis(StatusProjeto.ATIVO, termoBusca, pageable)
                .map(ProjetoResponse::from);

        return PageResponse.from(paginasProjetos);
    }

    public ProjetoResponse buscarProjetoPorId(Long projetoId) {
        Projeto projeto = projetosRepository.findById(projetoId)
                .orElseThrow(() -> new NotFoundException("Projeto não encontrado"));

        return ProjetoResponse.from(projeto);
    }

    @Transactional
    public List<ProjetoClienteLogadoResponse> buscarProjetosClienteLogado(Usuario usuario) {
        if (usuario.getPerfilCliente() == null) throw new ForbiddenException("O usuario não possui um perfil de cliente.");

        Long perfilClienteId = usuario.getPerfilCliente().getId();

        List<Projeto> projetosCliente = projetosRepository.findByPerfilClienteId(perfilClienteId);

        return projetosCliente.stream()
                .map(ProjetoClienteLogadoResponse::from)
                .toList();
    }

    @Transactional
    public ProjetoResponse postarNovoProjeto(PerfilCliente perfil, BodyCriarProjetoRequest body) {
        if (body.valorMax().compareTo(body.valorMin()) < 1) {
            throw new BadRequestException("O valor máximo não pode ser menor que o valor mínimo");
        }

        Projeto projeto = Projeto.builder()
                .titulo(body.titulo())
                .descricao(body.descricao())
                .nivel(body.nivel())
                .valorMin(body.valorMin())
                .valorMax(body.valorMax())
                .status(StatusProjeto.ATIVO)
                .perfilCliente(perfil)
                .build();

        return ProjetoResponse.from(projetosRepository.save(projeto));
    }

}
