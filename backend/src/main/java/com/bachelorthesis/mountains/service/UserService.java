package com.bachelorthesis.mountains.service;

import com.bachelorthesis.mountains.dto.NewUserDto;
import com.bachelorthesis.mountains.dto.UserDto;

import java.util.Set;

public interface UserService {

    NewUserDto create(NewUserDto newUserDto);

    Set<UserDto> findAll();

    UserDto findByUsername(String username);

    UserDto findById(String id);


    void delete(String id);

    UserDto update(UserDto userDto);

    String register(NewUserDto newUserDto);

    UserDto login(String username, String password);


}
