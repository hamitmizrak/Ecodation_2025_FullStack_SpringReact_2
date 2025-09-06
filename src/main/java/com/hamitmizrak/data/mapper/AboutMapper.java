package com.hamitmizrak.data.mapper;


import com.hamitmizrak.business.dto.AboutDto;
import com.hamitmizrak.data.entity.AboutEntity;

// About(1)  - Admin(1)**FK

public class AboutMapper {

    // 1- AboutEntity'i AboutDto'a çevir
    public static AboutDto AboutEntityToAboutDto(AboutEntity aboutEntity) {
        // Instance(BlogDto)
        AboutDto aboutDto = new AboutDto();

        // Field
        aboutDto.setAboutId(aboutDto.getAboutId());
        aboutDto.setAboutName(aboutDto.getAboutName());
        aboutDto.setVision(aboutDto.getVision());
        aboutDto.setMission(aboutDto.getMission());
        aboutDto.setImage(aboutDto.getImage());

        // DİKKAT: Composition (Blog(N)- BlogCategory(1))
        /*if (aboutEntity.getBlogCategoryBlogEntity() != null) {
            aboutDto.setBlogCategoryDto(BlogCategoryMapper.BlogCategoryEntityToBlogCategoryDto(blogEntity.getBlogCategoryBlogEntity()));
        }*/
        return aboutDto;
    }

    // 2- AboutEntityDto'u AboutEntity'e  çevir
    public static AboutEntity AboutDtoToAboutEntity(AboutDto aboutDto) {
        // Instance(BlogEntity)
        AboutEntity blogEntity = new AboutEntity();

        // Field
        blogEntity.setAboutId(aboutDto.getAboutId());
        blogEntity.setAboutName(aboutDto.getAboutName());
        blogEntity.setMission(aboutDto.getMission());
        blogEntity.setVision(aboutDto.getVision());
        blogEntity.setImage(aboutDto.getImage());

        // DİKKAT: Composition (Order(N)- Customer(1))
        /*if (aboutDto.getBlogCategoryDto() != null) {
            blogEntity.setBlogCategoryBlogEntity(BlogCategoryMapper.BlogCategoryDtoToBlogCategoryEntity(aboutDto.getBlogCategoryDto()));
        }*/
        return blogEntity;
    }
}
