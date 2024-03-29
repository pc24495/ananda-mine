package com.example.anandamineserver.controller;
import com.amazonaws.services.xray.model.Http;
import com.example.anandamineserver.JwtUtil;
import com.example.anandamineserver.dto.PatchBirthdayTokenRequest;
import com.example.anandamineserver.dto.PatchNameTokenRequest;
import com.example.anandamineserver.service.S3Service;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.anandamineserver.model.AppUser;
import com.example.anandamineserver.service.AppUserService;
import com.example.anandamineserver.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.anandamineserver.dto.LoginUsernamePasswordRequest;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.LocalDate;

@RestController
@RequestMapping("/user")
public class AppUserController {

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private S3Service s3Service;

    @Value("${TOKEN_SECRET}")
    private String SECRET;

    @Value("${ENVIRONMENT_TYPE}")
    private String ENVIRONMENT_TYPE;

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

            appUser.setPassword(passwordEncoder.encode(password));
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

    @PostMapping("/login-username-password")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginUsernamePasswordRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> fieldErrors = new HashMap<>();
        AppUser appUser = appUserService.findByUsername(loginRequest.getUsername());

        if (appUser == null) {
            fieldErrors.put("username", "Username not found");
            response.put("fieldErrors", fieldErrors);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        System.out.println(appUser.getUsername());
        System.out.println(loginRequest.getPassword());

        boolean passwordMatches = passwordEncoder.matches(loginRequest.getPassword(), appUser.getPassword());

        if (!passwordMatches) {
            fieldErrors.put("password", "Incorrect password");
            response.put("fieldErrors", fieldErrors);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // If everything is correct, generate a token and send it back
        String token = jwtUtil.createToken(appUser.getId(), SECRET);

        response.put("id", appUser.getId());
        response.put("username", appUser.getUsername());
        response.put("name", appUser.getName());
        response.put("pic1Url", appUser.getPic1Url());
        System.out.println(appUser.getName());
        response.put("pic2Url", appUser.getPic2Url());
        response.put("pic3Url", appUser.getPic3Url());
        response.put("pic4Url", appUser.getPic4Url());
        response.put("pic5Url", appUser.getPic5Url());
        response.put("pic6Url", appUser.getPic6Url());
        response.put("birthday", appUser.getBirthday());
        response.put("token", token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //Make sure this takes into account invalid tokens later
    @PatchMapping("/name-token")
    public ResponseEntity<Map<String, Object>> changeNameToken(@RequestBody PatchNameTokenRequest patchNameRequest) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> fieldErrors = new HashMap<>();
        String token = patchNameRequest.getToken();
        if(token == null) {
            fieldErrors.put("token", "Token invalid");
            response.put("fieldErrors", fieldErrors);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        int userID = jwtUtil.getUserIdFromToken(token, SECRET);
        AppUser appUser = appUserService.findById(userID);
        appUser.setName(patchNameRequest.getName());
        appUserService.saveAppUser(appUser);
        response.put("message", "Success!");
        response.put("name", appUser.getName());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //Make sure this takes into account invalid tokens later
    @PatchMapping(value = "/pics-token", consumes = "multipart/form-data")
    public ResponseEntity<Map<String,Object>> changePicsToken(
            @RequestPart("token") String token,
            @RequestPart(name = "pic1", required = false) MultipartFile pic1,
            @RequestPart(name = "pic2", required = false) MultipartFile pic2,
            @RequestPart(name = "pic3", required = false) MultipartFile pic3,
            @RequestPart(name = "pic4", required = false) MultipartFile pic4,
            @RequestPart(name = "pic5", required = false) MultipartFile pic5,
            @RequestPart(name = "pic6", required = false) MultipartFile pic6
    )  {
        System.out.println("Patch route");
        System.out.println(pic1);
        System.out.println(pic2);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> fieldErrors = new HashMap<>();
        if(token == null) {
            fieldErrors.put("token", "Token invalid");
            response.put("fieldErrors", fieldErrors);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }


        String bucketName = "anandamine-dev-preprocessed-pics";  // replace with your actual bucket name
        int userId = jwtUtil.getUserIdFromToken(token, SECRET);
        AppUser appUser = appUserService.findById(userId);

        for (int i = 1; i <= 6; i++) {
            MultipartFile pic = null;
            switch(i) {
                case 1: pic = pic1; break;
                case 2: pic = pic2; break;
                case 3: pic = pic3; break;
                case 4: pic = pic4; break;
                case 5: pic = pic5; break;
                case 6: pic = pic6; break;
            }

            String fileName = ENVIRONMENT_TYPE + "_" + userId + "_" + i;
            try {
                // Call to uploadFile here
                String url = pic == null ? null : s3Service.uploadFile(pic, fileName, bucketName);
                switch (i) {
                    case 1: appUser.setPic1Url(url); break;
                    case 2: appUser.setPic2Url(url); break;
                    case 3: appUser.setPic3Url(url); break;
                    case 4: appUser.setPic4Url(url); break;
                    case 5: appUser.setPic5Url(url); break;
                    case 6: appUser.setPic6Url(url); break;
                }

                // Populate response
                if (url != null) {
                    response.put("pic" + i + "Url", url);
                }
            } catch (IOException e) {
                System.out.println(e);
            }

            // Update AppUser fields based on the picture number

        }

        appUserService.saveAppUser(appUser);

        response.put("message", "Successfully uploaded pics");
        System.out.println("Pics Patch Token Route Over");

        return ResponseEntity.ok(response);
    }

    @PatchMapping(value = "/birthday-token")
    public ResponseEntity<Map<String, Object>> changeBirthdayToken(@RequestBody PatchBirthdayTokenRequest patchBirthdayRequest) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> fieldErrors = new HashMap<>();
        String token = patchBirthdayRequest.getToken();
        if(token == null) {
            fieldErrors.put("token", "Token invalid");
            response.put("fieldErrors", fieldErrors);
            System.out.println("/birthday-token PATCH Request: Token invalid");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        int userID = jwtUtil.getUserIdFromToken(token, SECRET);
        AppUser appUser = appUserService.findById(userID);
        LocalDate birthday;
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
            System.out.println(patchBirthdayRequest.getBirthday());
            birthday = LocalDate.parse(patchBirthdayRequest.getBirthday(), formatter);
        } catch (DateTimeParseException e) {
            fieldErrors.put("birthday", "Invalid date format");
            response.put("fieldErrors", fieldErrors);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        appUser.setBirthday(birthday);
        appUserService.saveAppUser(appUser);
        response.put("message", "Successfully updated birthday");
        String formattedBirthday = birthday.format(DateTimeFormatter.ofPattern("MM/dd/yyyy"));  // Format LocalDate to String
        response.put("birthday", formattedBirthday);  // Add formatted birthday to response
        return ResponseEntity.ok(response);
    }


    @GetMapping("/getLastUser")
    public AppUser get() {
        return appUserService.getLastAppUser();
    }
}
