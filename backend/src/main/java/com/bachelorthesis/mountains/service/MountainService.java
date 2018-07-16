package com.bachelorthesis.mountains.service;


import com.bachelorthesis.mountains.dto.MountainDto;
import com.bachelorthesis.mountains.dto.NewMountainDto;
import com.bachelorthesis.mountains.dto.NewStoryDto;
import com.bachelorthesis.mountains.dto.StoryDto;

import java.util.List;
import java.util.Set;

public interface MountainService {

    NewMountainDto create(NewMountainDto newMountainDto);

    Set<MountainDto> findAll();

    MountainDto findByName(String name);

    MountainDto findById(String id);

    void delete(String id);

    MountainDto update(MountainDto mountainDto);

    List<StoryDto> findStoriesMountain(String mountainId);

    List<StoryDto> findStoriesUser(String userId);

    List<StoryDto> findAllStories();

    MountainDto addStory(String mountainId, NewStoryDto newStoryDto);

    MountainDto deleteStory(String mountainId, String storyId);

    MountainDto updateStory(String mountainId, StoryDto storyDto);


}
