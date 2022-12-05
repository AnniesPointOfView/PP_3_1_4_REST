package ru.kata.spring.boot_security.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.rest.model.Role;
import ru.kata.spring.boot_security.rest.model.User;
import ru.kata.spring.boot_security.rest.service.RoleService;
import ru.kata.spring.boot_security.rest.service.UserService;

import java.security.Principal;
import java.util.*;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping({"", "list"})
    public String getAllUsers(Model model, Principal principal) {
        model.addAttribute("users", userService.findAllUsers());
        model.addAttribute("user", userService.loadUserByUsername(principal.getName()));
        model.addAttribute("newUser", new User());
        model.addAttribute("roles", roleService.findAllRoles());
        return "admin-page";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute("newUser") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/{id}")
    public String edit(@ModelAttribute("userItem") User user,
                       @PathVariable("id") int id,
                       @RequestParam(name = "selectedRoles", defaultValue = "0") Long[] selectedRoles) {
        List<Role> listRoles = roleService.findAllRolesById(selectedRoles);
        Set<Role> roles = new HashSet<>(listRoles);
        user.setRoles(roles);
        userService.updateUser(id, user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

}
