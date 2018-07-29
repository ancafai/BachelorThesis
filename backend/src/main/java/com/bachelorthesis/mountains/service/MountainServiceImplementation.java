package com.bachelorthesis.mountains.service;


import com.bachelorthesis.mountains.dto.*;
import com.bachelorthesis.mountains.mapper.*;
import com.bachelorthesis.mountains.model.Mountain;
import com.bachelorthesis.mountains.model.Story;
import com.bachelorthesis.mountains.model.User;
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
    private UserMapper userMapper;

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


    public List<StoryDto> findStoriesUser(String userId) {
        List<Mountain> mountainsFindStories = mountainRepository.findAll();
        List<StoryDto> storiesDto = new ArrayList<StoryDto>();
        for (Mountain mountain : mountainsFindStories) {
            List<Story> stories = mountain.getStories();
            for (Story st: stories) {
                if (st.getUserId().equals(userId)) {
                    storiesDto.add(storyMapper.toExternal(st));
                }
            }
        }
        return storiesDto;
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

    public List<StoryDto> findStoriesUserMountain(String userId, String mountainId) {
        List<StoryDto> storiesUserMountain = new ArrayList<StoryDto>();
        List<StoryDto> storiesMountain = findStoriesMountain(mountainId);
        for (StoryDto story : storiesMountain) {
            if (story.getUserId().equals(userId)) {
                storiesUserMountain.add(story);
            }
        }
        return storiesUserMountain;
    }

    public String getColorRegion(String userId, String mountainId) {
        List<StoryDto> stories = findStoriesUserMountain(userId, mountainId);
        if (stories.size() != 0) {
            return stories.get(stories.size() - 1).getColor();

        }
        return "";
    }

    @Override
    public UserDto getUserByStoryId(String storyId) {

       StoryDto storyFound = this.getStoryById(storyId);
        Set<UserDto> persons = userMapper.toExternals(new HashSet<>((List<User>) userRepository.findAll()));
        for (UserDto per : persons) {
            if (per.getId().equals(storyFound.getUserId())) {
                return per;
            }
        }
        return null;
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
    public MountainDto deleteStory(String storyId) {
      //  Mountain mountainStoryToDelete = mountainRepository.findById(mountainId).get();
        Set<MountainDto> mountains = this.findAll();
        for (MountainDto m : mountains) {
            for (Story st : m.getStories()) {
                if (st.getId().equals(storyId)) {
                    mountainMapper.toInternal(m).deleteStory(storyId);
                    Mountain mountainUpdated = mountainRepository.save(mountainMapper.toInternal(m));
                    return mountainMapper.toExternal(mountainUpdated);
                }
            }
        }
        return null;
    }

    @Transactional
    @Override
    public MountainDto updateStory(StoryDto storyDto) {
        Set<MountainDto> mountains = this.findAll();
        for (MountainDto m : mountains) {
            for (Story st : m.getStories()) {
                if (st.getId().equals(storyDto.getId())) {
                    mountainMapper.toInternal(m).updateStory(storyMapper.toInternal(storyDto));
                    Mountain mountainUpdated = mountainRepository.save(mountainMapper.toInternal(m));
                    return mountainMapper.toExternal(mountainUpdated);
                }
            }
        }
        return null;
    }

    @Override
    public StoryDto getStoryById(String storyId) {
        List<StoryDto> stories = this.findAllStories();
        for (StoryDto story : stories) {
            if (story.getId().equals(storyId)) {
                return story;
            }
        }
        return null;
    }
}
