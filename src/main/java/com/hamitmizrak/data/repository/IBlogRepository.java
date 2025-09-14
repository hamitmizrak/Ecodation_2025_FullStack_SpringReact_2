package com.hamitmizrak.data.repository;


import com.hamitmizrak.data.entity.BlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// CrudRepository<RegisterEntity,Long>
// JpaRepository<RegisterEntity,Long>
// PagingAndSortingRepository<RegisterEntity,Long>
@Repository
public interface IBlogRepository  extends JpaRepository<BlogEntity, Long> {

    // Delivered Query (Kendi sorgumu yazdım)
    Optional<BlogEntity> findBlogEntityByHeader(String header);

    // Gerekirse ek sorgular

}
