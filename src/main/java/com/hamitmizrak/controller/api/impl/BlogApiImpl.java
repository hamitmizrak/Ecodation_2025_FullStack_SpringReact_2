package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.BlogDto;
import com.hamitmizrak.business.services.interfaces.IBlogServices;
import com.hamitmizrak.controller.api.interfaces.IBlogApi;
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
@RequestMapping("/blog/api/v1.0.0")
public abstract class BlogApiImpl implements IBlogApi<BlogDto> {

    // Injection
    private final IBlogServices iBlogServices;

    //////////////////////////////////////////////////////////////////////////////////////////
    // SPEED DATA
    @Override
    @GetMapping(value="/speed/data")
    public ResponseEntity<List<BlogDto>> blogApiSpeedData(Long key) {
        return null ;
    }

    // ALL DELETE
    @Override
    @GetMapping(value="/delete/all")
    public ResponseEntity<String> blogApiAllDelete() {
        return ResponseEntity.ok(iBlogServices.blogAllDelete());
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    ///

    // CREATE
    // http://localhost:4444/blog/api/v1.0.0/create/1
    // Blog(N) - Category(1)
    @PostMapping("/create/{categoryId}")
    @Override
    public ResponseEntity<ApiResult<?>> create(
            @PathVariable(name = "categoryId") Long categoryId,
            @Valid @RequestBody BlogDto blogDto) {
        try {
            BlogDto saved = (BlogDto) iBlogServices.create(categoryId, blogDto);
            return ResponseEntity.ok(ApiResult.success(saved));
        }catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError Create", ex.getMessage(), "/blog/api/v1.0.0/create"));
        }
    }

    // LIST
    // http://localhost:4444/blog/api/v1.0.0/list
    @Override
    @GetMapping(value="/list")
    public ResponseEntity<ApiResult<List<BlogDto>>> objectApiList() {
        try {
            List<BlogDto> list = iBlogServices.objectServiceList();
            return ResponseEntity.ok(ApiResult.success(list));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError List", ex.getMessage(), "/blog/api/v1.0.0/list"));
        }
    }

    // FIND
    // http://localhost:4444/blog/api/v1.0.0/find/1
    @Override
    @GetMapping(value="/find/{id}")
    public ResponseEntity<ApiResult<?>> objectApiFindById(@PathVariable(name = "id") Long id) {
        try {
            if (id == null) {
                return ResponseEntity.ok(ApiResult.notFound("Id değeri boş", "/blog/api/v1.0.0/find"));
            }
            BlogDto found = (BlogDto) iBlogServices.objectServiceFindById(id);
            return ResponseEntity.ok(ApiResult.success(found));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError Find", ex.getMessage(), "/blog/api/v1.0.0/find"));
        }
    }


    // UPDATE
    // http://localhost:4444/blog/api/v1.0.0/update/1/2
    @PutMapping(value = "/update/{id}/{categoryId}")
    @Override
    public ResponseEntity<ApiResult<?>> update(
            @PathVariable(name = "id") Long id,
            @PathVariable(name = "categoryId")  Long categoryId,
            @Valid @RequestBody BlogDto dto) {

        try {
            BlogDto updated = (BlogDto) iBlogServices.update(id, categoryId, dto);
            return ResponseEntity.ok(ApiResult.success(updated));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError Update", ex.getMessage(), "/blog/api/v1.0.0/update"));
        }
    }


    // DELETE BY ID
    // http://localhost:4444/blog/api/v1.0.0/delete/1
    @Override
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<ApiResult<?>> objectApiDelete(@PathVariable(name = "id") Long id) {
        try {
            String deleted = iBlogServices.objectServiceDelete(id).toString();
            return ResponseEntity.ok(ApiResult.success(deleted));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError Delete", ex.getMessage(), "/blog/api/v1.0.0/delete"));
        }
    }

} //end class