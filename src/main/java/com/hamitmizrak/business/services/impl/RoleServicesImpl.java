package com.hamitmizrak.business.services.impl;

import com.hamitmizrak.bean.ModelMapperBean;
import com.hamitmizrak.business.dto.RoleDto;
import com.hamitmizrak.business.services.interfaces.IRoleServices;
import com.hamitmizrak.data.entity.RoleEntity;
import com.hamitmizrak.data.repository.IRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


// LOMBOK
@RequiredArgsConstructor // Lombok: Dependency Injection
@Log4j2

// Service: Asıl İş yükünü yapandır
@Service
@Component("roleServicesImpl") // @Component ==> Spring'in bir parçasısın(IOC)
public class RoleServicesImpl implements IRoleServices<RoleDto, RoleEntity> {

    // Field (Injection)
    // 1.YOL (FIELD INJECTION)
    /*
    @Autowired
    private IRoleRepository iRoleRepository;
     */

    // 2.YOL (CONSTRUCTOR INJECTION)
    /*
    private IRoleRepository iRoleRepository;
    @Autowired
    public RoleServicesImpl(IRoleRepository iRoleRepository) {
        this.iRoleRepository = iRoleRepository;
    }
     */

    // 3.YOL (LOMBOK CONSTRUCTOR INJECTION)
    private final IRoleRepository iRoleRepository;
    private final ModelMapperBean modelMapperBean;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Model Mapper
    @Override
    public RoleDto entityToDto(RoleEntity roleEntity) {
        return modelMapperBean.modelMapperMethod().map(roleEntity, RoleDto.class);
    }

    @Override
    public RoleEntity dtoToEntity(RoleDto roleDto) {
        return modelMapperBean.modelMapperMethod().map(roleDto, RoleEntity.class);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CRUD
    // CREATE (RoleDto)
    @Transactional // Create, Update, Delete
    @Override
    public RoleDto objectServiceCreate(RoleDto roleDto) {
        // Mapper
        RoleEntity roleEntity = dtoToEntity(roleDto);
        roleEntity.setRoleName(roleEntity.getRoleName().toUpperCase()); // RoleName bütün karakter büyük olsun
        // Database Kaydetmek
        RoleEntity roleEntityAfterSave = iRoleRepository.save(roleEntity);
        // Kayıt sonrası Dto verilerini değiştirmek
        roleDto.setRoleId(roleEntityAfterSave.getRoleId());
        roleDto.setSystemCreatedDate(roleEntityAfterSave.getSystemCreatedDate());
        return roleDto;
    }

    // LIST (RoleDto)
    @Override
    public List<RoleDto> objectServiceList() {
        // Entity List
        List<RoleEntity> roleEntityList = iRoleRepository.findAll();

        // Mapper
        List<RoleDto> roleDtoList = new ArrayList<>();

        // Entity To Dto
        for (RoleEntity entityTemp : roleEntityList) {
            RoleDto roleDto = entityToDto(entityTemp);
            roleDtoList.add(roleDto);
        }
        return roleDtoList;
    }

    // FIND BY ID (RoleDto)
    @Override
    public RoleDto objectServiceFindById(Long id) {
        return null;
    }

    // UPDATE (RoleDto)
    @Transactional  //Create, Update, Delete
    @Override
    public RoleDto objectServiceUpdate(Long id, RoleDto roleDto) {
        return null;
    }

    // DELETE (RoleDto)
    @Transactional  // Create, Update, Delete
    @Override
    public RoleDto objectServiceDelete(Long id) {
        return null;
    }

} // end RoleServicesImpl
