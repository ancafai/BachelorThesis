package com.bachelorthesis.mountains.dto;

import lombok.*;

import java.io.Serializable;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NewStoryDto implements Serializable {

    private String userId;
    private String title;
    private String text;
    private String color;

    @Override
    public String toString() {
        return "NewStoryDto{" +
                ", userId='" + userId + '\'' +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", color='" + color + '\'' +
                '}';
    }
}
