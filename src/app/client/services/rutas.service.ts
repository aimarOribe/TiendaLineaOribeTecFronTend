import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(private router: Router) { }

  public irHome(){
    this.router.navigate(['/']);
  }

  public irLogin(){
    this.router.navigate(['/login']);
  }
}
