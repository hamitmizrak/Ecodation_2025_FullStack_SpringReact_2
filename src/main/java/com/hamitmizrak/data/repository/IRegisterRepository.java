package com.hamitmizrak.data.repository;

import com.hamitmizrak.data.entity.RegisterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
CrudRepository
JpaRepository
PagingAndSortingRepository
 */

@Repository
public interface IRegisterRepository extends JpaRepository<RegisterEntity,Integer> {
}
