package com.example.anandamineserver.model;
import jakarta.persistence.*;
//import javax.validation.constraints.Size;
import jakarta.validation.constraints.Size;

@Entity
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Size(max = 20)
    private String name;

    @Column(unique = true)  // This makes the username field unique
    @Size(max = 20)
    private String username;
    @Size(max = 200)
    private String password;
    public AppUser() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return this.password;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
