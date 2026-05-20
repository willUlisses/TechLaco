package com.techlaco.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.techlaco.entities.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {

    @Value("${techlaco.security.token.secret}")
    private String SECRET;

    public String gerarToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            var token = JWT.create() // isso aqui é do tipo JWTCreator.Builder só pra lembrar
                    .withIssuer("techlaco")
                    .withSubject(usuario.getId().toString())
                    .withClaim("role", usuario.getRole().getAuthority())
                    .withIssuedAt(Date.from(Instant.now()))
                    .withExpiresAt(generateExpirationDate());

            if (usuario.isCliente()) token = token.withClaim("cid", usuario.getPerfilCliente().getId());
            if (usuario.isFreelancer()) token = token.withClaim("fid", usuario.getPerfilFreelancer().getId());

            return token.sign(algorithm);
        }
        catch (JWTCreationException e) {
            throw new JWTCreationException("Erro ao gerar o token: ", e);
        }
    }

    public DecodedJWT puxarToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            return JWT.require(algorithm)
                    .withIssuer("techlaco")
                    .build()
                    .verify(token);
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    private final Instant generateExpirationDate() {
        return LocalDateTime.now().plusDays(7).toInstant(ZoneOffset.of("-03:00"));
    }

    public String getSubject(String token) {
        DecodedJWT decodedJWT = puxarToken(token);
        return decodedJWT != null ? decodedJWT.getSubject() : null;
    }

    public String getClaim(String token, String claim) {
        DecodedJWT decodedJWT = puxarToken(token);
        return decodedJWT != null ? decodedJWT.getClaim(claim).asString() :  null;
    }



}