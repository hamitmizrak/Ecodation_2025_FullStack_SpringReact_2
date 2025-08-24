package com.hamitmizrak.file;


/**
 * Bir dosyanın sahibine ve türüne göre klasör yapısını belirler.
 * Dönüş: baseDir'e göre ROZET GİBİ bağlanacak "relative directory".
 * Örn: users/7/images
 */
public interface PathStrategy {
    String resolveDirectory(FileKind kind, AttachmentOwner owner);
}
