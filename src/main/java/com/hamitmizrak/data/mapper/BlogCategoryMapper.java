package com.hamitmizrak.data.mapper;


import com.hamitmizrak.business.dto.BlogCategoryDto;
import com.hamitmizrak.data.entity.BlogCategoryEntity;
import lombok.extern.log4j.Log4j2;

// LOMBOK
@Log4j2

public class BlogCategoryMapper {

    // 1- CustomerEntity'i CustomerDto'a çevir
    public static BlogCategoryDto BlogCategoryEntityToBlogCategoryDto(BlogCategoryEntity e){
        // Eğer Entity içinde birşey yoksa null dönder
        if (e == null) return null;

        // Instance (CustomerDto)
        // DİKKAT: Composition (Customer(1) -Order(N))
        return BlogCategoryDto.builder()
                .categoryId(e.getCategoryId())
                .categoryName(e.getCategoryName())
                .systemCreatedDate(e.getSystemCreatedDate())
                .build();
    }

    // 2- CustomerDto'u CustomerEntity'e  çevir
    public static BlogCategoryEntity BlogCategoryDtoToBlogCategoryEntity(BlogCategoryDto d){
        // Eğer Dto içinde birşey yoksa null dönder
        if (d == null) return null;

        // DİKKAT: Composition (Customer(1) -Order(N))
        return BlogCategoryEntity.builder()
                .categoryId(d.getCategoryId())
                .categoryName(d.getCategoryName())
                .build();
    } // end BlogCategoryDtoToBlogCategoryEntity
} // end BlogCategoryMapper
