package com.chunkingz.todo.backend.service;

import com.chunkingz.todo.backend.entity.User;
import com.chunkingz.todo.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationManager authManager;
    private final JWTService jwtService;

    public UserService(UserRepository userRepository, AuthenticationManager authManager, JWTService jwtService) {
        this.userRepository = userRepository;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserDetails(int id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User with id " + id + " not found"));
    }

    public String verify(User user) {
        Authentication auth = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        user.getUsername(), user.getPassword()));

        if (!auth.isAuthenticated()) return "failed to authenticate";

        return jwtService.generateToken(user.getUsername());
    }
}
