package com.techlaco.controllers;

import com.techlaco.dtos.body.BodyCriarProjetoRequest;
import com.techlaco.dtos.body.FiltroBuscarProjeto;
import com.techlaco.dtos.response.PageResponse;
import com.techlaco.dtos.response.ProjetoClienteLogadoResponse;
import com.techlaco.dtos.response.ProjetoResponse;
import com.techlaco.entities.Usuario;
import com.techlaco.exceptions.ForbiddenException;
import com.techlaco.services.ProjetoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/projetos")
@RequiredArgsConstructor
public class ProjetoController {

    private final ProjetoService projetoService;

    @GetMapping
    public ResponseEntity<PageResponse<ProjetoResponse>> buscarProjetosAtivos(
            @RequestParam(defaultValue = "") String busca,
            @RequestParam(defaultValue = "0") Integer pagina,
            @RequestParam(defaultValue = "10") Integer tamanho
    ){
        Integer tamanhoSeguro = Math.min(tamanho, 50);

        FiltroBuscarProjeto filtro = FiltroBuscarProjeto.builder()
                .busca(busca)
                .build();

        return new ResponseEntity<>(
                projetoService.buscarProjetosAtivos(filtro, pagina, tamanhoSeguro),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjetoResponse> buscarProjetoPorId(@PathVariable Long id){
        return ResponseEntity.ok(projetoService.buscarProjetoPorId(id));
    }

    @GetMapping("/meus")
    public ResponseEntity<List<ProjetoClienteLogadoResponse>> buscarProjetosPostadosClienteLogado(@AuthenticationPrincipal Usuario usuario){
        return ResponseEntity.ok(projetoService.buscarProjetosClienteLogado(usuario));
    }

    @PostMapping
    public ResponseEntity<ProjetoResponse> publicarNovoProjeto(
            @AuthenticationPrincipal Usuario usuario,
            @RequestBody @Valid BodyCriarProjetoRequest body) {

        if (usuario.getPerfilCliente() == null) throw new ForbiddenException("Você deve ter um perfil de cliente para publicar projetos.");

        ProjetoResponse novoProjeto = projetoService.postarNovoProjeto(
                usuario.getPerfilCliente(),
                body
        );

        return new ResponseEntity<>(novoProjeto, HttpStatus.CREATED);
    }

}
