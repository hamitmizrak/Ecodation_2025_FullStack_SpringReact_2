package com.hamitmizrak.file_upload;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Getter @Setter
@Validated
@ConfigurationProperties(prefix = "file")
/*
Unutmayın: @EnableConfigurationProperties(FileProps.class) ya da @SpringBootApplication üzerinde @ConfigurationPropertiesScan aktif olmalı. (Çoğu projede zaten açık.)
 */
public class _1_FileProps {

    @NotBlank
    private String baseDir;

    @NotBlank
    private String baseUrl;

    @Min(1)
    private long maxSize;

    @NotEmpty
    private List<String> allowedTypes; // image/jpeg, image/png gibi
}