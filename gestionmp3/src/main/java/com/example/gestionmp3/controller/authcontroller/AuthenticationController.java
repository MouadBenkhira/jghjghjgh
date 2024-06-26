package com.example.gestionmp3.controller.authcontroller;

import com.example.gestionmp3.entities.auth.AuthenticationResponse;
import com.example.gestionmp3.entities.auth.LoginRequest;
import com.example.gestionmp3.entities.auth.RegisterRequest;
import com.example.gestionmp3.service.authservice.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpServletResponse response;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));


    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody LoginRequest request
    ) {
        Cookie refreshTokenCookie = new Cookie("refresh_token", "refreshTokenfffffffff");
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(2592000); // Set the cookie expiration time (30 days in seconds)
        response.addCookie(refreshTokenCookie);
        return ResponseEntity.ok(service.login(request));

    }
}
