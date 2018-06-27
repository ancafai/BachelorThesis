package com.bachelorthesis.mountains.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Document(collection="users")
public class User implements Serializable {
    @Id
    private String id;

    @Size(max=100)
    private String firstName;

    @Size(max=100)
    private String lastName;


    @Size(max=100)
    private String mail;


    @Size(max=50)
    private String username;


    @Size(max=50)
    private String password;

    private int points;

    private byte[] profilePicture;



}