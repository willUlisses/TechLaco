package com.techlaco.config;

import com.techlaco.repositories.UsuarioRepository;
import com.techlaco.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class RequestFilter extends OncePerRequestFilter {

    private final UsuarioRepository usuarioRepository;
    private final TokenService tokenService;


    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String token = recuperarToken(request);

        if (token != null) {
            String subject = tokenService.getSubject(token);

            if (subject != null) {
                usuarioRepository.findById(Long.parseLong(subject)).ifPresent(usuario -> {
                    var authenticationToken = new UsernamePasswordAuthenticationToken(
                            usuario,
                            null,
                            usuario.getAuthorities()
                    );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                });
            }
        }
        filterChain.doFilter(request, response);
    }


    private String recuperarToken(HttpServletRequest request) {
        String tokenHeader = request.getHeader("Authorization");
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            return tokenHeader.replace("Bearer ", "");
        }
        return null;
    }
}
