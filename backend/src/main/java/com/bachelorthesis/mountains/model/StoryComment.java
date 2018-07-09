package com.bachelorthesis.mountains.model;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class StoryComment implements Serializable {
    private String userId;
  //  private Date timeOfComment;
    private String text;
    private List<LikeComment> likes;



}