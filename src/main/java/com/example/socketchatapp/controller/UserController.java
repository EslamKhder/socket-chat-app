package com.example.socketchatapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.socketchatapp.model.ActiveUser;
import com.example.socketchatapp.model.Storage;

@RestController
public class UserController {

    @GetMapping("/active")
    public List<ActiveUser> list(){
        return Storage.activeUserList;
    }
}
