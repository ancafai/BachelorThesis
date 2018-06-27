package com.bachelorthesis.mountains.mapper;


import com.bachelorthesis.mountains.dto.MountainDto;
import com.bachelorthesis.mountains.model.Mountain;
import org.springframework.stereotype.Service;

@Service
public class MountainMapper extends AbstractMapper<Mountain, MountainDto> {

    @Override
    public Mountain toInternal(MountainDto dto) {
        Mountain mountain = Mountain.builder()
                .id(dto.getId())
                .name(dto.getId())
                .stories(dto.getStories())
                .build();
        mountain.setId(dto.getId());
        return mountain;
    }

    @Override
    public MountainDto toExternal(Mountain model) {

        MountainDto mountainDto = new MountainDto(
                model.getId(),
                model.getName(),
                model.getStories());
        return mountainDto;
    }
}