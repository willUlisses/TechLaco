package com.techlaco.repositories;

import com.techlaco.entities.PerfilFreelancer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfilFreelancerRepository extends JpaRepository<PerfilFreelancer, Long> {
}
