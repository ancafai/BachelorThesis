package com.bachelorthesis.mountains.model;

import lombok.*;
import org.bson.types.ObjectId;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Story {

    private String id = new ObjectId().toString();
    private String userId;
    private String title;
    private String text;
    private String color;
  //  private Date timeOfStory;

    private List<Picture> pictures;
    private List<StoryLike> storyLikes;
    private List<StoryComment> storyComments;



}
