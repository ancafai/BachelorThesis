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
public class MountainDtoList implements Serializable {
    private Set<MountainDto> mountainDtoList;

    @Override
    public String toString() {
        return "MountainDtoList{" +
                "mountainDtoList=" + mountainDtoList +
                '}';
    }
}
