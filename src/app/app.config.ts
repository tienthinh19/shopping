import { provideAnimations } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {provideState, provideStore} from '@ngrx/store';
import {counterReducer} from "../ngrx/couter/counter.reducer";
import {cartReducer} from "../ngrx/cart/cart.reducer";
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "shopping-7fdfd", "appId": "1:283910933538:web:dc933d89848511d4d9ce7b", "storageBucket": "shopping-7fdfd.appspot.com", "apiKey": "AIzaSyDG18KabTWpNMDeJrthXlXA-y4cEVqrSko", "authDomain": "shopping-7fdfd.firebaseapp.com", "messagingSenderId": "283910933538" })), TuiRootModule), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideStore(),
    provideState({ name: 'count', reducer: counterReducer }),
    provideState({ name: 'cart', reducer: cartReducer }), provideEffects()]
};
