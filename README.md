# Cuba News

lector de noticias cubano que agrega contenido de múltiples fuentes RSS independientes en una interfaz moderna y centrada.

## Características

- **Agregación de fuentes**: Noticias de las principales publicaciones cubanas en un solo lugar
- **Filtrado por fuente**: Navega entre Granma, Portal Cuba, Havana Times, 14ymedio, Trabajadores y Juventud Rebelde
- **Interfaz moderna**: Diseño limpio y responsivo construido con Next.js y Tailwind CSS
- **Actualización automática**:Las últimas noticias directamente desde los feeds RSS

## Fuentes disponibles

| Fuente | Idioma |
|--------|--------|
| Granma | Español |
| Portal Cuba | Español |
| Havana Times | English |
| 14ymedio | Español |
| Trabajadores | Español |
| Juventud Rebelde | Español |

## Tecnologías

- **Framework**: Next.js 16
- **UI**: React 19, Tailwind CSS 4
- **Estado**: Zustand
- **RSS**: rss-parser
- **Fechas**: date-fns

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Construcción para producción

```bash
npm run build
npm start
```

## Licencia

MIT