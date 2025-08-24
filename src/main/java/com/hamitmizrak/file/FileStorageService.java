package com.hamitmizrak.file;


import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * Fiziksel depolama soyutlaması. Local, S3, MinIO vb. implement edilebilir.
 */
public interface FileStorageService {

    /**
     * Verilen "relativeDirectory" içinde güvenli bir dosya adıyla kaydeder ve
     * "relativePath" (örn: users/7/images/uuid.png) döndürür.
     */
    String store(MultipartFile file, String relativeDirectory);

    /**
     * "relativePath" üzerinden Resource döndürür (404 -> exception).
     */
    Resource loadAsResource(String relativePath);

    /**
     * "relativePath" üzerindeki dosyayı siler (varsa).
     */
    void delete(String relativePath);

    /**
     * "relativePath" için herkese açık erişim URL'si döndürür.
     */
    String publicUrl(String relativePath);
}
