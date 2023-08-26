import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StyleScriptService } from 'src/app/shared/services/style-script.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit, OnDestroy {

  isLoginPage: boolean = false;

  constructor(private router: Router,
    private styleScriptService: StyleScriptService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login' || event.url === '/register' || event.url === '/new-password' || event.url === '/reset-password';
      }
    });
  }
  
  ngOnInit() {

    const stylePromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addStyleCitySpecific('../../../../assets/client/plugins/simplebar/css/simplebar.css', 2)
      .then(() => {
        this.styleScriptService.addStyleCitySpecific('../../../../assets/client/plugins/perfect-scrollbar/css/perfect-scrollbar.css', 3)
        .then(() => {
          this.styleScriptService.addStyleCitySpecific('../../../../assets/client/plugins/metismenu/css/metisMenu.min.css', 4)
          .then(() => {
            this.styleScriptService.addStyleCitySpecific('../../../../assets/client/css/pace.min.css', 5)
            .then(() => {
              this.styleScriptService.addStyleCitySpecific('../../../../assets/client/css/bootstrap.min.css', 6)
              .then(() => {
                this.styleScriptService.addStyleCitySpecific('../../../../assets/client/css/bootstrap-extended.css', 7)
                .then(() => {
                  this.styleScriptService.addStyleCitySpecific('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap', 8)
                  .then(() => {
                    this.styleScriptService.addStyleCitySpecific('../../../../assets/client/css/app.css', 9)
                    .then(() => {
                      this.styleScriptService.addStyleCitySpecific('../../../../assets/client/css/icons.css', 10)
                      .then(() => {
                        this.styleScriptService.addStyleCitySpecific('../../../../assets/client/css/dark-theme.css', 11)
                        .then(() => {
                          this.styleScriptService.addStyleCitySpecific('../../../../assets/client/css/semi-dark.css', 12)
                          .then(() => {
                            this.styleScriptService.addStyleCitySpecific('../../../../assets/client/css/header-colors.css', 13)
                            .then(() => {
                              resolve();
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      });
    });

    const scriptPromise = new Promise<void>((resolve, reject) => {
      this.styleScriptService.addScriptCitySpecific('../../../../assets/client/js/pace.min.js', 5)
      .then(() => {
        this.styleScriptService.addScriptCitySpecific('../../../../assets/client/js/bootstrap.bundle.min.js', 6)
        .then(() => {
          this.styleScriptService.addScriptCitySpecific('../../../../assets/client/js/jquery.min.js', 7)
          .then(() => {
            this.styleScriptService.addScriptCitySpecific('../../../../assets/client/plugins/simplebar/js/simplebar.min.js', 8)
            .then(() => {
              this.styleScriptService.addScriptCitySpecific('../../../../assets/client/plugins/metismenu/js/metisMenu.min.js', 9)
              .then(() => {
                this.styleScriptService.addScriptCitySpecific('../../../../assets/client/plugins/perfect-scrollbar/js/perfect-scrollbar.js', 10)
                .then(() => {
                  this.styleScriptService.addScriptCitySpecific('../../../../assets/client/js/app.js', 11)
                  .then(() => {
                    resolve();
                  })
                })
              })
            })
          })
        })
      })
    })

    Promise.all([stylePromise, scriptPromise])
      .then(() => {
        console.log("vamos bien");
      })
      .catch(error => {
        console.error('Error cargando recursos:', error);
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
