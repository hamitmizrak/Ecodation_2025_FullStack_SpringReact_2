package com.hamitmizrak.controller.api;

import com.hamitmizrak.error.ApiResult;
import org.springframework.http.ResponseEntity;

// D: Dto
// E: Entity
public interface IPicturesApi<D> {

    // Görsel URL yönetimi (best practice: alan bazlı update)
    public ResponseEntity<ApiResult<?>> uploadImage(Long id, String imageUrl);

} // end ICrudService
