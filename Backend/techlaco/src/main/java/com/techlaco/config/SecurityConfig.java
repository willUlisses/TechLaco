package com.techlaco.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final RequestFilter requestFilter;

    //bean dos filtros de segurança dos endpoint
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorized -> authorized
                        .requestMatchers(HttpMethod.POST, "/auth/cadastro").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/auth/me").authenticated()
                        .requestMatchers(HttpMethod.GET, "/usuarios/me").authenticated()
                        .requestMatchers(HttpMethod.GET, "/perfis/cliente/me").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/perfis/cliente/me").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.GET, "/perfis/freelancer").hasAnyRole("CLIENTE", "FREELANCER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/perfis/freelancer/{id}").hasAnyRole("CLIENTE", "FREELANCER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/perfis/freelancer/me").hasRole("FREELANCER")
                        .requestMatchers(HttpMethod.PATCH, "/perfis/freelancer/me").hasRole("FREELANCER")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
    }

    // Bean do administrardor de autenticações
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfiguration)
            throws Exception {
        return authConfiguration.getAuthenticationManager();
    }

    // bean do encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
