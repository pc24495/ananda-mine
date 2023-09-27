package com.example.anandamineserver.repository;
import com.example.anandamineserver.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByUser1IdOrUser2Id(Long user1Id, Long user2Id);
}
