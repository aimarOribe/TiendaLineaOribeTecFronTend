import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioInformacionService } from './admin/services/usuario-informacion.service';
 // Supongamos que tienes un servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private usuarioInformacionServicio: UsuarioInformacionService, 
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.usuarioInformacionServicio.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
};