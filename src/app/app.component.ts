import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private updates: SwUpdate,
    private alertController: AlertController
    ) {
    // Splash screen handling
    this.platform.ready().then(() => {
      setTimeout(() => {
        let splash = document.getElementById('splash-container')
        if (splash != null) {
          splash.style.opacity = '0'
          setTimeout(() => {
            splash?.remove()
          }, 300);
        }
      }, 500);
    }).catch(err => {
      console.error("Error on platform.ready()", err)
      setTimeout(() => {
        let splash = document.getElementById('splash-container')
        if (splash != null) {
          splash.style.opacity = '0'
          setTimeout(() => {
            splash?.remove()
          }, 300);
        }
      }, 500);
    })

    // PWA update handling
    this.updates.versionUpdates.subscribe(async (evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Atualização disponível',
            message: 'Uma nova versão da aplicação está disponível e será carregada automaticamente',
            buttons: [
              {
                text: 'Atualizar',
                handler: () => {
                  document.location.reload()
                }
              }
            ]
          })
          await alert.present()
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.error(`Failed to install new app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    })
  }
}
