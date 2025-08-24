package com.hamitmizrak.file;


import org.springframework.web.multipart.MultipartFile;

/**
 * Validasyon + PathStrategy + Storage zincirini koordine eder.
 */
public interface GenericAttachmentService {

    /**
     * Ana akış: doğrula → klasörü belirle → kaydet → relativePath döndür.
     */
    String store(FileKind kind, AttachmentOwner owner, MultipartFile file);

    /**
     * Kaydı siler.
     */
    void delete(String relativePath);

    /**
     * Public URL üretir.
     */
    String publicUrl(String relativePath);

    /**
     * Yükleme sonrası basit DTO döndürmek isteyen servisler için yardımcı.
     */
    AttachmentResponse upload(FileKind kind, AttachmentOwner owner, MultipartFile file);
}
