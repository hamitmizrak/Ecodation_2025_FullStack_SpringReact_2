package com.hamitmizrak.file_upload;

import com.hamitmizrak.business.dto.BlogDto;
import org.springframework.web.multipart.MultipartFile;

public interface _5_BlogImageService {
    /**
     * Blog ID için görseli yükler, blog’un imageUrl alanını günceller.
     * @return güncellenmiş BlogDto
     */
    BlogDto uploadImage(Long blogId, MultipartFile file);

    /**
     * Blog ID için görseli siler (varsa), blog’un imageUrl alanını temizler.
     * @return (silme yapıldı mı?)
     */
    boolean deleteImage(Long blogId);
}