# Plan — Password Generator (Vue 3 + Vite)

## Fase 1 — Estructura + Auto-deploy

- Inicializar proyecto con `npm create vite@latest` (Vue 3 + TypeScript).
- Instalar dependencias: `vue-router` (si se necesita), `@vueuse/core` (utilidades).
- Crear estructura de carpetas:
  - `src/` → `components/`, `composables/`, `utils/`, `assets/`, `views/`, `store/` (reactivo simple o Pinia).
- Configurar `vite.config.ts` con base relativa para deploy.
- Auto-deploy: agregar workflow de GitHub Pages (`.github/workflows/deploy.yml`) que buildée y deployee a `gh-pages`.
- Agregar `favicon` y título de página "Password Generator".

## Fase 2 — Generador de contraseñas al estilo BitWarden

- Crear composable `usePasswordGenerator` en `src/composables/usePasswordGenerator.ts`.
- Lógica central:
  - Generar contraseña aleatoria con caracteres de: mayúsculas (A-Z), minúsculas (a-z), números (0-9), símbolos (!@#$%^&*()_+-=[]{}|;:,.<>?).
  - Permitir excluir tipos de caracteres (checkbox).
  - Permitir excluir caracteres ambiguos (ej: `oO0`, `l1I`, `|`).
  - Longitud configurable (slider/input numérico, rango 4-128, default 20).
  - Botón "Generar" que produce una nueva contraseña.
  - Botón "Copiar" que copia al portapapeles con `navigator.clipboard.writeText`.
- Componente `PasswordDisplay.vue`:
  - Muestra la contraseña generada en grande y con fuente monospace.
  - Un botón para regenerar, otro para copiar (con feedback "¡Copiado!").
- Componente `PasswordOptions.vue`:
  - Checkboxes para incluir/excluir: mayúsculas, minúsculas, números, símbolos, excluir ambiguos.
  - Slider o input numérico para longitud.

## Fase 3 — Características extendidas de generación (números + especiales + longitud + solo mayúsculas/solo minúsculas/mezcla)

- En `usePasswordGenerator`, agregar modos de composición de caracteres:
  - **Solo mayúsculas**: el charset solo contiene A-Z.
  - **Solo minúsculas**: el charset solo contiene a-z.
  - **Mezcla (default)**: usa el charset completo (mayúsculas + minúsculas + números + símbolos según checkboxes).
- Agregar un grupo de radio buttons o un select en `PasswordOptions.vue` para elegir el modo.
- Mantener la opción de incluir números y especiales habilitada para los modos que lo permitan.
- La longitud siempre debe ser configurable en todos los modos.

## Fase 4 — Generador de passphrase (palabras random del diccionario)

- Crear composable o función `usePassphraseGenerator` en `src/composables/usePassphraseGenerator.ts`.
- Obtener lista de palabras en inglés:
  - Opción A: incluir un array de ~2000 palabras comunes hardcodeado en `src/utils/dictionary.ts`.
  - Opción B: fetch a un API pública (ej: `https://random-word-api.herokuapp.com`).
  - Elegir Opción A (sin depender de red).
- Generar N palabras aleatorias del diccionario, unidas con guión medio (`-`).
- Opciones configurables:
  - Cantidad de palabras (slider/input, rango 2-12, default 4).
  - Capitalizar primera letra de cada palabra (toggle).
- Componente `PassphraseDisplay.vue`: análogo a `PasswordDisplay`, muestra la passphrase.
- Componente `PassphraseOptions.vue`: controles de cantidad de palabras + toggle de capitalización.
- Botón "Generar" y "Copiar" en el mismo componente.

## Fase 5 — Botones de generar y copiar con feedback visual

- Botón "Generar" en cada generador (`PasswordDisplay` y `PassphraseDisplay`):
  - Al hacer clic, llama a la función de generación correspondiente.
  - Se puede atar a tecla Enter.
- Botón "Copiar":
  - Usa `navigator.clipboard.writeText(contraseña)`.
  - Muestra feedback visual tipo tooltip o badge "¡Copiado!" durante 2 segundos.
  - Un composable `useClipboard` que maneje el estado de "copiado" y el timeout.
- Deshabilitar botón "Copiar" si la contraseña está vacía.
- Deshabilitar botón "Generar" si no hay ningún tipo de carácter seleccionado.

## Fase 6 — Temas claro y oscuro

- Usar `@vueuse/core` → `useDark`, `useToggle` para manejar el tema.
- Aplicar clase `dark` al `<html>` cuando el tema oscuro esté activo.
- Usar CSS personalizado con variables nativas de CSS (no Tailwind a menos que se quiera agregar).
- Variables de color definidas en `:root` (claro) y `.dark` (oscuro):
  - `--bg`, `--bg-card`, `--text`, `--text-secondary`, `--border`, `--accent`, `--accent-hover`.
- Botón toggle en el header con ícono de sol/luna (usar emojis o SVG inline).
- Persistir preferencia en `localStorage`.

---

## Árbol de componentes (propuesto)

```
App.vue
├── Header.vue (título + toggle de tema)
├── PasswordGenerator.vue (pestaña/sección 1)
│   ├── PasswordOptions.vue
│   └── PasswordDisplay.vue
├── PassphraseGenerator.vue (pestaña/sección 2)
│   ├── PassphraseOptions.vue
│   └── PassphraseDisplay.vue
```

## Stack técnico

| Herramienta | Versión/Notas |
|-------------|--------------|
| Vue 3 | Composition API + `<script setup>` |
| Vite | Última estable |
| TypeScript | Tipado estricto |
| @vueuse/core | `useDark`, `useClipboard`, `useToggle` |
| GitHub Actions | Deploy automático a `gh-pages` |

## Verificación

- `npm run dev` → servidor local funciona.
- `npm run build` → build sin errores.
- `npm run preview` → sirve el build correctamente.
- Deploy → GitHub Pages actualizado tras push a `main`.
