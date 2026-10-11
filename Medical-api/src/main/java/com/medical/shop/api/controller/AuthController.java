package com.medical.shop.api.controller;

import com.medical.shop.api.dto.AuthRequest;
import com.medical.shop.api.dto.AuthResponse;
import com.medical.shop.api.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/auth/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
        String token = jwtUtils.generateToken(authentication.getName());
        return new AuthResponse(token);
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello! Medical Shop API access granted via valid JWT Token.";
    }
}