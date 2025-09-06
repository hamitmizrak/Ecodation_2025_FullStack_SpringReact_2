package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.AboutDto;
import com.hamitmizrak.business.services.interfaces.IAboutServices;
import com.hamitmizrak.controller.api.interfaces.IAboutApi;
import com.hamitmizrak.error.ApiResult;
import com.hamitmizrak.utily.FrontEnd;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// LOMBOK
@RequiredArgsConstructor
@Log4j2

// API
@RestController
@CrossOrigin(origins = FrontEnd.REACT_URL) // http://localhost:3000
@RequestMapping("/about/api/v1.0.0")
public class AboutApiImpl implements IAboutApi<AboutDto> {

    // Injection

    private final IAboutServices iAboutServices;

    //////////////////////////////////////////////////////////////////////////////////////////
    // CREATE
    // http://localhost:4444/about/api/v1/create
    @Override
    @PostMapping("/create")
    public ResponseEntity<ApiResult<?>> objectApiCreate(@Valid @RequestBody AboutDto aboutDto) {
        try {
            AboutDto created = (AboutDto) iAboutServices.objectServiceCreate(aboutDto);
            return ResponseEntity.ok(ApiResult.success(created));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/about/api/v1/create"));
        }
    }

    // LIST
    // http://localhost:4444/about/api/v1/list
    @Override
    @GetMapping(value="/list")
    public ResponseEntity<ApiResult<List<AboutDto>>> objectApiList() {
        try {
            List<AboutDto> list = iAboutServices.objectServiceList();
            return ResponseEntity.ok(ApiResult.success(list));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/about/api/v1/list"));
        }
    }

    // FIND
    // http://localhost:4444/about/api/v1/find/1
    @Override
    @GetMapping(value="/find/{id}")
    public ResponseEntity<ApiResult<?>> objectApiFindById(@PathVariable(name = "id") Long id) {
        try {
            if (id == null) {
                return ResponseEntity.ok(ApiResult.notFound("Id değeri boş", "/about/api/v1/find"));
            }
            AboutDto found = (AboutDto) iAboutServices.objectServiceFindById(id);
            return ResponseEntity.ok(ApiResult.success(found));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/about/api/v1/find"));
        }
    }

    // UPDATE
    // http://localhost:4444/about/api/v1/update/1
    @Override
    @PutMapping(value="/update/{id}")
    public ResponseEntity<ApiResult<?>> objectApiUpdate(@PathVariable(name = "id") Long id, @Valid @RequestBody AboutDto aboutDto) {
        try {
            AboutDto updated = (AboutDto) iAboutServices.objectServiceUpdate(id, aboutDto);
            return ResponseEntity.ok(ApiResult.success(updated));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/about/api/v1/update"));
        }
    }

    // DELETE BY ID
    // http://localhost:4444/about/api/v1/delete/1
    @Override
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<ApiResult<?>> objectApiDelete(@PathVariable(name = "id") Long id) {
        try {
            String deleted = iAboutServices.objectServiceDelete(id).toString();
            return ResponseEntity.ok(ApiResult.success(deleted));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/about/api/v1/delete"));
        }
    }

} //end class