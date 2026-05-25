# Evaluación Parcial N°2 - Ingeniería DevOps

## Integrantes
* **Nombre:** Raul Gonzalez
* **Sección:** 003D

---

## Arquitectura y Tecnologías
Este proyecto consiste en un microservicio construido en Node.js orquestado junto a una base de datos MongoDB

* **IE1 - Contenedores:** Implementación de un `Dockerfile` optimizado utilizando Multi-stage builds para reducir el tamaño de la imagen final y mejorar la seguridad en producción.
* **IE2 - Pruebas Automatizadas:** Cobertura de código con Jest y Supertest, integrada directamente dentro del ciclo de vida de integración continua.
* **IE3 - Seguridad:** Uso de Dependabot para el escaneo y actualización de vulnerabilidades en dependencias NPM y Docker. Configuración de límites estrictos de CPU y memoria (`deploy.resources.limits`) en los contenedores.
* **IE5 - Orquestación:** Archivo `docker-compose.yml` estructurado con políticas de `healthcheck` para garantizar que la base de datos MongoDB esté lista antes de inicializar el microservicio.

---

## Pipeline de CI/CD (GitHub Actions)
El archivo `.github/workflows/ci-cd.yml` automatiza todo el proceso ante cada cambio en la rama principal:
1. **Checkout:** Descarga del código fuente.
2. **Setup:** Inicialización del entorno de Node.js.
3. **Install:** Instalación limpia de dependencias.
4. **Test & Coverage:** Ejecución de pruebas con generación automática de reportes de cobertura.
5. **Security Scan:** Simulación de escaneo SAST.
6. **Docker Build:** Compilación de la imagen del contenedor.

---

## Reflexión Final: Desafíos de la Entrega Continua (Exigido en IE4)
La automatización del ciclo de software mediante pipelines de CI/CD introduce grandes beneficios, pero también desafíos técnicos críticos:
* **Gobernanza y Consistencia:** Garantizar que los entornos de desarrollo, prueba y producción sean idénticos. El uso de Docker mitiga el clásico problema
* **Seguridad en Automatización:** Integrar herramientas como Dependabot y análisis SAST en fases tempranas del pipeline previene que vulnerabilidades en librerías de terceros lleguen a producción.
* **Manejo de Estados:** La orquestación correcta de dependencias en arquitecturas distribuidas es vital para evitar caídas en cascada durante despliegues automatizados.
* **Aprendizaje:** Realizando la evaluacion he podido notar el como funciona de manera util y rapida el sistema a traves del Docker y su sencilles en el uso