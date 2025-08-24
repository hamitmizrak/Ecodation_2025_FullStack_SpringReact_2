package com.hamitmizrak.business.services.interfaces;

import com.hamitmizrak.business.dto.RegisterDto;
import com.hamitmizrak.business.services.ICrudService;
import com.hamitmizrak.business.services.IModelMapperService;
import com.hamitmizrak.business.services.IPicturesService;

/*
 Register başlangıçta pasif durumda;
 1- Ancak mail onaylanmasıyla aktifleşecek.
 2- SMS pin code:
*/

// D: Dto
// E: Entity

// Register(N) Roles(M)
public interface IRegisterServices<D, E>  extends IModelMapperService<D,E>,
        ICrudService<D,E>, IPicturesService {

    // SPEED DATA
    public String registerSpeedData(Long data);

    // USER ALL DELETE
    public String registerAllUSerDelete();

    // CREATE
    public RegisterDto objectServiceCreate(Long rolesId, D d);

    ////////////////////////////////////////////////
    // EMAIL CONFIRMATION - TOKEN
}// end IRegisterService
