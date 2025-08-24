package com.hamitmizrak.runner;



import com.hamitmizrak.business.role.ERole;
import com.hamitmizrak.data.entity.RoleEntity;
import com.hamitmizrak.data.repository.IRoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumSet;
import java.util.Set;

@Component
@Order(2)
public class _3_Register_LoginRunner implements CommandLineRunner {

    private static final Set<ERole> DEFAULT_ROLES = EnumSet.of(
            ERole.ADMIN,
            ERole.USER
    );

    private final IRoleRepository roleRepository;

    public _3_Register_LoginRunner(IRoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        long existing = roleRepository.count();
        if (existing > 0) return;

        for (ERole role : DEFAULT_ROLES) {
            RoleEntity entity = new RoleEntity();
            // Projene göre: entity.setRoleName(role); // veya entity.setName(role.name());
            entity.setRoleName(String.valueOf(role));
            roleRepository.save(entity);
        }
    }
}
