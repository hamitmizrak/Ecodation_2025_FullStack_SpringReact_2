package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.BlogCategoryDto;
import com.hamitmizrak.business.services.interfaces.IBlogCategoryServices;
import com.hamitmizrak.controller.api.interfaces.IBlogCategoryApi;
import com.hamitmizrak.error.ApiResult;
import com.hamitmizrak.utily.FrontEnd;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// LOMBOK
@RequiredArgsConstructor
@Log4j2

// API
@RestController
@CrossOrigin(origins = FrontEnd.REACT_URL)
@RequestMapping("/blog/category/api/v1.0.0")
public class BlogCategoryApiImpl implements IBlogCategoryApi<BlogCategoryDto> {

    // Injection
    private final IBlogCategoryServices iCategoryServices;

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // SPEED DATA (Değişmeden kaldı)
    @Override
    @GetMapping(value="/speed/{id}")
    public ResponseEntity<String> categoryApiSpeedData(@PathVariable(name = "id") Integer data) {
        return ResponseEntity.ok(iCategoryServices.categorySpeedData(data));
    }

    // ALL DELETE (Değişmeden kaldı)
    @Override
    @DeleteMapping(value="/delete/all")
    public ResponseEntity<String> categoryApiAllDelete() {
        return ResponseEntity.ok(iCategoryServices.categoryDeleteAll());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // CREATE
    // localhost:4444/blog/category/api/v1.0.0/create
    @Override
    @PostMapping("/create")
    public ResponseEntity<ApiResult<?>> objectApiCreate(@Valid @RequestBody BlogCategoryDto categoryDto) {
        try {
            BlogCategoryDto created = (BlogCategoryDto) iCategoryServices.objectServiceCreate(categoryDto);
            return ResponseEntity.ok(ApiResult.success(created));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/category/api/v1/create"));
        }
    }

    // LIST
    // localhost:4444/blog/category/api/v1.0.0/list
    @Override
    @GetMapping(value="/list")
    public ResponseEntity<ApiResult<List<BlogCategoryDto>>> objectApiList() {
        try {
            List<BlogCategoryDto> list = iCategoryServices.objectServiceList();
            return ResponseEntity.ok(ApiResult.success(list));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/category/api/v1/list"));
        }
    }

    // FIND
    // localhost:4444/blog/category/api/v1.0.0/find/1
    @Override
    @GetMapping(value="/find/{id}")
    public ResponseEntity<ApiResult<?>> objectApiFindById(@PathVariable(name = "id") Long id) {
        try {
            if (id == null) {
                return ResponseEntity.ok(ApiResult.notFound("Id değeri boş", "/blog/category/api/v1/find"));
            }
            BlogCategoryDto found = (BlogCategoryDto) iCategoryServices.objectServiceFindById(id);
            return ResponseEntity.ok(ApiResult.success(found));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/category/api/v1/find"));
        }
    }

    // UPDATE
    // localhost:4444/blog/category/api/v1.0.0/update/1
    @Override
    @PutMapping(value="/update/{id}")
    public ResponseEntity<ApiResult<?>> objectApiUpdate(@PathVariable(name = "id") Long id, @Valid @RequestBody BlogCategoryDto categoryDto) {
        try {
            BlogCategoryDto updated = (BlogCategoryDto) iCategoryServices.objectServiceUpdate(id, categoryDto);
            return ResponseEntity.ok(ApiResult.success(updated));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/category/api/v1/update"));
        }
    }

    // DELETE BY ID
    // localhost:4444/blog/category/api/v1.0.0/delete/1
    @Override
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<ApiResult<?>> objectApiDelete(@PathVariable(name = "id") Long id) {
        try {
            String deleted = iCategoryServices.objectServiceDelete(id).toString();
            return ResponseEntity.ok(ApiResult.success(deleted));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/category/api/v1/delete"));
        }
    }

} // end BlogCategoryApiImpl
