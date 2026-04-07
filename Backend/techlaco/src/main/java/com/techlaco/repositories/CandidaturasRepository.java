package com.techlaco.repositories;

import com.techlaco.entities.Candidatura;
import com.techlaco.entities.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidaturasRepository extends JpaRepository<Candidatura, Long> {

    Long countByProjetoId(Long projetoId);

}
