package com.hamitmizrak.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Date;
import java.util.Map;

// LOMBOK
@Getter
@Setter
@ToString
@AllArgsConstructor
@Builder

// Spring Framuworkun Error mekanizması yerine bizim yazdığımız hata yakalama mekanizmasıdır
// Jackson: Objeyi , Json'a çevirmek
// @JsonInclude(JsonInclude.Include.NON_NULL): Eğer ApiResultta null değer varsa backent'te gönder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResult<T> {

    // sem pvc
    /** HTTP status kodu (200, 201, 400, 404, 500, ...) */
    private int status;

    /** İşlem başarılı mı? (status'e paralel, opsiyonel) */
    private Boolean success;

    /** Hata detayı (opsiyonel; success=false durumlarında doldurulabilir) */
    private String error;

    /** İsteğe bağlı doğrulama hataları veya alan bazlı mesajlar */
    private Map<String, String> errors;

    /** Asıl faydalı yük (payload) — generic tip */
    private T data;

    /** İnsan tarafından okunur kısa mesaj (opsiyonel) */
    private String message;

    /** İstek yolu veya mutlak URL (örn: /role/api/v1.0.0/update) */
    private String path;

    /** Oluşturulma zamanı */
    private Date createdDate = new Date(System.currentTimeMillis());

    // Constructor Parametresiz
    public ApiResult() {
    }

    // Constructor (Parametreli)  pmes
    public ApiResult(String path, String message, String error, int status) {
        this.path = path;
        this.message = message;
        this.error = error;
        this.status = status;
    }

    // Constructor (Parametreli)  pms
    public ApiResult(String path, String message, int status) {
        this.path = path;
        this.message = message;
        this.status = status;
    }

} //end Class ApiResult
