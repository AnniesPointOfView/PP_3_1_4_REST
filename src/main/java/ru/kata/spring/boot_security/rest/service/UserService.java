package ru.kata.spring.boot_security.rest.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.rest.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> findAllUsers();
    User findById(int id);
    User findByUsername(String username);
    boolean saveUser(User user);
    void updateUser(int id, User user);
    void deleteUser(int id);
}
