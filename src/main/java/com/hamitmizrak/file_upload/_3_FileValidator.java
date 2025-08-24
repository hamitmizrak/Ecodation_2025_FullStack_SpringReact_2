package com.hamitmizrak.file_upload;




import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.InputStream;

// LOMBOK (Injection)
@RequiredArgsConstructor

// Spring için
@Component

// FileValidator (boyut/MIME doğrulama)
public class _3_FileValidator {

    private final _1_FileProps props;

    public void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Yüklenecek dosya bulunamadı.");
        }

        // Boyut kontrol
        if (file.getSize() > props.getMaxSize()) {
            throw new IllegalArgumentException("Dosya çok büyük. Maksimum: " + props.getMaxSize() + " byte");
        }

        // MIME type kontrol
        String contentType = file.getContentType();
        if (!StringUtils.hasText(contentType) || props.getAllowedTypes().stream().noneMatch(contentType::equalsIgnoreCase)) {
            throw new IllegalArgumentException("Geçersiz içerik türü: " + contentType);
        }

        // Gerçekten resim mi? (ImageIO ile basit doğrulama)
        try (InputStream in = file.getInputStream()) {
            BufferedImage img = ImageIO.read(in);
            if (img == null || img.getWidth() <= 0 || img.getHeight() <= 0) {
                throw new IllegalArgumentException("Dosya görüntü olarak okunamadı.");
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Görsel doğrulanamadı: " + e.getMessage(), e);
        }
    }

    public static String safeExtension(String originalFilename, String fallback) {
        if (!StringUtils.hasText(originalFilename) || !originalFilename.contains(".")) return fallback;
        String ext = originalFilename.substring(originalFilename.lastIndexOf('.') + 1).toLowerCase();
        // çok basit bir beyaz liste; isterseniz genişletin
        return switch (ext) {
            case "jpg", "jpeg", "png", "webp", "gif" -> ext;
            default -> fallback;
        };
    }
}