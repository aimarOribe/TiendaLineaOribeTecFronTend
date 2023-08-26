import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StyleScriptService } from 'src/app/shared/services/style-script.service';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  totalClientes: string = "";
  totalProductos: string = "";
  totalVentas: string = "";
  totalIngresos: string = "";

  constructor(private styleScriptService: StyleScriptService,
    private route: ActivatedRoute,
    private adminDashboardService: AdminDashboardService) {}
  
  ngOnInit(): void {
    const stylePromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addStyleCitySpecific('../../../../assets/admin/plugins/vectormap/jquery-jvectormap-2.0.2.css', 2)
      .then(() => {
          resolve();
      });
    });

    const scriptPromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addScriptCitySpecific('../../../../assets/admin/plugins/vectormap/jquery-jvectormap-2.0.2.min.js', 11)
      .then(() => {
        this.styleScriptService.addScriptCitySpecific('../../../../assets/admin/plugins/vectormap/jquery-jvectormap-world-mill-en.js', 12)
        .then(() => {
          this.styleScriptService.addScriptCitySpecific('../../../../assets/admin/plugins/chartjs/js/Chart.min.js', 13)
          .then(() => {
            this.styleScriptService.addScriptCitySpecific('../../../../assets/admin/plugins/chartjs/js/Chart.extension.js', 14)
            .then(() => {
              this.styleScriptService.addScriptCitySpecific('../../../../assets/admin/plugins/sparkline-charts/jquery.sparkline.min.js', 15)
              .then(() => {
                resolve();              
              })
            })
          })
        })
      })
    });

    Promise.all([stylePromise, scriptPromise])
      .then(() => {
        //Cargar Resumen Dashboard
        this.resumen();
      })
      .catch(error => {
        console.error('Error cargando recursos:', error);
      });
  }

  resumen(){
    this.adminDashboardService.Resumen().subscribe({
      next: (response) => {
        if(response.status){
          this.totalClientes = response.data.totalClientes;
          this.totalProductos = response.data.totalProductos;
          this.totalVentas = response.data.totalVentas;
          this.totalIngresos = response.data.totalIngresos;
          const arrayData: any[] = response.data.ventasUltimaSemana;        
          const labelTemp = arrayData.map((value) => value.fecha);
          const dataTemp = arrayData.map((value) => value.total);

          const arrayData2: any[] = response.data.ventasUltimaSemanaProductos; 
          const labelTemp2 = arrayData2.map((value) => value.producto);
          const dataTemp2 = arrayData2.map((value) => value.cantidad);

          this.graficoUno(labelTemp, dataTemp);
          this.graficoDos(labelTemp2, dataTemp2);
        }
      },
      error: (e) => console.log(e)
    })
  }

  graficoUno(label: any[], data: any[]): void {
    // Obtén la ruta actual
    const currentRoute = this.route.snapshot.routeConfig?.path;

    // Verifica si estás en la página donde deseas agregar el script
    if (currentRoute === '') {
      const graficoUno = `
        $(function () {
          "use strict";
          var ctx = document.getElementById('chart7').getContext('2d');

          var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
              gradientStroke1.addColorStop(0, '#ee0979');
              gradientStroke1.addColorStop(1, '#ff6a00');

          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ${JSON.stringify(label)},
              datasets: [{
                label: 'Views',
                data: ${JSON.stringify(data)},
                pointBorderWidth: 2,
                pointHoverBackgroundColor: gradientStroke1,
                backgroundColor: gradientStroke1,
                borderColor: 'transparent',
                borderWidth: 1
              }]
            },
            options: {
              maintainAspectRatio: false,
              legend: {
                position: 'bottom',
                display:false
              },
              tooltips: {
                displayColors:false,	
                mode: 'nearest',
                intersect: false,
                position: 'nearest',
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
              },
              scales: {
                xAxes: [{
                  ticks: {
                    beginAtZero:true
                  },
                  gridLines: {
                    display: true 
                  },
                }],
                yAxes: [{
                  ticks: {
                    beginAtZero:true
                  },
                  gridLines: {
                    display: true 
                  },
                }]
              }
            }
          });  
        });
      `;
      this.styleScriptService.addMultiLineScriptAtLocation(graficoUno, 16);
    }
  }

  graficoDos(label2: any[], data2: any[]): void {
    // Obtén la ruta actual
    const currentRoute = this.route.snapshot.routeConfig?.path;

    // Verifica si estás en la página donde deseas agregar el script
    if (currentRoute === '') {
      const graficoDos = `
        $(function () {
          "use strict"; 

          var ctx = document.getElementById("chart6").getContext('2d');
   
          var gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
          gradientStroke3.addColorStop(0, '#42e695');
          gradientStroke3.addColorStop(1, '#3bb2b8');

          var gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
          gradientStroke4.addColorStop(0, ' #7f00ff');
          gradientStroke4.addColorStop(0.5, '#e100ff');

          var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ${JSON.stringify(label2)},
              datasets: [{
                label: 'Productos',
                data: ${JSON.stringify(data2)},
                borderColor: gradientStroke3,
                backgroundColor: gradientStroke3,
                hoverBackgroundColor: gradientStroke3,
                pointRadius: 0,
                fill: false,
                borderWidth: 1
              }]
            },
            options:{
              maintainAspectRatio: false,
              legend: {
                position: 'bottom',
                      display: true,
                labels: {
                        boxWidth:12
                      }
                    },
              tooltips: {
                displayColors:false,
              },	
              scales: {
                xAxes: [{
                barPercentage: .5
                }]
                }
            }
          });
        });
      `;
      this.styleScriptService.addMultiLineScriptAtLocation(graficoDos, 17);
    }
  }

  ngOnDestroy(): void {
    this.styleScriptService.removeStyles(2);
    this.styleScriptService.removeScripts(11);
    this.styleScriptService.removeScripts(11);
    this.styleScriptService.removeScripts(11);
    this.styleScriptService.removeScripts(11);
    this.styleScriptService.removeScripts(11);
    this.styleScriptService.removeScripts(11);
    this.styleScriptService.removeScripts(11);
  }

}
