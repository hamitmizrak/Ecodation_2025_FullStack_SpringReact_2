package com.hamitmizrak.file_upload;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface _2_FileStorageService {

    /**
     * Dosyayı verilen alt klasöre kaydeder. Örn: subdir="blog/42"
     * @return relative path (örn: blog/42/4e2a8c10-...png)
     */
    String store(MultipartFile file, String subdir);

    /**
     * Relative path’e göre siler.
     * @return true: silindi/varsa; false: yoktu
     */
    boolean delete(String relativePath);

    /**
     * Relative path’e karşılık gelen Resource döner (download/serve için)
     */
    Resource getAsResource(String relativePath);

    /**
     * Public URL üretir (fileProps.baseUrl + "/" + relative)
     */
    String toPublicUrl(String relativePath);
}