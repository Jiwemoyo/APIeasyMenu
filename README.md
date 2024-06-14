# Easy Menu API

Esta es la API para la aplicación Easy Menu, una plataforma de blogs de comida donde los usuarios pueden registrarse, iniciar sesión, crear, leer, actualizar y eliminar recetas, así como comentar y dar "me gusta" a las recetas de otros usuarios. Además, incluye funcionalidades de administración para gestionar usuarios.

## Requisitos Previos

- Node.js
- MongoDB
- npm (Node Package Manager)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/easy-menu-api.git
    cd easy-menu-api
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/easy-menu
    JWT_SECRET=tu_secreto_jwt
    ```

## Uso

1. Inicia el servidor:

    ```bash
    npm run dev
    ```

2. La API estará disponible en `http://localhost:3000`.

## Endpoints

### Autenticación

#### Registro de Usuario

- **URL:** `/api/auth/register`
- **Método:** `POST`
- **Descripción:** Registra un nuevo usuario.
- **Body:**
    ```json
    {
        "username": "nombre_usuario",
        "email": "correo@example.com",
        "password": "contraseña"
    }
    ```

#### Inicio de Sesión

- **URL:** `/api/auth/login`
- **Método:** `POST`
- **Descripción:** Inicia sesión y obtiene un token JWT.
- **Body:**
    ```json
    {
        "email": "correo@example.com",
        "password": "contraseña"
    }
    ```

### Usuarios

#### Obtener Todos los Usuarios (Solo Administradores)

- **URL:** `/api/admin/users`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todos los usuarios.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`

#### Obtener Usuario por ID (Solo Administradores)

- **URL:** `/api/admin/users/:userId`
- **Método:** `GET`
- **Descripción:** Obtiene los detalles de un usuario por ID.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`

#### Actualizar Usuario (Solo Administradores)

- **URL:** `/api/admin/users/:userId`
- **Método:** `PUT`
- **Descripción:** Actualiza la información de un usuario.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`
- **Body:**
    ```json
    {
        "username": "nuevo_nombre_usuario",
        "email": "nuevo_correo@example.com",
        "role": "user" | "admin"
    }
    ```

#### Eliminar Usuario (Solo Administradores)

- **URL:** `/api/admin/users/:userId`
- **Método:** `DELETE`
- **Descripción:** Elimina un usuario por ID.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`

### Recetas

#### Crear Receta

- **URL:** `/api/recipes`
- **Método:** `POST`
- **Descripción:** Crea una nueva receta.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`
- **Body:**
    ```json
    {
        "title": "Título de la receta",
        "description": "Descripción de la receta",
        "ingredients": ["Ingrediente 1", "Ingrediente 2"],
        "instructions": "Instrucciones para preparar la receta",
        "image": "URL de la imagen"
    }
    ```

#### Obtener Todas las Recetas

- **URL:** `/api/recipes`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todas las recetas.

#### Obtener Recetas por Usuario

- **URL:** `/api/recipes/user/:userId`
- **Método:** `GET`
- **Descripción:** Obtiene todas las recetas de un usuario específico.

#### Obtener Receta por ID

- **URL:** `/api/recipes/:recipeId`
- **Método:** `GET`
- **Descripción:** Obtiene los detalles de una receta por ID.

#### Actualizar Receta

- **URL:** `/api/recipes/:recipeId`
- **Método:** `PUT`
- **Descripción:** Actualiza una receta existente.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`
- **Body:**
    ```json
    {
        "title": "Nuevo título de la receta",
        "description": "Nueva descripción de la receta",
        "ingredients": ["Nuevo Ingrediente 1", "Nuevo Ingrediente 2"],
        "instructions": "Nuevas instrucciones para preparar la receta",
        "image": "Nueva URL de la imagen"
    }
    ```

#### Eliminar Receta

- **URL:** `/api/recipes/:recipeId`
- **Método:** `DELETE`
- **Descripción:** Elimina una receta por ID.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`

### Comentarios

#### Crear Comentario

- **URL:** `/api/comments`
- **Método:** `POST`
- **Descripción:** Crea un nuevo comentario en una receta.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`
- **Body:**
    ```json
    {
        "recipeId": "ID de la receta",
        "text": "Texto del comentario"
    }
    ```

#### Obtener Comentarios por Receta

- **URL:** `/api/comments/recipe/:recipeId`
- **Método:** `GET`
- **Descripción:** Obtiene todos los comentarios de una receta específica.

#### Actualizar Comentario

- **URL:** `/api/comments/:commentId`
- **Método:** `PUT`
- **Descripción:** Actualiza un comentario existente.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`
- **Body:**
    ```json
    {
        "text": "Nuevo texto del comentario"
    }
    ```

#### Eliminar Comentario

- **URL:** `/api/comments/:commentId`
- **Método:** `DELETE`
- **Descripción:** Elimina un comentario por ID.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`

### Likes

#### Dar Like a una Receta

- **URL:** `/api/likes`
- **Método:** `POST`
- **Descripción:** Da "me gusta" a una receta.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`
- **Body:**
    ```json
    {
        "recipeId": "ID de la receta"
    }
    ```

#### Eliminar Like

- **URL:** `/api/likes/:likeId`
- **Método:** `DELETE`
- **Descripción:** Elimina un "me gusta" por ID.
- **Headers:**
    - `Authorization: Bearer <tu_token_jwt>`

## Docker

Para ejecutar la API con Docker:

1. Construye la imagen de Docker:

    ```bash
    docker compose up -d.
    ```
    usamos docker desktop y el archivo docker compose para levantar la imagen de mongo

## Contribuciones

Las contribuciones son bienvenidas. Por favor, haz un fork del repositorio y envía un pull request.
esta es una api para que te puede servir como una base para una red social muy simple hecha por Alessandro Cisneros,Mishelle Abendaño,Angeles Quinatoa
para el proyecto de integracion de la carrera de software del instituto tecnologico Yavirac :D

## Licencia

Esta API está licenciada bajo la MIT License.
