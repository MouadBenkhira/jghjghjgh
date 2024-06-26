package com.example.gestionmp3.controller.songcontroller;

import com.example.gestionmp3.entities.song.Song;
import com.example.gestionmp3.service.songservice.SongService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Duration;
import java.util.List;

@RestController
@CrossOrigin(origins = "file://")
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadSong(
            @RequestParam("songFile") MultipartFile songFile,
            @RequestParam("imageFile") MultipartFile imageFile,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("type") String type,
            @RequestParam("duration") String durationStr,
            @RequestParam("userId") Long userId
    ) {
        try {
            Duration duration = Duration.parse(durationStr);
            songService.uploadSong(songFile, imageFile, title, description, type, duration, userId);
            return ResponseEntity.ok("Song uploaded successfully.");
        } catch (IOException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload song: " + e.getMessage());
        }
    }

    @GetMapping("/{songId}/play")
    public ResponseEntity<byte[]> playSong(@PathVariable Long songId) {
        try {
            return songService.playSong(songId);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Song>> getAllSongs() {
        List<Song> songs = songService.getAllSongs();
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }

    @GetMapping("/{songId}/image")
    public ResponseEntity<byte[]> getSongImage(@PathVariable Long songId) {
        try {
            return songService.getSongImage(songId);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<List<Song>> getLatestSongs() {
        List<Song> latestSongs = songService.getLatestSongs();
        return new ResponseEntity<>(latestSongs, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/all")
    public ResponseEntity<List<Song>> getAllSongs(@PathVariable Long userId) {
        List<Song> songs = songService.getAllSongs(userId);
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }
}
