package com.example.anandamineserver.controller;

import com.example.anandamineserver.model.AppUser;
import com.example.anandamineserver.service.AppUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appuser")
public class AppUserController {

    @Autowired
    private AppUserService appUserService;

    @PostMapping("/add")
    public String add(@RequestBody AppUser appUser) {
        appUserService.saveAppUser(appUser);
        return "New user is added";
    }

    @GetMapping("/getLastUser")
    public AppUser get() {
        return appUserService.getLastAppUser();
    }
}
