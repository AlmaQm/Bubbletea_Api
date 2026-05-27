# 🔐 Configuración de Firebase

Para que la autenticación funcione, debes obtener tus credenciales de Firebase.

## Pasos para obtener tus credenciales:

1. Ve a https://console.firebase.google.com/
2. Crea un nuevo proyecto o selecciona uno existente
3. En la consola, selecciona "Crear una app web" (icono `</>`). Si ya existe, el ícono mostrará un número
4. Copia la configuración que aparece:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

5. Reemplaza los valores en: `src/app/shared/config/firebase.config.ts`

## Ejemplo de archivo configurado:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDz5r_SN3VeC6Zl7kM8aB9cD0eF1gH2iJ3k",
  authDomain: "mi-proyecto.firebaseapp.com",
  projectId: "mi-proyecto",
  storageBucket: "mi-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

## ¿Necesitas usar modo offline para testing?

Si quieres probar sin Firebase real, te puedo ayudar a configurar el **Firebase Emulator Suite**.

---

**Nota:** Una vez configurado el archivo, la página se recargará automáticamente y funcionarán el registro y login.
