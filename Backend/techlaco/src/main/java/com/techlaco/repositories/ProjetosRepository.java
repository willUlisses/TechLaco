package com.techlaco.repositories;

import com.techlaco.entities.Enums.StatusProjeto;
import com.techlaco.entities.Projeto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjetosRepository extends JpaRepository<Projeto, Long> {

    Long countByPerfilClienteId(Long clienteId);

    @Query(
    value = """
    SELECT p FROM Projeto p
    JOIN FETCH p.perfilCliente pc
    JOIN FETCH pc.usuario u
    WHERE p.status = :status
    AND (LOWER(p.titulo) LIKE LOWER(:busca)
        OR LOWER(p.descricao) LIKE LOWER(:busca))
    """,
    countQuery = """
    SELECT COUNT(p) FROM Projeto p
    WHERE p.status = :status
    AND (LOWER(p.titulo) LIKE LOWER(:busca)
        OR LOWER(p.descricao) LIKE LOWER(:busca))
    """
    )
    Page<Projeto> buscarProjetosDisponiveis(
            @Param("status") StatusProjeto status,
            @Param("busca") String busca,
            Pageable pageable
    );

    @Query("SELECT p FROM Projeto p JOIN FETCH p.perfilCliente pc WHERE pc.id = :id")
    List<Projeto> findByPerfilClienteId(@Param("id") Long perfilClienteId);



}
