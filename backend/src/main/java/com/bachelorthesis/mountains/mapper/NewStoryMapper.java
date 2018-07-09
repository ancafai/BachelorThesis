package com.bachelorthesis.mountains.mapper;


import com.bachelorthesis.mountains.dto.NewStoryDto;
import com.bachelorthesis.mountains.model.Story;
import org.springframework.stereotype.Service;

@Service
public class NewStoryMapper extends AbstractMapper<Story, NewStoryDto> {

    @Override
    public Story toInternal(NewStoryDto dto) {
        Story story = Story.builder()
                .userId(dto.getUserId())
                .title(dto.getTitle())
                .text(dto.getText())
                .color(dto.getColor())
                .build();
        return story;
    }

    @Override
    public NewStoryDto toExternal(Story model) {
        NewStoryDto newStoryDto = NewStoryDto.builder()
                .userId(model.getUserId())
                .title(model.getTitle())
                .text(model.getText())
                .color(model.getColor())
                .build();
        return newStoryDto;
    }
}
