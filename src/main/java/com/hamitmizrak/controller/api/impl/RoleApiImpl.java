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

import java.util.List;

// Lombok
@RequiredArgsConstructor
@Log4j2

// API (REST)
@RestController
@RequestMapping("/role/api/v1.0.0")
@CrossOrigin //CORS: Hatası
public class RoleApiImpl implements IRoleApi<RoleDto> {

    private final IRoleService iRoleService;

    // CREATE Role(Api)
    @PostMapping("/create")
    @Override
    public ResponseEntity<ApiResult<?>> objectApiCreate(@Valid @RequestBody RoleDto roleDtoData) {
        try {
            RoleDto roleCreateApi = (RoleDto) iRoleService.objectServiceCreate(roleDtoData);

            if (roleCreateApi == null) {
                return ResponseEntity.status(404)
                        .body(ApiResult.nullPointer("Role Eklenmedi", "/role/api/v1.0.0/create"));
            } else if (roleCreateApi.getRoleId() == 0) {
                return ResponseEntity.status(400)
                        .body(ApiResult.notFound("Role Eklenmedi", "/role/api/v1.0.0/create"));
            }

            log.info("Role Api eklendi");
            return ResponseEntity.status(201).body(ApiResult.success(roleCreateApi));

        } catch (Exception ex) {
            return ResponseEntity.status(500)
                    .body(ApiResult.error("serverError", ex.getMessage(), "/role/api/v1.0.0/create"));
        }
    }

    // LIST Role(Api)
    @GetMapping("/list")
    @Override
    public ResponseEntity<ApiResult<List<RoleDto>>> objectApiList() {
        try {
            List<RoleDto> list = iRoleService.objectServiceList();
            log.info("Role Api Listelendi");
            return ResponseEntity.ok(ApiResult.success(list));
        } catch (Exception ex) {
            return ResponseEntity.status(500)
                    .body(ApiResult.error("serverError", ex.getMessage(), "/role/api/v1.0.0/list"));
        }
    }

    // FIND Role(Api)
    @GetMapping({"/find", "/find/{id}"})
    @Override
    public ResponseEntity<ApiResult<?>> objectApiFindById(@PathVariable(name="id", required = false) Long id) {
        try {
            RoleDto roleFindApi = (RoleDto) iRoleService.objectServiceFindById(id);
            if (roleFindApi == null) {
                return ResponseEntity.status(404)
                        .body(ApiResult.nullPointer("Role Dto bulunmadı", "/role/api/v1.0.0/find"));
            }
            log.info("Role Api bulundu");
            return ResponseEntity.ok(ApiResult.success(roleFindApi));
        } catch (Exception ex) {
            return ResponseEntity.status(500)
                    .body(ApiResult.error("serverError", ex.getMessage(), "/role/api/v1.0.0/find"));
        }
    }

    // UPDATE Role(Api)
    @PutMapping({"/update", "/update/{id}"})
    @Override
    public ResponseEntity<ApiResult<?>> objectApiUpdate(@PathVariable(name="id", required = false) Long id,
                                                        @Valid @RequestBody RoleDto roleDto) {
        try {
            RoleDto roleUpdateApi = (RoleDto) iRoleService.objectServiceUpdate(id, roleDto);
            if (roleUpdateApi == null) {
                return ResponseEntity.status(404)
                        .body(ApiResult.notFound("Role Dto bulunmadı", "/role/api/v1.0.0/update"));
            }
            log.info("Role Api Güncellendi");
            return ResponseEntity.ok(ApiResult.success(roleUpdateApi));
        } catch (Exception ex) {
            return ResponseEntity.status(500)
                    .body(ApiResult.error("serverError", ex.getMessage(), "/role/api/v1.0.0/update"));
        }
    }

    // DELETE Role(Api)
    @DeleteMapping({"/delete", "/delete/{id}"})
    @Override
    public ResponseEntity<ApiResult<?>> objectApiDelete(@PathVariable(name="id", required = false) Long id) {
        try {
            RoleDto roleDto = (RoleDto) iRoleService.objectServiceDelete(id);
            log.info("Role Api Silindi");
            return ResponseEntity.ok(ApiResult.success(roleDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500)
                    .body(ApiResult.error("serverError", ex.getMessage(), "/role/api/v1.0.0/delete"));
        }
    }

} // end RoleApiImpl
