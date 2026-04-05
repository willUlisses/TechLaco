package com.techlaco.repositories;

import com.techlaco.entities.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetosRepository extends JpaRepository<Projeto, Long> {

    Long countByPerfilClienteId(Long clienteId);

}
