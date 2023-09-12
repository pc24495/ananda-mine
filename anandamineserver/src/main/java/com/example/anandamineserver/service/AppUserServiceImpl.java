package com.example.anandamineserver.service;

import com.example.anandamineserver.model.AppUser;
import com.example.anandamineserver.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public AppUser saveAppUser(AppUser appUser) {
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword())); // Encode the password
        return appUserRepository.save(appUser);
    }

    @Override
    public AppUser getLastAppUser() {
        return appUserRepository.findTopByOrderByIdDesc();
    }

    @Override
    public AppUser findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }

}
