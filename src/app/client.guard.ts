import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteInformacionService } from './client/services/cliente-informacion.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  
  constructor(
    private clienteInformacionService: ClienteInformacionService, 
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.clienteInformacionService.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
};