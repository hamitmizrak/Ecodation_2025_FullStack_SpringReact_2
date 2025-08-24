package com.hamitmizrak.file;


import jakarta.annotation.PostConstruct;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import java.util.*;

/**
 * application.yml:
 *
 * file:
 *   base-dir: /var/app/uploads
 *   base-url: https://cdn.example.com/uploads
 *   max-size-mb: 10
 *   allowed:
 *     IMAGE: [image/jpeg, image/png, image/webp]
 *     AVATAR: [image/jpeg, image/png, image/webp]
 *     DOCUMENT: [application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document]
 */
@Component
@Validated
@ConfigurationProperties(prefix = "file")
public class FileProps {

    @NotBlank
    private String baseDir = "./uploads";

    @NotBlank
    private String baseUrl = "http://localhost:8080/uploads";

    @Min(1)
    private int maxSizeMb = 10;

    /**
     * İzinli içerik tipleri. Tür bazında kontrol edilir.
     */
    private Map<FileKind, Set<String>> allowed = new EnumMap<>(FileKind.class);

    @PostConstruct
    public void ensureDefaults() {
        allowed.computeIfAbsent(FileKind.IMAGE,
                k -> new LinkedHashSet<>(Arrays.asList("image/jpeg", "image/png", "image/webp")));
        allowed.computeIfAbsent(FileKind.AVATAR,
                k -> new LinkedHashSet<>(Arrays.asList("image/jpeg", "image/png", "image/webp")));
        allowed.computeIfAbsent(FileKind.DOCUMENT,
                k -> new LinkedHashSet<>(Collections.singletonList("application/pdf")));
        allowed.computeIfAbsent(FileKind.OTHER,
                k -> new LinkedHashSet<>(Arrays.asList(
                        "application/octet-stream", "text/plain"
                )));
    }

    public long getMaxSizeBytes() {
        return (long) maxSizeMb * 1024L * 1024L;
    }

    public Set<String> getAllowedFor(FileKind kind) {
        return Collections.unmodifiableSet(allowed.getOrDefault(kind, Collections.emptySet()));
    }

    // getters / setters
    public String getBaseDir() { return baseDir; }
    public void setBaseDir(String baseDir) { this.baseDir = baseDir; }
    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
    public int getMaxSizeMb() { return maxSizeMb; }
    public void setMaxSizeMb(int maxSizeMb) { this.maxSizeMb = maxSizeMb; }
    public Map<FileKind, Set<String>> getAllowed() { return allowed; }
    public void setAllowed(Map<FileKind, Set<String>> allowed) { this.allowed = allowed; }
}
