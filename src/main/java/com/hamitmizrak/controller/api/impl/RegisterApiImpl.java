package com.hamitmizrak.controller.api.impl;

import com.hamitmizrak.business.dto.RegisterDto;
import com.hamitmizrak.business.services.impl.RegisterServicesImpl;
import com.hamitmizrak.business.services.interfaces.IRegisterServices;
import com.hamitmizrak.controller.api.interfaces.IRegisterApi;
import com.hamitmizrak.error.ApiResult;
import com.hamitmizrak.exception._400_BadRequestException;
import com.hamitmizrak.tokenmail.ForRegisterTokenEmailConfirmationEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Lombok
@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/register/api/v1.0.0")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"}) // Frontend portları
public class RegisterApiImpl implements IRegisterApi<RegisterDto> {

    private final IRegisterServices iRegisterServices;

    private final RegisterServicesImpl registerServicesImpl;

    private ApiResult apiResult;

    /////////////////////////////////////////////////////////////
    // SPEED DATA
    @GetMapping("/speed/data")
    @Override
    public ResponseEntity<?> registerApiSpeedData(Long key) {
        return ResponseEntity.ok(iRegisterServices.registerSpeedData(key));
    }

    // USER ALL DELETE
    @GetMapping("/all/delete")
    @Override
    public ResponseEntity<?> registerApiUserAllDelete() {
        return ResponseEntity.ok(iRegisterServices.registerAllUSerDelete());
    }

    /////////////////////////////////////////////////////////////
    // REGISTER CRUD

    // CREATE Register(Api)
    @PostMapping("/create/{roles_id}")
    @Override
    public ResponseEntity<ApiResult<?>> objectApiCreate(
            @PathVariable(name = "roles_id", required = false) Long rolesId,
            @Valid @RequestBody RegisterDto registerDto) {
        try {
            RegisterDto created = iRegisterServices.objectServiceCreate(rolesId, registerDto);
            return ResponseEntity.ok(ApiResult.success(created));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/register/api/v1.0.0/create"));
        }
    }

    @Override
    public ResponseEntity<ApiResult<?>> objectApiCreate(RegisterDto registerDto) {
        return null;
    }

    // LIST Register(Api)
    @GetMapping("/list")
    @Override
    public ResponseEntity<ApiResult<List<RegisterDto>>> objectApiList() {
        try {
            List<RegisterDto> list = iRegisterServices.objectServiceList();
            return ResponseEntity.ok(ApiResult.success(list));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/register/api/v1.0.0/list"));
        }
    }

    // FIND Register(Api)
    @GetMapping({"/find","/find/{id}"})
    @Override
    public ResponseEntity<ApiResult<?>> objectApiFindById(@PathVariable(name="id",required = false) Long id) {
        try {
            if (id == null) throw new NullPointerException("Null pointer exception: Null değer");
            if (id == 0) throw new _400_BadRequestException("Bad Request Exception: Kötü istek");
            if (id < 0) {
                return ResponseEntity.ok(ApiResult.unauthorized("Yetkisiz giriş", "/register/api/v1.0.0/find"));
            }

            RegisterDto found = (RegisterDto) iRegisterServices.objectServiceFindById(id);
            return ResponseEntity.ok(ApiResult.success(found));
        } catch (_400_BadRequestException ex) {
            return ResponseEntity.ok(ApiResult.error("badRequest", ex.getMessage(), "/register/api/v1.0.0/find"));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/register/api/v1.0.0/find"));
        }
    }

    // UPDATE Register(Api)
    @PutMapping({"/update","/update/{id}"})
    @Override
    public ResponseEntity<ApiResult<?>> objectApiUpdate(
            @PathVariable(name="id",required = false) Long id,
            @Valid @RequestBody RegisterDto registerDto) {
        try {
            RegisterDto updated = (RegisterDto) iRegisterServices.objectServiceUpdate(id, registerDto);
            return ResponseEntity.ok(ApiResult.success(updated));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/register/api/v1.0.0/update"));
        }
    }

    // DELETE Register(Api)
    @DeleteMapping({"/delete","/delete/{id}"})
    @Override
    public ResponseEntity<ApiResult<?>> objectApiDelete(@PathVariable(name="id",required = false) Long id) {
        try {
            String deleted = iRegisterServices.objectServiceDelete(id).toString();
            return ResponseEntity.ok(ApiResult.success(deleted));
        } catch (Exception ex) {
            return ResponseEntity.ok(ApiResult.error("serverError", ex.getMessage(), "/register/api/v1.0.0/delete"));
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // EMAIL CONFIRMATION
    //http://localhost:4444/register/api/v1/confirm?token=ca478481-5f7a-406b-aaa4-2012ebe1afb4
    @GetMapping("/confirm")
    public ResponseEntity<String> emailTokenConfirmation(@RequestParam("token") String token) {
        Optional<ForRegisterTokenEmailConfirmationEntity> tokenConfirmationEntity = registerServicesImpl.findTokenConfirmation(token);
        tokenConfirmationEntity.ifPresent(registerServicesImpl::emailTokenConfirmation);
        String html="<!doctype html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "  <title>Register</title>\n" +
                "  <meta charset=\"utf-8\">\n" +
                "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n" +
                "  <style>\n" +
                "    body{ background-color: black; color:white; }\n" +
                "  </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <p style='padding:4rem;'>Üyeliğiniz Aktif olunmuştur.  <a href='http://localhost:3000'>Ana sayfa için tıklayınız </a></p>\n" +
                "</body>\n" +
                "</html>";
        return ResponseEntity.ok(html);
    }

} // end RegisterApiImpl
