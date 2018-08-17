package com.bachelorthesis.mountains.service;


import com.bachelorthesis.mountains.dto.*;

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

    List<StoryDto> findStoriesUserMountain(String userId, String mountainId);

    String getColorRegion(String userId, String mountainId);

    UserDto getUserByStoryId(String storyId);

    MountainDto addStory(String mountainId, NewStoryDto newStoryDto);

    MountainDto deleteStory(String storyId);

    MountainDto updateStory(StoryDto storyDto);

    StoryDto getStoryById(String storyId);

    List<StoryDto> getPager(int currentPage, int pageSize);


}
