package com.bachelorthesis.mountains.dto;

import com.bachelorthesis.mountains.model.Story;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NewMountainDto implements Serializable {
    private String name;
    private List<ArrayList<Double>> coordinates;
    private List<Story> stories;

    @Override
    public String toString() {
        return "NewMountainDto{" +
                ", name='" + name + '\'' +
                ", coordinates='" + coordinates + '\'' +
                ", stories='" + stories + '\'' +
                '}';
    }
}
