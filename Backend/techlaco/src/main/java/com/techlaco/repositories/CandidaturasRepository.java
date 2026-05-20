package com.techlaco.repositories;

import com.techlaco.entities.Candidatura;
import com.techlaco.entities.Enums.StatusCandidatura;
import com.techlaco.entities.Enums.StatusProjeto;
import com.techlaco.entities.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CandidaturasRepository extends JpaRepository<Candidatura, Long> {

    Long countByProjetoId(Long projetoId);

    Boolean existsByProjetoIdAndPerfilFreelancerId(Long projetoId, Long perfilFreelancerId);

    @Query("""
    SELECT c FROM Candidatura c
    JOIN FETCH c.projeto p
    WHERE c.perfilFreelancer.id = :perfilFreelancerId
    """)
    List<Candidatura> findByPerfilFreelancerId(
            @Param("perfilFreelancerId") Long perfilFreelancerId);


    @Query("""
    SELECT c FROM Candidatura c
    JOIN FETCH c.projeto p
    WHERE c.perfilFreelancer.id = :perfilFreelancerId
    AND c.status = :status
    """)
    List<Candidatura> findByPerfilFreelancerIdAndStatus(
            @Param("perfilFreelancerId") Long perfilFreelancerId,
            @Param("status") StatusCandidatura status);


    List<Candidatura> findByProjetoId(Long projetoId);
}
