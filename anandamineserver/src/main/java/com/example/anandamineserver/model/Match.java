package com.example.anandamineserver.model;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_1_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AppUser user1;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_2_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AppUser user2;

    private LocalDateTime time;

    // setters and getters
}

