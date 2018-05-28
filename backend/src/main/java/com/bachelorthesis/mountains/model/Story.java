package com.bachelorthesis.mountains.model;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Story {
    private User userStory;
    private String title;
    private String text;
    private String color;
    private List<Picture> pictures;
    private List<StoryLike> storyLikes;
    private List<StoryComment> storyComments;

}
