import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuBarComponent } from './component/menu-bar/menu-bar.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuBarComponent],
})
export class AppComponent {
  constructor() {}
}
