package com.techlaco.repositories;

import com.techlaco.entities.Candidatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidaturasRepository extends JpaRepository<Candidatura, Long> {
}
