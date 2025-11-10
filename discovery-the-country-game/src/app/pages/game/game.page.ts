import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CountriesApi } from 'src/app/services/countries-api';
import { DIFFICULTIES } from 'src/app/config/difficutlties.config';

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
  dificultyTag!: string;
  lifepoints!: number;
  time!: number;
  hints!: string[];
  wordProgress!: string;

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
    const dificultySettings = DIFFICULTIES[this.dificulty as keyof typeof DIFFICULTIES]
    this.dificultyTag = dificultySettings["tag"]
    this.lifepoints = dificultySettings["lifepoints"]
    this.time = dificultySettings["time"]
    this.hints = [...dificultySettings["hints"]]

    this.wordProgress = this.country.name.common.replace(/[^ ]/g, "*")
  }

}
