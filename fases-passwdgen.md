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

## Fase 3 — ~~Características extendidas de generación~~ *(saltada — los checkboxes ya lo cubren)*

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

## Fase 7 — Indicador de fortaleza + entropía

- Calcular bits de entropía de la contraseña generada.
- Fórmula contraseña: `log2(tamaño_charset) * longitud`.
- Fórmula passphrase: `log2(tamaño_diccionario) * cantidad_palabras`.
- Mostrar barra de fortaleza con colores: rojo (muy débil), naranja (débil), amarillo (media), verde (fuerte), verde oscuro (muy fuerte).
- Clasificación: <20 bits = muy débil, 20-39 = débil, 40-59 = media, 60-79 = fuerte, ≥80 = muy fuerte.
- Actualizar en tiempo real al cambiar opciones.
- Componente reutilizable `StrengthMeter.vue`.

## Fase 8 — Historial de contraseñas en sesión

- Guardar últimas 10 contraseñas generadas en un array persistido con `useLocalStorage`.
- Mostrarlas en una lista debajo del generador actual.
- Cada entrada con botón "Copiar" individual.
- Botón "Limpiar historial".
- Componente `HistoryList.vue`.
- Los componentes se mantienen montados al cambiar de pestaña (`v-show` en vez de `v-if`).
- Usar flag `initial` en los composables para no duplicar la primera generación en el historial al recargar.

## Fase 9 — Preferencias persistentes

- Guardar opciones del generador en `localStorage` con `useLocalStorage` de `@vueuse/core`.
- Restaurar al recargar la página: longitud, checkboxes, exclusión de ambiguos, sin repeticiones, cantidad de palabras, capitalizar.
- Claves: `pwdgen-options` y `pwdgen-passphrase-options`.

## Fase 10 — Evitar caracteres repetidos consecutivos

- Opción en checkboxes: "Evitar repeticiones consecutivas".
- Al generar, asegurar que ningún carácter se repita seguido (ej: evitar `aa`, `11`, `!!`).
- Si el charset tiene un solo carácter, se genera igual (no hay alternativa).

---

## Árbol de componentes

```
App.vue
├── Header.vue (título + toggle de tema 🌙/☀️)
├── HomeView.vue (tabs: Contraseña | Passphrase)
│   ├── PasswordGenerator.vue
│   │   ├── PasswordDisplay.vue
│   │   │   └── StrengthMeter.vue
│   │   ├── PasswordOptions.vue
│   │   └── HistoryList.vue
│   └── PassphraseGenerator.vue
│       ├── PassphraseDisplay.vue
│       │   └── StrengthMeter.vue
│       ├── PassphraseOptions.vue
│       └── HistoryList.vue
```

## Stack técnico

| Herramienta | Versión/Notas |
|-------------|--------------|
| Vue 3 | Composition API + `<script setup>` |
| Vite | Última estable |
| TypeScript | Tipado estricto |
| @vueuse/core | `useDark`, `useToggle`, `useLocalStorage` |
| GitHub Actions | Deploy automático a `gh-pages` |

## Verificación

- `npm run dev` → servidor local funciona.
- `npm run build` → build sin errores.
- `npm run preview` → sirve el build correctamente.
- Deploy → GitHub Pages actualizado tras push a `main`.
