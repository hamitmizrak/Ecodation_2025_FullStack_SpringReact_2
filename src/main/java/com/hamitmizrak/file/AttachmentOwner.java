package com.hamitmizrak.file;

/**
 * Bir dosya ekinin (attachment) ait olduğu "sahip"i (user, blog, product vb.)
 * dosya sisteminde tek bir klasör dizesi olarak temsil eder.
 *
 * Örnekler:
 *  - users/7
 *  - blog/42
 *  - product/15
 *
 * Bu arayüz, path stratejileri ve depolama servisleri tarafından kullanılır.
 */
@FunctionalInterface
public interface AttachmentOwner {

    /**
     * Sahibe ait temel klasör yolunu döndürür (alt dizinler hariç).
     * Örn: "users/7", "blog/42".
     */
    String ownerFolder();
}
