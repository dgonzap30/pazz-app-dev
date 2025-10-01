# Pazz Portal

> Portal profesional para socios afiliados - Plataforma web moderna construida con React, TypeScript y Vite

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-Private-red.svg)]()

---

## 📋 Descripción

**Pazz Portal** es una aplicación web profesional diseñada para socios afiliados, ofreciendo una experiencia de usuario pulida y confiable. El portal permite a los socios gestionar sus metas de comisiones, seguimiento de clientes, visualizar promociones activas y avanzar a través de un sistema de niveles basado en ventas acumuladas.

### Características Principales

- **Sistema de Niveles**: Progresión automática (Starter → Master → Legend) basada en ventas acumuladas
- **Gestión de Metas**: Establecimiento y seguimiento de metas mensuales con visualización de progreso
- **Promociones Vigentes**: Visualización de ofertas activas con cálculos de financiamiento
- **Seguimiento de Clientes**: Sistema de atención proactiva para clientes que requieren acción
- **Dashboard Interactivo**: Vista consolidada de métricas clave y acciones pendientes
- **Diseño Responsivo**: Experiencia optimizada para escritorio y móvil

---

## 🛠️ Stack Tecnológico

### Frontend Core
- **React 18.3** - Biblioteca UI con concurrent features
- **TypeScript 5.7** - Tipado estático estricto para prevención de errores
- **Vite 6.0** - Build tool ultrarrápido con HMR optimizado

### Styling y UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Primitivos accesibles y sin estilos
- **Framer Motion** - Animaciones fluidas y profesionales
- **class-variance-authority** - Gestión de variantes de componentes

### Estado y Data Fetching
- **TanStack Query 5.6** - Server state management con caché inteligente
- **React Context** - Estado local para autenticación y UI
- **React Router DOM 7.1** - Routing declarativo

### Formularios y Validación
- **React Hook Form 7.5** - Gestión de formularios performante
- **Zod 3.24** - Schema validation con TypeScript inference

### Testing
- **Vitest 2.1** - Test runner ultrarrápido compatible con Vite
- **Testing Library** - Testing centrado en usuario
- **jsdom** - Simulación de entorno DOM

### Tooling
- **ESLint 9** - Linting con reglas personalizadas
- **size-limit** - Control de bundle size (límite 6MB)
- **pnpm** - Gestor de paquetes eficiente

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 (recomendado: 20.x LTS)
- **pnpm** >= 8.0.0

Para instalar pnpm globalmente:

```bash
npm install -g pnpm
```

---

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd AppAfiliadosPazz
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# API Configuration (stub para desarrollo)
VITE_API_BASE_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
VITE_CDN_URL=https://cdn.pazz.com

# Feature Flags
VITE_ENABLE_REAL_TIME=false
```

### 4. Iniciar Servidor de Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
# Servidor de desarrollo con HMR
pnpm dev

# Tests en modo watch
pnpm test

# Tests con UI interactiva
pnpm test:ui
```

### Calidad de Código

```bash
# Linting
pnpm lint

# Type checking (TypeScript)
pnpm type-check

# Tests (run once)
pnpm test:run

# Coverage
pnpm test:coverage
```

### Build y Deploy

```bash
# Build de producción
pnpm build

# Preview build local
pnpm preview

# Verificar tamaño de bundle
pnpm size-limit
```

### Pipeline Completo

```bash
# Ejecutar todos los checks (CI simulation)
pnpm lint && pnpm type-check && pnpm test:run && pnpm build && pnpm size-limit
```

---

## 📁 Estructura del Proyecto

