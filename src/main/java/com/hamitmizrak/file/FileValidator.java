package com.hamitmizrak.file;


import org.springframework.web.multipart.MultipartFile;

/**
 * Boyut ve MIME tipi kontrolü yapar.
 */
public interface FileValidator {

    void validate(FileKind kind, MultipartFile file);

}
