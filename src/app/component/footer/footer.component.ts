import { Component, OnInit } from '@angular/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonLabel]
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
