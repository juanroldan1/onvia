package com.proveedores.observer;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class ContactoEventPublisher {

    private final ApplicationEventPublisher eventPublisher;

    public ContactoEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void publicarContacto(Long proveedorId, String canal) {
        ContactoEvent event = new ContactoEvent(this, proveedorId, canal);
        eventPublisher.publishEvent(event);
    }
}
