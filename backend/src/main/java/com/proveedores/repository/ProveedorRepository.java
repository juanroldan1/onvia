package com.proveedores.repository;

import com.proveedores.entity.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {

    @Query("SELECT p FROM Proveedor p WHERE " +
           "(:categoriaId IS NULL OR p.categoria.id = :categoriaId) AND " +
           "(:query IS NULL OR LOWER(p.nombreNegocio) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.descripcion) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.ciudad) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Proveedor> buscarProveedores(@Param("categoriaId") Long categoriaId, @Param("query") String query);
}
