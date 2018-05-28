package com.bachelorthesis.mountains.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
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

    @NotBlank
    @Size(max=100)
    @Indexed(unique=true)
    private String mail;

    @NotBlank
    @Size(max=50)
    @Indexed(unique=true)
    private String username;

    @NotBlank
    @Size(max=50)
    private String password;

    private int points;

    private byte[] profilePicture;



}