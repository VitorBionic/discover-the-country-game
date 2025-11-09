import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton],
})
export class HomePage {

  dificulty: string = "easy";

  constructor(private router: Router) {}

  startGame() {
    console.log("Starting game - " + this.dificulty)
    this.router.navigate(['/game', this.dificulty]);
  }
}
