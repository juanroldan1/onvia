package com.proveedores.controller;

import com.proveedores.entity.Proveedor;
import com.proveedores.service.ProveedorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {

    private final ProveedorService service;

    public ProveedorController(ProveedorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Proveedor> listar(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) String query
    ) {
        return service.buscarProveedores(categoriaId, query);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<Proveedor> registrar(
            @RequestBody Proveedor proveedor,
            @RequestParam(required = false) Long categoriaId
    ) {
        Proveedor creado = service.registrarProveedor(proveedor, categoriaId);
        return ResponseEntity.ok(creado);
    }
}
