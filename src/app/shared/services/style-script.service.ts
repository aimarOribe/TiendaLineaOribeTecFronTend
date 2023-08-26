import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleScriptService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addStyle(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'stylesheet');
      this.renderer.setAttribute(link, 'href', url);
      link.onload = () => {
        resolve();
      };
      link.onerror = () => {
        reject();
      };
      this.renderer.appendChild(document.head, link);
    });
  }

  addScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'src', url);
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
      this.renderer.appendChild(document.body, script);
    });
  }

  addMultiLineScript(scriptCode: string, clave: string, valor: string ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.text = scriptCode;
      script.setAttribute(clave, valor);
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
      this.renderer.appendChild(document.body, script);
    });
  }

  addInlineScript(code: string): void {
    const script = this.renderer.createElement('script');
    script.innerHTML = code;
    this.renderer.appendChild(document.body, script);
  }

  addMultiLineScriptAtLocation(scriptCode: string, index: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const scriptBlock = document.createElement('script');
      scriptBlock.innerHTML = scriptCode;
      const targetScript = document.body.querySelectorAll('script')[index];
      scriptBlock.onload = () => {
        resolve();
      };
      scriptBlock.onerror = () => {
        reject();
      };
      document.body.insertBefore(scriptBlock, targetScript);
    });
    
  }

  addStyleCitySpecific(url: string, index: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const newStyle = document.createElement('link');
      newStyle.rel = 'stylesheet';
      newStyle.href = url;
      const fourthStyle = document.head.querySelectorAll('link')[index];
      newStyle.onload = () => {
        resolve();
      };
      newStyle.onerror = () => {
        reject();
      };
      document.head.insertBefore(newStyle, fourthStyle);
    });
  }

  addScriptCitySpecific(url: string, index: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const newScript = document.createElement('script');
      newScript.src = url;
      const targetScript = document.body.querySelectorAll('script')[index];
      newScript.onload = () => {
        resolve();
      };
      newScript.onerror = () => {
        reject();
      };
      document.body.insertBefore(newScript, targetScript);
    });
  }

  removeStyles(index: number) {
    // Elimina el segundo estilo (índice 1) del head
    const secondStyle = document.head.querySelectorAll('link')[index];
    if (secondStyle) {
      document.head.removeChild(secondStyle);
    }
  }

  removeScripts(index: number) {
    // Elimina el tercer script (índice 2) del body
    const thirdScript = document.body.querySelectorAll('script')[index];
    if (thirdScript) {
      document.body.removeChild(thirdScript);
    }
  }

  removeStylesBySelector(parametro: string ,selector: string) {
    const stylesToRemove = document.querySelectorAll(`link[${parametro}="${selector}"]`);
    stylesToRemove.forEach(style => {
      document.head.removeChild(style);
    });
  }

  removeScriptsBySelector(parametro: string, selector: string) {
    const scriptsToRemove = document.querySelectorAll(`script[${parametro}="${selector}"]`);
    scriptsToRemove.forEach(script => {
      document.body.removeChild(script);
    });
  }

  removeScriptMultiScript(parametro: string, scriptId: string) {
    const scriptToRemove = document.querySelector(`script[${parametro}="${scriptId}"]`);
    if (scriptToRemove) {
      document.body.removeChild(scriptToRemove);
    }
  }

}
