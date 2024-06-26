package com.example.gestionmp3.service.songservice;

import com.example.gestionmp3.entities.song.Song;
import com.example.gestionmp3.entities.user.User;
import com.example.gestionmp3.repo.songrepository.SongRepository;
import com.example.gestionmp3.repo.userrepository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SongService {

    @Value("${song.upload.dir}")
    private String uploadDir;

    private final SongRepository songRepository;
    private final UserRepository userRepository;

    public SongService(SongRepository songRepository, UserRepository userRepository) {
        this.songRepository = songRepository;
        this.userRepository = userRepository;
    }

    public void uploadSong(MultipartFile songFile, MultipartFile imageFile, String title, String description, String type, Duration duration, Long userId) throws IOException {
        // Create directory if not exists
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Save song file to disk
        String songFileName = System.currentTimeMillis() + "-" + songFile.getOriginalFilename();
        Path songFilePath = Paths.get(uploadDir + File.separator + songFileName);
        Files.write(songFilePath, songFile.getBytes());

        // Save image file to disk
        String imageFileName = System.currentTimeMillis() + "-" + imageFile.getOriginalFilename();
        Path imageFilePath = Paths.get(uploadDir + File.separator + imageFileName);
        Files.write(imageFilePath, imageFile.getBytes());

        // Find user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Save song details to database
        Song song = new Song();
        song.setTitle(title);
        song.setDescription(description);
        song.setType(type);
        song.setDuration(duration);
        song.setDate(LocalDate.now());
        song.setFilePath(songFilePath.toString());
        song.setImagePath(imageFilePath.toString());
        song.setUser(user);
        songRepository.save(song);
    }

    public void uploadImageForSong(Long songId, MultipartFile imageFile) throws IOException {
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));

        // Save image file to disk
        String imageFileName = System.currentTimeMillis() + "-" + imageFile.getOriginalFilename();
        Path imageFilePath = Paths.get(uploadDir + File.separator + imageFileName);
        Files.write(imageFilePath, imageFile.getBytes());

        // Update song image path in database
        song.setImagePath(imageFilePath.toString());
        songRepository.save(song);
    }

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public List<Song> getLatestSongs() {
        List<Song> allSongs = songRepository.findAll();
        List<Song> latestSongs = allSongs.stream()
                .sorted((s1, s2) -> s2.getDate().compareTo(s1.getDate())) // Sort by publication date in descending order
                .collect(Collectors.toList());
        return latestSongs;
    }

    public ResponseEntity<byte[]> playSong(Long songId) {
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));

        Path filePath = Paths.get(song.getFilePath());
        File file = filePath.toFile();

        if (file.exists() && file.isFile() && file.canRead()) {
            try {
                byte[] data = Files.readAllBytes(filePath);
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDispositionFormData("attachment", file.getName());
                return new ResponseEntity<>(data, headers, HttpStatus.OK);
            } catch (Exception e) {
                throw new RuntimeException("Error reading file: " + e.getMessage());
            }
        } else {
            throw new RuntimeException("File not found or cannot be read");
        }
    }

    public ResponseEntity<byte[]> getSongImage(Long songId) {
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));

        Path imagePath = Paths.get(song.getImagePath());
        File imageFile = imagePath.toFile();

        if (imageFile.exists() && imageFile.isFile() && imageFile.canRead()) {
            try {
                byte[] imageData = Files.readAllBytes(imagePath);
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG); // Set content type to image/jpeg
                return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
            } catch (IOException e) {
                throw new RuntimeException("Error reading image file: " + e.getMessage());
            }
        } else {
            throw new RuntimeException("Image file not found or cannot be read");
        }
    }

    public List<Song> getAllSongs(Long userId) {
        return songRepository.findByUserId(userId);
    }

}
