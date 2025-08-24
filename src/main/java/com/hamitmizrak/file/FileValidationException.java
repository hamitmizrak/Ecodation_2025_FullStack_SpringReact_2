package com.hamitmizrak.file;

/**
 * Alan/iş kuralı ihlallerinde fırlatılır.
 */
public class FileValidationException extends RuntimeException {

    private final String code;

    public FileValidationException(String code, String message) {
        super(message);
        this.code = code;
    }

    public FileValidationException(String code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
