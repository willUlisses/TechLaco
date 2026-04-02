package com.techlaco.entities;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_perfis_freelancer")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PerfilFreelancer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id",  nullable = false, unique = true)
    private Usuario usuario;

    @Column(nullable = false)
    private String especialidade;

    private String faculdade;

    @Column(name = "preco_hora", precision = 10, scale = 2)
    private BigDecimal precoHora;

    private String bio;

    @OneToMany(mappedBy = "perfilFreelancer",fetch = FetchType.LAZY)
    private List<Candidatura> candidaturas = new ArrayList<>();

}
