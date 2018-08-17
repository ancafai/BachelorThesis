package com.bachelorthesis.mountains.mapper;


import com.bachelorthesis.mountains.dto.PagerDto;
import com.bachelorthesis.mountains.model.Pager;
import org.springframework.stereotype.Service;

@Service
public class PagerMapper extends AbstractMapper<Pager, PagerDto> {

    @Override
    public Pager toInternal(PagerDto dto) {
        Pager pager = Pager.builder()
                .totalItems(dto.getTotalItems())
                .currentPage(dto.getCurrentPage())
                .pageSize(dto.getPageSize())
                .totalPages(dto.getStartPage())
                .startPage(dto.getStartPage())
                .endPage(dto.getEndPage())
                .startIndex(dto.getStartIndex())
                .endIndex(dto.getEndIndex())
                .build();
        return pager;
    }

    @Override
    public PagerDto toExternal(Pager model) {

        PagerDto pagerDto = new PagerDto(
                model.getTotalItems(),
                model.getCurrentPage(),
                model.getPageSize(),
                model.getTotalPages(),
                model.getStartPage(),
                model.getEndPage(),
                model.getStartIndex(),
                model.getEndIndex()
        );
        return pagerDto;
    }
}