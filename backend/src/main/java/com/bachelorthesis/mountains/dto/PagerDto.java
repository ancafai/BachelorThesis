package com.bachelorthesis.mountains.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PagerDto {
    private int totalItems;
    private int currentPage;
    private int pageSize;
    private int totalPages;
    private int startPage;
    private int endPage;
    private int startIndex;
    private int endIndex;

    @Override
    public String toString() {
        return "PagerDto{" +
                "totalItems='" + totalItems + '\'' +
                ", currentPage='" + currentPage + '\'' +
                ", totalPages='" + totalPages + '\'' +
                ", startPage='" + startPage + '\'' +
                ", endPage='" + endPage + '\'' +
                ", startIndex='" + startIndex + '\'' +
                ", endIndex='" + endIndex + '\'' +
                '}';
    }
}
