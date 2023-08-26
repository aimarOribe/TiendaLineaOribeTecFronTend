import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientStyleScriptService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addStyle(url: string) {
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.appendChild(document.head, link);
  }

  addScript(url: string) {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'src', url);
    this.renderer.appendChild(document.body, script);
  }

  removeStyles() {
    // Eliminar los estilos si es necesario
  }

  removeScripts() {
    // Eliminar los scripts si es necesario
  }

}
