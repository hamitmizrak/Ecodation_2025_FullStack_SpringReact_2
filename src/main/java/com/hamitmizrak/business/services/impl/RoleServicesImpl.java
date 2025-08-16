package com.hamitmizrak.business.services.impl;

import com.hamitmizrak.business.dto.RoleDto;
import com.hamitmizrak.business.services.interfaces.IRoleServices;
import com.hamitmizrak.data.entity.RoleEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;


// LOMBOK
@RequiredArgsConstructor // DI
@Log4j2

// Service: Asıl İş yükünü yapandır
@Service
@Component("roleServicesImpl") // @Component ==> Spring'in bir parçasısın(IOC)
public class RoleServicesImpl implements IRoleServices<RoleDto, RoleEntity> {

    // Field (Injection)

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Model Mapper
    @Override
    public RoleDto entityToDto(RoleEntity roleEntity) {
        return null;
    }

    @Override
    public RoleEntity dtoToEntity(RoleDto roleDto) {
        return null;
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CRUD
    @Override
    public RoleDto objectServiceCreate(RoleDto roleDto) {
        return null;
    }

    @Override
    public List<RoleDto> objectServiceList() {
        return List.of();
    }

    @Override
    public RoleDto objectServiceFindById(Long id) {
        return null;
    }

    @Override
    public RoleDto objectServiceUpdate(Long id, RoleDto roleDto) {
        return null;
    }

    @Override
    public RoleDto objectServiceDelete(Long id) {
        return null;
    }


}
