package com.bachelorthesis.mountains.mapper;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

public abstract class AbstractMapper<Model, Dto> {

    public abstract Model toInternal(Dto dto);

    public abstract Dto toExternal(Model model);

    public Set<Model> toInternals(Set<Dto> dtos) {
        Set<Model> models = dtos.stream().map(dto -> toInternal(dto)).collect(Collectors.toSet());
        return models;
    }

    public Set<Dto> toExternals(Set<Model> models) {
        Set<Dto> dtos = new LinkedHashSet<>();
        for(Model model: models){
            dtos.add(toExternal(model));
        }
        return dtos;

    }
}