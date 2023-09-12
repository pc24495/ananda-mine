package com.example.anandamineserver.repository;

import com.example.anandamineserver.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Integer> {
    AppUser findTopByOrderByIdDesc();
    AppUser findByUsername(String username);
}
