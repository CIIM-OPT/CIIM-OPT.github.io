# CIIM — Centro de Investigación en Ingeniería Molecular

Sitio web oficial del **Centro de Investigación en Ingeniería Molecular (CIIM)** de la
[Universidad Católica de Santa María (UCSM)](https://www.ucsm.edu.pe), Arequipa — Perú.

Sitio estático generado con **Astro**, de alto rendimiento, **bilingüe (español / inglés)**,
con SEO técnico aplicado (sitemap, robots, canonical, hreflang, Open Graph y JSON-LD).

![Astro](https://img.shields.io/badge/Astro-5-FF5D01?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Host-GitHub%20Pages-222222?logo=github&logoColor=white)

---

## Contenido

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Puesta en marcha](#puesta-en-marcha)
- [Scripts disponibles](#scripts-disponibles)
- [Despliegue](#despliegue)
- [Internacionalización](#internacionalización)
- [SEO y buenas prácticas](#seo-y-buenas-prácticas)
- [Licencia](#licencia)

---

## Características

- 🌐 **Bilingüe es/en** con español como idioma por defecto — español en la raíz (`/`), inglés en `/en/`.
- 🔍 **SEO aplicado**: sitemap con `hreflang`, `robots.txt`, etiquetas `canonical`, Open Graph/Twitter,
  JSON-LD (`ScientificOrganization`, `WebSite`, `ScholarlyArticle`).
- 📄 **Publicaciones reales**: listado y páginas de detalle con `DOI` y enlace a las revistas (MDPI).
- 🎨 **Identidad de marca**: paleta azul marino + teal derivada del logo institucional.
- 🌙 **Modo oscuro** y 🌎 **switcher de idioma**.
- ⚡ Estático y rápido: sin JS de runtime en servidor, Alpine.js solo para microinteracciones.

## Stack tecnológico

| Tecnología                          | Uso                                        |
| ----------------------------------- | ------------------------------------------ |
| [Astro](https://astro.build) 5.x    | Static Site Generator                      |
| [Tailwind CSS](https://tailwindcss.com) v4 | Estilos (plugin `@tailwindcss/vite`) |
| [Alpine.js](https://alpinejs.dev)   | Interactividad ligera (dark mode, menú)    |
| TypeScript (strict)                 | Capa de datos e i18n tipada                |
| `@astrojs/sitemap`                  | Generación de sitemap con alternates       |
| GitHub Pages + GitHub Actions       | Hosting y CI/CD                            |
| pnpm                                | Gestor de paquetes                          |

## Estructura del proyecto

```text
ciim-web/
├── .github/workflows/
│   └── deploy.yml              # CI/CD: build + deploy a GitHub Pages
├── public/                     # Archivos estáticos servidos tal cual
│   ├── CIIM.svg                # Logo institucional (marca)
│   ├── favicon.svg             # Favicon de marca
│   ├── og-image.png            # Imagen para Open Graph (1200×630)
│   └── robots.txt              # Permisos de rastreo + sitemap
├── src/
│   ├── assets/                 # Assets importados por el build
│   ├── components/             # Componentes .astro (Header, Footer, Seo, secciones…)
│   ├── layouts/                # Layout raíz con `<head>` SEO completo
│   ├── lib/
│   │   ├── config.ts           # Metadatos del sitio (url, correo, colores…)
│   │   ├── data/es.json        # Todo el contenido en español
│   │   ├── data/en.json        # Todo el contenido en inglés (misma estructura)
│   │   ├── i18n.ts             # Helpers tipados de i18n (getDict, getPath…)
│   │   └── schema.ts           # Generación de JSON-LD
│   ├── pages/                  # Rutas en español (raíz)
│   │   ├── en/                 # Rutas en inglés (/en/…)
│   │   └── publications/       # /publications y /publications/[slug]
│   ├── scripts/                # JavaScript auxiliar
│   └── styles/global.css       # Tema Tailwind v4 (paleta CIIM)
├── astro.config.mjs            # Config de Astro (site, sitemap i18n…)
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## Requisitos

- **Node.js** ≥ 18.17.1 (recomendado: 20 LTS o 22 LTS).
- **pnpm 8.15.4** — activable con [Corepack](https://nodejs.org/api/corepack.html):

```bash
corepack enable
corepack prepare pnpm@8.15.4 --activate
```

> La versión de pnpm está fijada en el campo `packageManager` de `package.json`.

## Puesta en marcha

```bash
# 1. Instalar dependencias
pnpm install

# 2. Servidor de desarrollo (http://localhost:4321)
pnpm dev
```

## Scripts disponibles

| Script            | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| `pnpm dev`        | Inicia el servidor de desarrollo (`astro dev`)     |
| `pnpm build`      | Genera el sitio estático en `dist/`                |
| `pnpm preview`    | Build + previsualización local en `dist/`          |
| `pnpm deploy`     | Publica `dist/` en GitHub Pages (`gh-pages -d dist`) |
| `pnpm astro`      | CLI de Astro (e.g. `pnpm astro check`)             |

## Despliegue

**Automático (recomendado).** El flujo `.github/workflows/deploy.yml` se ejecuta al hacer
`push` a la rama `main`: instala dependencias con pnpm, construye el sitio (`withastro/action`)
y despliega a GitHub Pages. Requisito: en *Settings → Pages → Build and deployment*,
la fuente debe ser **GitHub Actions**.

**Manual.** Alternativa si la fuente de Pages está configurada como rama `gh-pages`:

```bash
pnpm build
pnpm deploy
```

## Internacionalización

El contenido **no vive en las plantillas**: se centraliza en `src/lib/data/es.json` y
`src/lib/data/en.json`. Ambos archivos deben mantener **la misma estructura** (la paridad se
fuerza en tiempo de compilación: `en.json` se tipa como `typeof es.json`).

- Español en la raíz (sin prefijo), inglés bajo `/en/`.
- `hreflang` es↔en con `x-default` apuntando al español.
- Helpers disponibles en `src/lib/i18n.ts`: `getDict(locale)`, `getPath(locale, path)`,
  `getLocaleFromPath(pathname)` y `getAlternateUrls(pathname)`.

Para agregar contenido nuevo (áreas de investigación, publicaciones, miembros del equipo…),
basta con editar ambos JSON.

## SEO y buenas prácticas

- `canonical` y `og:url` por página.
- `hreflang` (`es` / `en` / `x-default`) en `<head>` y en el sitemap.
- `robots.txt` referenciando el sitemap.
- JSON-LD: `ScientificOrganization` + `WebSite` (global) y `ScholarlyArticle` (por publicación).
- `noindex` en la página 404.
- Metadatos Open Graph y Twitter Cards con imagen `og-image.png`.
- `lang` dinámico (`es` / `en`) según la ruta.
- Fuentes sin bloqueo de renderizado y assets servidos desde la misma origin.

## Licencia

Contenido y código institucional del CIIM. Contacto: [bgomez@ucsm.edu.pe](mailto:bgomez@ucsm.edu.pe).