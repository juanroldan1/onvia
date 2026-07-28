package com.proveedores.observer;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ContactoEvent extends ApplicationEvent {

    private final Long proveedorId;
    private final String canal;

    public ContactoEvent(Object source, Long proveedorId, String canal) {
        super(source);
        this.proveedorId = proveedorId;
        this.canal = canal;
    }
}
