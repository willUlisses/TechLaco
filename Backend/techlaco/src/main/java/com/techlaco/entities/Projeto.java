package com.techlaco.entities;

import com.techlaco.entities.Enums.NivelProjeto;
import com.techlaco.entities.Enums.StatusProjeto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_projetos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private PerfilCliente perfilCliente;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NivelProjeto nivel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusProjeto status;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valorMin;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valorMax;

    @OneToMany(mappedBy = "projeto", fetch = FetchType.LAZY)
    private List<Candidatura> candidaturas = new ArrayList<>();

    @Formula("(SELECT COUNT(*) FROM tb_candidaturas c WHERE c.projeto_id = id)")
    private Long totalCandidaturas;


}
