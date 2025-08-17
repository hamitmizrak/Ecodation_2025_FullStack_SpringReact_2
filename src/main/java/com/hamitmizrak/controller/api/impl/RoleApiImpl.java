package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.RoleDto;
import com.hamitmizrak.business.services.interfaces.IRoleServices;
import com.hamitmizrak.controller.api.interfaces.IRoleApi;
import com.hamitmizrak.error.ApiResult;
import com.hamitmizrak.utily.FrontEnd;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// LOMBOK
@RequiredArgsConstructor

// API (REST)
@RestController
@RequestMapping("/role/api/v1.0.0")
@CrossOrigin // CORS Hatası
//@CrossOrigin(origins = FrontEnd.REACT_URL) // CORS Hatası
//@CrossOrigin(origins = {FrontEnd.REACT_URL,FrontEnd.ANGULAR_URL}) // CORS Hatası
//@CrossOrigin(origins ="localhost:3000") // CORS Hatası

public class RoleApiImpl implements IRoleApi<RoleDto> {

    // Field (Injection)
    @Qualifier("roleServicesImpl")
    private final IRoleServices iRoleServices;

    // Error
    private ApiResult apiResult;

    ///////////////////////////////////////////////////////////////////
    // CREATE (RoleDto)
    // http://localhost:4444/role/api/v1.0.0/create
    @Override
    @PostMapping("/create")
    public ResponseEntity<?> objectApiCreate(@Valid @RequestBody RoleDto roleDto) {
        return null;
    }


    // LIST (RoleDto)
    // http://localhost:4444/role/api/v1.0.0/list
    @Override
    @GetMapping("/list")
    public ResponseEntity<List<RoleDto>> objectApiList() {
        return null;
    }

    // FIND BY ID (RoleDto)
    // http://localhost:4444/role/api/v1.0.0/find
    // http://localhost:4444/role/api/v1.0.0/find/0
    // http://localhost:4444/role/api/v1.0.0/find/1
    @Override
    @GetMapping({"/find", "/find/id"})
    public ResponseEntity<?> objectApiFindById(@PathVariable(name = "id", required = false) Long id) {
        return null;
    }

    // UPDATE (RoleDto)
    // http://localhost:4444/role/api/v1.0.0/update
    @Override
    @PutMapping({"/update", "/update/id"})
    public ResponseEntity<?> objectApiUpdate(@PathVariable(name = "id", required = false) Long id, @Valid @RequestBody RoleDto roleDto) {
        return null;
    }

    // DELETE
    // http://localhost:4444/role/api/v1.0.0/delete
    @Override
    @DeleteMapping({"/delete", "/delete/id"})
    public ResponseEntity<?> objectApiDelete(@PathVariable(name = "id", required = false) Long id) {
        return null;
    }

} // end RoleApiImpl

