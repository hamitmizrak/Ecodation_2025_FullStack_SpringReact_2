package com.hamitmizrak.controller.api;

import com.hamitmizrak.error.ApiResult;
import com.hamitmizrak.file.AttachmentResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

// D: Dto
// E: Entity
public interface IPicturesApi {
    public ResponseEntity<AttachmentResponse> uploadAvatar(Long userId, MultipartFile file);

    public ResponseEntity<Resource> download(String relativePath);

} // end ICrudService
