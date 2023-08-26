import { Component, OnInit, Renderer2 } from '@angular/core';
import { VentaService } from '../../services/venta.service';
import { ClienteInformacionService } from '../../services/cliente-informacion.service';
import { Ubicacion, Venta } from '../../interfaces/venta';
import { VentaHistoryService } from 'src/app/admin/services/venta-history.service';
import { StyleScriptService } from 'src/app/shared/services/style-script.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  idTransaccion: string = "";
  compras: Venta[] = [];
  detalleCompraHistory!: Venta;
  ubicacionCliente!: Ubicacion;

  constructor(
    private styleScriptService: StyleScriptService,
    private informacionClienteService: ClienteInformacionService,
    private ventaHistoryService: VentaHistoryService,
    private ventaService: VentaService,
    private renderer: Renderer2){}

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

  ubicacion(idDistrito: string){
    this.ventaHistoryService.ubicacion(idDistrito).subscribe({
      next: (response) => {
        this.ubicacionCliente = response.data;
      }
    })
  }

  verMas(item: Venta){
    this.detalleCompraHistory = item;
    this.ubicacion(item.idDistrito);
  }

  historialCliente(){
    var idCliente = this.informacionClienteService.getUserId();
    var fechaInicio = this.renderer.selectRootElement('#fechaInicio').value;
    var fechaFin = this.renderer.selectRootElement('#fechaFin').value;
    this.ventaService.historialCliente(fechaInicio, fechaFin, idCliente, this.idTransaccion).subscribe({
      next: (response) => {
        this.compras = response.data;
      }
    })
  }

}
