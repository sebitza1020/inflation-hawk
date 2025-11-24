import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, user } from '@angular/fire/auth';
import { signInWithPopup, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  user$ = user(this.auth);

  constructor() {}

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(this.auth, provider);
      return credential.user;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  }

  async logout() {
    return await signOut(this.auth);
  }

  async getIdToken(): Promise<string | null> {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  }
}
