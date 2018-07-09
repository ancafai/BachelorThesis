package com.bachelorthesis.mountains.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class StoryDtoList implements Serializable {
    private List<StoryDto> storyDtoList;

    @Override
    public String toString() {
        return "StoryDtoList{" +
                "storyDtoList=" + storyDtoList +
                '}';
    }
}
