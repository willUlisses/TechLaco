package com.techlaco.repositories;

import com.techlaco.entities.Enums.NivelProjeto;
import com.techlaco.entities.Enums.StatusProjeto;
import com.techlaco.entities.Projeto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProjetosRepository extends JpaRepository<Projeto, Long> {

    Long countByPerfilClienteId(Long clienteId);

    @Query(
            value = """
    SELECT p FROM Projeto p
    JOIN FETCH p.perfilCliente pc
    JOIN FETCH pc.usuario u
    WHERE p.status = :status
    AND (LOWER(p.titulo) LIKE LOWER(:busca) OR LOWER(p.descricao) LIKE LOWER(:busca))
    AND (:nivel IS NULL OR p.nivel = :nivel)
    AND (:valorMin IS NULL OR p.valorMin >= :valorMin)
    AND (:valorMax IS NULL OR p.valorMax <= :valorMax)
    """,
            countQuery = """
    SELECT COUNT(p) FROM Projeto p
    WHERE p.status = :status
    AND (LOWER(p.titulo) LIKE LOWER(:busca) OR LOWER(p.descricao) LIKE LOWER(:busca))
    AND (:nivel IS NULL OR p.nivel = :nivel)
    AND (:valorMin IS NULL OR p.valorMin >= :valorMin)
    AND (:valorMax IS NULL OR p.valorMax <= :valorMax)
    """
    )
    Page<Projeto> buscarProjetosFiltrados(
            @Param("status") StatusProjeto status,
            @Param("busca") String busca,
            @Param("nivel") NivelProjeto nivel,
            @Param("valorMin") BigDecimal valorMin,
            @Param("valorMax") BigDecimal valorMax,
            Pageable pageable
    );

    @Query("SELECT p FROM Projeto p JOIN FETCH p.perfilCliente pc WHERE pc.id = :id")
    List<Projeto> findByPerfilClienteId(@Param("id") Long perfilClienteId);



}
