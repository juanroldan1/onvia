package com.proveedores.repository;

import com.proveedores.entity.ClickContacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClickContactoRepository extends JpaRepository<ClickContacto, Long> {
}
