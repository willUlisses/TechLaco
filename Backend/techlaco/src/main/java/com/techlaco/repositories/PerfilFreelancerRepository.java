package com.techlaco.repositories;

import com.techlaco.entities.PerfilFreelancer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfilFreelancerRepository extends JpaRepository<PerfilFreelancer, Long> {

    @Query(value = """
        SELECT p FROM PerfilFreelancer p 
        JOIN FETCH p.usuario u 
        WHERE u.ativo = true 
        AND (:busca IS NULL 
            OR LOWER(u.nome) LIKE LOWER(CONCAT('%', :busca, '%')) 
            OR LOWER(p.especialidade) LIKE LOWER(CONCAT('%', :busca, '%')))
    """,
            countQuery = """
        SELECT COUNT(p) FROM PerfilFreelancer p 
        JOIN p.usuario u 
        WHERE u.ativo = true 
        AND (:busca IS NULL 
            OR LOWER(u.nome) LIKE LOWER(CONCAT('%', :busca, '%')) 
            OR LOWER(p.especialidade) LIKE LOWER(CONCAT('%', :busca, '%')))
    """)
    Page<PerfilFreelancer> buscarTodosFreelancers(@Param("busca") String busca, Pageable pageable);

}
