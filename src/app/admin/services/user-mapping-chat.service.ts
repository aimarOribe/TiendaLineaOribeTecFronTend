import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMappingChatService {

  private userMappings: Map<string, string> = new Map<string, string>();

  // Método para agregar una correspondencia
  addUserMapping(userId: string, serverUniqueId: string) {
    this.userMappings.set(userId, serverUniqueId);
  }

  // Método para obtener el identificador único del servidor dado el ID de usuario
  getServerUniqueId(userId: string): string | undefined {
    return this.userMappings.get(userId);
  }
  
}
