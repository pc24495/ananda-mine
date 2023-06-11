package com.example.anandamineserver.service;

import com.example.anandamineserver.model.AppUser;
import com.example.anandamineserver.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public AppUser saveAppUser(AppUser appUser) {
        return appUserRepository.save(appUser);
    }

    @Override
    public AppUser getLastAppUser() {
        return appUserRepository.findTopByOrderByIdDesc();
    }
}
