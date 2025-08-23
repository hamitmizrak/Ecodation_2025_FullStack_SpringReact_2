package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.RoleDto;
import com.hamitmizrak.business.services.interfaces.IRoleService;
import com.hamitmizrak.controller.api.interfaces.IRoleApi;
import com.hamitmizrak.error.ApiResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

// Lombok
@RequiredArgsConstructor
@Log4j2

// API (REST)
@RestController
@RequestMapping("/role/api/v1.0.0")
@CrossOrigin //CORS: Hatası
//@CrossOrigin(origins = ProjectUrl.REACT_FRONTEND_PORT_URL)
//@CrossOrigin(origins = "localhost:3000")
public class RoleApiImpl implements IRoleApi<RoleDto> {

    // Injection
    private final IRoleService iRoleService;

    // Error
    private ApiResult apiResult;


    // CREATE Role(Api)
    // http://localhost:4444/role/api/v1.0.0/create
    @PostMapping("/create")
    @Override
    public ResponseEntity<?> objectApiCreate(@Valid @RequestBody RoleDto roleDtoData) {
        RoleDto roleCreateApi=(RoleDto)iRoleService.objectServiceCreate(roleDtoData);

        // Eğer kaydederken null değer gelirse
        if(roleCreateApi==null){
            return ResponseEntity.status(404).body(ApiResult.nullPointer("Role Eklenmedi","localhost:4444/role/api/v1.0.0/create"));
        }
        else if(roleCreateApi.getRoleId()==0){

            return ResponseEntity.status(400).body(ApiResult.badReqquest("Role Eklenmedi","localhost:4444/role/api/v1.0.0/create"));
        }
        log.info("Role Api eklendi");
        return ResponseEntity.status(201).body(
                ApiResult.success(ApiResult.success(iRoleService.objectServiceCreate(roleDtoData))));
    }

    // LIST Role(Api)
    // http://localhost:4444/role/api/v1.0.0/list
    @GetMapping("/list")
    @Override
    public ResponseEntity<List<RoleDto>> objectApiList() {
        log.info("Role Api Listelendi");
        return ResponseEntity.ok(iRoleService.objectServiceList());
    }

    // FIND Role(Api)
    // http://localhost:4444/role/api/v1.0.0/find
    // http://localhost:4444/role/api/v1.0.0/find/0
    // http://localhost:4444/role/api/v1.0.0/find/1
    @Override
    @GetMapping({"/find","/find/{id}"})
    public ResponseEntity<?> objectApiFindById(@PathVariable(name="id",required = false)  Long id) {
       RoleDto roleFindApi=( RoleDto)iRoleService.objectServiceFindById(id);
       if(roleFindApi==null){
               return ResponseEntity.status(404).body(ApiResult.nullPointer("Role Dto bulunmadı","localhost:4444/role/api/v1.0.0/find") );
       }
        log.info("Role Api bulundu");
        return ResponseEntity.ok(ApiResult.success(iRoleService.objectServiceFindById(id)));
    }

    // UPDATE Role(Api)
    // http://localhost:4444/role/api/v1.0.0/update
    // http://localhost:4444/role/api/v1.0.0/update/0
    // http://localhost:4444/role/api/v1.0.0/update/1
    @Override
    @PutMapping({"/update","/update/{id}"})
    public ResponseEntity<?> objectApiUpdate(@PathVariable(name="id",required = false) Long id, @Valid @RequestBody RoleDto roleDto) {
        RoleDto roleUpdateApi=( RoleDto)iRoleService.objectServiceUpdate(id,roleDto);
        if(roleUpdateApi==null){
            // Eğer kaydederken null değer gelirse
            return ResponseEntity.status(404).body(ApiResult.notFound("Role Dto bulunmadı","localhost:4444/role/api/v1.0.0/update"));
        }
        log.info("Role Api Güncellendi");
        return ResponseEntity.ok(ApiResult.success(iRoleService.objectServiceUpdate(id,roleDto) ));
    }

    // DELETE Role(Api)
    // http://localhost:4444/role/api/v1.0.0/delete
    // http://localhost:4444/role/api/v1.0.0/delete/0
    // http://localhost:4444/role/api/v1.0.0/delete/1
    @Override
    @DeleteMapping({"/delete","/delete/{id}"})
    public ResponseEntity<?> objectApiDelete(@PathVariable(name="id",required = false) Long id) {
        RoleDto roleDto=(RoleDto)iRoleService.objectServiceDelete(id);
        log.info("Role Api Silindi");
        return ResponseEntity.ok(ApiResult.success(roleDto));
    }

}// end RoleApiImpl
