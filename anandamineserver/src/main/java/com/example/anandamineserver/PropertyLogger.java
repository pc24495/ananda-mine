package com.example.anandamineserver;


import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PropertyLogger {

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @PostConstruct
    public void logProperties() {
//        System.out.println("DB Username: " + username);
//        System.out.println("DB Password: " + password);
//        System.out.println("DB URL: " + dbUrl);
    }
}

