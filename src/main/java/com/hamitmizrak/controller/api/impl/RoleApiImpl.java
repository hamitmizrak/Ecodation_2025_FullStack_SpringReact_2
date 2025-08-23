package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.RoleDto;
import com.hamitmizrak.business.services.interfaces.IRoleServices;
import com.hamitmizrak.controller.api.interfaces.IRoleApi;
import com.hamitmizrak.error.ApiResult;
import com.hamitmizrak.error.ApiResultFactory;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

// LOMBOK
@RequiredArgsConstructor
@Log4j2

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
        RoleDto roleDtoCreate= (RoleDto) iRoleServices.objectServiceCreate(roleDto);

        // eğer kaydetmezse null değer verirse
        // CREATE
        if (roleDtoCreate == null) {
            return ResponseEntity.status(404).body(
                    ApiResultFactory.notFound("Role eklenmedi", "http://localhost:4444/role/api/v1.0.0/create")
            );
        } else if (roleDtoCreate.getRoleId() == 0) {
            return ResponseEntity.status(400).body(
                    ApiResultFactory.badRequest("Role Dto Kötü istek", "http://localhost:4444/role/api/v1.0.0/create")
            );
        } else  {
            // Log
            log.info("Role Dto Eklendi",roleDtoCreate);
            return ResponseEntity.ok(
                    ApiResultFactory.success(roleDtoCreate, "http://localhost:4444/role/api/v1.0.0/create")
            );
        }
    }


    // LIST (RoleDto)
    // http://localhost:4444/role/api/v1.0.0/list
    @Override
    @GetMapping("/list")
    public ResponseEntity<List<RoleDto>> objectApiList() {
        log.info("Role Dto Listelendi");
        return ResponseEntity.ok(iRoleServices.objectServiceList());
    }

    // FIND BY ID (RoleDto)
    // http://localhost:4444/role/api/v1.0.0/find
    // http://localhost:4444/role/api/v1.0.0/find/0
    // http://localhost:4444/role/api/v1.0.0/find/1
    @Override
    @GetMapping({"/find", "/find/id"})
    public ResponseEntity<?> objectApiFindById(@PathVariable(name = "id", required = false) Long id) {
        RoleDto roleDtoFind= (RoleDto) iRoleServices.objectServiceFindById(id);

        // eğer kaydetmezse null değer verirse
        if (roleDtoFind == null) {
            return ResponseEntity.status(404).body(
                    ApiResultFactory.notFound("Role bulunamadı", "http://localhost:4444/role/api/v1.0.0/find")
            );
        } else {
            // Log
            log.info("Role Dto Bulundu",roleDtoFind);
            return ResponseEntity.ok(
                    ApiResultFactory.success(roleDtoFind, "http://localhost:4444/role/api/v1.0.0/find")
            );
        }
    }

    // UPDATE (RoleDto)
    // http://localhost:4444/role/api/v1.0.0/update
    @Override
    @PutMapping({"/update", "/update/id"})
    public ResponseEntity<?> objectApiUpdate(@PathVariable(name = "id", required = false) Long id, @Valid @RequestBody RoleDto roleDto) {
        RoleDto roleDtoUpdate= (RoleDto) iRoleServices.objectServiceUpdate(id,roleDto);

        // eğer kaydetmezse null değer verirse
        if(roleDtoUpdate==null){
            ApiResult apiResultUpdateViaNull= ApiResult
                    .builder()
                    .status(404)
                    .error("Role Dto Güncellenmedi")
                    .path("http://localhost:4444/role/api/v1.0.0/update")
                    .createdDate(new Date(System.currentTimeMillis()))
                    .build();
            return ResponseEntity.status(404).body(apiResultUpdateViaNull);
        }
        // Log
        log.info("Role Dto Güncellendi",roleDtoUpdate);
        return ResponseEntity.status(400).body(roleDtoUpdate);
    }

    // DELETE
    // http://localhost:4444/role/api/v1.0.0/delete
    @Override
    @DeleteMapping({"/delete", "/delete/id"})
    public ResponseEntity<?> objectApiDelete(@PathVariable(name = "id", required = false) Long id) {
        RoleDto roleDtoDelete= (RoleDto) iRoleServices.objectServiceDelete(id);

        // eğer kaydetmezse null değer verirse
        if(roleDtoDelete==null){
            ApiResult apiResultUpdateViaNull= ApiResult
                    .builder()
                    .status(404)
                    .error("Role Dto Silinmedi")
                    .path("http://localhost:4444/role/api/v1.0.0/delete")
                    .createdDate(new Date(System.currentTimeMillis()))
                    .build();
            return ResponseEntity.status(404).body(apiResultUpdateViaNull);
        }
        // Log
        log.info("Role Dto Silindi",roleDtoDelete);
        return ResponseEntity.status(400).body(roleDtoDelete);
    }
} // end RoleApiImpl

