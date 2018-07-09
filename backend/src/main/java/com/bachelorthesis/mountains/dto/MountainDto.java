package com.bachelorthesis.mountains.dto;


import com.bachelorthesis.mountains.model.Story;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MountainDto extends NewMountainDto {
    private String id;


    public MountainDto(String id, String name, List<ArrayList<Double>>coordinates, List<Story> stories) {
        super(name, coordinates, stories);
        this.id = id;
    }



    @Override
    public String toString() {
        return "MountainDto{" +
                "id='" + id + '\'' +
                '}';
    }
}
