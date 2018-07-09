package com.bachelorthesis.mountains.mapper;


import com.bachelorthesis.mountains.dto.NewMountainDto;
import com.bachelorthesis.mountains.model.Mountain;
import org.springframework.stereotype.Service;

@Service
public class NewMountainMapper extends AbstractMapper<Mountain, NewMountainDto> {

    @Override
    public Mountain toInternal(NewMountainDto dto) {
        Mountain mountain = Mountain.builder()
                .name(dto.getName())
                .coordinates(dto.getCoordinates())
                .stories(dto.getStories())
                .build();
        return mountain;
    }

    @Override
    public NewMountainDto toExternal(Mountain model) {
        NewMountainDto newMountainDto = NewMountainDto.builder()
                .name(model.getName())
                .coordinates(model.getCoordinates())
                .stories(model.getStories())
                .build();
        return newMountainDto;
    }
}
