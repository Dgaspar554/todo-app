# 📱 TodoApp - React Native

Aplicación móvil desarrollada en React Native para consumir la API de tareas (`todo-api`).

---

## 🚀 Pasos para correr el proyecto

### 1. Verifica que el backend esté corriendo

Desde la carpeta `todo-api`, ejecuta el siguiente comando:

```bash
./mvnw spring-boot:run
```

Asegúrate de que el backend sea accesible desde el dispositivo o emulador usando tu IP local (por ejemplo: `http://192.168.25.20:8080`).

---

### 2. Instala las dependencias del proyecto

Desde la carpeta `todo-app`, ejecuta:

```bash
npm install
```

---

### 3. Crea un archivo `.env` en la raíz del proyecto

Agrega la siguiente línea, reemplazando la IP por tu IP local:

```env
API_URL=http://192.168.25.20:8080
```

---

### 4. Inicia el servidor de desarrollo con caché limpio

```bash
npx react-native start --reset-cache
```

---

### 5. Corre la aplicación en Android

En una nueva terminal:

```bash
npx react-native run-android
```
