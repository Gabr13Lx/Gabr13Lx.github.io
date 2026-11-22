---
title: 'SONIDEROS: caso de estudio de una plataforma web SaaS para digitalizar la renta de sonido y eventos'
description: Descubre cómo SONIDEROS utiliza una arquitectura MVC personalizada en PHP para ofrecer a los sonideros un sistema SaaS de gestión de reservas, catálogo personalizable y aislamiento de datos multiempresa.
publishDate: 'Nov 18 2026'
seo:
  image:
    src: '../../assets/images/project-3.png'
    alt: 'Vista previa del panel de administración de SONIDEROS mostrando tarjetas de reservas y el selector de paletas de colores'
---

![Vista previa de SONIDEROS](../../assets/images/project-3.png)

**Nota:** Este artículo forma parte de la documentación del proyecto **"SONIDEROS"**, una plataforma SaaS (Software as a Service) desarrollada para digitalizar la operación de empresas dedicadas al sonido, iluminación y organización de eventos en México.

**Resumen del proyecto:** SONIDEROS es una plataforma web tipo SaaS que permite a los sonideros rentar una página pública personalizable, gestionar su catálogo de paquetes y servicios, definir su cobertura geográfica y recibir reservas de clientes. A cambio, pagan una suscripción mensual de $299 MXN (con oferta de lanzamiento de $199 MXN por 3 meses para las primeras 10 empresas). Los clientes, por su parte, tienen una cuenta global para explorar el directorio de sonideros y solicitar fechas para sus eventos.

## El problema que resuelve

Antes de SONIDEROS, los sonideros en México enfrentaban una **doble problemática**:

1.  **Presencia digital fragmentada:** La mayoría dependía exclusivamente de redes sociales (Facebook, WhatsApp) para promocionarse. No tenían un catálogo formal de paquetes ni un lugar centralizado donde los clientes pudieran comparar opciones.
2.  **Gestión de reservas caótica:** Las solicitudes de eventos se manejaban por mensajes directos, lo que provocaba **empalmes de horarios**, pérdida de información del cliente y una nula trazabilidad del anticipo y saldo.

Los problemas más frecuentes eran:
- **Doble agendamiento** de fechas por falta de un calendario unificado.
- **Pérdida de clientes** porque no había una respuesta rápida y formal a las solicitudes.
- **Falta de identidad visual** en las páginas de los sonideros, que no reflejaban su estilo (luces, colores, temática).
- **Imposibilidad de mostrar** la cobertura geográfica (estados y municipios) de manera clara.

SONIDEROS nace para **centralizar la oferta, estandarizar las reservas y profesionalizar la imagen** de las empresas de entretenimiento.

## Objetivos

1. **Proporcionar una página pública personalizable:** Cada empresa recibe un "micrositio" con URL amigable (ej. `/sonido-dragon`), donde puede mostrar su logo, elegir una de tres paletas de colores, listar sus paquetes y subir su galería de fotos.
2. **Automatizar la gestión de reservas:** Implementar un flujo con reglas de negocio estrictas: bloqueo de los próximos 5 días, límite de 45 días de anticipación, expiración de solicitudes pendientes a las 32 horas y cálculo automático del anticipo (50%).
3. **Garantizar el aislamiento de datos:** Cada sonidero gestiona únicamente su información. Un cliente que navega en `sonido-dragon` no ve los paquetes de `sonido-patitos`.

## Características principales (Features)

1. **Panel de administración para la empresa:**
   *   **Identidad visual:** Selector de paletas (Noche Dorada, Morado Neón, Turquesa Tropical) que se aplican dinámicamente a la página pública mediante variables CSS.
   *   **Catálogo de paquetes:** Creación de paquetes con título, precio, duración en horas y lista de "ideas" o inclusiones.
   *   **Gestión de cobertura:** Configuración de estados y municipios donde opera el sonidero.
   *   **Gestión de reservas:** Bandeja de entrada con las solicitudes de los clientes, con botones para **Aceptar** (bloquea la fecha permanentemente) o **Rechazar** (libera la fecha).

2. **Experiencia del cliente:**
   *   **Cuenta global única:** El cliente se registra una vez y puede reservar con cualquier empresa.
   *   **Formulario de reserva guiado:** Un asistente paso a paso que selecciona el paquete, la fecha, el tipo de evento, el método de pago (efectivo o transferencia) y la ubicación dentro de las zonas de cobertura.
   *   **Validación en tiempo real:** El sistema (JavaScript y PHP) valida que las fechas no estén ocupadas y que el municipio esté dentro de la cobertura de la empresa.

3. **Seguridad de nivel bancario:**
   *   **Protección CSRF:** Todos los formularios incluyen tokens únicos para prevenir ataques.
   *   **Hash de contraseñas:** Las contraseñas se almacenan usando el algoritmo Bcrypt.
   *   **Validación en servidor:** No se confía en el JavaScript; todas las reglas de negocio se revalidan en el backend antes de guardar en la base de datos.

4. **Notificaciones automáticas por correo:**
   *   La plataforma envía correos automáticos a la empresa cuando recibe una nueva solicitud y al cliente cuando su reserva es confirmada o rechazada, usando la librería PHPMailer.

## Casos de uso reales

Según la información del proyecto, SONIDEROS tiene dos grandes casos de uso:

- **Para la empresa (Administrador de Sonidero):**
  *   Configurar su catálogo de servicios y paquetes.
  *   Definir sus zonas de cobertura (ej. "Estado de México, Nicolás Romero").
  *   Revisar las solicitudes de reserva y decidir si acepta o rechaza.
  *   Consultar el estado de pago (anticipo y saldo pendiente).

- **Para el cliente:**
  *   Explorar el directorio de sonideros disponibles.
  *   Consultar la galería de fotos y los paquetes de cada empresa.
  *   Solicitar una reserva en 4 pasos, indicando tipo de evento (boda, cumpleaños, etc.).
  *   Consultar el estado de sus reservas y cancelar solicitudes pendientes.

> **Delimitante:** SONIDEROS **no procesa pagos automáticamente**. La plataforma calcula el anticipo (50%) y el saldo, pero el pago se coordina directamente entre la empresa y el cliente.

## Stack Tecnológico

*   **Backend:** PHP 8.x con arquitectura MVC personalizada (Front Controller, sin frameworks pesados).
*   **Base de Datos:** MySQL / MariaDB (InnoDB, utf8mb4).
*   **Frontend:** HTML5, CSS3 (con variables nativas y `color-mix`), JavaScript Vanilla (ES6+).
*   **Librerías Backend (Composer):** `phpmailer/phpmailer` para notificaciones SMTP.
*   **Librerías Frontend:** Bootstrap 5.3.6 (alojado localmente).
*   **Seguridad:** Tokens CSRF, Hash Bcrypt, PDO con *prepared statements*.
*   **Migraciones:** Clase `SchemaMigrator` para actualizar la BD sin perder datos en cada petición.

## Ejemplo de Código (Arquitectura)

A continuación, un fragmento representativo de cómo el núcleo del sistema gestiona la conexión a la base de datos de forma segura (Patrón Singleton con PDO):

```php
// app/core/Database.php
class Database
{
    private static ?PDO $connection = null;

    public static function getConnection(): PDO
    {
        // Si ya existe una conexión, la reutiliza
        if (self::$connection !== null) {
            return self::$connection;
        }
        
        // Carga las credenciales desde el archivo de configuración
        $config = require __DIR__ . '/../../config/database.php';
        
        // Crea la conexión con opciones de seguridad estrictas
        self::$connection = new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false, // Previene inyección SQL
        ]);
        
        return self::$connection;
    }
}