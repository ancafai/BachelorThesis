package com.bachelorthesis.mountains.controller;


import com.bachelorthesis.mountains.dto.*;
import com.bachelorthesis.mountains.repository.MountainRepository;
import com.bachelorthesis.mountains.service.MountainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

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

    @RequestMapping (value = "getstoriesuser/{userId}", method = RequestMethod.GET)
    public StoryDtoList getStoriesUser( @PathVariable String userId){
        StoryDtoList storyDtoList = new StoryDtoList(mountainService.findStoriesUser(userId));
        return storyDtoList;
    }
    @RequestMapping (value = "getstoriesusermountain/{userId}/{mountainId}", method = RequestMethod.GET)
    public StoryDtoList getStoriesMountainUser( @PathVariable String userId, @PathVariable String mountainId){
        StoryDtoList storyDtoList = new StoryDtoList(mountainService.findStoriesUserMountain(userId, mountainId));
        return storyDtoList;
    }

    @RequestMapping (value = "getcolorregion/{userId}/{mountainId}", method = RequestMethod.GET)
    public String getColorRegion( @PathVariable String userId, @PathVariable String mountainId){
        return mountainService.getColorRegion(userId, mountainId);
    }

    @RequestMapping (value = "getuserbystoryid/{storyId}", method = RequestMethod.GET)
    public UserDto getUserByStoryId( @PathVariable String storyId){
        return mountainService.getUserByStoryId(storyId);
    }

    @RequestMapping (value = "deletestory/{storyId}", method = RequestMethod.DELETE)
    public MountainDto deleteStories(@PathVariable String storyId) {
        return mountainService.deleteStory(storyId);
    }

    /*
    @RequestMapping (value = "updatestory", method = RequestMethod.PUT)
    public MountainDto updateStory(@RequestBody StoryDto storyDto) {
        return mountainService.updateStory(storyDto);

    }
    */

    @RequestMapping(value = "updatestory", method = RequestMethod.PUT, consumes = "multipart/form-data")
    @ResponseBody
    public MountainDto updateStory(@RequestPart("files") MultipartFile[] files,
                              @RequestPart("story")  StoryDto storyDto) {
        List<byte[]> content = new ArrayList<byte[]>();
        if (files.length != 0) {
            try {
                for (MultipartFile uploadedFile : files) {
                    content.add(uploadedFile.getBytes());
                }
            } catch (Exception e) {
                return null;
            }
        }

        StoryDto updatedStory = new StoryDto(storyDto.getUserId(),
                storyDto.getTitle(),
                storyDto.getText(),
                storyDto.getColor(),
                storyDto.getId(),
                content,
                storyDto.getStoryLikes(),
                storyDto.getStoryComments());

        return mountainService.updateStory(updatedStory);
    }

    @RequestMapping(value = "updatestorynoimage", method = RequestMethod.PUT, consumes = "multipart/form-data")
    @ResponseBody
    public MountainDto updateStoryNoImage(@RequestPart("story")  StoryDto storyDto) {


        StoryDto updatedStory = new StoryDto(storyDto.getUserId(),
                storyDto.getTitle(),
                storyDto.getText(),
                storyDto.getColor(),
                storyDto.getId(),
                null,
                storyDto.getStoryLikes(),
                storyDto.getStoryComments());

        return mountainService.updateStory(updatedStory);
    }

    @RequestMapping (value = "getstorybyid/{storyId}", method = RequestMethod.GET)
    public StoryDto getStoryById(@PathVariable String storyId) {
        return mountainService.getStoryById(storyId);

    }

    @RequestMapping (value = "getmountainbystoryid/{storyId}", method = RequestMethod.GET)
    public MountainDto getMountainByStoryId(@PathVariable String storyId) {
        return mountainService.getMountainByStoryId(storyId);
    }

    @RequestMapping (value = "getallstories/page/{currentPage}", method = RequestMethod.GET)
    public StoryDtoList getPageStories(@PathVariable int currentPage) {
        StoryDtoList storyDtoList = new StoryDtoList( mountainService.getPagerAllMountains(currentPage, 12));
        return storyDtoList;
    }

    @RequestMapping (value = "getallstoriesmountain/{mountainId}/page/{currentPage}", method = RequestMethod.GET)
    public StoryDtoList getPageMountainStories(@PathVariable String mountainId, @PathVariable int currentPage) {
        StoryDtoList storyDtoList = new StoryDtoList( mountainService.getPagerStoriesMountains(mountainId, currentPage, 12));
        return storyDtoList;
    }




}
