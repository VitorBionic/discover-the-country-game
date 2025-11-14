import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Highlight } from 'src/app/directives/highlight'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [Highlight, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption, IonButton],
})
export class HomePage {

  dificulty: string = "easy";

  constructor(private router: Router) {}

  startGame() {
    console.log("Starting game - " + this.dificulty)
    this.router.navigate(['/game', this.dificulty]);
  }
}
