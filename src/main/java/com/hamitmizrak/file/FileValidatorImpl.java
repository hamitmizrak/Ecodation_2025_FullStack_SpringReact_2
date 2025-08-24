package com.hamitmizrak.file;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

// Lombok
@RequiredArgsConstructor

@Component
public class FileValidatorImpl implements FileValidator {

    // Injection
    private final FileProps props;

    @Override
    public void validate(FileKind kind, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new FileValidationException("EMPTY_FILE", "Dosya boş olamaz.");
        }

        if (file.getSize() > props.getMaxSizeBytes()) {
            throw new FileValidationException(
                    "FILE_TOO_LARGE",
                    "Dosya boyutu sınırı aşıldı. Maksimum: " + props.getMaxSizeMb() + " MB");
        }

        final String contentType = file.getContentType();
        if (!StringUtils.hasText(contentType)) {
            throw new FileValidationException("UNKNOWN_TYPE", "İçerik tipi belirlenemedi.");
        }

        final Set<String> allowed = props.getAllowedFor(kind);
        if (!allowed.contains(contentType)) {
            throw new FileValidationException(
                    "UNSUPPORTED_TYPE",
                    "Bu dosya türü için izinli içerik tipi değil: " + contentType);
        }
    }
}
