package com.hamitmizrak.file;

import org.springframework.web.multipart.MultipartFile;

/**
 * Görsel/Avatar özel akışları (ileride resize/thumbnail eklenebilir).
 */
public interface ImageService {

    AttachmentResponse uploadImage(AttachmentOwner owner, MultipartFile file);

    AttachmentResponse uploadAvatar(AttachmentOwner owner, MultipartFile file);
}
