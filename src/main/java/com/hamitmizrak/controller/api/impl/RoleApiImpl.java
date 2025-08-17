package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.RoleDto;
import com.hamitmizrak.controller.api.interfaces.IRoleApi;
import org.springframework.http.ResponseEntity;

import java.util.List;

// Api
public class RoleApiImpl implements IRoleApi<RoleDto> {

    // CREATE (RoleDto)
    @Override
    public ResponseEntity<?> objectApiCreate(RoleDto roleDto) {
        return null;
    }


    // LIST (RoleDto)
    @Override
    public ResponseEntity<List<RoleDto>> objectApiList() {
        return null;
    }


    // FIND BY ID (RoleDto)
    @Override
    public ResponseEntity<?> objectApiFindById(Long id) {
        return null;
    }


    // UPDATE (RoleDto)
    @Override
    public ResponseEntity<?> objectApiUpdate(Long id, RoleDto roleDto) {
        return null;
    }


    // DELETE
    @Override
    public ResponseEntity<?> objectApiDelete(Long id) {
        return null;
    }


} // end RoleApiImpl
