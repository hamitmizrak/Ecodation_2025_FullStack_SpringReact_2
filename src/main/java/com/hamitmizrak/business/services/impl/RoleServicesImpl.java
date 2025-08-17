package com.hamitmizrak.business.services.impl;

import com.hamitmizrak.bean.ModelMapperBean;
import com.hamitmizrak.business.dto.RoleDto;
import com.hamitmizrak.business.services.interfaces.IRoleServices;
import com.hamitmizrak.data.entity.RoleEntity;
import com.hamitmizrak.data.repository.IRoleRepository;
import com.hamitmizrak.exception.HamitMizrakException;
import com.hamitmizrak.exception._404_NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


// LOMBOK
@RequiredArgsConstructor // Lombok: Dependency Injection
@Log4j2

// Service: Asıl İş yükünü yapandır
@Service
@Component("roleServicesImpl") // @Component ==> Spring'in bir parçasısın(IOC)
public class RoleServicesImpl implements IRoleServices<RoleDto, RoleEntity> {

    // Field (Injection)
    // 1.YOL (FIELD INJECTION)
    /*
    @Autowired
    private IRoleRepository iRoleRepository;
     */

    // 2.YOL (CONSTRUCTOR INJECTION)
    /*
    private IRoleRepository iRoleRepository;
    @Autowired
    public RoleServicesImpl(IRoleRepository iRoleRepository) {
        this.iRoleRepository = iRoleRepository;
    }
     */

    // 3.YOL (LOMBOK CONSTRUCTOR INJECTION)
    private final IRoleRepository iRoleRepository;
    private final ModelMapperBean modelMapperBean;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Model Mapper
    @Override
    public RoleDto entityToDto(RoleEntity roleEntity) {
        return modelMapperBean.modelMapperMethod().map(roleEntity, RoleDto.class);
    }

    @Override
    public RoleEntity dtoToEntity(RoleDto roleDto) {
        return modelMapperBean.modelMapperMethod().map(roleDto, RoleEntity.class);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CRUD
    // CREATE (RoleDto)
    @Transactional // Create, Update, Delete
    @Override
    public RoleDto objectServiceCreate(RoleDto roleDto) {
        // Mapper
        RoleEntity roleEntity = dtoToEntity(roleDto);
        roleEntity.setRoleName(roleEntity.getRoleName().toUpperCase()); // RoleName bütün karakter büyük olsun
        // Database Kaydetmek
        RoleEntity roleEntityAfterSave = iRoleRepository.save(roleEntity);
        // Kayıt sonrası Dto verilerini değiştirmek
        roleDto.setRoleId(roleEntityAfterSave.getRoleId());
        roleDto.setSystemCreatedDate(roleEntityAfterSave.getSystemCreatedDate());
        return roleDto;
    } // end  roleDto create

    // LIST (RoleDto)
    @Override
    public List<RoleDto> objectServiceList() {
        // Entity List
        List<RoleEntity> roleEntityList = iRoleRepository.findAll();

        // Mapper
        List<RoleDto> roleDtoList = new ArrayList<>();

        // Entity To Dto
        for (RoleEntity entityTemp : roleEntityList) {
            RoleDto roleDto = entityToDto(entityTemp);
            roleDtoList.add(roleDto);
        }
        return roleDtoList;
    } // end  roleDto list

    // FIND BY ID (RoleDto)
    @Override
    public RoleDto objectServiceFindById(Long id) {
        // 1.YOL
        /*
        Optional<RoleEntity> optionalRoleEntity = iRoleRepository.findById(id);
        // isPresent: Entity varsa
        if(optionalRoleEntity.isPresent()){
            return entityToDto(optionalRoleEntity.get());
        }
         */

        // 2.YOL
        Boolean isRoleFindById = iRoleRepository.findById(id).isPresent();
        RoleEntity roleEntity=null;
        if (isRoleFindById) {
             roleEntity = iRoleRepository.findById(id).orElseThrow(
                    //()-> { return new _404_NotFoundException(id+" nolu ID bulunamadı");}  //1.YOL
                    () -> new _404_NotFoundException(id + " nolu ID bulunamadı") // 2.YOL
            );
        } else if (isRoleFindById == null) {
            throw new HamitMizrakException("Role Dto id boş değer geldi");
        }
        return entityToDto(roleEntity);
    } // end  roleDto find by id

    // UPDATE (RoleDto)
    @Transactional  //Create, Update, Delete
    @Override
    public RoleDto objectServiceUpdate(Long id, RoleDto roleDto) {
        // Find
        RoleDto roleDtoUpdateFind= objectServiceFindById(id);

        // Update
        RoleEntity roleEntityUpdate= dtoToEntity(roleDtoUpdateFind);
        if(roleEntityUpdate!=null){
            roleEntityUpdate.setRoleName(roleDto.getRoleName());
            iRoleRepository.save(roleEntityUpdate);
        }

        // Kayıt sonrası Dto set
        roleDto.setRoleId(roleEntityUpdate.getRoleId());
        roleDto.setRoleName(roleEntityUpdate.getRoleName());
        //return entityToDto(roleEntityUpdate); //1.YOL
        return roleDto; //2.YOL
    } // end  roleDto update

    // DELETE (RoleDto)
    @Transactional  // Create, Update, Delete
    @Override
    public RoleDto objectServiceDelete(Long id) {

        // Delete
        RoleEntity roleEntityDelete= dtoToEntity(objectServiceFindById(id));
        if(roleEntityDelete!=null){
            // iRoleRepository.delete(roleEntityDelete); //1.YOL (Object Delete)
            iRoleRepository.deleteById(id);// 2.YOL (Object via by id)
            return entityToDto(roleEntityDelete);
        }else{
            throw new HamitMizrakException(roleEntityDelete + " Silinemedi");
        }
    } // end  roleDto delete

} // end RoleServicesImpl
