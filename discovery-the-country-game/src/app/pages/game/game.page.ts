import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CountriesApi } from 'src/app/services/countries-api';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class GamePage implements OnInit {

  dificulty!: string;
  country!: any;

  constructor(private route: ActivatedRoute, private router: Router, private countriesApi: CountriesApi) { }

  async ngOnInit() {
    const param = this.dificulty = this.route.snapshot.paramMap.get('dificulty') || ''
    const valid = ['easy', 'medium', 'hard']
    
    if (!valid.includes(param)) {
      this.router.navigate(['/home'])
      return
    }

    this.dificulty = param
    this.country = await this.countriesApi.getRandomCountry();
  }

  testFunc() {
    console.log(this.country)
  }

}
