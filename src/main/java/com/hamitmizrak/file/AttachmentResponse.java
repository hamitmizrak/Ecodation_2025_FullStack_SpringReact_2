package com.hamitmizrak.file;


import lombok.Builder;
import lombok.Value;

/**
 * Yükleme ve silme gibi işlemlerin API çıkışı için DTO.
 */
@Value
@Builder
public class AttachmentResponse {
    String relativePath;  // örn: users/7/images/uuid.png
    String url;           // public erişim URL'si
    String originalName;  // istemcinin gönderdiği dosya adı
    String contentType;   // MIME type
    long size;            // byte cinsinden
    boolean deleted;      // delete işlemi için true
}

