package com.hamitmizrak.file_upload;


import com.hamitmizrak.business.dto.BlogDto;

import com.hamitmizrak.business.services.interfaces.IBlogServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class _6_BlogImageServiceImpl implements _5_BlogImageService {

    private final IBlogServices blogServices;
    private final _2_FileStorageService storage;
    private final _1_FileProps props;

    @Override
    public BlogDto uploadImage(Long blogId, MultipartFile file) {
        // 1) Blog doğrula
        BlogDto blog = (BlogDto) blogServices.objectServiceFindById(blogId);
        if (blog == null) throw new IllegalArgumentException("Blog bulunamadı: " + blogId);

        // 2) Kaydet
        String relative = storage.store(file, "blog/" + blogId);
        String url = storage.toPublicUrl(relative);

        // 3) Blog’u güncelle
        blog.setImageUrl(url);
        return (BlogDto) blogServices.objectServiceUpdate(blogId, blog);
    }

    @Override
    public boolean deleteImage(Long blogId) {
        BlogDto blog = (BlogDto) blogServices.objectServiceFindById(blogId);
        if (blog == null) throw new IllegalArgumentException("Blog bulunamadı: " + blogId);

        String imageUrl = blog.getImageUrl();
        if (!StringUtils.hasText(imageUrl)) return false;

        // imageUrl → relative
        String prefix = props.getBaseUrl() + "/";
        String relative = imageUrl.startsWith(prefix) ? imageUrl.substring(prefix.length()) : imageUrl;

        boolean deleted = storage.delete(relative);

        blog.setImageUrl(null);
        blogServices.objectServiceUpdate(blogId, blog);
        return deleted;
    }
}