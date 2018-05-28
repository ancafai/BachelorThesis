package com.bachelorthesis.mountains.repository;

import com.bachelorthesis.mountains.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);
    User findByMail(String mail);

}