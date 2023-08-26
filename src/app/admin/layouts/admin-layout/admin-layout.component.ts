import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleScriptService } from '../../../shared/services/style-script.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit, OnDestroy{

  constructor(private styleScriptService: StyleScriptService) {}

  ngOnInit() {
    const stylePromises: Promise<void>[] = [];
    const scriptPromises: Promise<void>[] = [];

    // STYLES
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/plugins/simplebar/css/simplebar.css'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/plugins/perfect-scrollbar/css/perfect-scrollbar.css'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/plugins/metismenu/css/metisMenu.min.css'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/css/pace.min.css'));
    scriptPromises.push(this.styleScriptService.addScript('../../../../assets/admin/js/pace.min.js'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/css/bootstrap.min.css'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/css/bootstrap-extended.css'));
    stylePromises.push(this.styleScriptService.addStyle('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/css/app.css'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/css/icons.css'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/css/dark-theme.css'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/css/semi-dark.css'));
    stylePromises.push(this.styleScriptService.addStyle('../../../../assets/admin/css/header-colors.css'));

    //SCRIPTS
    scriptPromises.push(this.styleScriptService.addScript('../../../../assets/admin/js/bootstrap.bundle.min.js'));
    scriptPromises.push(this.styleScriptService.addScript('../../../../assets/admin/js/jquery.min.js'));
    scriptPromises.push(this.styleScriptService.addScript('../../../../assets/admin/plugins/simplebar/js/simplebar.min.js'));
    scriptPromises.push(this.styleScriptService.addScript('../../../../assets/admin/plugins/metismenu/js/metisMenu.min.js'));
    scriptPromises.push(this.styleScriptService.addScript('../../../../assets/admin/plugins/perfect-scrollbar/js/perfect-scrollbar.js'));
    scriptPromises.push(this.styleScriptService.addScript('../../../../assets/admin/js/app.js'));
  
    // Esperar a que se completen todas las Promesas de estilos y scripts
    Promise.all([...stylePromises, ...scriptPromises])
      .then(() => {
        // Obtén la ruta actual
      })
      .catch((error) => {
        console.error('Error al cargar estilos o scripts:', error);
      });
  }

  ngOnDestroy(): void {
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeStyles(2);

    this.styleScriptService.removeScripts(5);
    this.styleScriptService.removeScripts(5);
    this.styleScriptService.removeScripts(5);
    this.styleScriptService.removeScripts(5);
    this.styleScriptService.removeScripts(5);
    this.styleScriptService.removeScripts(5);
    this.styleScriptService.removeScripts(5);
  }

}
