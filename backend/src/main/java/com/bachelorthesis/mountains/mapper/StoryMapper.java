package com.bachelorthesis.mountains.mapper;


import com.bachelorthesis.mountains.dto.StoryDto;
import com.bachelorthesis.mountains.model.Story;
import org.springframework.stereotype.Service;

@Service
public class StoryMapper extends AbstractMapper<Story, StoryDto> {

    @Override
    public Story toInternal(StoryDto dto) {
        Story story = Story.builder()
                .userId(dto.getUserId())
                .title(dto.getTitle())
                .text(dto.getText())
                .color(dto.getColor())
                .id(dto.getId())
                .pictures(dto.getPictures())
                .storyComments(dto.getStoryComments())
                .storyLikes(dto.getStoryLikes())
                .build();
        story.setId(dto.getId());
        return story;
    }

    @Override
    public StoryDto toExternal(Story model) {

        StoryDto storyDto = new StoryDto(
                model.getUserId(),
                model.getTitle(),
                model.getText(),
                model.getColor(),
                model.getId(),
                model.getPictures(),
                model.getStoryLikes(),
                model.getStoryComments()
        );
        return storyDto;
    }
}