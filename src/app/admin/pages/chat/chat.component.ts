import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { StyleScriptService } from 'src/app/shared/services/style-script.service';
import { UsuarioInformacionService } from '../../services/usuario-informacion.service';
import { UsuarioManagementService } from '../../services/usuario-management.service';
import { Usuario } from '../../interfaces/usuario-management';
import { Message } from '../../interfaces/message';
import { NotificacionesService } from 'src/app/shared/services/notificaciones.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  private connection: HubConnection;
  public messages: Message[] = [];

  public forUserId: number = 0;
  public ofUserId: number = 0;
  public forUserName: string = "";
  public message: string = "";

  public imagenUsuario: string = "";
  public nombreUsuario: string = "";
  public rolDescripcionUsuario: string = "";
  public usuarios?: Usuario[] = [];

  constructor(
    private styleScriptService: StyleScriptService,
    private informacionUsuario: UsuarioInformacionService,
    private usuarioService: UsuarioManagementService,
    private notificaciones: NotificacionesService)
    {
      this.ofUserId = this.informacionUsuario.getSesion().idUsuario;
      this.connection = new HubConnectionBuilder()
        .withUrl(`https://localhost:7130/chat?userId=${this.ofUserId.toString()}`)
        .build();
  }

  async ngOnInit() {

    await this.initStylesAndScripts();

    await this.initSignalR();

    await this.methodSignalR();

    await this.renderizarUsuario();
  }

  async initStylesAndScripts(){
    const stylePromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addStyleCitySpecific('../../../../assets/admin/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.min.css', 3)
      .then(() => {
        resolve();
      });
    });

    const scriptPromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addScriptCitySpecific('../../../../assets/admin/plugins/bootstrap-material-datetimepicker/js/moment.min.js', 11)
      .then(() => {
        resolve();
      })
    });

    Promise.all([stylePromise, scriptPromise])
      .then(() => {
        this.addWindowLoadEvent();
      })
      .catch(error => {
        console.error('Error cargando recursos:', error);
      });
  }

  addWindowLoadEvent() {
    const checkIfElementsVisible = setInterval(() => {
      const chatContentElement = document.querySelector('.chat-content');
      const chatListElement = document.querySelector('.chat-list');
      if (chatContentElement && chatListElement) {
        clearInterval(checkIfElementsVisible);
        const chat = `
          new PerfectScrollbar('.chat-content');
          new PerfectScrollbar('.chat-list');
        `;
        this.styleScriptService.addMultiLineScriptAtLocation(chat, 12);
      }
    }, 100); 
  }

  async initSignalR(){
    try {
      await this.connection.start();
    } catch (error) {
      console.log("Failed to connect to signal hub", error);
    }
  }

  async methodSignalR(){
    this.connection.on('ReceiveMessage', (ofUserId: number, forUserId: number, mensaje: string) => {
      this.obtenerOtroUserById(ofUserId, forUserId, mensaje);
    });
  }

  async sendMessageToUser() {
    if(this.message == ""){
      this.notificaciones.notificacionWarning("No puedes enviar un mensaje vacio");
    }else{
      this.obtenerUsuarioById(this.message);
      await this.connection.invoke('SendMessageToUser', this.ofUserId.toString(), this.forUserId.toString(), this.message);
      this.message = "";
    }
  }

  async renderizarUsuario(){
    this.imagenUsuario = this.informacionUsuario.getSesion().rutaImagen;
    this.nombreUsuario = this.informacionUsuario.getSesion().nombres + " " + this.informacionUsuario.getSesion().apellidos;
    this.rolDescripcionUsuario = this.informacionUsuario.getSesion().rolDescripcion;
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (response) => {
        this.usuarios = response.data.filter((u: any) => {
          return u.idUsuario != this.informacionUsuario.getSesion().idUsuario
        });
      }
    });
  }

  obtenerUsuarioById(message: any){
    this.usuarioService.obtenerUsuarioById(this.ofUserId).subscribe({
      next: (response) => {
        if(response.status){
          var msg: Message = {
            ofUserId: this.ofUserId,
            forUserId:this.forUserId,
            rutaImagen: response.data.rutaImagen,
            nombres: response.data.nombres,
            apellidos: response.data.apellidos,
            texto: message
          }
          this.messages.push(msg);
        }
      }
    });
  }

  obtenerOtroUserById(ofUserId: number, forUserId: number, message: any){
    this.usuarioService.obtenerUsuarioById(ofUserId).subscribe({
      next: (response) => {
        if(response.status){
          var msg: Message = {
            ofUserId: ofUserId,
            forUserId: forUserId,
            rutaImagen: response.data.rutaImagen,
            nombres: response.data.nombres,
            apellidos: response.data.apellidos,
            texto: message
          }
          this.messages.push(msg);
        }
      }
    });
  }

  seleccionarUsuario(usuario: Usuario){
    this.messages = [];
    this.forUserId = usuario.idUsuario;
    this.forUserName = usuario.nombres + " " + usuario.apellidos;
  }

  regresarAtras(){
    this.messages = [];
    this.forUserId = 0;
    this.forUserName = ""
  }

  ngOnDestroy(): void {
    this.styleScriptService.removeStyles(3);
    this.styleScriptService.removeScripts(11);
    this.styleScriptService.removeScripts(11);
  }

}
