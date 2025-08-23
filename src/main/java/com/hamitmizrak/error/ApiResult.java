package com.hamitmizrak.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Date;
import java.util.Map;

// ------------------ LOMBOK ------------------
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder

// Eğer null değer varsa JSON'a dahil etme
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResult<T> {

    public enum Status {
        SUCCESS,
        ERROR,
        NOT_FOUND,
        UNAUTHORIZED,
        FORBIDDEN,
        UNPROCESSABLE,
        SERVER_ERROR
    }

    private Status status; // enum tipinde status
    private String message; // Kullanıcıya veya frontend'e gösterilecek mesaj
    private String path; // Endpoint path
    private Map<String, Object> errors; // Validation hataları
    private T data; // Generic data
    private Date createdDate = new Date(System.currentTimeMillis());

    // Constructor Parametresiz
    public ApiResult() { }

    // Constructor (Parametreli) pmes
    public ApiResult(String path, String message, String error, Status status) { this.path = path; this.message = message; this.error = error; this.status = status; }

    // Constructor (Parametreli) pms
    public ApiResult(String path, String message, Status status) { this.path = path; this.message = message; this.status = status; }

    // ------------------ Static Factory Methods ------------------

    public static <T> ApiResult<T> success(T data) {
        return ApiResult.<T>builder()
                .status(Status.SUCCESS)
                .message("Success")
                .data(data)
                .build();
    }

    public static <T> ApiResult<T> error(String message, String path) {
        return ApiResult.<T>builder()
                .status(Status.ERROR)
                .message(message)
                .path(path)
                .build();
    }

    public static <T> ApiResult<T> nullPointer(String message, String path) {
        return ApiResult.<T>builder()
                .status(Status.NOT_FOUND)
                .message(message)
                .path(path)
                .build();
    }

    public static <T> ApiResult<T> badReqquest(String message, String path) {
        return ApiResult.<T>builder()
                .status(Status.NOT_FOUND)
                .message(message)
                .path(path)
                .build();
    }

    public static <T> ApiResult<T> notFound(String message, String path) {
        return ApiResult.<T>builder()
                .status(Status.NOT_FOUND)
                .message(message)
                .path(path)
                .build();
    }

    public static <T> ApiResult<T> unauthorized(String message, String path) {
        return ApiResult.<T>builder()
                .status(Status.UNAUTHORIZED)
                .message(message)
                .path(path)
                .build();
    }

    public static <T> ApiResult<T> forbidden(String message, String path) {
        return ApiResult.<T>builder()
                .status(Status.FORBIDDEN)
                .message(message)
                .path(path)
                .build();
    }

    public static <T> ApiResult<T> unprocessable(String message, String path, Map<String, Object> errors) {
        return ApiResult.<T>builder()
                .status(Status.UNPROCESSABLE)
                .message(message)
                .path(path)
                .errors(errors)
                .build();
    }

    public static <T> ApiResult<T> serverError(String message, String path) {
        return ApiResult.<T>builder()
                .status(Status.SERVER_ERROR)
                .message(message)
                .path(path)
                .build();
    }
}



/*
// Başarılı response
ApiResult<User> res1 = ApiResult.success(user);

// Not found
ApiResult<Object> res2 = ApiResult.notFound("Kullanıcı bulunamadı", "/api/user/123");

// Hata response
ApiResult<Object> res3 = ApiResult.error("Beklenmedik hata oluştu", "/api/login");

// Validation hataları
Map<String, Object> errors = Map.of("email", "Geçersiz email", "password", "Şifre çok kısa");
ApiResult<Object> res4 = ApiResult.unprocessable("Validation Hataları", "/api/register", errors);

*/