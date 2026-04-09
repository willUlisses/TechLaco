package com.techlaco.repositories;

import com.techlaco.entities.PerfilCliente;
import com.techlaco.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PerfilClienteRepository extends JpaRepository<PerfilCliente, Long> {

    Optional<PerfilCliente> findByUsuario(Usuario usuario);


}
