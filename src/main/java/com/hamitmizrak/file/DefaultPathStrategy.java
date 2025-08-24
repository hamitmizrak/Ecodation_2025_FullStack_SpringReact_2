package com.hamitmizrak.file;

import org.springframework.stereotype.Component;

/**
 * Basit ve anlaşılır klasörleme:
 *  - IMAGE  -> {owner}/images
 *  - AVATAR -> {owner}/avatars
 *  - DOCUMENT -> {owner}/docs
 *  - OTHER -> {owner}/files
 */
@Component
public class DefaultPathStrategy implements PathStrategy {

    @Override
    public String resolveDirectory(FileKind kind, AttachmentOwner owner) {
        final String base = owner.ownerFolder();
        return switch (kind) {
            case IMAGE -> base + "/images";
            case AVATAR -> base + "/avatars";
            case DOCUMENT -> base + "/docs";
            case OTHER -> base + "/files";
        };
    }
}
