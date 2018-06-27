package com.bachelorthesis.mountains.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDto extends NewUserDto {
    private String id;
    private int points;
    private byte[] profilePicture;

    public UserDto(String id,
                     String username,
                     String password,
                     String mail,
                     String firstname,
                     String lastname,
                     int points,
                     byte[] profilepicture) {
        super(firstname, lastname, mail, username, password);
        this.id = id;
        this.points = points;
        this.profilePicture = profilepicture;
    }

    public String getId() {
        return id;
    }

    public int getPoints() { return points; }

    public byte[] getProfilePicture() { return profilePicture; }


    @Override
    public String toString() {
        return "UserDto{" +
                "id='" + id + '\'' +
                ", points='" + points + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                '}';
    }
}
