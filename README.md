# El Impostor - Progressive Web App

Una aplicación web progresiva (PWA) multiplayer "Pass & Play" para el juego del Impostor.

## Características

✨ **Gameplay Completo**
- Selección de palabras de múltiples categorías (Animales, Películas, Comida, Lugares, Trabajos, Deportes)
- Crear paquetes de palabras personalizados
- Sistema aleatorio de asignación de roles (Tripulante/Impostor)
- Mecanismo de "tapa" con deslizamiento para revelar roles
- Sistema de rondas y temporizador de debate
- Detección del Impostor mediante pistas opcionales

🎨 **Diseño**
- Paleta de colores roja y negra agresiva y moderna
- Interfaz completamente limpia sin anuncios o pagos
- Diseño móvil-first responsive
- Animaciones suaves con Framer Motion
- Tema oscuro por defecto

📱 **Progressive Web App**
- Funciona offline después de la primera carga
- Installable en dispositivos móviles (iOS y Android)
- Service Worker para almacenamiento en caché
- Manifest.json para instalación nativa
- Almacenamiento persistente con LocalStorage

💾 **Persistencia**
- Guarda automáticamente los nombres de jugadores
- Almacena paquetes de palabras personalizados
- LocalStorage para configuraciones

## Tecnología

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool rápido
- **Tailwind CSS** - Utilidad CSS
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos SVG

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Build para Producción

```bash
npm run build
```

El resultado estará en la carpeta `dist/`.

## Estructura del Proyecto

```
src/
├── App.tsx                 # Componente raíz y enrutamiento
├── main.tsx               # Entry point
├── index.css              # Estilos globales con Tailwind
├── screens/
│   ├── GameSettingsScreen.tsx      # Pantalla de configuración
│   ├── PackageSelectionScreen.tsx  # Selección de paquetes
│   └── GamePlayScreen.tsx          # Gameplay principal
├── components/
│   ├── RevealCard.tsx              # Card deslizable para revelar
│   ├── PackageCard.tsx             # Tarjeta de paquete
│   ├── CreateCustomPackageModal.tsx # Modal para crear paquete
│   └── Timer.tsx                   # Temporizador del debate
└── App.tsx
public/
├── manifest.json           # PWA manifest
└── service-worker.js       # Service worker
```

## PWA Installation

### En Android/Chrome
1. Abre la aplicación en Chrome
2. Click en el menú (⋮)
3. "Instalar aplicación"

### En iOS/Safari
1. Abre la aplicación en Safari
2. Pulsa el botón Compartir
3. "Añadir a pantalla de inicio"

## Cómo Jugar

1. **Configurar Partida**: Selecciona número de jugadores, impostores, rondas y duración
2. **Seleccionar Palabras**: Elige paquetes de palabras o crea los tuyos propios
3. **Juego**: 
   - Cada jugador desliza la tarjeta hacia arriba para revelar su rol
   - Los Tripulantes ven la palabra secreta
   - El Impostor ve "ERES EL IMPOSTOR"
   - Después, todos debaten en el tiempo establecido
   - Votad quién es el Impostor

## Características Planificadas

- [ ] Soporte para múltiples idiomas
- [ ] Historial de partidas
- [ ] Estadísticas de jugador
- [ ] Sonidos y vibraciones
- [ ] Temas personalizables
- [ ] Compartir partidas entre dispositivos

## Licencia

MIT

## Contribuciones

Las contribuciones son bienvenidas. Por favor abre un issue o pull request.

---

Hecho con ❤️ para las reuniones familiares
