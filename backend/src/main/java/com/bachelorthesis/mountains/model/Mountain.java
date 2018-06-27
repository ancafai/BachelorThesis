package com.bachelorthesis.mountains.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Document(collection="mountains")
public class Mountain implements Serializable {
    @Id
    private String id;

    @Size(max=100)
    private String name;

    private List<Story> stories;


    public Mountain(String name, List<Story> stories) {

        this.name = name;
        this.stories = stories;
    }
}
