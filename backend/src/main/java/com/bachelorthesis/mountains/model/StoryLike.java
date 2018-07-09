package com.bachelorthesis.mountains.model;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class StoryLike implements Serializable {

    private String userId;
 //   private Date timeOfLike;

}