package com.acme.exam_service.auth.model;

import com.acme.exam_service.users.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserPrincipal implements UserDetails {
    private final Integer id;
    private final String email;
    private final String password;
    private final boolean active;
    private final List<GrantedAuthority> authorities;

    public UserPrincipal(User u) {
        this.id = u.getId();
        this.email = u.getEmail();
        this.password = u.getPasswordHash();   // field trong entity User của bạn
        this.active = Boolean.TRUE.equals(u.getIsActive());
        this.authorities = List.of(new SimpleGrantedAuthority("ROLE_" + u.getRole().getName()));
    }

    public Integer getId() { return id; }

    @Override public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }
    @Override public String getPassword() { return password; }
    @Override public String getUsername() { return email; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return active; }
}
