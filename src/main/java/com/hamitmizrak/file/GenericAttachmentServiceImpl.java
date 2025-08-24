package com.hamitmizrak.file;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GenericAttachmentServiceImpl implements GenericAttachmentService {

    private final FileValidator validator;
    private final PathStrategy pathStrategy;
    private final FileStorageService storage;

    public GenericAttachmentServiceImpl(FileValidator validator,
                                        PathStrategy pathStrategy,
                                        FileStorageService storage) {
        this.validator = validator;
        this.pathStrategy = pathStrategy;
        this.storage = storage;
    }

    @Override
    public String store(FileKind kind, AttachmentOwner owner, MultipartFile file) {
        validator.validate(kind, file);
        final String dir = pathStrategy.resolveDirectory(kind, owner);
        return storage.store(file, dir);
    }

    @Override
    public void delete(String relativePath) {
        storage.delete(relativePath);
    }

    @Override
    public String publicUrl(String relativePath) {
        return storage.publicUrl(relativePath);
    }

    @Override
    public AttachmentResponse upload(FileKind kind, AttachmentOwner owner, MultipartFile file) {
        final String relative = store(kind, owner, file);
        return AttachmentResponse.builder()
                .relativePath(relative)
                .url(publicUrl(relative))
                .originalName(file.getOriginalFilename())
                .contentType(file.getContentType())
                .size(file.getSize())
                .deleted(false)
                .build();
    }
}
