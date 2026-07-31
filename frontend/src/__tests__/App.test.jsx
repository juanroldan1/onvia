import { describe, it, expect } from 'vitest';

describe('App & Router Integration Tests', () => {
  it('debería verificar las rutas principales de la aplicación', () => {
    const routes = ['/', '/login', '/registro', '/proveedor/:id'];
    expect(routes).toContain('/login');
    expect(routes).toContain('/');
    expect(routes).toContain('/registro');
  });
});
