package com.bachelorthesis.mountains.model;

import lombok.*;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class StoryLike implements Serializable {

    private User userLike;
    private Date timeOfLike;

}