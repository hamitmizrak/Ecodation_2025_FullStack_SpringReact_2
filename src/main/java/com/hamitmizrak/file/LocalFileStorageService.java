package com.hamitmizrak.file;


import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Objects;
import java.util.UUID;

@Service
public class LocalFileStorageService implements FileStorageService {

    private final Path root;
    private final String baseUrl;

    public LocalFileStorageService(FileProps props) {
        this.root = Paths.get(props.getBaseDir()).normalize().toAbsolutePath();
        this.baseUrl = props.getBaseUrl().replaceAll("/+$", "");
        ensureRootExists();
    }

    private void ensureRootExists() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new IllegalStateException("Upload root oluşturulamadı: " + root, e);
        }
    }

    @Override
    public String store(MultipartFile file, String relativeDirectory) {
        Objects.requireNonNull(file, "file cannot be null");
        if (!StringUtils.hasText(relativeDirectory)) {
            throw new IllegalArgumentException("relativeDirectory cannot be blank");
        }

        final String cleanDir = sanitize(relativeDirectory);
        final Path targetDir = root.resolve(cleanDir).normalize();

        if (!targetDir.startsWith(root)) {
            // path traversal koruması
            throw new SecurityException("Geçersiz hedef dizin.");
        }

        try {
            Files.createDirectories(targetDir);
            final String ext = guessExtension(file.getOriginalFilename());
            final String filename = UUID.randomUUID() + (ext.isEmpty() ? "" : "." + ext);
            final Path targetFile = targetDir.resolve(filename).normalize();
            file.transferTo(targetFile.toFile());

            final Path relativePath = root.relativize(targetFile);
            return normalizeSeparators(relativePath.toString());
        } catch (IOException e) {
            throw new IllegalStateException("Dosya kaydedilemedi.", e);
        }
    }

    @Override
    public Resource loadAsResource(String relativePath) {
        final Path path = safeResolve(relativePath);
        if (!Files.exists(path) || !Files.isReadable(path)) {
            throw new IllegalArgumentException("Dosya bulunamadı: " + relativePath);
        }
        return new FileSystemResource(path);
    }

    @Override
    public void delete(String relativePath) {
        final Path path = safeResolve(relativePath);
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new IllegalStateException("Dosya silinemedi: " + relativePath, e);
        }
    }

    @Override
    public String publicUrl(String relativePath) {
        final String clean = normalizeSeparators(relativePath).replaceAll("^/+", "");
        return baseUrl + "/" + clean;
    }

    // Helpers

    private Path safeResolve(String relativePath) {
        if (!StringUtils.hasText(relativePath)) {
            throw new IllegalArgumentException("relativePath cannot be blank");
        }
        final String clean = sanitize(relativePath);
        final Path path = root.resolve(clean).normalize();
        if (!path.startsWith(root)) {
            throw new SecurityException("Geçersiz yol.");
        }
        return path;
    }

    private static String sanitize(String input) {
        return input.replace("\\", "/").replaceAll("/+", "/")
                .replaceAll("\\.\\.+", "")      // .. temizle
                .replaceAll("^/+", "")           // baştaki /
                .replaceAll("/+$", "");          // sondaki /
    }

    private static String normalizeSeparators(String p) {
        return p.replace("\\", "/").replaceAll("/+", "/");
    }

    private static String guessExtension(String originalName) {
        if (!StringUtils.hasText(originalName)) return "";
        final String name = originalName.trim();
        final int dot = name.lastIndexOf('.');
        if (dot < 0 || dot == name.length() - 1) return "";
        return name.substring(dot + 1).toLowerCase();
    }
}
