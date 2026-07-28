package com.proveedores.controller;

import com.proveedores.entity.Categoria;
import com.proveedores.service.CategoriaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Categoria> obtenerCategorias() {
        return service.listarTodas();
    }
}
