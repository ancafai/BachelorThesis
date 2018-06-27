package com.bachelorthesis.mountains.dto;


import com.bachelorthesis.mountains.model.Story;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MountainDto extends NewMountainDto {
    private String id;
    private List<Story> stories;


    public MountainDto(String id, String name, List<Story> stories) {
        super(name);
        this.id = id;
        this.stories = stories;
    }

    

    @Override
    public String toString() {
        return "MountainDto{" +
                "id='" + id + '\'' +
                "stories='" + stories + '\'' +
                '}';
    }
}
