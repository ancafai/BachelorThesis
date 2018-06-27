package com.bachelorthesis.mountains.service;


import com.bachelorthesis.mountains.dto.MountainDto;
import com.bachelorthesis.mountains.dto.NewMountainDto;
import com.bachelorthesis.mountains.mapper.MountainMapper;
import com.bachelorthesis.mountains.mapper.NewMountainMapper;
import com.bachelorthesis.mountains.model.Mountain;
import com.bachelorthesis.mountains.model.Story;
import com.bachelorthesis.mountains.repository.MountainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Set<MountainDto> mountains = mountainMapper.toExternals(new HashSet<>((List<Mountain>) mountainRepository.findAll()));
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
        if (name != EMPTY_STRING) {
            mountainToUpdate.setName(mountainDto.getName());
        }
        if (stories != null) {
            mountainToUpdate.setStories(mountainDto.getStories());
        }
        Mountain mountainUpdated = mountainRepository.save(mountainToUpdate);
        return mountainMapper.toExternal(mountainUpdated);
    }


}
