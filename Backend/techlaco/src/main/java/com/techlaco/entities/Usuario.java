package com.techlaco.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_usuarios")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String nome;

    @Column(nullable = false, length = 60)
    private String sobrenome;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 16)
    private String senha;

    @Column(nullable = false)
    private boolean ativo;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private PerfilFreelancer perfilFreelancer;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private PerfilCliente perfilCliente;

    public boolean isCliente() {
        return this.perfilCliente != null;
    }

    public boolean isFreelancer() {
        return this.perfilFreelancer != null;
    }

    public boolean isFreelancerAndCliente() {
        return isCliente() && isFreelancer();
    }

}
