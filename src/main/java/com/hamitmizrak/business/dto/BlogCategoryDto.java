package com.hamitmizrak.business.dto;


import com.hamitmizrak.annotation.UniqueBlogCategoryValidationName;
import com.hamitmizrak.audit.AuditingAwareBaseDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.extern.log4j.Log4j2;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

// LOMBOK
//@Data  = @Getter + @Setter + @ToString
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Log4j2
@Builder
// Validation

// CategoryDto(1) - BlogDto(N)
public class BlogCategoryDto extends AuditingAwareBaseDto implements Serializable {

    // SERİLEŞTİRME
    public static final Long serialVersionUID=1L;

    // NOT: ID ayrıca yazdım çünkü relationda sıkıntı olabiliyor.
    // ID
    private Long categoryId;

    // CATEGORY NAME
    // kendi Anonotation'ı yazdım.
    @UniqueBlogCategoryValidationName
    @NotEmpty(message = "{blog.category.validation.constraints.NotNull.message}")
    @Size(min=3,message = "{blog.category.least.validation.constraints.NotNull.message}")
    private String categoryName;

    // DATE
    @Builder.Default
    private Date systemCreatedDate=new Date(System.currentTimeMillis());

    /////////////////////////////////////////////////////////////////////////////////////////
    // COMPOSITION
    // RELATION
    // BlogCategory(1) - Blog(N)
    // Döngü önlemek için burada BlogDto listesi DOLDURMAYACAĞIZ.
    //private List<BlogDto>  blogDtoList;

} //end class
