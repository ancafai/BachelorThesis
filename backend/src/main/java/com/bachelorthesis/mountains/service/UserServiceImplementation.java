package com.bachelorthesis.mountains.service;


import com.bachelorthesis.mountains.dto.NewUserDto;
import com.bachelorthesis.mountains.dto.UserDto;
import com.bachelorthesis.mountains.mapper.NewUserMapper;
import com.bachelorthesis.mountains.mapper.UserMapper;
import com.bachelorthesis.mountains.model.User;
import com.bachelorthesis.mountains.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImplementation implements UserService {

    private static final String EMPTY_STRING = "";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private NewUserMapper newUserMapper;

    @Override
    public NewUserDto create(NewUserDto newUserDto) {
            User createdUser = newUserMapper.toInternal(newUserDto);
            return newUserMapper.toExternal(userRepository.save(createdUser));
    }


    @Override
    public Set<UserDto> findAll() {
        Set<UserDto> persons = userMapper.toExternals(new HashSet<>((List<User>) userRepository.findAll()));
        return persons;
    }


    @Override
    public UserDto findByUsername(String username) {
        User dto = userRepository.findByUsername(username);
        return userMapper.toExternal(dto);
    }

    @Override
    public UserDto findById(String id) {
        return userMapper.toExternal(userRepository.findById(id).get());
    }



    @Transactional
    @Override
    public void delete(String id) {
        User deletedUser = userRepository.findById(id).get();
        userRepository.delete(deletedUser);
    }

    @Override
    @Transactional
    public UserDto update(UserDto userDto) {
        User userToUpdate = userRepository.findById(userDto.getId()).get();
        String firstName = userDto.getFirstName();
        String lastName = userDto.getLastName();
        String mail = userDto.getMail();
        int points = userDto.getPoints();
        byte[] pic = userDto.getProfilePicture();
        String description = userDto.getDescription();
        String mapType = userDto.getMapType();

        if (firstName != EMPTY_STRING) {
            userToUpdate.setFirstName(userDto.getFirstName());
        }
        if (lastName != EMPTY_STRING) {
            userToUpdate.setLastName(userDto.getLastName());
        }
        if (mail != EMPTY_STRING) {
            userToUpdate.setMail(userDto.getMail());
        }
        if (String.valueOf(points) != EMPTY_STRING) {
           userToUpdate.setPoints(userDto.getPoints());
        }
        if (pic != null) {
            userToUpdate.setProfilePicture(userDto.getProfilePicture());
        }
        if (description != EMPTY_STRING) {
            userToUpdate.setDescription(userDto.getDescription());
        }
        if (mapType != EMPTY_STRING) {
            userToUpdate.setMapType(userDto.getMapType());
        }
        User userUpdated = userRepository.save(userToUpdate);
        return userMapper.toExternal(userUpdated);
    }

    @Override
    public boolean register(NewUserDto newUserDto){
        if(userRepository.findByUsername(newUserDto.getUsername()) != null){
            return false;
        }else{
            userRepository.save(newUserMapper.toInternal(newUserDto));
            return true;
        }
    }

    @Override
    public UserDto login(String username, String password){
        User userFound= userRepository.findByUsername(username);
        if (userFound == null) {
            return null;
        }
        else if (userFound.getPassword().equals(password)) {
            return userMapper.toExternal(userFound);
        }
        return null;
    }






}
