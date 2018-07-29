package com.bachelorthesis.mountains.dto;

import com.bachelorthesis.mountains.model.StoryComment;
import com.bachelorthesis.mountains.model.StoryLike;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class StoryDto extends NewStoryDto {
    private String id;
    private List<byte[]> pictures;
    private List<StoryLike> storyLikes;
    private List<StoryComment> storyComments;

    public StoryDto(String userId,
                   String title,
                   String text,
                   String color,
                   String id,
                   List<byte[]> pictures,
                   List<StoryLike> storyLikes,
                   List<StoryComment> storyComments) {
        super(userId, title, text, color);
        this.id = id;
        this.pictures = pictures;
        this.storyLikes = storyLikes;
        this.storyComments = storyComments;
    }



    @Override
    public String toString() {
        return "StoryDto{" +
                "pictures='" + pictures + '\'' +
                ", storyLikes='" + storyLikes + '\'' +
                ", storyComments='" + storyComments + '\'' +
                '}';
    }
}
