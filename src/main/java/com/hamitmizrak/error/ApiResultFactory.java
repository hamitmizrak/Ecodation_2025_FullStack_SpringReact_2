package com.hamitmizrak.error;


import java.util.Date;

public class ApiResultFactory <T>{

    /* ---------------------- STATİK YARDIMCI METOTLAR ---------------------- */

    /** 200 OK */
    public static <T> ApiResult<T> success(T data, String path) {
        return ApiResult.<T>builder()
                .status(200)
                .success(true)
                .data(data)
                .path(path)
                .createdDate(new Date())
                .build();
    }

    /** 201 Created */
    public static <T> ApiResult<T> created(T data, String path) {
        return ApiResult.<T>builder()
                .status(201)
                .success(true)
                .data(data)
                .path(path)
                .createdDate(new Date())
                .build();
    }

    /** Genel hata üretici (status + error + optional message) */
    public static <T> ApiResult<T> error(int status, String error, String path) {
        return ApiResult.<T>builder()
                .status(status)
                .success(false)
                .error(error)
                .path(path)
                .createdDate(new Date())
                .build();
    }

    /** 400 Bad Request kısayolu */
    public static <T> ApiResult<T> badRequest(String error, String path) {
        return error(400, error, path);
    }

    /** 404 Not Found kısayolu */
    public static <T> ApiResult<T> notFound(String error, String path) {
        return error(404, error, path);
    }

}
