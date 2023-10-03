package com.example.anandamineserver.model;
import jakarta.persistence.*;
//import javax.validation.constraints.Size;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

enum Gender {
    MALE, FEMALE, NON_BINARY
}
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

    @Size(max = 2000)
    @Column(name = "pic1url", length = 2000)
    private String pic1Url;
    @Size(max = 2000)
    @Column(name = "pic2url", length = 2000)
    private String pic2Url;
    @Size(max = 2000)
    @Column(name = "pic3url", length = 2000)
    private String pic3Url;
    @Size(max = 2000)
    @Column(name = "pic4url", length = 2000)
    private String pic4Url;
    @Size(max = 2000)
    @Column(name = "pic5url", length = 2000)
    private String pic5Url;
    @Size(max = 2000)
    @Column(name = "pic6url", length = 2000)
    private String pic6Url;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "bio")
    @Size(max = 500)
    private String bio;

    public String getPic1Url() {
        return pic1Url;
    }

    public void setPic1Url(String pic1Url) {
        this.pic1Url = pic1Url;
    }

    public String getPic2Url() {
        return pic2Url;
    }

    public void setPic2Url(String pic2Url) {
        this.pic2Url = pic2Url;
    }

    public String getPic3Url() {
        return pic3Url;
    }

    public void setPic3Url(String pic3Url) {
        this.pic3Url = pic3Url;
    }

    public String getPic4Url() {
        return pic4Url;
    }

    public void setPic4Url(String pic4Url) {
        this.pic4Url = pic4Url;
    }

    public String getPic5Url() {
        return pic5Url;
    }

    public void setPic5Url(String pic5Url) {
        this.pic5Url = pic5Url;
    }

    public String getPic6Url() {
        return pic6Url;
    }

    public void setPic6Url(String pic6Url) {
        this.pic6Url = pic6Url;
    }



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

    public LocalDate getBirthday() {
        return this.birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getBio() {
        return this.bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
