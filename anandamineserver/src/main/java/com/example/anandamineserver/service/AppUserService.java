package com.example.anandamineserver.service;

import com.example.anandamineserver.model.AppUser;

import java.util.List;

public interface AppUserService {
    public AppUser saveAppUser(AppUser appUser);
    public AppUser getLastAppUser();
}
