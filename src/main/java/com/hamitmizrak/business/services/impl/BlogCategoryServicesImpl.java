package com.hamitmizrak.business.services.impl;


import com.hamitmizrak.bean.ModelMapperBean;
import com.hamitmizrak.business.dto.BlogCategoryDto;
import com.hamitmizrak.business.services.interfaces.IBlogCategoryServices;
import com.hamitmizrak.data.entity.BlogCategoryEntity;
import com.hamitmizrak.data.mapper.BlogCategoryMapper;
import com.hamitmizrak.data.repository.IBlogCategoryRepository;
import com.hamitmizrak.exception.HamitMizrakException;
import com.hamitmizrak.exception._404_NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

// LOMBOK
@RequiredArgsConstructor
@Log4j2

// SERVICES
@Service
public class BlogCategoryServicesImpl implements IBlogCategoryServices<BlogCategoryDto, BlogCategoryEntity> {

    // Injection (Field) => 1.YOL
    /*
    @Autowired
    private ICategoryRepository iCategoryRepository;
    */

    // Injection (Constructor Field) => 2.YOL
    /*
    private final ICategoryRepository iCategoryRepository;
    @Autowired
    public CategoryServicesImpl(ICategoryRepository iCategoryRepository) {
        this.iCategoryRepository = iCategoryRepository;
    }
    */

    // Injection (Lombok Constructor Field) => 3.YOL
    private final IBlogCategoryRepository iCategoryRepository;
    private final ModelMapperBean modelMapperBeanClass;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SPEED DATA
    @Override
    @Transactional
    public String categorySpeedData(Integer data) {
        if (data != null) {
            for (int i = 1; i <= data; i++) {
                BlogCategoryEntity categoryEntity = new BlogCategoryEntity();
                categoryEntity.setCategoryName("category" + i);
                iCategoryRepository.save(categoryEntity);
            }//end for
        } else {
            throw new NullPointerException("Integer have not be null");
        }
        return data + " tane veri yüklendi";
    }

    // DELETE ALL
    @Override
    @Transactional
    public String categoryDeleteAll() {
        iCategoryRepository.deleteAll();
        return "Silindi.";
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MODEL MAPPER
    @Override
    public BlogCategoryDto entityToDto(BlogCategoryEntity blogCategoryEntity) {
        // 1.YOL
        // return modelMapperBeanClass.modelMapperMethod().map(blogCategoryEntity, BlogCategoryDto.class);

        // 2.YOL
        return BlogCategoryMapper.BlogCategoryEntityToBlogCategoryDto(blogCategoryEntity);
    }

    @Override
    public BlogCategoryEntity dtoToEntity(BlogCategoryDto categoryDto) {
        // 1.YOL
        //return modelMapperBeanClass.modelMapperMethod().map(categoryDto, BlogCategoryEntity.class);

        // 2.YOL
        return BlogCategoryMapper.BlogCategoryDtoToBlogCategoryEntity(categoryDto);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CREATE
    @Override
    @Transactional // create, delete, update
    public BlogCategoryDto objectServiceCreate(BlogCategoryDto blogCategoryDto) {
        if (iCategoryRepository.existsByCategoryNameIgnoreCase(blogCategoryDto.getCategoryName())) {
            throw new HamitMizrakException("Bu kategori zaten kayıtlı: " + blogCategoryDto.getCategoryName());
        }
        BlogCategoryEntity saved = iCategoryRepository.save(BlogCategoryMapper.BlogCategoryDtoToBlogCategoryEntity(blogCategoryDto));
        return BlogCategoryMapper.BlogCategoryEntityToBlogCategoryDto(saved);
    }

    // LIST
    @Override
    public List<BlogCategoryDto> objectServiceList() {
        return iCategoryRepository.findAll().stream().map(BlogCategoryMapper::BlogCategoryEntityToBlogCategoryDto  ).toList();
    }

    // FIND
    @Override
    public BlogCategoryDto objectServiceFindById(Long id) {
        // 1.YOL (FIND)
        /*
        Optional<CategoryEntity> findOptionalCategoryEntity=  iCategoryRepository.findById(id);
        CategoryDto categoryDto=entityToDto(findOptionalCategoryEntity.get());
        if(findOptionalCategoryEntity.isPresent()){
            return categoryDto;
        }
        */

        // 2.YOL (FIND)
        BlogCategoryEntity e = iCategoryRepository.findById(id)
                .orElseThrow(() -> new _404_NotFoundException(id + " id'li kategori bulunamadı"));
        return BlogCategoryMapper.BlogCategoryEntityToBlogCategoryDto(e);
    }

    // UPDATE
    @Override
    @Transactional // create, delete, update
    public BlogCategoryDto objectServiceUpdate(Long id, BlogCategoryDto categoryDto) {
        // Önce Database'den id ile ilgili nesneyi Bul
        BlogCategoryEntity e = iCategoryRepository.findById(id)
                .orElseThrow(() -> new _404_NotFoundException(id + " id'li kategori bulunamadı"));

        if (categoryDto.getCategoryName() != null && !categoryDto.getCategoryName().isBlank()) {
            e.setCategoryName(categoryDto.getCategoryName());
        }
        return BlogCategoryMapper.BlogCategoryEntityToBlogCategoryDto(iCategoryRepository.save(e));
    }

    // DELETE
    @Override
    @Transactional // create, delete, update
    public BlogCategoryDto objectServiceDelete(Long id) {
        // Önce Bul
        if (!iCategoryRepository.existsById(id)) {
            throw new _404_NotFoundException(id + " id'li kategori bulunamadı");
        }
        iCategoryRepository.deleteById(id);
        return null;
    }
} //end class
