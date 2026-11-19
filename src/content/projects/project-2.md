---
title: 'Papelería ETL: la PWA que moderniza tu papelería'
description: Descubre cómo Papelería ETL utiliza las capacidades de las Aplicaciones Web Progresivas para automatizar la extracción, limpieza y análisis de ventas e inventario, unificando datos desde MySQL, Excel y una API de tipo de cambio.
publishDate: 'Nov 18 2026'
seo:
  image:
    src: '../../assets/images/project-2.jpg'
    alt: 'Vista previa del dashboard de Papelería ETL mostrando gráficos de ventas por país y categoría'
---

![Vista previa de Papelería ETL](../../assets/images/project-2.jpg)

**Nota:** Este artículo forma parte de la documentación académica del proyecto "Papelería ETL", desarrollado para la materia de Extracción de Bases de datos en la Universidad Tecnológica Fidel Velázquez (grupo DGS 902).

**Resumen del proyecto:** Papelería ETL es un sistema que automatiza la recolección, limpieza y análisis de datos de ventas de una empresa de papelería. Su objetivo principal es unificar información desde tres fuentes distintas —una base de datos MySQL, un archivo Excel de inventario y una API de tipo de cambio—, limpiar los datos para que sean confiables, estandarizarlos en un solo formato y generar reportes y gráficos automáticamente para tomar mejores decisiones.

## El problema que resuelve

En la empresa de papelería, el área de ventas y administración enfrentaba dificultades en el control y la gestión de la información. Los datos se encontraban **fragmentados en diferentes fuentes**: una base de datos MySQL con los registros de ventas, un archivo Excel con el inventario de productos y una API externa que proporciona los tipos de cambio de moneda. Esta fragmentación dificultaba obtener una visión unificada y actualizada del negocio.

Los problemas más frecuentes eran:

- **Fechas en formatos diferentes** (YYYY-MM-DD, DD/MM/YYYY, etc.).
- **Campos vacíos** en registros importantes.
- **Monedas escritas en mayúsculas y minúsculas** sin estandarizar.
- **Duplicación de registros** en el inventario.
- **Conversión manual de monedas** (USD, EUR, CAD, JPY) a pesos mexicanos (MXN), con cálculos aproximados y márgenes de error significativos.

Estos errores provocaban que los análisis de ventas no fueran precisos y que la toma de decisiones se basara en información incorrecta. Papelería ETL nace para **centralizar y estandarizar** toda esa información en un solo lugar.

## Objetivos

1. **Unificar información de ventas desde múltiples fuentes:** Extraer datos desde la base de datos MySQL (tabla `ventas`), el archivo Excel de inventario (`inventario.xlsx`) y la API de tipo de cambio, para tener una visión integral del negocio.
2. **Limpiar y estandarizar los datos:** Estandarizar fechas a formato `YYYY-MM-DD`, eliminar registros con campos vacíos y duplicados, convertir todas las ventas a MXN usando los tipos de cambio de la API y unificar nombres de países (por ejemplo, "Mexico" y "México" en un solo valor).
3. **Generar reportes y un dashboard interactivo:** Producir archivos Excel limpios en la carpeta `reportes/` y un dashboard que muestre gráficos y estadísticas de ventas, accesible desde el navegador sin necesidad de programar.

## Características principales de la PWA (Features)

1. **Dashboard interactivo y visual:**
   *   Pantalla interactiva que muestra gráficos y estadísticas de las ventas. No necesitas saber programar para usarlo: solo abres el navegador y ves la información.
   *   Incluye gráficos como el **Top 10 de productos más vendidos**, **ventas por país**, **ventas por categoría**, **ventas por moneda**, **relación stock vs ventas** y un **heatmap por país y categoría**.
   *   Permite filtrar la información por país sin necesidad de tocar código.

2. **Proceso ETL automatizado:**
   *   **Extracción:** Lee datos desde MySQL, el archivo Excel de inventario y consulta la API para obtener los tipos de cambio del día.
   *   **Transformación:** Limpia automáticamente los datos (fechas, nulos, duplicados, monedas y países).
   *   **Carga:** Genera archivos Excel limpios y listos para análisis en la carpeta `reportes/`.

3. **Reportes generados automáticamente:**
   *   `bd_limpio.xlsx`: Ventas limpias con montos convertidos a MXN.
   *   `inventario_limpio.xlsx`: Inventario sin duplicados ni productos sin nombre.
   *   `resumen_productos.xlsx`: Productos con total de ventas en MXN y desglose.
   *   `resumen_monedas.xlsx`: Ventas por moneda (original y convertida a MXN).
   *   `resumen_paises.xlsx`: Ventas totales agrupadas por país.
   *   `resumen_transformacion.xlsx`: Estadísticas del proceso de limpieza (registros eliminados por nulos o duplicados).

4. **API de tipo de cambio local:**
   *   Servicio que corre en la computadora y proporciona el valor de diferentes monedas en tiempo real.
   *   Endpoints como `/api/tipocambio`, `/api/tipocambio?fecha=2026-06-15` y `/api/tipocambio?inicio=2026-06-01&fin=2026-06-05` permiten consultar tipos de cambio históricos, por fecha específica o por rango.

