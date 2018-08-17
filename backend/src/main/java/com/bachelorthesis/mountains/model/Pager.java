package com.bachelorthesis.mountains.model;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Pager {
    private int totalItems;
    private int currentPage;
    private int pageSize;
    private int totalPages;
    private int startPage;
    private int endPage;
    private int startIndex;
    private int endIndex;
}
