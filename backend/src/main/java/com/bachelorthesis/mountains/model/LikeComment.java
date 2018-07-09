package com.bachelorthesis.mountains.model;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class LikeComment implements Serializable {

    private String userId;
    private String commentId;
}