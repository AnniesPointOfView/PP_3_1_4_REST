package ru.kata.spring.boot_security.rest.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.rest.model.Role;
import ru.kata.spring.boot_security.rest.repository.RoleRepository;

import java.util.Arrays;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    @Transactional
    @Override
    public void createRole(Role role) {
        roleRepository.save(role);
    }

    public List<Role> findAllRolesById(Long[] selectedRoles) {
        List<Long> listRoles = Arrays.asList(selectedRoles);
        return roleRepository.findAllById(listRoles);
    }
}
