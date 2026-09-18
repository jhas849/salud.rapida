# SaludRapida

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Salud Rápida

Aplicación Angular para reservar y administrar citas médicas.

## Funcionalidades

- Dashboard con médicos disponibles, estadísticas y próximas citas.
- Reserva desde la página completa de citas o directamente desde cada médico.
- Selección de fecha y horarios disponibles según el médico.
- Panel médico con listado, edición y cancelación de citas.
- Registro, inicio y cierre de sesión local desde el icono de usuario.
- Validación de formularios reactivos con mensajes visibles.
- Tema visual responsive en palo rosa y blanco.

## Arquitectura

El proyecto usa Angular standalone, por lo que cada componente declara sus dependencias en `imports` y no requiere un `NgModule` raíz.

### Componentes

- `src/app/app.ts` y `app.html`: navegación principal y cuenta de usuario.
- `components/dashboard`: dashboard, médicos disponibles y reserva rápida.
- `components/booking-page`: formulario completo de reserva.
- `components/doctor-panel`: CRUD visual de citas.

### Modelos y servicios

- `models/clinic.ts`: interfaces `Doctor`, `Appointment`, `NewAppointmentRequest` y `User`.
- `services/appointment.service.ts`: médicos y operaciones de citas: consultar, crear, actualizar y cancelar.
- `services/user.service.ts`: registro, inicio de sesión y cierre de sesión en memoria.

La autenticación es demostrativa y local: los usuarios se pierden al recargar la página. Para producción debe conectarse a una API y nunca guardar contraseñas sin protección.

### Pipes

- `doctorName`: muestra el tratamiento y nombre completo del médico.
- `dateFormat`: transforma fechas de citas al formato localizado en español.

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Dashboard |
| `/citas` | Nueva reserva |
| `/panel` | Panel médico |

## Data binding y directivas

La aplicación utiliza interpolación (`{{ }}`), binding de propiedades (`[class]`, `[style]`, `[attr]`), eventos (`(click)`, `(ngSubmit)`), `*ngFor`, `*ngIf` y `@if`.

## Desarrollo

Instalar dependencias:

```bash
npm install
```

Servidor local:

```bash
npm start
```

La aplicación queda disponible en `http://localhost:4200/`.

## Verificación

Compilar:

```bash
npm run build
```

Ejecutar pruebas:

```bash
npm test -- --watch=false
```
