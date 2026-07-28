package com.proveedores.service;

import com.proveedores.entity.Categoria;
import com.proveedores.entity.Proveedor;
import com.proveedores.repository.CategoriaRepository;
import com.proveedores.repository.ProveedorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;
    private final CategoriaRepository categoriaRepository;

    public ProveedorService(ProveedorRepository proveedorRepository, CategoriaRepository categoriaRepository) {
        this.proveedorRepository = proveedorRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<Proveedor> buscarProveedores(Long categoriaId, String query) {
        return proveedorRepository.buscarProveedores(categoriaId, query);
    }

    public Proveedor obtenerPorId(Long id) {
        return proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor con ID " + id + " no encontrado."));
    }

    public Proveedor registrarProveedor(Proveedor proveedor, Long categoriaId) {
        if (categoriaId != null) {
            Categoria cat = categoriaRepository.findById(categoriaId).orElse(null);
            proveedor.setCategoria(cat);
        }
        proveedor.setEstado("PENDIENTE");
        return proveedorRepository.save(proveedor);
    }
}
