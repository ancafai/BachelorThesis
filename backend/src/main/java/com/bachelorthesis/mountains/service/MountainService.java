package com.bachelorthesis.mountains.service;


import com.bachelorthesis.mountains.dto.MountainDto;
import com.bachelorthesis.mountains.dto.NewMountainDto;

import java.util.Set;

public interface MountainService {

    NewMountainDto create(NewMountainDto newMountainDto);

    Set<MountainDto> findAll();

    MountainDto findByName(String name);

    MountainDto findById(String id);

    void delete(String id);

    MountainDto update(MountainDto mountainDto);


}