```
AppAfiliadosPazz/
├── src/
│   ├── types/              # Definiciones de tipos TypeScript
│   │   ├── index.ts        # Exports consolidados
│   │   └── dashboard.ts    # Tipos específicos de dashboard
│   │
│   ├── ui/                 # Componentes UI primitivos (design system)
│   │   ├── button.tsx      # Botón con variantes
│   │   ├── card.tsx        # Contenedor de tarjetas
│   │   ├── modal.tsx       # Diálogos modales
│   │   ├── badge.tsx       # Badges de estado
│   │   ├── spinner.tsx     # Loading spinners
│   │   └── ...             # Más componentes primitivos
│   │
│   ├── core/               # Lógica de negocio y utilidades
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Funciones utilitarias puras
│   │   ├── constants/      # Constantes de aplicación
│   │   └── index.ts        # Exports consolidados
│   │
│   ├── components/         # Componentes de funcionalidad específica
│   │   ├── auth/           # Componentes de autenticación
│   │   ├── dashboard/      # Componentes de dashboard
│   │   └── layouts/        # Layouts y estructura
│   │
│   ├── pages/              # Componentes de página (routes)
│   │   ├── Dashboard.tsx   # Vista principal dashboard
│   │   ├── Login.tsx       # Página de login
│   │   ├── Register.tsx    # Página de registro
│   │   └── ComingSoon.tsx  # Placeholder para funcionalidades futuras
│   │
│   ├── styles/             # Estilos globales
│   │   └── index.css       # Tailwind imports + custom CSS
│   │
│   ├── main.tsx            # Entry point de la aplicación
│   ├── App.tsx             # Componente raíz
│   └── router.tsx          # Configuración de rutas
│
├── docs/                   # Documentación del proyecto
│   ├── DESIGN-PRINCIPLES.md        # Principios de diseño
│   ├── TYPESCRIPT-GUIDELINES.md    # Guías TypeScript
│   └── INTEGRACION-BACKEND.md      # Guía de integración API
│
├── public/                 # Assets estáticos
├── .env.local              # Variables de entorno (git-ignored)
├── CLAUDE.md               # Guía de desarrollo completa
├── package.json            # Dependencias y scripts
├── tsconfig.json           # Configuración TypeScript
├── vite.config.ts          # Configuración Vite
├── tailwind.config.js      # Configuración Tailwind
├── vitest.config.ts        # Configuración Vitest
└── README.md               # Este archivo
```

### Arquitectura de Capas

El proyecto sigue una arquitectura de 3 capas:

1. **Capa UI (`/ui/`)**: Componentes primitivos sin lógica de negocio
   - Props tipadas, estilos con Tailwind
   - Variantes gestionadas con CVA
   - Totalmente reutilizables

2. **Capa de Componentes (`/components/`)**: Composiciones específicas
   - Compuestos de primitivos UI
   - Lógica de presentación mínima
   - Props tipadas con interfaces

3. **Capa de Páginas (`/pages/`)**: Orquestación de rutas
   - Data fetching con React Query
   - Manejo de estados (loading, error, empty)
   - Composición de componentes de funcionalidad

**Flujo de Datos**: `API → React Query → Page → Component → UI Primitive`

---

## 🎨 Filosofía de Desarrollo

### Principios Core

1. **Simplicidad Primero** - Elige tecnología probada que funciona
2. **Presupuesto de Rendimiento** - Mantener bundle bajo 6MB (optimizar para <5MB)
3. **Velocidad de Desarrollo** - Optimizar para iteración rápida
4. **Tipo-Seguridad** - Detectar errores en tiempo de compilación
5. **Excelencia de Diseño** - UI profesional siguiendo design system establecido
6. **Experiencia de Usuario** - Cada interacción debe sentirse pulida e intencional

### Pilares de Experiencia

**Transparencia** - Flujos de usuario claros y obvios
**Momentum** - Las acciones se sienten gratificantes
**Control** - Los usuarios gestionan su experiencia
**Credibilidad** - Se siente como una plataforma profesional real
**Simplicidad** - Enfoque en funcionalidades core, sin saturación

### Reglas de Código

- ✅ **Código mínimo funcional** - Optimizar después si es necesario
- ✅ **Funciones puras** y testeables cuando sea posible
- ✅ **TypeScript modo estricto** - Sin tipos `any`
- ✅ **import type** para imports de solo tipos
- ✅ **Seguir design system** para todo el styling
- ✅ **Implementar estados** de loading, error y empty
- ❌ **No sobre-ingeniería** - Sin clases ni patrones innecesarios
- ❌ **No extraer funciones** a menos que se reutilicen o mejoren legibilidad drásticamente
- ❌ **No comentarios** a menos que sean críticos - preferir código auto-explicativo

---

## 🎨 Sistema de Diseño

### Paleta de Colores

**Primario (Brand Orange)**
- `#FF7A00` - Naranja principal
- Uso: CTAs primarios, estados activos, acentos de marca

