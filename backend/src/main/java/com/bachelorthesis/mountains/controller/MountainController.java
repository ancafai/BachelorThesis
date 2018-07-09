package com.bachelorthesis.mountains.controller;


import com.bachelorthesis.mountains.dto.*;
import com.bachelorthesis.mountains.repository.MountainRepository;
import com.bachelorthesis.mountains.service.MountainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/mountain")
@RestController
@CrossOrigin("*")
public class MountainController {

    @Autowired
    private MountainService mountainService;

    @Autowired
    private MountainRepository mountainRepository;

    @RequestMapping (value = "getall", method = RequestMethod.GET)
    public MountainDtoList getAll() {
        MountainDtoList mountainDtoList = new MountainDtoList(mountainService.findAll());
        return mountainDtoList;
    }

    @RequestMapping (value = "create", method = RequestMethod.POST)
    public NewMountainDto createMountain(@RequestBody NewMountainDto newMountainDto) {
        return mountainService.create(newMountainDto);
    }


    @RequestMapping (value = "getbyname/{name}", method = RequestMethod.GET)
    public MountainDto getMountainByNameFromUrl(@PathVariable String name) {
        return mountainService.findByName(name);
    }

    @RequestMapping (value = "getbyid/{id}", method = RequestMethod.GET)
    public MountainDto getByIdFromUrl(@PathVariable String id) {
        return mountainService.findById(id);
    }

    @RequestMapping (value = "delete/{id}", method = RequestMethod.DELETE)
    public void deleteMountain(@PathVariable String id) { mountainService.delete(id); }

    @RequestMapping (value = "update", method = RequestMethod.PUT)
    public MountainDto updateMountain(@RequestBody MountainDto mountainDto) {
        return mountainService.update(mountainDto);
    }

    @RequestMapping (value = "addstory/{mountainId}", method = RequestMethod.POST)
    public MountainDto addStory(@PathVariable String mountainId, @RequestBody NewStoryDto newStoryDto) {
        return mountainService.addStory(mountainId, newStoryDto);

    }

    @RequestMapping (value = "getallstories", method = RequestMethod.GET)
    public StoryDtoList getAllStoriesMountain(){
        StoryDtoList storyDtoList = new StoryDtoList(mountainService.findAllStories());
        return storyDtoList;
    }

    @RequestMapping (value = "getstories/{mountainId}", method = RequestMethod.GET)
    public StoryDtoList getStoriesMountain(@PathVariable String mountainId){
        StoryDtoList storyDtoList = new StoryDtoList(mountainService.findStoriesMountain(mountainId));
        return storyDtoList;
    }

    @RequestMapping (value = "deletestory/{mountainId}/{storyId}", method = RequestMethod.DELETE)
    public MountainDto deleteStories(@PathVariable String mountainId, @PathVariable String storyId) {
        return mountainService.deleteStory(mountainId, storyId);
    }

    @RequestMapping (value = "updatestory/{mountainId}", method = RequestMethod.PUT)
    public MountainDto updateStory(@PathVariable String mountainId, @RequestBody StoryDto storyDto) {
        return mountainService.updateStory(mountainId, storyDto);

    }



}
