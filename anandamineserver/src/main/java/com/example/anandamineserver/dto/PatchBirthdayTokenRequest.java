package com.example.anandamineserver.dto;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

public class PatchBirthdayTokenRequest {
    private String token;
    private String birthday;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getBirthday() {
        return this.birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
}