5. **Ejecución local y accesible:**
   *   El dashboard se ejecuta localmente en el navegador (`http://127.0.0.1:8050`) y no requiere conexión a internet (excepto para la API).
   *   Los archivos generados son en formato Excel, accesibles para cualquier usuario sin necesidad de software especializado.

> **Nota sobre el alcance PWA:** El documento del proyecto describe el dashboard como una aplicación que se ejecuta localmente en el navegador y menciona que está diseñado para "visualización estática (sin filtros interactivos) para mantener la simplicidad". La información adjunta **no detalla** la implementación de un `manifest.json`, un service worker o funcionalidad offline explícita para Papelería ETL; esos conceptos se explican en este artículo como las capacidades de las PWA que el proyecto puede aprovechar, pero no deben atribuirse como funcionalidades ya implementadas en el documento original.

## Ventajas frente a apps nativas y webs tradicionales

| Aspecto | Web tradicional | App nativa | PWA (enfoque de Papelería ETL) |
|---|---|---|---|
| **Instalación** | No requiere | Requiere tienda de apps | Instalable desde el navegador |
| **Acceso** | Necesita navegador y conexión | Depende del sistema operativo | Accesible desde pantalla de inicio |
| **Actualizaciones** | Automáticas | Manuales o por tienda | Automáticas vía service worker |
| **Costo de desarrollo** | Bajo | Alto (por plataforma) | Único código para múltiples plataformas |
| **Funcionamiento offline** | Limitado | Sí | Sí, con service worker y caché |
| **Distribución** | URL | Tiendas de aplicaciones | URL + instalación directa |

Para una papelería, una PWA como Papelería ETL ofrece **ahorro de tiempo** (automatiza la limpieza de datos), **menos errores** (detecta y elimina duplicados y datos incompletos), **visión global** (dashboard con gráficos e indicadores), **actualización sencilla** (basta con ejecutar nuevamente el proceso ETL) y **compartibilidad** (todo el proyecto se aloja en GitHub).

## Casos de uso reales

Según la información del proyecto, Papelería ETL se enfoca en los datos de ventas e inventario. Sus casos de uso principales son:

- **Análisis de ventas por producto:** Identificar el Top 10 de productos más vendidos y los que generan más ingresos.
- **Análisis geográfico:** Ver dónde se vende más (ventas por país) y qué categorías se venden en cada país (heatmap país-categoría).
- **Análisis por categoría y moneda:** Conocer qué categorías son más populares y qué porcentaje de las ventas fue en dólares, euros, etc.
- **Control de inventario:** Comparar el stock disponible de cada producto frente a lo vendido (relación stock vs ventas).
- **Conversión unificada de monedas:** Convertir ventas en USD, EUR, CAD y JPY a MXN para tener una visión uniforme de los ingresos.
- **Auditoría del proceso de limpieza:** Revisar cuántos registros fueron eliminados por valores nulos o duplicados mediante `resumen_transformacion.xlsx`.

> **Delimitante:** El proyecto se enfoca únicamente en datos de ventas e inventario; **no incluye módulos de clientes, proveedores o nómina**.

## Stack Tecnológico

*   **Lenguaje principal:** Python 3.10+, usado para el procesamiento de datos y la lógica del ETL.
*   **Manipulación de datos:** `pandas` (DataFrames), `numpy` (operaciones numéricas y arrays).
*   **Base de datos:** MySQL, con `mysql-connector-python` como conector entre Python y MySQL.
*   **Consumo de la API:** `requests`, para obtener los tipos de cambio.
*   **Archivos Excel:** `openpyxl`, para leer y escribir archivos Excel.
*   **Dashboard:** `dash` y `plotly`, para la creación del dashboard interactivo.
*   **Análisis opcional:** `scikit-learn`, utilizado opcionalmente para análisis de datos y modelos de machine learning.
*   **API de tipo de cambio:** .NET SDK 8.0, para ejecutar el servicio que proporciona los tipos de cambio.
*   **Entorno de desarrollo:** Visual Studio Code, MySQL, AppServer (o XAMPP) y Git para el control de versiones.
*   **Metodología:** ETL (Extract, Transform, Load) combinado con el uso de pandas, y metodología en Cascada (Waterfall) para el desarrollo secuencial del proyecto.

## Ejemplo de Configuración (Código)

A continuación se muestra un ejemplo básico de cómo se estructuraría el `manifest.json` y un service worker para una PWA como Papelería ETL. **Estos fragmentos son ilustrativos** y se basan en las capacidades PWA descritas en el artículo; el documento original del proyecto no incluye su implementación explícita.

```json
// manifest.json (ejemplo ilustrativo)
{
  "name": "Papelería ETL",
  "short_name": "PapeleríaETL",
  "description": "Automatiza la extracción, limpieza y análisis de ventas e inventario de tu papelería.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f0f2f5",
  "theme_color": "#2563eb",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}