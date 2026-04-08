package com.techlaco.services;

import com.techlaco.dtos.body.BodyProjetoRequest;
import com.techlaco.dtos.body.FiltroBuscarProjeto;
import com.techlaco.dtos.body.PatchProjetoRequest;
import com.techlaco.dtos.response.PageResponse;
import com.techlaco.dtos.response.ProjetoSemClienteResponse;
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

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

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
    public List<ProjetoSemClienteResponse> buscarProjetosClienteLogado(Usuario usuario) {
        if (usuario.getPerfilCliente() == null) throw new ForbiddenException("O usuario não possui um perfil de cliente.");

        Long perfilClienteId = usuario.getPerfilCliente().getId();

        List<Projeto> projetosCliente = projetosRepository.findByPerfilClienteId(perfilClienteId);

        return projetosCliente.stream()
                .map(ProjetoSemClienteResponse::from)
                .toList();
    }

    @Transactional
    public ProjetoResponse postarNovoProjeto(PerfilCliente perfil, BodyProjetoRequest body) {
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

    @Transactional
    public ProjetoSemClienteResponse editarProjeto(Long projetoId, PerfilCliente perfil, PatchProjetoRequest body) {
        Projeto projeto = projetosRepository.findById(projetoId).orElseThrow(() -> new NotFoundException("Projeto não encontrado"));

        if (!projeto.getPerfilCliente().getId().equals(perfil.getId())) { throw new ForbiddenException("Projeto não pertence ao cliente logado"); }

        BigDecimal minParaValidacao = body.valorMin() != null ? body.valorMin() : projeto.getValorMin();
        BigDecimal maxParaValidacao = body.valorMax() != null ? body.valorMax() : projeto.getValorMax();

        if (maxParaValidacao.compareTo(minParaValidacao) < 0) {
            throw new BadRequestException("O valor máximo não pode ser menor que o valor mínimo");
        }

        Optional.ofNullable(body.titulo()).ifPresent(projeto::setTitulo);
        Optional.ofNullable(body.descricao()).ifPresent(projeto::setDescricao);
        Optional.ofNullable(body.nivel()).ifPresent(projeto::setNivel);
        Optional.ofNullable(body.valorMin()).ifPresent(projeto::setValorMin);
        Optional.ofNullable(body.valorMax()).ifPresent(projeto::setValorMax);

        return ProjetoSemClienteResponse.from(projetosRepository.save(projeto));
    }


}
