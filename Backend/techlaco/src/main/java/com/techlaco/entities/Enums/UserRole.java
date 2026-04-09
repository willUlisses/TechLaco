package com.techlaco.entities.Enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
@Getter
public enum UserRole implements GrantedAuthority {

    CLIENTE("ROLE_CLIENTE"),
    FREELANCER("ROLE_FREELANCER"),
    ADMIN("ROLE_ADMIN");

    private String value;

    @Override
    public @Nullable String getAuthority() {
        return value;
    }
}
