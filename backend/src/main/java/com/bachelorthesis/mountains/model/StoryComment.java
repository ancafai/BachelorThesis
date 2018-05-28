package com.bachelorthesis.mountains.model;

import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class StoryComment implements Serializable {
    private User userComment;
    private Date timeOfComment;
    private String text;
    private List<LikeComment> likes;



}