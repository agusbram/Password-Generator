# Password-Generator — Agent Guide

## Project state

Vue 3 + Vite + TypeScript password generator (Bitwarden-like). SPA con hash router para GitHub Pages. Sin tests aún.

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor local con hot-reload |
| `npm run build` | Typecheck + build producción (output en `dist/`) |
| `npm run preview` | Previsualizar build local |

## Estructura

```
src/
├── components/     # Componentes Vue
├── composables/    # Lógica reactiva reutilizable
├── views/          # Vistas del router
├── utils/          # Funciones puras
├── store/          # Estado global (reactivo simple o Pinia)
├── router/         # Config de rutas
├── assets/         # Estáticos compilados por Vite
├── App.vue         # Raíz
├── main.ts         # Entry point
└── style.css       # Estilos globales con variables CSS
```

## Deploy

GitHub Actions en `.github/workflows/deploy.yml`: build + deploy a GitHub Pages automáticamente al pushear a `main`. La `base` de Vite es `/Password-Generator/`.

## Convenciones

- `<script setup lang="ts">` en todos los componentes
- Plannotator configurado en `.opencode/opencode.json` con deps en `.opencode/package.json`
- Temas claro/oscuro con clase `.dark` en `<html>` y variables CSS
- Responde siempre en español
