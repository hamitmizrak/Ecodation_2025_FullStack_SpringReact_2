package com.hamitmizrak.business.services.interfaces;

import com.hamitmizrak.business.dto.BlogDto;
import com.hamitmizrak.business.services.ICrudService;
import com.hamitmizrak.business.services.IModelMapperService;

// D: Dto
// E: Entity
public interface IBlogServices<D, E>  extends IModelMapperService<D,E>,ICrudService<D,E>{


    // Relation
    // CREATE
    BlogDto create(Long categoryId, BlogDto dto);

    // UPDATE
    BlogDto update(Long id, Long categoryId, BlogDto dto);

    // SPEED DATA
    public String blogSpeedData(Long data);

    // ALL DELETE
    public String blogAllDelete();
}
