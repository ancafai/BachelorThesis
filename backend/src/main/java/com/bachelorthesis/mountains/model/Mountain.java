package com.bachelorthesis.mountains.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Document(collection="mountains")
public class Mountain implements Serializable {
    @Id
    private String id;

    @Size(max=100)
    private String name;

    private List<Story> stories;

    private List<ArrayList<Double>> coordinates;


    public Mountain(String name, List<ArrayList<Double>> coordinates, List<Story> stories) {

        this.name = name;
        this.coordinates = coordinates;
        this.stories = stories;
    }


    public void addStory(Story st) {
        Story story = new Story();
        story.setUserId(st.getUserId());
        story.setTitle(st.getTitle());
        story.setText(st.getText());
        story.setColor(st.getColor());
        stories.add(story);
    }

    public void deleteStory(String storyId) {
        for (Story story : stories) {
            if (Objects.equals(story.getId(), storyId)) {
                stories.remove(story);
                break;
            }
        }
    }

    public void updateStory(Story st) {
        Story story = new Story();
        story.setUserId(st.getUserId());
        story.setTitle(st.getTitle());
        story.setText(st.getText());
        story.setColor(st.getColor());
        story.setPictures(st.getPictures());
        story.setStoryComments(st.getStoryComments());
        story.setStoryLikes(st.getStoryLikes());

        deleteStory(st.getId());
        stories.add(story);


    }




}
