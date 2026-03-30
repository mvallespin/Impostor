# El Impostor - Progressive Web App

PWA "Pass & Play" para jugar al Impostor en el mismo dispositivo.

## Estado actual (Marzo 2026)

### Flujo de juego implementado
- Configuracion de jugadores con nombres personalizados.
- Ajuste de numero de impostores (siempre menor que jugadores).
- Seleccion de paquetes de palabras (incluye paquetes por defecto + paquetes personalizados en sesion).
- Fase de revelado por turnos: cada jugador ve su rol/palabra en privado.
- Fase de debate manual.
- Pantalla final para desvelar al impostor y jugar otra ronda.

### Paquetes por defecto actuales
- General
- Comida
- Peliculas
- Series
- Famosos
- Animales

Orden de visualizacion en la pantalla de paquetes:
1. General
2. Comida
3. Peliculas
4. Series
5. Famosos
6. Animales

### PWA
- Registro de Service Worker en `src/main.tsx`.
- Cache de shell basico y runtime en `public/service-worker.js`.
- Manifest configurado en `public/manifest.json`.

## Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Como jugar

1. Entra en la pantalla inicial y anade nombres de jugadores.
2. Ajusta el numero de impostores.
3. Pulsa "Seleccionar Palabras".
4. Elige uno o varios paquetes y pulsa "Iniciar".
5. Pasad el movil por turnos para revelar rol/palabra.
6. Debatid y pulsad "Desvelar Impostor".
7. Iniciad otra ronda si quereis.

## Persistencia actual

- Se genera un id de sesion por pestaña/navegador (`sessionStorage`: `impostor_session_id`).
- Los nombres de jugadores se guardan por sesion en `localStorage` con clave namespaced: `${sessionId}_impostor_players`.
- Los paquetes personalizados se mantienen en memoria durante la sesion de la app (no se guardan en localStorage actualmente).

## Estructura principal

```text
src/
   App.tsx
   main.tsx
   index.css
   screens/
      GameSettingsScreen.tsx
      PackageSelectionScreen.tsx
      GamePlayScreen.tsx
   components/
      PackageCard.tsx
      CreateCustomPackageModal.tsx
      RevealCard.tsx
      Timer.tsx
public/
   manifest.json
   service-worker.js
```

## Notas

- `RevealCard.tsx` y `Timer.tsx` existen en el proyecto, pero no forman parte del flujo activo actual.
- En el estado actual no hay temporizador configurable de debate ni seleccion de rondas desde UI.

## Roadmap

- [ ] Soporte multiidioma
- [ ] Historial y estadisticas de partidas
- [ ] Sonidos y vibraciones
- [ ] Sincronizacion/compartir entre dispositivos

## Licencia

MIT
