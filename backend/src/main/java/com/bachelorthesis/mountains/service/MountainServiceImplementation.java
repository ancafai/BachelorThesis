package com.bachelorthesis.mountains.service;


import com.bachelorthesis.mountains.dto.MountainDto;
import com.bachelorthesis.mountains.dto.NewMountainDto;
import com.bachelorthesis.mountains.dto.NewStoryDto;
import com.bachelorthesis.mountains.dto.StoryDto;
import com.bachelorthesis.mountains.mapper.MountainMapper;
import com.bachelorthesis.mountains.mapper.NewMountainMapper;
import com.bachelorthesis.mountains.mapper.NewStoryMapper;
import com.bachelorthesis.mountains.mapper.StoryMapper;
import com.bachelorthesis.mountains.model.Mountain;
import com.bachelorthesis.mountains.model.Story;
import com.bachelorthesis.mountains.repository.MountainRepository;
import com.bachelorthesis.mountains.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MountainServiceImplementation implements MountainService {

    private static final String EMPTY_STRING = "";

    @Autowired
    private MountainRepository mountainRepository;

    @Autowired
    private MountainMapper mountainMapper;

    @Autowired
    private NewMountainMapper newMountainMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StoryMapper storyMapper;

    @Autowired
    private NewStoryMapper newStoryMapper;



    @Override
    public NewMountainDto create(NewMountainDto newMountainDto) {

        if (mountainRepository.findByName(newMountainDto.getName()) == null) {
            Mountain createdMountain = newMountainMapper.toInternal(newMountainDto);
            return newMountainMapper.toExternal(mountainRepository.save(createdMountain));
        }
        return null;
    }


    @Override
    public Set<MountainDto> findAll() {
        Set<MountainDto> mountains = mountainMapper.toExternals(new HashSet<>( mountainRepository.findAll()));
        return mountains;
    }



    @Override
    public MountainDto findByName(String name) {
        Mountain dto = mountainRepository.findByName(name);
        return mountainMapper.toExternal(dto);
    }

    @Override
    public MountainDto findById(String id) {
        return mountainMapper.toExternal(mountainRepository.findById(id).get());
    }

    @Transactional
    @Override
    public void delete(String id) {
        Mountain deletedMountain = mountainRepository.findById(id).get();
        mountainRepository.delete(deletedMountain);
    }

    @Override
    @Transactional
    public MountainDto update(MountainDto mountainDto) {
        Mountain mountainToUpdate = mountainRepository.findById(mountainDto.getId()).get();
        String name = mountainDto.getName();
        List<Story> stories = mountainDto.getStories();
        List<ArrayList<Double>> coords = mountainDto.getCoordinates();
        if (name != EMPTY_STRING) {
            mountainToUpdate.setName(mountainDto.getName());
        }
        if (stories != null) {
            mountainToUpdate.setStories(mountainDto.getStories());
        }
        if (coords != null) {
            mountainToUpdate.setCoordinates(mountainDto.getCoordinates());
        }
        Mountain mountainUpdated = mountainRepository.save(mountainToUpdate);
        return mountainMapper.toExternal(mountainUpdated);
    }


    public List<StoryDto> findStoriesMountain(String mountainId) {
        Mountain mountainFindStories = mountainRepository.findById(mountainId).get();
        List<StoryDto> storiesDto = new ArrayList<StoryDto>();
        List<Story> stories = mountainFindStories.getStories();
        for (Story st: stories) {
            storiesDto.add(storyMapper.toExternal(st));
        }
        return storiesDto;
    }

    public List<StoryDto> findAllStories() {
        List<StoryDto> stories = new ArrayList<StoryDto>();
        Set<MountainDto> mountains = findAll();
        for (MountainDto m : mountains){
            Mountain mountain = mountainMapper.toInternal(m);
            if (mountain.getStories() != null) {
            List<Story> storiesAux = mountain.getStories();
                for (Story story : storiesAux) {
                    stories.add(storyMapper.toExternal(story));
                }
            }
        }
        return stories;
    }

    @Transactional
    public MountainDto addStory(String mountainId, NewStoryDto newStoryDto) {
        Mountain mountainAddStory = mountainRepository.findById(mountainId).get();

        mountainAddStory.addStory(newStoryMapper.toInternal(newStoryDto));
        Mountain mountainUpdated = mountainRepository.save(mountainAddStory);
        return mountainMapper.toExternal(mountainUpdated);
    }


    @Transactional
    @Override
    public MountainDto deleteStory(String mountainId, String storyId) {
        Mountain mountainStoryToDelete = mountainRepository.findById(mountainId).get();

        mountainStoryToDelete.deleteStory(storyId);
        Mountain mountainStoryDeleted = mountainRepository.save(mountainStoryToDelete);
        return mountainMapper.toExternal(mountainStoryDeleted);
    }

    @Transactional
    public MountainDto updateStory(String mountainId, StoryDto storyDto) {
        Mountain mountainUpdateStory = mountainRepository.findById(mountainId).get();

        mountainUpdateStory.updateStory(storyMapper.toInternal(storyDto));
        Mountain mountainUpdated = mountainRepository.save(mountainUpdateStory);
        return mountainMapper.toExternal(mountainUpdated);
    }
}
