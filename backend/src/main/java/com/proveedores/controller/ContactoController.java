package com.proveedores.controller;

import com.proveedores.observer.ContactoEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/tracking")
public class ContactoController {

    private final ContactoEventPublisher eventPublisher;

    public ContactoController(ContactoEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    @PostMapping("/contacto")
    public ResponseEntity<Map<String, Object>> registrarContacto(@RequestBody Map<String, Object> payload) {
        Object pId = payload.get("proveedorId");
        String canal = (String) payload.getOrDefault("canal", "whatsapp");

        Long proveedorId = pId != null ? Long.parseLong(pId.toString()) : 0L;

        // Dispara el evento para el patrón Observer
        eventPublisher.publicarContacto(proveedorId, canal);

        return ResponseEntity.ok(Map.of("exito", true, "mensaje", "Evento de contacto registrado correctamente"));
    }
}
