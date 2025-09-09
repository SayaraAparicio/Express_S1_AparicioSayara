#  Express - CampusLands
---
## 📋 Descripción del Ejercicio

---

Esta API REST permite gestionar información de campers (estudiantes) de CampusLands, proporcionando operaciones completas de CRUD (Create, Read, Update, Delete) junto con funcionalidades adicionales como estadísticas.

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **MongoDB Driver** - Cliente oficial para Node.js

## ⚙️ Configuración

```javascript
const PORT = process.env.PORT || 3000;
const uri = 'conexion a mongo';
const dbName = 'CampusLands';
const collectionName = 'campers';
```

## 🔗 Base URL
```
http://localhost:3000
```

---

## Endpoints Disponibles

### 1. **Ruta de Bienvenida**

**Funcionalidad:** Proporciona información general del API, versión y endpoints disponibles.

- **Método:** `GET`
- **URL:** `/`
- **Body:** No aplica
- **Autenticación:** No requerida

#### Request
```http
GET /
```

#### Response
```json
{
  "message": "🏕️ Bienvenido al CRUD de Campers",
  "version": "1.0.0",
  "endpoints": {
    "GET /campers": "Obtener todos los campers",
    "GET /campers/:id": "Obtener camper por ID",
    "POST /campers": "Crear nuevo camper",
    "PUT /campers/:id": "Actualizar camper",
    "DELETE /campers/:id": "Eliminar camper"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. **Obtener Todos los Campers**

**Funcionalidad:** Recupera la lista completa de campers registrados, ordenados por fecha de creación (más recientes primero).

- **Método:** `GET`
- **URL:** `/campers`
- **Body:** No aplica
- **Autenticación:** No requerida

#### Request
```http
GET /campers
```


###  Listar Campers
- **GET** `/campers`
- **Función:** Obtiene todos los campers
- **Response:** Array con lista de campers ordenados por fecha

### 3. Obtener Camper
- **GET** `/campers/:id`
- **Función:** Obtiene un camper específico por ID
- **Parámetro:** `id` - ObjectId de MongoDB
- **Response:** Objeto con datos del camper o error 404

### 4. Crear Camper
- **POST** `/campers`
- **Función:** Crea un nuevo camper
- **Body:**
```json
{
  "nombre": "sayara",
  "apellido": "aparicio",
  "edad": 17,
  "email": "saya@email.com",
  "carrera": "Desarrollo Web"
}
```
- **Response:** Objeto con ID del nuevo camper creado

### 5. Actualizar Camper
- **PUT** `/campers/:id`
- **Función:** Actualiza un camper existente
- **Parámetro:** `id` - ObjectId del camper
- **Body:** Mismos campos que POST
- **Response:** Confirmación de actualización

### 6. Eliminar Camper
- **DELETE** `/campers/:id`
- **Función:** Elimina un camper
- **Parámetro:** `id` - ObjectId del camper
- **Response:** Confirmación de eliminación con datos del camper eliminado

### 7. Estadísticas
- **GET** `/stats`
- **Función:** Obtiene estadísticas generales
- **Response:** Total campers, carreras, promedio edad y distribución

## Campos del Camper
- `nombre` (requerido)
- `apellido` (requerido) 
- `email` (requerido)
- `carrera` (requerido)
- `edad` (opcional)

## Ejemplo de Uso
```bash
# Crear camper
curl -X POST http://localhost:3000/campers \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Pedro","apellido":"Gómez","email":"pedro@email.com","carrera":"Data Science"}'

# Ver todos
curl http://localhost:3000/campers
```

### Explicación del contenido 💡
---
En este repositorio encontrarás diferentes proyectos y prácticas realizadas durante el desarrollo del curso. Cada día de trabajo está organizado en carpetas separadas, donde se detallan los ejercicios y aprendizajes adquiridos.

Si tienes alguna pregunta o sugerencia, no dudes en contactarme. 🚀

---

Desarrollado por [SayaraAparicio](https://github.com/SayaraAparicio/)