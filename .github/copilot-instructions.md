<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Proyecto: El Impostor - Progressive Web App

Este es un proyecto de PWA completamente funcional para el juego del Impostor con arquitectura React + TypeScript.

### Proyecto Completado

✅ **Scaffolding**: Proyecto Vite React + TypeScript configurado
✅ **Dependencias**: React, Framer Motion, Lucide React, Tailwind CSS instalados
✅ **Estilos**: Paleta roja/negra agresiva implementada en Tailwind
✅ **Estructuras de Pantalla**: 3 pantallas principales creadas
✅ **Componentes**: RevealCard, PackageCard, Timer, CreateCustomPackageModal
✅ **PWA**: Manifest.json y Service Worker configurados
✅ **Build**: Compilación exitosa sin errores

### Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo (localhost:5173)
npm run build    # Build para producción
npm run preview  # Vista previa del build
```

### Características Implementadas

🎮 **Gameplay**
- Sistema de selección de palabras de múltiples paquetes
- Crear paquetes personalizados y guardarlos en LocalStorage
- Asignación aleatoria de roles (Tripulante/Impostor)
- Mecanismo de tarjeta deslizable para revelar roles
- Temporizador de debate configurable
- Sistema de rondas infinitas o limitadas

🎨 **UI/UX**
- Paleta roja (#dc2626) y negra (#0a0a0a) con acentos agresivos
- Interfaz limpia sin anuncios ni paywalls
- Diseño responsive móvil-first
- Animaciones suaves con Framer Motion
- Iconos vectoriales de Lucide React

📱 **PWA**
- Service Worker para funcionamiento offline
- Manifest.json para instalación nativa
- LocalStorage para persistencia de datos
- Caching inteligente de assets

### Estructura del Proyecto

```
src/
├── App.tsx                          # Componente raíz
├── main.tsx                         # Entry point
├── index.css                        # Estilos Tailwind
├── screens/
│   ├── GameSettingsScreen.tsx       # Configuración de partida
│   ├── PackageSelectionScreen.tsx   # Selección de paquetes
│   └── GamePlayScreen.tsx           # Gameplay principal
├── components/
│   ├── RevealCard.tsx               # Card deslizable
│   ├── PackageCard.tsx              # Tarjeta de paquete
│   ├── CreateCustomPackageModal.tsx # Modal personalizado
│   └── Timer.tsx                    # Temporizador
public/
├── manifest.json                    # PWA metadata
└── service-worker.js                # Service Worker

Configuración:
├── tailwind.config.js               # Colores personalizados
├── postcss.config.js                # PostCSS config
├── vite.config.ts                   # Vite config
├── tsconfig.json                    # TypeScript config
```

### Flujo de Uso

1. **Pantalla 1**: El usuario configura número de jugadores, impostores, rondas y duración
2. **Pantalla 2**: Selecciona paquetes de palabras (animales, películas, etc.) o crea los suyos
3. **Pantalla 3**: Cada jugador desliza la tarjeta para revelar si es Tripulante o Impostor
4. **Debate**: Temporizador activo, debate entre jugadores
5. **Resultado**: Mostrar quién era el Impostor y opción de nueva ronda

### LocalStorage

- `impostor_players`: Nombres de jugadores guardados
- `impostor_custom_packages`: Paquetes de palabras personalizados

### Notas Técnicas

- Vite para builds ultrarrápidos
- TypeScript strict mode habilitado
- Tailwind CSS con colores personalizados (impostor-*)
- Framer Motion para transiciones suaves
- Service Worker con cache-first strategy
- Sin dependencias externas innecesarias

### Desarrollo Futuro

- [ ] Soporte multiidioma
- [ ] Historial de partidas y estadísticas
- [ ] Sonidos y vibraciones
- [ ] Temas personalizables
- [ ] Compartir partidas entre dispositivos
- [ ] Integración con redes sociales
