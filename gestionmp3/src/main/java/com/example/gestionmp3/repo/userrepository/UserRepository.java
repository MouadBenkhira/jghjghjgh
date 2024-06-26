package com.example.gestionmp3.repo.userrepository;

import com.example.gestionmp3.entities.user.Status;
import com.example.gestionmp3.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAllByStatus(Status status);
    Optional<User> findUserByEmail(String email);


    User findByEmail(String email);
}
