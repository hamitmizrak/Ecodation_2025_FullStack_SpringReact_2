package com.hamitmizrak.file_upload;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Log4j2
@Service
@RequiredArgsConstructor
public class _4_LocalFileStorageService implements _2_FileStorageService {

    private final _1_FileProps props;
    private final _3_FileValidator validator;

    @Override
    public String store(MultipartFile file, String subdir) {
        validator.validateImage(file);

        // Güvenli alt yol
        String cleanSubdir = cleanSubPath(subdir); // "blog/42" gibi

        // Dosya adı
        String ext = "." + _3_FileValidator.safeExtension(file.getOriginalFilename(), "png");
        String filename = UUID.randomUUID().toString().replace("-", "") + ext;

        Path base = Paths.get(props.getBaseDir()).normalize().toAbsolutePath();
        Path targetDir = base.resolve(cleanSubdir).normalize();

        // Path traversal engeli
        if (!targetDir.startsWith(base)) {
            throw new IllegalArgumentException("Geçersiz alt klasör yolu.");
        }

        try {
            Files.createDirectories(targetDir);
            Path targetFile = targetDir.resolve(filename).normalize();

            // Var ise üzerine yazma
            Files.copy(file.getInputStream(), targetFile, StandardCopyOption.REPLACE_EXISTING);
            String relative = cleanSubdir + "/" + filename;
            log.info("Stored image: {}", targetFile);
            return relative.replace("\\", "/");
        } catch (IOException e) {
            throw new RuntimeException("Dosya kaydedilemedi: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean delete(String relativePath) {
        if (!StringUtils.hasText(relativePath)) return false;
        Path base = Paths.get(props.getBaseDir()).normalize().toAbsolutePath();
        Path file = base.resolve(cleanSubPath(relativePath)).normalize();

        if (!file.startsWith(base)) return false; // güvenlik

        try {
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            log.warn("Silinemedi: {}", file, e);
            return false;
        }
    }

    @Override
    public Resource getAsResource(String relativePath) {
        Path base = Paths.get(props.getBaseDir()).normalize().toAbsolutePath();
        Path file = base.resolve(cleanSubPath(relativePath)).normalize();
        if (!file.startsWith(base)) {
            throw new IllegalArgumentException("Geçersiz yol.");
        }
        return new FileSystemResource(file.toFile());
    }

    @Override
    public String toPublicUrl(String relativePath) {
        return props.getBaseUrl() + "/" + relativePath.replace("\\", "/");
    }

    private static String cleanSubPath(String input) {
        String s = input.replace("\\", "/");
        while (s.startsWith("/")) s = s.substring(1);
        s = s.replace("..", "");
        return s;
    }
}