package com.hamitmizrak.business.services.interfaces;

import com.hamitmizrak.business.dto.BlogDto;
import com.hamitmizrak.business.services.ICrudService;
import com.hamitmizrak.business.services.IModelMapperService;
import com.hamitmizrak.business.services.IPicturesService;
import com.hamitmizrak.data.entity.BlogEntity;

// D: Dto
// E: Entity
public interface IBlogServices<D, E>  extends IModelMapperService<D,E>,ICrudService<D,E>, IPicturesService<BlogDto, BlogEntity> {

    // SPEED DATA
    public String blogSpeedData(Long data);

    // ALL DELETE
    public String blogAllDelete();
}
