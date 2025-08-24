package com.hamitmizrak.file;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageServiceImpl implements ImageService {

    private final GenericAttachmentService generic;

    public ImageServiceImpl(GenericAttachmentService generic) {
        this.generic = generic;
    }

    @Override
    public AttachmentResponse uploadImage(AttachmentOwner owner, MultipartFile file) {
        return generic.upload(FileKind.IMAGE, owner, file);
    }

    @Override
    public AttachmentResponse uploadAvatar(AttachmentOwner owner, MultipartFile file) {
        return generic.upload(FileKind.AVATAR, owner, file);
    }
}
