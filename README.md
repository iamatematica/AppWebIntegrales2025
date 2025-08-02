# App Web Integrales 2025

Pequeña aplicación educativa con ejercicios interactivos de integrales impropias.

## Mejoras recientes

- Interfaz modernizada y adaptable a móviles.
- Sistema de puntajes, estadísticas y ranking local.
- Desbloqueo de logros (badges) para motivar a los estudiantes.
- Retroalimentación visual con animaciones y efectos.
- Modo oscuro con alternancia.
- Guardado de progreso y reanudación automática.
- Revisión de errores al finalizar cada ejercicio.
- Onboarding inicial para nuevos usuarios.
- Base de ejercicios externalizada en `exercises.json`.

## Pruebas manuales

- **Tipo inexistente**
  1. Abrir la consola del navegador.
  2. Ejecutar `currentType = 'inexistente'; startExercise();`.
  3. Verificar que se muestre el mensaje: "No hay ejercicios disponibles para este tipo.".

- **Tipo sin ejercicios**
  1. Abrir la consola del navegador.
  2. Ejecutar `exercisesByType['vacio'] = []; currentType = 'vacio'; startExercise();`.
  3. Verificar que se muestre el mensaje: "No hay ejercicios disponibles para este tipo.".

