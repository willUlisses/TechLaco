package com.techlaco.entities;


import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Column(length = 100)
    private String especialidade;

    @Column(length = 100)
    private String faculdade;

    private String bio;

    @OneToMany(mappedBy = "perfilFreelancer",fetch = FetchType.LAZY)
    private List<Candidatura> candidaturas = new ArrayList<>();

    @Column()
    private String githubUrl;

    @ElementCollection
    @CollectionTable(
            name = "usuario_habilidades",
            joinColumns = @JoinColumn(name = "usuario_id")
    )
    @Column(name = "habilidade")
    private Set<String> habilidades = new HashSet<>();

}
