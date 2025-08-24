package com.hamitmizrak.business.services;

import com.hamitmizrak.file.AttachmentResponse;
import org.springframework.web.multipart.MultipartFile;

// D: Dto
// E: Entity
public interface IPicturesService {
    public AttachmentResponse uploadUserAvatar(Long userId, MultipartFile file);
} // end ICrudService
