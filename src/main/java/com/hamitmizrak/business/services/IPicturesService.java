package com.hamitmizrak.business.services;

import java.util.List;

// D: Dto
// E: Entity
public interface IPicturesService<D, E> {

    // Görsel URL yönetimi (best practice: alan bazlı update)
    D updateImageUrl(Long id, String imageUrl);
    D clearImageUrl(Long id);

} // end ICrudService
