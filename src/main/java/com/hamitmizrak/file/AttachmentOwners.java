package com.hamitmizrak.file;


import java.util.Objects;

/**
 * Sık kullanılan sahip türleri (user, blog, product) için fabrika yardımcıları.
 * Tüm metotlar NullPointerException yerine anlamlı mesajlarla hata vermek için null kontrolleri içerir.
 */
public final class AttachmentOwners {

    private AttachmentOwners() { /* no-op */ }

    public static AttachmentOwner user(Long id) {
        Objects.requireNonNull(id, "user id cannot be null");
        return () -> "users/" + id;
    }

    public static AttachmentOwner blog(Long id) {
        Objects.requireNonNull(id, "blog id cannot be null");
        return () -> "blog/" + id;
    }

    public static AttachmentOwner product(Long id) {
        Objects.requireNonNull(id, "product id cannot be null");
        return () -> "products/" + id;
    }

    /**
     * Serbest form: type/id
     * Örn: of("teams", 12) -> "teams/12"
     */
    public static AttachmentOwner of(String type, Object id) {
        Objects.requireNonNull(type, "type cannot be null");
        Objects.requireNonNull(id, "id cannot be null");
        final String normalized = type.trim().replaceAll("[/\\\\]+", "-").toLowerCase();
        return () -> normalized + "/" + id;
    }
}

