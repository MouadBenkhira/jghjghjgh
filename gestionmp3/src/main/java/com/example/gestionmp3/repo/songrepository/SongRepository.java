package com.example.gestionmp3.repo.songrepository;

import com.example.gestionmp3.entities.song.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByUserId(Long userId);
}
