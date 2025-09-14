package com.hamitmizrak.business.services.impl;

import com.hamitmizrak.bean.ModelMapperBean;
import com.hamitmizrak.business.dto.BlogDto;
import com.hamitmizrak.business.services.interfaces.IBlogServices;
import com.hamitmizrak.data.entity.BlogCategoryEntity;
import com.hamitmizrak.data.entity.BlogEntity;
import com.hamitmizrak.data.mapper.BlogMapper;
import com.hamitmizrak.data.repository.IBlogCategoryRepository;
import com.hamitmizrak.data.repository.IBlogRepository;
import com.hamitmizrak.exception.HamitMizrakException;
import com.hamitmizrak.exception._404_NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

// LOMBOK
@RequiredArgsConstructor
@Log4j2

// SERVICES
@Service
public class BlogServicesImpl implements IBlogServices<BlogDto, BlogEntity> {

    // INJECTION (Lombok Constructor Field) => 3.YOL
    private final IBlogRepository iBlogRepository;
    private final IBlogCategoryRepository iBlogCategoryRepository;
    private final ModelMapperBean modelMapperBeanClass;

    //////////////////////////////////////////////////////////////////////////////
    // SPEED DATA
    @Override
    public String blogSpeedData(Long data) {
        return null;
    }

    // DELETE ALL
    @Override
    public String blogAllDelete() {
        iBlogRepository.deleteAll();
        return null;
    }

    //////////////////////////////////////////////////////////////////////////////
    // MODEL MAPPER
    @Override
    public BlogDto entityToDto(BlogEntity blogEntity) {
        // 1.YOL
        //return modelMapperBeanClass.modelMapperMethod().map(blogEntity,BlogDto.class);

        // 2.YOL
        return BlogMapper.BlogEntityToBlogDto(blogEntity);
    }

    @Override
    public BlogEntity dtoToEntity(BlogDto blogDto) {
        // 1.YOL
        //return  modelMapperBeanClass.modelMapperMethod().map(blogDto,BlogEntity.class);

        // 2.YOL
        return BlogMapper.BlogDtoToBlogEntity(blogDto);
    }


    //////////////////////////////////////////////////////////////////////////////
    // CREATE  (Blog)
    @Override
    public BlogDto  objectServiceCreate(BlogDto blogDto) {
     /*   if(blogDto!=null){
            // dto <=> Entity
            BlogEntity blogEntity=dtoToEntity(blogDto);

            // Entity'i database ekle
            iBlogRepository.save(blogEntity);

            // database eklenen verinin ID ve DATE almak
            blogDto.setBlogId(blogEntity.getBlogId());
            blogDto.setSystemCreatedDate(blogEntity.getSystemCreatedDate());
        }else{
            throw  new NullPointerException("blogdto null veri");
        }*/
        return blogDto;
    }

    // CREATE  (Blog+BlogCategory)
    @Override
    @Transactional // create, delete, update
    public BlogDto create(Long categoryId, BlogDto dto) {
        // 1- Öncelikle BlogCategory bul
        BlogCategoryEntity categoryEntity =iBlogCategoryRepository.findById(categoryId)
                .orElseThrow(()-> new _404_NotFoundException(categoryId + "- id'li kategori bulunamadi")
        );

        // 2- BlogEntity
        // 1.YOL ==> BlogEntity blogEntity = BlogMapper.BlogDtoToBlogEntity(dto);
        // 2.YOL
        BlogEntity blogEntity =  dtoToEntity(dto);
        blogEntity.setBlogCategoryBlogEntity(categoryEntity);
        return entityToDto(iBlogRepository.save(blogEntity));
    }

    // LIST
    @Override
    public List<BlogDto> objectServiceList() {
        // 1.YOL
        /*
        // Database verileri al
        Iterable<BlogEntity> entityIterable=  iBlogRepository.findAll();
        // Dto To entity List
        List<BlogDto> categoryDtoList=new ArrayList<>();
        for (BlogEntity entity:  entityIterable) {
            BlogDto blogDto=entityToDto(entity);
            categoryDtoList.add(blogDto);
        }
        log.info("Liste Sayısı: "+categoryDtoList.size());
          return categoryDtoList;
        */

        // 2.YOL
        //return iBlogRepository.findAll().stream().map(BlogMapper::BlogEntityToBlogDto).collect(Collectors.toList());

        // 3.YOL
        return iBlogRepository.findAll().stream().map(BlogMapper::BlogEntityToBlogDto).toList();
    }

