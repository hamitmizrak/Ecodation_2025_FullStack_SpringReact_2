package com.hamitmizrak.data.mapper;


import com.hamitmizrak.business.dto.BlogCategoryDto;
import com.hamitmizrak.business.dto.BlogDto;
import com.hamitmizrak.data.entity.BlogEntity;

// Blog(N)  - BlogCategory(N)**FK

public class BlogMapper {

    // 1- BlogEntity'i BlogDto'a çevir
    public static BlogDto BlogEntityToBlogDto(BlogEntity e) {
        // Eğer Entity içinde birşey yoksa null dönder
        if (e == null) return null;

        return BlogDto.builder()
                .blogId(e.getBlogId())
                .header(e.getHeader())
                .title(e.getTitle())
                .content(e.getContent())
                .image(e.getImage())
                .systemCreatedDate(e.getSystemCreatedDate())
                // DİKKAT: Composition (Blog(N)- BlogCategory(1))
                // Kategori yalnızca temel alanlar (id, name) doldurulur
                .blogCategoryDto(BlogCategoryMapper. BlogCategoryEntityToBlogCategoryDto(e.getBlogCategoryBlogEntity())).build();
    }

    // 2- BlogDto'u BlogEntity'e  çevir
    public static BlogEntity BlogDtoToBlogEntity(BlogDto d) {
        // Eğer Entity içinde birşey yoksa null dönder
        if (d == null) return null;

        BlogEntity e = BlogEntity.builder()
                .blogId(d.getBlogId())
                .header(d.getHeader())
                .title(d.getTitle())
                .content(d.getContent())
                .image(d.getImage())
                .build();

        if (d.getBlogCategoryDto() != null) {
            e.setBlogCategoryBlogEntity(BlogCategoryMapper.BlogCategoryDtoToBlogCategoryEntity(d.getBlogCategoryDto()));
        }
        return e;
    }
}
