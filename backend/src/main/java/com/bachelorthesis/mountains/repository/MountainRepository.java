package com.bachelorthesis.mountains.repository;

import com.bachelorthesis.mountains.model.Mountain;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MountainRepository extends MongoRepository<Mountain, String> {

    Mountain findByName(String name);

}