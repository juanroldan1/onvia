package com.proveedores.observer;

import com.proveedores.entity.ClickContacto;
import com.proveedores.repository.ClickContactoRepository;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class EstadisticasObserver {

    private final ClickContactoRepository repository;

    public EstadisticasObserver(ClickContactoRepository repository) {
        this.repository = repository;
    }

    @EventListener
    public void handleContactoEvent(ContactoEvent event) {
        ClickContacto click = ClickContacto.builder()
                .proveedorId(event.getProveedorId())
                .canal(event.getCanal())
                .build();
        
        repository.save(click);
        System.out.println("[OBSERVER] Evento guardado en BD: Clic en proveedor #" 
                           + event.getProveedorId() + " canal: " + event.getCanal());
    }
}
