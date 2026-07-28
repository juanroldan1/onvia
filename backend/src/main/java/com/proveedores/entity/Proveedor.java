package com.proveedores.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "proveedor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombreNegocio;

    private String ciudad;

    @Column(length = 1000)
    private String descripcion;

    private String whatsapp;
    private String email;
    private String fotoUrl;

    private Boolean verificado;
    private String badge; // "Destacado", "Verificado", "Nuevo"

    private String estado; // "PENDIENTE", "APROBADO", "RECHAZADO"

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Producto> productos;

    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Resena> resenas;

    private LocalDateTime fechaRegistro;

    @PrePersist
    public void prePersist() {
        if (fechaRegistro == null) {
            fechaRegistro = LocalDateTime.now();
        }
        if (verificado == null) {
            verificado = false;
        }
        if (estado == null) {
            estado = "PENDIENTE";
        }
    }
}
