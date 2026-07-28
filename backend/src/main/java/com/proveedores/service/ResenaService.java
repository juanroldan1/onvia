package com.proveedores.service;

import com.proveedores.entity.Proveedor;
import com.proveedores.entity.Resena;
import com.proveedores.repository.ProveedorRepository;
import com.proveedores.repository.ResenaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResenaService {

    private final ResenaRepository resenaRepository;
    private final ProveedorRepository proveedorRepository;

    public ResenaService(ResenaRepository resenaRepository, ProveedorRepository proveedorRepository) {
        this.resenaRepository = resenaRepository;
        this.proveedorRepository = proveedorRepository;
    }

    public List<Resena> obtenerPorProveedor(Long proveedorId) {
        return resenaRepository.findByProveedorIdOrderByFechaCreacionDesc(proveedorId);
    }

    public Resena crearResena(Long proveedorId, Resena resena) {
        Proveedor proveedor = proveedorRepository.findById(proveedorId)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado."));
        resena.setProveedor(proveedor);
        return resenaRepository.save(resena);
    }
}
