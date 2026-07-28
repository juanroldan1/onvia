package com.proveedores.controller;

import com.proveedores.entity.Resena;
import com.proveedores.service.ResenaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resenas")
public class ResenaController {

    private final ResenaService service;

    public ResenaController(ResenaService service) {
        this.service = service;
    }

    @GetMapping("/proveedor/{proveedorId}")
    public List<Resena> listarPorProveedor(@PathVariable Long proveedorId) {
        return service.obtenerPorProveedor(proveedorId);
    }

    @PostMapping("/proveedor/{proveedorId}")
    public ResponseEntity<Resena> crearResena(@PathVariable Long proveedorId, @RequestBody Resena resena) {
        return ResponseEntity.ok(service.crearResena(proveedorId, resena));
    }
}
