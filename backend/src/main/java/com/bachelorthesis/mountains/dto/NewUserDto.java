package com.bachelorthesis.mountains.dto;

import lombok.*;

import java.io.Serializable;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NewUserDto implements Serializable {
    private String firstName;
    private String lastName;
    private String mail;
    private String username;
    private String password;

    @Override
    public String toString() {
        return "NewUserDto{" +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", mail='" + mail + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
