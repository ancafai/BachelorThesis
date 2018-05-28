package com.bachelorthesis.mountains.mapper;

import com.bachelorthesis.mountains.dto.NewUserDto;
import com.bachelorthesis.mountains.model.User;
import org.springframework.stereotype.Service;

@Service
public class NewUserMapper extends AbstractMapper<User, NewUserDto> {

    @Override
    public User toInternal(NewUserDto dto) {
        User user = User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .mail(dto.getMail())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .build();
        return user;
    }

    @Override
    public NewUserDto toExternal(User model) {
        NewUserDto newUserDto = NewUserDto.builder()
                .firstName(model.getFirstName())
                .lastName(model.getLastName())
                .mail(model.getMail())
                .username(model.getUsername())
                .password(model.getPassword())
                .build();
        return newUserDto;
    }
}
