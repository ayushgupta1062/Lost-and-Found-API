package com.college.lostandfound.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to the College Lost & Found API! Use /api/items to access the endpoints.";
    }
}
