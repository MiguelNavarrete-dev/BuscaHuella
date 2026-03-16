import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },   {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'profille-configuration',
    loadComponent: () => import('./profille-configuration/profille-configuration.page').then( m => m.ProfilleConfigurationPage)
  },
  {
    path: 'mapa-busqueda',
    loadComponent: () => import('./pages/mapa-busqueda/mapa-busqueda.page').then( m => m.MapaBusquedaPage)
  },
  {
    path: 'gestion-mascotas',
    loadComponent: () => import('./pages/gestion-mascotas/gestion-mascotas.page').then( m => m.GestionMascotasPage)
  }

];
