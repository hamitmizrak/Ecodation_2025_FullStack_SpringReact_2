package com.hamitmizrak.controller.api.interfaces;

import com.hamitmizrak.business.dto.BlogDto;
import com.hamitmizrak.controller.api.ICrudApi;
import com.hamitmizrak.error.ApiResult;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface IBlogApi<D> extends ICrudApi<D> {

    // ALL DELETE
    public ResponseEntity<String> blogApiAllDelete();

    // SPEED DATA
    public ResponseEntity<List<D>> blogApiSpeedData(Long key);

    // CREATE
    // http://localhost:4444/blog/api/v1/create
    // Blog(N) - Category(1)
    ResponseEntity<ApiResult<?>> objectApiCreate(BlogDto blogDto, Long categoryId);

    // UPDATE
    // http://localhost:4444/blog/api/v1/update/1/2
    ResponseEntity<ApiResult<?>> objectApiUpdate( Long id,BlogDto blogDto,Long categoryId);

}
