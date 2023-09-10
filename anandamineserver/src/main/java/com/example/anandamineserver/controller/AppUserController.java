package com.example.anandamineserver.controller;
import com.example.anandamineserver.JwtUtil;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.anandamineserver.model.AppUser;
import com.example.anandamineserver.service.AppUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@RestController
@RequestMapping("/user")
public class AppUserController {

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${TOKEN_SECRET}")
    private String SECRET;

    @PostMapping("/add")
    public String add(@RequestBody AppUser appUser) {
        System.out.println(appUser.getName());
        appUserService.saveAppUser(appUser);
        return "New user is added";
    }

    @PostMapping("/create-account-username-password")
    public ResponseEntity<Map<String, Object>> createAccount(@RequestBody AppUser appUser) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> fieldErrors = new HashMap<>();
       try {
            if (appUser.getUsername() == null || appUser.getUsername().isEmpty()) {
                System.out.println(appUser.getUsername() + "is empty");
                return new ResponseEntity<>(Map.of("error", "Username must be provided"), HttpStatus.BAD_REQUEST);
            }

            if (appUser.getPassword() == null || appUser.getPassword().isEmpty()) { // Assuming getPassword() method exists in AppUser model
                return new ResponseEntity<>(Map.of("error", "Password must be provided"), HttpStatus.BAD_REQUEST);
            }

            String username = appUser.getUsername();
            String password = appUser.getPassword(); // Assuming getPassword() method exists in AppUser model
            String name = appUser.getName();

            if (username.length() > 20) {
                return new ResponseEntity<>(Map.of("error", "Username must be 20 characters or less"), HttpStatus.BAD_REQUEST);
            }

            if (password.length() < 8) {
                return new ResponseEntity<>(Map.of("error", "Password must be at least 8 characters long"), HttpStatus.BAD_REQUEST);
            }

            if (name.length() > 20){
                return new ResponseEntity<>(Map.of("error", "Name must be 20 characters or less"), HttpStatus.BAD_REQUEST);
            }

            Pattern pattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$");
            Matcher matcher = pattern.matcher(password);

            if (!matcher.find()) {
                return new ResponseEntity<>(Map.of("error", "Password must contain at least one uppercase letter, one lowercase letter, and a number"), HttpStatus.BAD_REQUEST);
            }
            AppUser savedUser = appUserService.saveAppUser(appUser);
            String token = jwtUtil.createToken(savedUser.getId(), SECRET);

            response.put("id", savedUser.getId());
            response.put("username", savedUser.getUsername());
            response.put("name", savedUser.getName());
            response.put("token", token);

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
           Throwable rootCause = e.getRootCause();
           if (rootCause instanceof PSQLException) {
               PSQLException psqle = (PSQLException) rootCause;
               if ("23505".equals(psqle.getSQLState())) {
                   fieldErrors.put("username", "Username already taken");
               }
           }
       }

        if (!fieldErrors.isEmpty()) {
            response.put("fieldErrors", fieldErrors);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        response.put("error", "Unknown error");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/getLastUser")
    public AppUser get() {
        return appUserService.getLastAppUser();
    }
}
