package com.techlaco.services;

import com.techlaco.dtos.body.CadastroRequest;
import com.techlaco.dtos.body.LoginRequest;
import com.techlaco.dtos.response.AuthResponse;
import com.techlaco.entities.Enums.UserRole;
import com.techlaco.entities.PerfilCliente;
import com.techlaco.entities.PerfilFreelancer;
import com.techlaco.entities.Usuario;
import com.techlaco.exceptions.BadRequestException;
import com.techlaco.exceptions.NotFoundException;
import com.techlaco.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthService(UsuarioRepository usuarioRepository, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @Value("${techlaco.auth.credential.email}")
    private String admEmail;

    @Transactional
    public Usuario cadastrar(CadastroRequest cadastroRequest) {
        if (usuarioRepository.existsByEmail(cadastroRequest.email())) throw new BadRequestException("Email do usuário já está cadastrado");

        String senhaHash = new BCryptPasswordEncoder().encode(cadastroRequest.senha());

        Usuario usuario = Usuario.builder()
                .nome(cadastroRequest.nome())
                .sobrenome(cadastroRequest.sobrenome())
                .email(cadastroRequest.email())
                .senha(senhaHash)
                .ativo(true)
                .build();

        if (cadastroRequest.email().equalsIgnoreCase(admEmail)) {
            usuario.setRole(UserRole.ADMIN);
            return usuarioRepository.save(usuario);
        }

        if (cadastroRequest.isFreelancer()) {
            usuario.setRole(UserRole.FREELANCER);

            PerfilFreelancer perfilFreelancer = PerfilFreelancer.builder()
                    .usuario(usuario)
                    .build();

            usuario.setPerfilFreelancer(perfilFreelancer);
        } else {
            usuario.setRole(UserRole.CLIENTE);

            PerfilCliente perfilCliente = PerfilCliente.builder()
                    .usuario(usuario)
                    .build();
            usuario.setPerfilCliente(perfilCliente);
        }

        return usuarioRepository.save(usuario);
    }

    public AuthResponse logar(LoginRequest loginRequest) {
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.email()).orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        var usernamePassword = new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.senha());
        Authentication authManager = this.authenticationManager.authenticate(usernamePassword);
        String token = tokenService.gerarToken((Usuario) Objects.requireNonNull(authManager.getPrincipal()));

        return new AuthResponse(
                token,
                usuario.getId(),
                usuario.getEmail(),
                usuario.getNome(),
                usuario.getSobrenome(),
                usuario.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList()
        );
    }
}
