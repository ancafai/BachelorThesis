package com.bachelorthesis.mountains.controller;


import com.bachelorthesis.mountains.dto.MountainDto;
import com.bachelorthesis.mountains.dto.MountainDtoList;
import com.bachelorthesis.mountains.dto.NewMountainDto;
import com.bachelorthesis.mountains.service.MountainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/mountain")
@RestController
public class MountainController {

    @Autowired
    private MountainService mountainService;

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


}
