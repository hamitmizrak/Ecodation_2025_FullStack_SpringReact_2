package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.BlogDto;
import com.hamitmizrak.business.services.interfaces.IBlogServices;
import com.hamitmizrak.controller.api.interfaces.IBlogApi;
import com.hamitmizrak.error.ApiResult;
import com.hamitmizrak.file_upload._1_FileProps;
import com.hamitmizrak.file_upload._2_FileStorageService;
import com.hamitmizrak.file_upload._5_BlogImageService;
import com.hamitmizrak.utily.FrontEnd;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Paths;
import java.util.List;

// LOMBOK
@RequiredArgsConstructor
@Log4j2

// API
@RestController
@CrossOrigin(origins = FrontEnd.REACT_URL) // http://localhost:3000
@RequestMapping("/blog/api/v1")
public abstract class BlogApiImpl implements IBlogApi<BlogDto> {

    // Injection
    private final IBlogServices iBlogServices;
    private final _5_BlogImageService blogImageService;
    private final _2_FileStorageService storage;
    private final _1_FileProps fileProps;

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

    ///////////////////////////////////////////////////////////////////////////////////////
    ///
    // === Upload Image ===
    // POST /blog/api/v1/{id}/image  (multipart/form-data; key=file)
    // Blog görsel yükle (ID bazlı klasör)
    // POST /blog/api/v1/{id}/image  (multipart/form-data; key = file)
    @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResult<?>> uploadImage(
            @PathVariable Long id,
            @RequestPart("file") MultipartFile file
    ) {
        try {
            // 1) Blog doğrulama
            iBlogServices.objectServiceFindById(id);

            // 2) Dosyayı kaydet
            String relative = storage.store(file, "blog/" + id); // blog/42/uuid.png

            // 3) Public URL üret
            String url = fileProps.getBaseUrl() + "/" + relative; // http://localhost:4444/files/blog/42/uuid.png

            // 4) Blog kayıt güncelle (sadece imageUrl)
            BlogDto updated = (BlogDto) iBlogServices.updateImageUrl(id, url);

            return ResponseEntity.ok(ApiResult.success(java.util.Map.of(
                    "url", url,
                    "blog", updated
            )));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ApiResult.error("badRequest", ex.getMessage(), "/blog/api/v1/{id}/image"));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/api/v1/{id}/image"));
        }
    }


    // === Delete Image ===
    // Blog görsel sil
    // DELETE /blog/api/v1/{id}/image
    // Blog görsel sil
    // DELETE /blog/api/v1/{id}/image
    @DeleteMapping("/{id}/image")
    public ResponseEntity<ApiResult<?>> deleteImage(@PathVariable Long id) {
        try {
            BlogDto blog = (BlogDto) iBlogServices.objectServiceFindById(id);
            String imageUrl = blog.getImageUrl();
            if (imageUrl == null || imageUrl.isBlank()) {
                return ResponseEntity.ok(ApiResult.notFound("Bu blogda kayıtlı görsel yok", "/blog/api/v1/{id}/image"));
            }

            // imageUrl → relative path
            // imageUrl: http://localhost:4444/files/blog/42/uuid.png
            // relative: blog/42/uuid.png
            String prefix = fileProps.getBaseUrl() + "/";
            String relative = imageUrl.startsWith(prefix) ? imageUrl.substring(prefix.length()) : imageUrl;

            boolean deleted = storage.delete(relative);

            // Blog kaydından URL'i temizle
            BlogDto updated = (BlogDto) iBlogServices.clearImageUrl(id);

            return ResponseEntity.ok(ApiResult.success(java.util.Map.of(
                    "deleted", deleted,
                    "blog", updated
            )));
        } catch (IllegalArgumentException nf) {
            return ResponseEntity.ok(ApiResult.notFound(nf.getMessage(), "/blog/api/v1/{id}/image"));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/api/v1/{id}/image"));
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////
    // CREATE
    // http://localhost:4444/blog/api/v1/create
    @Override
    @PostMapping("/create")
    public ResponseEntity<ApiResult<?>> objectApiCreate(@Valid @RequestBody BlogDto blogDto) {
        try {
            BlogDto created = (BlogDto) iBlogServices.objectServiceCreate(blogDto);
            return ResponseEntity.ok(ApiResult.success(created));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/api/v1/create"));
        }
    }

    // LIST
    // http://localhost:4444/blog/api/v1/list
    @Override
    @GetMapping(value="/list")
    public ResponseEntity<ApiResult<List<BlogDto>>> objectApiList() {
        try {
            List<BlogDto> list = iBlogServices.objectServiceList();
            return ResponseEntity.ok(ApiResult.success(list));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/api/v1/list"));
        }
    }

    // FIND
    // http://localhost:4444/blog/api/v1/find/1
    @Override
    @GetMapping(value="/find/{id}")
    public ResponseEntity<ApiResult<?>> objectApiFindById(@PathVariable(name = "id") Long id) {
        try {
            if (id == null) {
                return ResponseEntity.ok(ApiResult.notFound("Id değeri boş", "/blog/api/v1/find"));
            }
            BlogDto found = (BlogDto) iBlogServices.objectServiceFindById(id);
            return ResponseEntity.ok(ApiResult.success(found));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/api/v1/find"));
        }
    }

    // UPDATE
    // http://localhost:4444/blog/api/v1/update/1
    @Override
    @PutMapping(value="/update/{id}")
    public ResponseEntity<ApiResult<?>> objectApiUpdate(@PathVariable(name = "id") Long id, @Valid @RequestBody BlogDto categoryDto) {
        try {
            BlogDto updated = (BlogDto) iBlogServices.objectServiceUpdate(id, categoryDto);
            return ResponseEntity.ok(ApiResult.success(updated));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/api/v1/update"));
        }
    }

    // DELETE BY ID
    // http://localhost:4444/blog/api/v1/delete/1
    @Override
    @DeleteMapping(value="/delete/{id}")
    public ResponseEntity<ApiResult<?>> objectApiDelete(@PathVariable(name = "id") Long id) {
        try {
            String deleted = iBlogServices.objectServiceDelete(id).toString();
            // Dosya resmi silindiğinde kalıntılarında kaldırmak gerekir
            _1_FileProps fileProps = new _1_FileProps();
            FileSystemUtils.deleteRecursively(Paths.get(fileProps.getBaseDir(), "blog", id.toString()));

            return ResponseEntity.ok(ApiResult.success(deleted));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/blog/api/v1/delete"));
        }
    }

} //end class