**Éxito (Professional Green)**
- `#10B981` - Verde profesional
- Uso: Confirmaciones, estados positivos, métricas de crecimiento

**Advertencia (Amber)**
- `#F59E0B` - Ámbar profesional
- Uso: Estados pendientes, alertas de atención

**Peligro (Red)**
- `#EF4444` - Rojo de error
- Uso: Solo estados de error y alertas críticas

**Neutrales (Sophisticated Grays)**
- Escala de grises desde `#F8FAFC` hasta `#1E293B`
- Uso: Jerarquía de texto, backgrounds, bordes

### Tipografía

- **Sistema de grid**: 8pt baseline (4px, 8px, 16px, 24px, 32px, 48px)
- **Ritmo vertical**: 8pt para consistencia de espaciado
- **Escala de texto**: Colores slate para jerarquía visual

### Componentes

Todos los componentes siguen patrones establecidos:
- **Botones**: 40px altura, 16px padding, jerarquía clara (primary/secondary/ghost)
- **Cards**: rounded-lg, p-4, shadow-sm, hover lift
- **Forms**: Labels arriba, 8px gap, validación inline
- **Modals**: Overlay 50% negro, contenido blanco, max 90vh altura

---

## 🧪 Testing

### Estrategia de Testing

- **Cobertura objetivo**: >93%
- **Tests unitarios**: Co-localizados en archivos `*.test.ts`
- **Tests de integración**: Para user journeys críticos
- **Tests E2E**: Playwright/Cypress para flujos críticos

### Ejecutar Tests

```bash
# Watch mode (desarrollo)
pnpm test

# Run once (CI)
pnpm test:run

# UI interactiva
pnpm test:ui

# Coverage report
pnpm test:coverage
```

### Mejores Prácticas

1. **Testear lógica de negocio** - Funcionalidad core debe ser correcta
2. **Testear happy paths** - Flujos básicos deben funcionar
3. **Testear edge cases** - Límites, inputs inesperados, escenarios realistas
4. **Una aserción lógica por test** - Mantener tests enfocados
5. **Testear comportamiento, no implementación** - Enfocarse en resultados
6. **Parametrizar inputs** - Nunca literales sin explicación como 42 o "foo"
7. **Usar aserciones fuertes** - `toEqual(1)` no `toBeGreaterThanOrEqual(1)`
8. **Agrupar por función** - Usar `describe(functionName, () => ...)`

---

## 🔌 Integración Backend

### Estado Actual

El proyecto actualmente usa **datos stub (hardcodeados)** para desarrollo frontend independiente. Todas las constantes stub están claramente marcadas con prefijo `STUB_` en `src/pages/Dashboard.tsx`.

### Próximos Pasos

Ver documentación completa de integración en:

📖 **[docs/INTEGRACION-BACKEND.md](docs/INTEGRACION-BACKEND.md)**

La guía incluye:
- ✅ Especificación completa de endpoints API
- ✅ Modelos de datos (interfaces TypeScript)
- ✅ Guía de implementación paso a paso
- ✅ Estrategias de caché con React Query
- ✅ Manejo de errores estandarizado
- ✅ Optimización de rendimiento
- ✅ WebSocket para actualizaciones en tiempo real (opcional)
- ✅ Estrategias de testing

### Endpoints Principales

```typescript
GET  /api/v1/user/profile              // Perfil y nivel de usuario
GET  /api/v1/goals/current             // Meta del mes actual
POST /api/v1/goals                     // Crear/actualizar meta
GET  /api/v1/promotions/active         // Promociones vigentes
GET  /api/v1/clients/attention-required // Clientes que requieren acción
```

---

## 🔐 Autenticación

### Sistema de Auth

Actualmente implementa **auth stub** para desarrollo frontend. En producción:

- Autenticación basada en **Bearer Token**
- Tokens almacenados en **httpOnly cookies** (no localStorage)
- Refresh automático de tokens expirados
- Logout en fallo de refresh

### Rutas Protegidas

```typescript
// Rutas públicas
/auth/login
/auth/register

// Rutas protegidas (requieren auth)
/dashboard
/account/*
/settings/*
/resources/*
```

---

## 🚢 Deployment

### Build de Producción

```bash
# Crear build optimizado
pnpm build

# Verificar bundle size
pnpm size-limit

# Preview local
pnpm preview
```

