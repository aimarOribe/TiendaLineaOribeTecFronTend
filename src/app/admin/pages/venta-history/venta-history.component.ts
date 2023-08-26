import { Component, OnInit, Renderer2 , OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StyleScriptService } from 'src/app/shared/services/style-script.service';
import { VentaHistoryService } from '../../services/venta-history.service';
import { Ubicacion, Venta } from 'src/app/client/interfaces/venta';

@Component({
  selector: 'app-venta-history',
  templateUrl: './venta-history.component.html',
  styleUrls: ['./venta-history.component.css']
})
export class VentaHistoryComponent implements OnInit, OnDestroy{

  listaHistorialVentas: Venta[] = []; 
  detalleVentaHistory!: Venta;
  idTransaccion: string = "";
  ubicacionCliente!: Ubicacion;

  constructor(
    private styleScriptService: StyleScriptService,
    private route: ActivatedRoute,
    private ventaHistoryService: VentaHistoryService,
    private renderer: Renderer2) {
    }

  ngOnInit(): void {

    const stylePromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addStyleCitySpecific('../../../../assets/admin/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.min.css', 3)
      .then(() => {
        this.styleScriptService.addStyleCitySpecific('https://fonts.googleapis.com/icon?family=Material+Icons', 4)
        .then(() => {
          resolve();
        })
      });
    });

    const scriptPromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addScriptCitySpecific('../../../../assets/admin/plugins/bootstrap-material-datetimepicker/js/moment.min.js', 11)
      .then(() => {
        this.styleScriptService.addScriptCitySpecific('../../../../assets/admin/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.min.js', 12)
        .then(() => {
          resolve();
        })
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

  addWindowLoadEvent(): void {
    // Obtén la ruta actual
    const currentRoute = this.route.snapshot.routeConfig?.path;

    // Verifica si estás en la página donde deseas agregar el script
    if (currentRoute === 'historial-venta') {
      const datePicker = `
        $(function () {
          var currentDate = moment().format('DD/MM/YYYY');
          $('#fechaInicio').val(currentDate).bootstrapMaterialDatePicker({
            time: false,
            format: 'DD/MM/YYYY'
          });
          $('#fechaFin').val(currentDate).bootstrapMaterialDatePicker({
            time: false,
            format: 'DD/MM/YYYY'
          });
        });
      `;
      this.styleScriptService.addMultiLineScriptAtLocation(datePicker, 13);
    }
  }

  historial(){
    var fechaInicio = this.renderer.selectRootElement('#fechaInicio').value;
    var fechaFin = this.renderer.selectRootElement('#fechaFin').value;
    this.ventaHistoryService.historial(fechaInicio, fechaFin, this.idTransaccion).subscribe({
      next: (response) => {
        this.listaHistorialVentas = response.data;
      }
    })
  }

  ubicacion(idDistrito: string){
    this.ventaHistoryService.ubicacion(idDistrito).subscribe({
      next: (response) => {
        this.ubicacionCliente = response.data;
      }
    })
  }

  verMas(item: Venta){
    this.detalleVentaHistory = item;
    this.ubicacion(item.idDistrito);
  }

  ngOnDestroy(): void {
    this.styleScriptService.removeStyles(3);
    this.styleScriptService.removeStyles(3);
    this.styleScriptService.removeScripts(11);
    this.styleScriptService.removeScripts(11);
    this.styleScriptService.removeScripts(11);
  }

}
