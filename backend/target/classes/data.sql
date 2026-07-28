-- Insertar Categorías iniciales si no existen
INSERT INTO categoria (id, nombre, slug, icono) 
VALUES (1, 'Cajas y Cartón Corrugado', 'cajas-carton', 'Package')
ON CONFLICT DO NOTHING;

INSERT INTO categoria (id, nombre, slug, icono) 
VALUES (2, 'Vinipel y Películas Strech', 'vinipel-peliculas', 'Layers')
ON CONFLICT DO NOTHING;

INSERT INTO categoria (id, nombre, slug, icono) 
VALUES (3, 'Cintas Adhesivas de Embalaje', 'cintas-embalaje', 'Tag')
ON CONFLICT DO NOTHING;

INSERT INTO categoria (id, nombre, slug, icono) 
VALUES (4, 'Bolsas y Empaques E-commerce', 'empaques-especiales', 'ShieldCheck')
ON CONFLICT DO NOTHING;