### Vercel (Recomendado)

El proyecto está configurado para deployment en Vercel:

1. Conectar repositorio a Vercel
2. Configurar variables de entorno en dashboard de Vercel
3. Deploy automático en push a `main`

**Preview Deployments**: Cada PR genera preview URL automático

### Variables de Entorno (Producción)

```env
VITE_API_BASE_URL=https://api.pazz.com
VITE_WS_URL=wss://ws.pazz.com
VITE_CDN_URL=https://cdn.pazz.com
VITE_ENABLE_REAL_TIME=true
```

---

## 🔄 Pipeline CI/CD

### Checks Automáticos

En cada push/PR se ejecutan:

```bash
1. pnpm install      # Instalar dependencias
2. pnpm lint         # ESLint
3. pnpm type-check   # TypeScript validation
4. pnpm test:run     # Tests (run once)
5. pnpm build        # Build de producción
6. pnpm size-limit   # Verificar tamaño de bundle (<6MB)
```

### Pre-commit Hooks

⚠️ **IMPORTANTE**: Este proyecto **NO usa pre-commit hooks** intencionalmente para evitar pérdida de datos y resets de sesión. Los checks de calidad se ejecutan manualmente antes de commits.

---

## 🤝 Contribución

### Conventional Commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Tipos válidos:**
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato (no afectan código)
- `refactor:` - Refactoring (ni feat ni fix)
- `perf:` - Mejoras de rendimiento
- `test:` - Agregar o corregir tests
- `chore:` - Cambios en build, herramientas, etc.

**Ejemplos:**

```bash
git commit -m "feat: add CSV export to commission ledger"
git commit -m "fix: resolve navigation bug on mobile devices"
git commit -m "docs: update API integration guide"
```

### Workflow Recomendado

1. **Crear rama feature**
   ```bash
   git checkout -b feat/nueva-funcionalidad
   ```

2. **Desarrollar con calidad**
   ```bash
   # Durante desarrollo
   pnpm dev
   pnpm test

   # Antes de commit
   pnpm lint
   pnpm type-check
   pnpm test:run
   ```

3. **Commit y push**
   ```bash
   git add .
   git commit -m "feat: descripción de cambios"
   git push origin feat/nueva-funcionalidad
   ```

4. **Crear Pull Request**
   - Descripción clara de cambios
   - Screenshots si aplica
   - Verificar que CI pasa

5. **Review y merge**
   - Código revisado por al menos 1 persona
   - Todos los checks pasando
   - Merge a `main`

---

## 📚 Documentación Adicional

### Guías Técnicas

- 📘 **[CLAUDE.md](CLAUDE.md)** - Guía completa de desarrollo (reglas, shortcuts, best practices)
- 🎨 **[docs/DESIGN-PRINCIPLES.md](docs/DESIGN-PRINCIPLES.md)** - Sistema de diseño y principios visuales
- 📝 **[docs/TYPESCRIPT-GUIDELINES.md](docs/TYPESCRIPT-GUIDELINES.md)** - Guías de TypeScript y clasificación de errores
- 🔌 **[docs/INTEGRACION-BACKEND.md](docs/INTEGRACION-BACKEND.md)** - Especificación completa de API backend

### Recursos Externos

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

---

## 📄 Licencia

Este proyecto es privado y confidencial. Todos los derechos reservados.

---

## 📞 Contacto y Soporte

**Equipo de Desarrollo:**
- Frontend Lead: [Por asignar]
- Backend Lead: [Por asignar]

**Canales de Comunicación:**
- Slack: #pazz-development
- Issues: GitHub Issues (para bugs y features)
- Docs: `/docs` folder en repositorio

---

## 🏆 Estado del Proyecto

**Versión Actual:** 0.1.0 (Template Production-Ready)
**Estado:** ✅ Clean slate listo para desarrollo de funcionalidades
**Última Actualización:** 2025-10-01

### Próximos Hitos

- [ ] Integración API backend (Fase 1-2)
- [ ] Sistema de notificaciones en tiempo real
- [ ] Módulo de facturación
- [ ] Sistema de recursos descargables
- [ ] Analytics y reportes avanzados

---

<div align="center">

**Construido con excelencia técnica y atención al detalle**

[Volver arriba](#pazz-portal)

</div>
