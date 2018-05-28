package com.bachelorthesis.mountains.mapper;

import com.bachelorthesis.mountains.dto.UserDto;
import com.bachelorthesis.mountains.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper extends AbstractMapper<User, UserDto> {

    @Override
    public User toInternal(UserDto dto) {
            User user = User.builder()
                    .id(dto.getId())
                    .firstName(dto.getFirstName())
                    .lastName(dto.getLastName())
                    .mail(dto.getMail())
                    .username(dto.getUsername())
                    .password(dto.getPassword())
                    .points(dto.getPoints())
                    .profilePicture(dto.getProfilePicture())
                    .build();
            user.setId(dto.getId());
            return user;
    }

    @Override
    public UserDto toExternal(User model) {

        UserDto userDto = new UserDto(
                    model.getId(),
                    model.getUsername(),
                    model.getPassword(),
                    model.getMail(),
                    model.getFirstName(),
                    model.getLastName(),
                    model.getPoints(),
                    model.getProfilePicture());
            return userDto;
    }
}