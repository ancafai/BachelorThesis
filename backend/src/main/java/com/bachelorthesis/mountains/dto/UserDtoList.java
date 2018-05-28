package com.bachelorthesis.mountains.dto;

import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDtoList implements Serializable {
    private Set<UserDto> userDtoList;

    @Override
    public String toString() {
        return "UserDtoList{" +
                "userDtoList=" + userDtoList +
                '}';
    }
}
