package com.example.gestionmp3.service.userservice;

import com.example.gestionmp3.entities.song.Song;
import com.example.gestionmp3.entities.user.Status;
import com.example.gestionmp3.entities.user.Type;
import com.example.gestionmp3.entities.user.User;
import com.example.gestionmp3.repo.userrepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User becomeArtist(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setType(Type.artist);
            return userRepository.save(user);
        }
        return null; // Or throw an exception if user is not found
    }

    public void incrementNumberOfLikes(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setNbrLike(user.getNbrLike() + 1);
            userRepository.save(user);
        }
    }

    public void incrementNumberOfFollowers(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setNbrFollower(user.getNbrFollower() + 1);
            userRepository.save(user);
        }
    }

    public List<User> getTopContributors(int limit) {
        return userRepository.findAll().stream()
                .sorted((u1, u2) -> Integer.compare(u2.getNbrSongs(), u1.getNbrSongs())) // Sort by number of songs descending
                .limit(limit)
                .collect(Collectors.toList());
    }

    public User addUser(User user) {
        user.setType(Type.artist);
        user.setStatus(Status.ACTIVE);
        // Set the image path based on your folder structure
        user.setImagePath("C:\\Users\\NBJ\\Desktop\\Images\\" + user.getId() + "\\image.jpg");
        return userRepository.save(user);
    }


    public boolean deleteUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setStatus(Status.DELETED);
            userRepository.save(user);
            return true; // Deletion successful
        }
        return false; // User not found
    }

    public List<User> getAllActiveUsers() {
        return userRepository.findAllByStatus(Status.ACTIVE);
    }

    public ResponseEntity<byte[]> getUserImage(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String imagePath = user.getImagePath();
        if (imagePath == null) {
            throw new RuntimeException("Image path is null for user: " + userId);
        }

        Path imagePathObj = Paths.get(imagePath);

        if (Files.exists(imagePathObj) && Files.isReadable(imagePathObj) && !Files.isDirectory(imagePathObj)) {
            try {
                byte[] imageData = Files.readAllBytes(imagePathObj);
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(imageData);
            } catch (IOException e) {
                throw new RuntimeException("Error reading image file: " + e.getMessage());
            }
        } else {
            throw new RuntimeException("Image file not found or cannot be read");
        }
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public List<String> getAllImages() {
        List<User> users = userRepository.findAll();
        List<String> imagePaths = new ArrayList<>();
        for (User user : users) {
            // Check if the user has an image path
            if (user.getImagePath() != null && !user.getImagePath().isEmpty()) {
                imagePaths.add(user.getImagePath());
            }
        }
        return imagePaths;
    }

    public ResponseEntity<byte[]> getUserImages(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Song not found"));

        Path imagePath = Paths.get(user.getImagePath());
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
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public ResponseEntity<byte[]> getImageById(Long imageId) {
        // Retrieve the user based on the image ID
        Optional<User> userOptional = userRepository.findById(imageId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String imagePath = user.getImagePath();
            if (imagePath != null && !imagePath.isEmpty()) {
                Path imagePathObj = Paths.get(imagePath);
                if (Files.exists(imagePathObj) && Files.isReadable(imagePathObj) && !Files.isDirectory(imagePathObj)) {
                    try {
                        byte[] imageData = Files.readAllBytes(imagePathObj);
                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.IMAGE_JPEG); // Set content type to image/jpeg
                        return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
                    } catch (IOException e) {
                        throw new RuntimeException("Error reading image file: " + e.getMessage());
                    }
                } else {
                    throw new RuntimeException("Image file not found or cannot be read");
                }
            } else {
                throw new RuntimeException("Image path is null or empty for image ID: " + imageId);
            }
        } else {
            throw new RuntimeException("User not found for image ID: " + imageId);
        }
    }

    public User registerUser(User user) {
        // Perform any necessary validations
        // For example, check if the email is unique
        // If validations pass, save the user to the database
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        // Retrieve the user by email from the database
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            // If user exists and password matches, return the user
            return user;
        }
        // If user does not exist or password does not match, return null
        return null;
    }

}