    // FIND
    @Override
    public BlogDto objectServiceFindById(Long id) {
        // 1.YOL (FIND)
        /*
        Optional<BlogEntity> findOptionalBlogEntity=  iCategoryRepository.findById(id);
        CategoryDto categoryDto=entityToDto(findOptionalBlogEntity.get());
        if(findOptionalBlogEntity.isPresent()){
            return categoryDto;
        }
        */

        // 2.YOL (FIND)
       /* BlogEntity findBlogEntity=  null;
        if(id!=null){
            findBlogEntity=  iBlogRepository.findById(id)
                    .orElseThrow(()->new _404_NotFoundException((id+" nolu id yoktur")));
        }else if(id==null) {
            throw new HamitMizrakException("İd null olarak geldi");
        }
         return entityToDto(findBlogEntity);
        */

        // 3.YOL
       /* BlogEntity blogEntity = iBlogRepository.findById(id)
                .orElseThrow(()-> new _404_NotFoundException(id + "- id'li kategori"));
        return BlogMapper.BlogEntityToBlogDto(blogEntity);*/

        // 4.YOL
        /*
        BlogEntity blogEntity = iBlogRepository.findById(id)
                .orElseThrow(()-> new _404_NotFoundException(id + "- id'li kategori"));
        return entityToDto(blogEntity);
        */

        // 5.YOL
        return entityToDto(iBlogRepository.findById(id)
                .orElseThrow(()-> new _404_NotFoundException(id + "- id'li kategori")));
    }

    // UPDATE
    @Override
    public BlogDto objectServiceUpdate(Long id, BlogDto blogDto) {

        return blogDto;
    }

    @Override
    @Transactional // create, delete, update
    public BlogDto update(Long id, Long categoryId, BlogDto dto) {
        // 1- BlogEntity bul
        BlogEntity blogEntity = iBlogRepository.findById(id)
                .orElseThrow(() -> new _404_NotFoundException(id + "- id'li kategori"));

        // 2- Set
        if(dto.getHeader()!=null && !dto.getHeader().isBlank()) blogEntity.setHeader(dto.getHeader());
        if(dto.getTitle()!=null && !dto.getTitle().isBlank()) blogEntity.setTitle(dto.getTitle());
        if(dto.getContent()!=null && !dto.getContent().isBlank()) blogEntity.setContent(dto.getContent());
        if(dto.getImage()!=null && !dto.getImage().isBlank()) blogEntity.setImage(dto.getImage());

        // 3-
        if (categoryId !=null){
            BlogCategoryEntity blogCategoryEntity =iBlogCategoryRepository.findById(categoryId)
                    .orElseThrow(()-> new _404_NotFoundException(categoryId + "- id'li kategori"));
            // BlogEntity içine şimdi bulduğumuz BlogCategoryEntity yazdım
            blogEntity.setBlogCategoryBlogEntity(blogCategoryEntity);
        }
        // 1.YOL
        //return BlogMapper.BlogEntityToBlogDto(iBlogRepository.save(blogEntity));
        return entityToDto (iBlogRepository.save(blogEntity));
    }

    // DELETE
    @Override
    @Transactional // create, delete, update
    public BlogDto objectServiceDelete(Long id) {
        // Önce Bul
        // 1.YOL
       /* BlogDto categoryFindDto= objectServiceFindById(id);
        if(categoryFindDto!=null){
            iBlogRepository.deleteById(id);
            // Dönüştede ID ve Date Set et
        }
        return categoryFindDto;*/

        //2.YOL
        if(!iBlogRepository.existsById(id)) {
            throw new _404_NotFoundException(id + "- id'li kategori");
        }
        iBlogRepository.deleteById(id);
        return objectServiceFindById(id);
    }

} //end class
