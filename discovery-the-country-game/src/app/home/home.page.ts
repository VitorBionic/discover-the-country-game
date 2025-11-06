import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton],
})
export class HomePage {

  dificulty: string = "easy";

  constructor() {}

  startGame() {

  }
}
