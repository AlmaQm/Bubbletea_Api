import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { auth } from '../config/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() {
    console.log('AuthService inicializado', { auth });
  }

  /**
   * Registra un nuevo usuario con email y password
   */
  async register(email: string, password: string): Promise<any> {
    try {
      console.log('Iniciando registro con:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registro exitoso:', userCredential.user);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('Error en registro:', error);
      const errorMessage = this.getErrorMessage(error);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Inicia sesión con email y password
   */
  async login(email: string, password: string): Promise<any> {
    try {
      console.log('Iniciando login con:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login exitoso:', userCredential.user);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('Error en login:', error);
      const errorMessage = this.getErrorMessage(error);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Envía email de recuperación de contraseña
   */
  async resetPassword(email: string): Promise<any> {
    try {
      console.log('Enviando email de recuperación para:', email);
      await sendPasswordResetEmail(auth, email);
      console.log('Email enviado exitosamente');
      return { success: true, message: 'Email de recuperación enviado' };
    } catch (error: any) {
      console.error('Error en reset password:', error);
      const errorMessage = this.getErrorMessage(error);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  async logout(): Promise<any> {
    try {
      console.log('Cerrando sesión');
      await signOut(auth);
      console.log('Sesión cerrada exitosamente');
      return { success: true };
    } catch (error: any) {
      console.error('Error en logout:', error);
      const errorMessage = this.getErrorMessage(error);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Convierte errores de Firebase a mensajes en español
   */
  private getErrorMessage(error: any): string {
    const errorCode = error?.code || '';
    
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-api-key': 'Configuración de Firebase inválida. Verifica tu apiKey.',
      'auth/invalid-email': 'El email no es válido.',
      'auth/user-disabled': 'Este usuario ha sido deshabilitado.',
      'auth/user-not-found': 'No existe usuario con este email.',
      'auth/wrong-password': 'La contraseña es incorrecta.',
      'auth/email-already-in-use': 'Este email ya está registrado.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
      'auth/operation-not-allowed': 'Esta operación no está permitida.',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
    };

    return errorMessages[errorCode] || error?.message || 'Error desconocido en autenticación';
  }
}
