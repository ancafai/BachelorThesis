package com.bachelorthesis.mountains.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NewMountainDto implements Serializable {
    private String name;

    @Override
    public String toString() {
        return "NewMountainDto{" +
                ", name='" + name + '\'' +
                '}';
    }
}
