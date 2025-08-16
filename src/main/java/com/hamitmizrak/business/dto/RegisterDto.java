package com.hamitmizrak.business.dto;

import com.hamitmizrak.audit.AuditingAwareBaseDto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.extern.log4j.Log4j2;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

// Lombok
// @Data  // Getter + Setter + Equals + HashCode + toString
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
@Builder

// @SneakyThrows
// RoleDto(M) RegisterDto(N)

// NOT: Validation işlemlerinde DTO tarafında yazalım.
// NOT: Eğer kullanıcı boşluk bıraktıysa trim() metotudunu kullanın

// REGISTER
public class RegisterDto extends AuditingAwareBaseDto implements Serializable {

    // Serileştirme
    public static final Long serialVersionUID=1L;

    // Register ID
    private Integer registerId;

    // System Date
    private Date systemCreatedDate;


    ////////////////////////////////////////////////////////////////////////////////////////////
    // Nickname
    @NotEmpty(message = "{register.nickname.validation.constraints.NotNull.message}")
    private String registerNickname;

    // Name
    @NotEmpty(message = "{register.name.validation.constraints.NotNull.message}")
    private String registerName;

    // Surname
    @NotEmpty(message = "{register.surname.validation.constraints.NotNull.message}")
    private String registerSurname;

    /*
    ^[A-Za-z0-9._%+-]+ → E-posta kullanıcı adı kısmında harf, rakam, nokta, alt çizgi vb. izin verir.
    @ → @ sembolü zorunlu.
    [A-Za-z0-9.-]+ → Domain adı kısmı (ör. gmail, yahoo).
    \\. → Nokta (.) karakteri.
    [A-Za-z]{2,6}$ → Uzantı kısmı (ör. com, net, org), 2 ile 6 karakter uzunluğunda.
    Sonundaki $ → Stringin bitişini temsil eder.
     */
    // Email Address
    @NotEmpty(message = "{register.email.validation.constraints.NotNull.message}")
    @Email(message = "{register.email.validation.constraints.regex.message}")
    //@AnnotationUniqueEmailAddress // have to unique email address
    /*@Pattern(
            regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$",
            message = "Lütfen geçerli bir e-posta adresi giriniz"
    )*/
    private String registerEmail;

    // Password
    @NotEmpty(message = "{register.password.validation.constraints.NotNull.message}")
    @Size(min = 7,max=15,  message = "{register.password.validation.constraints.MinMax.NotNull.message}")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).*$", message = "{register.password.pattern.validation.constraints.NotNull.message}")
    private String registerPassword;

    // Page Authorization (O kişi o sayfaya yetkisi var mı
    @Builder.Default
    private Boolean pageAuthorization=false;

    // Rolles (Enum)
    private Collection<RoleDto> roles;

    /////////////////////////////////////////////////////////////////////////////////
    // USER DETAILS
    // Kullanıcı üye olurken kilitli olsun ancak mail onayı ile aktifleştirilsin
    public Boolean isAccountNonLocked;

    // Kullanıcı hesabını pasif duruma getirme
    public Boolean isAccountNonExpired;

    // Kullanıcı Hesap Bilgi Süresi (Authorization)
    public Boolean isCredentialsNonExpired;

    // Kullanıcı Sistemde mi ?
    public Boolean isEnabled;

    /////////////////////////////////////////////////////////////////////////////////
    // Parametreli Constructor
    public RegisterDto(String registerNickname, String registerName, String registerSurname, String registerEmail, String registerPassword) {
        this.registerNickname = registerNickname;
        this.registerName = registerName;
        this.registerSurname = registerSurname;
        this.registerEmail = registerEmail;
        this.registerPassword = registerPassword;
    }

} //end RegisterDto

