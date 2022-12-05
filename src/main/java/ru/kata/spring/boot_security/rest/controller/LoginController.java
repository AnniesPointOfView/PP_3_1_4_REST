package ru.kata.spring.boot_security.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping()
    public String index() {
        return "login-page";
    }

}
