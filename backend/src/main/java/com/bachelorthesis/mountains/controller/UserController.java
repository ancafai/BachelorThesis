package com.bachelorthesis.mountains.controller;


import com.bachelorthesis.mountains.dto.NewUserDto;
import com.bachelorthesis.mountains.dto.UserDto;
import com.bachelorthesis.mountains.dto.UserDtoList;
import com.bachelorthesis.mountains.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/user")
@RestController
@CrossOrigin("*")
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);


    @Autowired
    private UserService userService;

    @RequestMapping (value = "getall", method = RequestMethod.GET)
    public UserDtoList getAll() {
        UserDtoList userDtoList = new UserDtoList(userService.findAll());
        return userDtoList;
    }

    @RequestMapping (value = "create", method = RequestMethod.POST)
    public NewUserDto createPerson(@RequestBody NewUserDto newUserDto) {
        return userService.create(newUserDto);
    }


    @RequestMapping (value = "getbyusername/{username}", method = RequestMethod.GET)
    public UserDto getPersonByUsernameFromUrl(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    @RequestMapping (value = "getbyid/{id}", method = RequestMethod.GET)
    public UserDto getByIdFromUrl(@PathVariable String id) {
        return userService.findById(id);
    }

    @RequestMapping (value = "delete/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable String id) { userService.delete(id); }


    @RequestMapping (value = "update", method = RequestMethod.PUT)
    public UserDto updateUser(@RequestBody UserDto userDto) {
        return userService.update(userDto);
    }

    @RequestMapping("login/{username}/{password}")
    public UserDto login(@PathVariable String username,@PathVariable String password){
        return userService.login(username, password);
    }


    @RequestMapping(value="register", method = RequestMethod.POST)
    public String register(@RequestBody NewUserDto newUserDto){
        if(userService.register(newUserDto)){
            return "GOOD";
        }else{
            return "username not available";
        }
    }


    @RequestMapping(value = "update/image", method = RequestMethod.PUT, consumes = "multipart/form-data")
    @ResponseBody
    public UserDto updateUser(@RequestPart("file") MultipartFile file,
                              @RequestPart("user")  UserDto userDto) {
        byte[] content = null;
        if (!file.isEmpty()) {
            try {
                content = file.getBytes();
            } catch (Exception e) {
                return null;
            }
        }
        UserDto updatedUser = new UserDto(userDto.getId(),
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getMail(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getPoints(),
                content,
                userDto.getDescription(),
                userDto.getMapType());


        return userService.update(updatedUser);
    }

    @RequestMapping(value = "update/noimage", method = RequestMethod.PUT, consumes = "multipart/form-data")
    @ResponseBody
    public UserDto updateUserNoImage(@RequestPart("user")  UserDto userDto) {

        UserDto updatedUser = new UserDto(userDto.getId(),
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getMail(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getPoints(),
                null,
                userDto.getDescription(),
                userDto.getMapType());


        return userService.update(updatedUser);
    }




}
