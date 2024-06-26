package com.example.gestionmp3.controller.usercontroller;
import org.springframework.http.MediaType;

import com.example.gestionmp3.entities.user.Status;
import com.example.gestionmp3.entities.user.User;

import com.example.gestionmp3.service.userservice.UserService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "file://")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/{userId}/become-artist")
    public User becomeArtist(@PathVariable Long userId) {
        return userService.becomeArtist(userId);
    }

    @PostMapping("/{userId}/increment-likes")
    public void incrementNumberOfLikes(@PathVariable Long userId) {
        userService.incrementNumberOfLikes(userId);
    }

    @PostMapping("/{userId}/increment-followers")
    public void incrementNumberOfFollowers(@PathVariable Long userId) {
        userService.incrementNumberOfFollowers(userId);
    }

    @GetMapping("/top-contributors")
    public List<User> getTopContributors(@RequestParam(name = "limit", defaultValue = "6") int limit) {
        List<User> topContributors = userService.getTopContributors(limit);

        // For each top contributor, set their image path
        for (User user : topContributors) {
            try {
                ResponseEntity<byte[]> imageResponse = userService.getUserImage(user.getId());
                if (imageResponse.getStatusCode() == HttpStatus.OK && imageResponse.getBody() != null) {
                    String imagePath = user.getImagePath();
                    // Update the user's image path with the path retrieved from the service
                    user.setImagePath(imagePath);
                }
            } catch (RuntimeException e) {
                // Handle the exception if necessary
            }
        }

        return topContributors;
    }


    @PostMapping("/add")
    public User addUser(@RequestParam("image") MultipartFile image, User user) {
        // Save the image file to the specified directory
        String imagePath = "C:\\Users\\NBJ\\Desktop\\Images\\" + user.getId() + "\\image.jpg";
        try {
            image.transferTo(new File(imagePath));
        } catch (IOException e) {
            // Handle the exception
        }

        // Set the image path in the user object
        user.setImagePath(imagePath);

        // Save the user object to the database
        return userService.addUser(user);
    }



    // API endpoint to get all users with status ACTIVE

    @GetMapping("/{userId}/image")
    public ResponseEntity<byte[]> getUserImage(@PathVariable Long userId) {
        try {
            return userService.getUserImage(userId);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/active")
    public ResponseEntity<List<User>> getAllActiveUsers() {
        List<User> activeUsers = userService.getAllActiveUsers();
        return new ResponseEntity<>(activeUsers, HttpStatus.OK);
    }

    // Mapping to get user profile by ID
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long userId) {
        Optional<User> userOptional = userService.getUserById(userId);
        return userOptional.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/images")
    public ResponseEntity<List<String>> getAllImages() {
        List<String> imagePaths = userService.getAllImages();
        return new ResponseEntity<>(imagePaths, HttpStatus.OK);
    }
    @GetMapping("/images/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        String imagePath = "C:\\Users\\NBJ\\Desktop\\Songs\\" + imageName; // Adjust this path as needed

        try {
            Path path = Paths.get(imagePath);
            byte[] imageData = Files.readAllBytes(path);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/{userid}/images")
    public ResponseEntity<byte[]> getUserImages(@PathVariable Long userid) {
        try {
            return userService.getUserImages(userid);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/images/{imageId}")
    public ResponseEntity<byte[]> getImageById(@PathVariable Long imageId) {
        try {
            ResponseEntity<byte[]> imageResponse = userService.getImageById(imageId);
            return imageResponse;
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


}
