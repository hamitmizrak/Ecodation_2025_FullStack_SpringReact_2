package com.hamitmizrak.business.services.impl;


import com.hamitmizrak.bean.ModelMapperBean;
import com.hamitmizrak.business.dto.AboutDto;
import com.hamitmizrak.business.services.interfaces.IAboutServices;
import com.hamitmizrak.data.entity.AboutEntity;
import com.hamitmizrak.data.mapper.AboutMapper;
import com.hamitmizrak.data.repository.IAboutRepository;
import com.hamitmizrak.exception.HamitMizrakException;
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
public abstract class AboutServicesImpl implements IAboutServices<AboutDto, AboutEntity> {

    // INJECTION (Lombok Constructor Field) => 3.YOL
    private final IAboutRepository iAboutRepository;
    private final ModelMapperBean modelMapperBeanClass;


    //////////////////////////////////////////////////////////////////////////////
    // MODEL MAPPER
    @Override
    public AboutDto entityToDto(AboutEntity aboutEntity) {
        // 1.YOL
        // return modelMapperBeanClass.modelMapperMethod().map(aboutEntity, AboutDto.class);

        // 2.YOL
        return AboutMapper.AboutEntityToAboutDto(aboutEntity);
    }

    @Override
    public AboutEntity dtoToEntity(AboutDto aboutDto) {
        // 1.YOL
        // return modelMapperBeanClass.modelMapperMethod().map(aboutDto, AboutEntity.class);

        // 2.YOL
        return AboutMapper.AboutDtoToAboutEntity(aboutDto);
    }

    //////////////////////////////////////////////////////////////////////////////
    // CREATE
    @Override
    @Transactional // create, delete, update
    public AboutDto  objectServiceCreate(AboutDto aboutDto) {
        if(aboutDto!=null){
            AboutEntity aboutEntity=dtoToEntity(aboutDto);
            iAboutRepository.save(aboutEntity);
            aboutDto.setAboutId(aboutEntity.getAboutId());
            aboutDto.setSystemCreatedDate(aboutEntity.getSystemCreatedDate());
        }else{
            throw  new NullPointerException("About Dto boş veri");
        }
        return aboutDto;
    }

    // LIST
    @Override
    public List<AboutDto> objectServiceList() {
        Iterable<AboutEntity> entityIterable=  iAboutRepository.findAll();
        // Dto To entityb List
        List<AboutDto> aboutDtoList=new ArrayList<>();
        for (AboutEntity entity:  entityIterable) {
            AboutDto aboutDto=entityToDto(entity);
            aboutDtoList.add(aboutDto);
        }
        log.info("Liste Sayısı: "+aboutDtoList.size());
        return aboutDtoList;
    }

    // FIND
    @Override
    public AboutDto objectServiceFindById(Long id) {
        // 1.YOL (FIND)
        /*
        Optional<AboutDto> findOptionalAboutDto=  iaboutRepository.findById(id);
        aboutDto aboutDto=entityToDto(findOptionalAboutDto.get());
        if(findOptionalAboutDto.isPresent()){
            return aboutDto;
        }
        */

        // 2.YOL (FIND)
        AboutEntity findAboutEntity=  null;
        if(id!=null){
            findAboutEntity=  iAboutRepository.findById(id)
                    .orElseThrow();
        }else if(id==null) {
            throw new HamitMizrakException("İd null olarak geldi");
        }
        return entityToDto(findAboutEntity);
    }

    // UPDATE
    @Override
    @Transactional // create, delete, update
    public AboutDto objectServiceUpdate(Long id, AboutDto aboutDto) {
        // Önce Bul
        AboutDto aboutFindDto= objectServiceFindById(id);
       if(aboutFindDto!=null){
           AboutEntity aboutEntity=dtoToEntity(aboutFindDto);
           aboutEntity.setAboutName(aboutDto.getAboutName());
           aboutEntity.setMission(aboutDto.getMission());
           aboutEntity.setVision(aboutDto.getVision());
           aboutEntity.setImage(aboutDto.getImage());
           iAboutRepository.save(aboutEntity);
           // Dönüştede ID ve Date Set et
       }
        return aboutDto;
    }

    // DELETE
    @Override
    @Transactional // create, delete, update
    public AboutDto objectServiceDelete(Long id) {
        // Önce Bul
        AboutDto aboutFindDto= objectServiceFindById(id);
        if(aboutFindDto!=null){
            iAboutRepository.deleteById(id);
            // Dönüştede ID ve Date Set et
        }
        return aboutFindDto;
    }

} //end class
