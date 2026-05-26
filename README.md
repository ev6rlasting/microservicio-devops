# Evaluación Parcial N°2 — Ingeniería DevOps

Este documento contiene la especificación técnica, el diseño de la arquitectura de orquestación, el desglose de flujos automatizados de integración continua y la documentación requerida para el cumplimiento de los indicadores de evaluación establecidos.

---

## Integrantes del Proyecto
* **Integrante 1:** Raul Gonzalez
* **Integrante 2:** Génesis Montero 
* **Sección:** 003D

---

## Diagrama del Flujo Completo (CI/CD)

A continuación se detalla la secuencia lógica del pipeline implementado en el ecosistema automatizado de GitHub Actions:


flowchart TD
    A([Trigger\npush o PR a main/master]) --> B

    B["**Job 1: build-and-test**\nNode.js setup · npm install · Jest Tests"] --> C

    C["**Job 2: Security & Docker Build**\nDependabot · SAST Check · Multi-stage Build"] --> D

    D["**Job 3: Feedback Activo**\nDevOps Continuous Feedback (Profesor)"] --> E(Reporte Listo)

## Arquitectura y Tecnologías (Indicadores de Evaluación)

---

### IE1 - Contenedores
Implementación de un archivo `Dockerfile` optimizado utilizando la estrategia de **Multi-stage builds**. Mediante la separación explícita de las etapas de construcción (`builder`) y ejecución (`runner`), se garantiza que la imagen final de producción contenga única y exclusivamente los artefactos compilados y las dependencias esenciales en tiempo de ejecución. Este enfoque reduce drásticamente el peso de la imagen en disco y mitiga los vectores de ataque al eliminar herramientas de desarrollo no autorizadas en producción.

### IE2 - Pruebas Automatizadas
Diseño e incorporación de una suite de pruebas unitarias y de integración robustas utilizando los frameworks **Jest** y **Supertest**, localizadas de forma estructurada dentro del directorio `tests/`. El entorno ejecuta automáticamente los casos de prueba ante cada evento de integración, generando métricas detalladas y exportando un reporte formal de cobertura de código (*coverage*) integrado transparentemente en el flujo de trabajo.

### IE3 - Escalabilidad y Seguridad
* **Límites Estrictos de Recursos:** Configuración del motor de orquestación para restringir de forma nativa el consumo físico del microservicio Express a un tope máximo de **0.50** de CPU y **512M** de memoria RAM, mientras que la base de datos MongoDB queda limitada a **0.25** de CPU y **256M** de memoria RAM (`deploy.resources.limits`).
* **Análisis Proactivo de Vulnerabilidades:** Configuración e integración nativa de **Dependabot** mediante la especificación del archivo `dependabot.yml` para realizar escaneos e inventarios automatizados con periodicidad semanal en el gestor de paquetes NPM y en los tags de imágenes base de Docker.

### IE5 - Orquestación de Contenedores
Despliegue coordinado de una arquitectura multicapa (Multi-container ecosystem) por medio de `docker-compose.yml`. Para mitigar fallas en cascada y asegurar la resiliencia en el encendido de los servicios, se inyectaron directivas de **Healthcheck** basadas en utilidades internas de `mongosh`, garantizando de esta forma que la aplicación en Node.js permanezca en espera y no inicialice su servidor web hasta que el motor de persistencia de MongoDB reporte un estado 100% saludable y listo para recibir conexiones.

---

## Desglose del Pipeline de GitHub Actions

El repositorio aloja dos flujos de trabajo independientes y complementarios configurados en la ruta `.github/workflows/`:

### 1. Pipeline de Construcción y Verificación Estructural (`ci-cd.yml`)
* **Step 1 - Checkout:** Descarga limpia y segura del código fuente dentro del entorno aislado del runner virtual.
* **Step 2 - Setup Node.js:** Inicialización de la versión especificada de Node.js (v18) empleando capas avanzadas de caché para acelerar la descarga de paquetes NPM.
* **Step 3 - Install Dependencies:** Aislamiento e instalación estricta de dependencias tanto operativas como de desarrollo.
* **Step 4 - Test & Coverage:** Lanzamiento de pruebas automatizadas con la recopilación interactiva de la cobertura del código y empaquetado de artefactos bajo la carpeta `coverage/`.
* **Step 5 - Security Check:** Validación estática predictiva simulando un escaneo SAST en busca de credenciales expuestas o malas prácticas de codificación.
* **Step 6 - Docker Build:** Ensamblaje de la imagen de contenedor para validar su correcta compilación antes de un eventual despliegue.

### 2. Workflow de Feedback Continuo Institucional (`ep02-devops-continuous-feedback.yml`)
Diseñado específicamente para acoplarse con las herramientas automáticas de revisión del cuerpo docente. Lanza de forma autónoma el script evaluador (`evaluar.js`) para certificar las pautas del modelo DevOps y exporta el archivo comprimido con la retroalimentación inmediata directamente en la plataforma de GitHub Actions.

---

## Reflexión Final: Desafíos de la Entrega Continua (IE4)

La adopción de ciclos de entrega e integración continua (CI/CD) plantea retos de alta complejidad para los equipos de ingeniería de software:
* **Gobernanza y Consistencia Ambiental:** La necesidad crítica de asegurar que las configuraciones de desarrollo imiten con absoluta exactitud los entornos productivos se vuelve prioritaria. La containerización con Docker unifica los entornos, solucionando el histórico conflicto de incompatibilidad entre sistemas.
* **Seguridad Integrada (Shift-Left Security):** Mover las pruebas de seguridad a las fases iniciales del pipeline (incorporando Dependabot y análisis SAST) previene proactivamente que librerías maliciosas o desactualizadas se infiltren en fases críticas de la distribución.
* **Gestión Dinámica de Estados:** Coordinar los tiempos de inicialización en arquitecturas acopladas por medio de verificaciones de salud evita errores críticos de red y caídas generalizadas durante los despliegues automáticos en entornos reales.
* **Curva de Aprendizaje:** El desarrollo de esta experiencia ha evaluado el enorme valor práctico de la automatización DevOps. Lograr abstraer configuraciones complejas de redes y servidores en archivos de texto declarativos permite operaciones seguras y predecibles.

---

## Inteligencia Artificial Utilizada
* **Gemini:** Utilizado activamente como socio tecnológico para el diseño e implementación de la arquitectura de contenedores, depuración de logs de red en Docker y estructuración semántica de la documentación del proyecto.