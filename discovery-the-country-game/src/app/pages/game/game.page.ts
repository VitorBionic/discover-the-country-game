import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonItem, IonTitle, IonToolbar, IonInput } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CountriesApi } from 'src/app/services/countries-api';
import { DIFFICULTIES } from 'src/app/config/difficutlties.config';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonInput]
})
export class GamePage implements OnInit {

  dificulty!: string;
  country!: any;
  dificultyTag!: string;
  lifepoints!: number;
  time!: number;
  hints!: string[];
  word!: string;
  wordProgress!: string[];
  wrongLetters: string[] = [];
  typedLetter = "";
  gameEnded: boolean = false;

  dummy = {
    head: ' ',
    body: ' ',
    leftArm: ' ',
    rightArm: ' ',
    leftLeg: ' ',
    rightLeg: ' '
  };

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

    this.word = this.country.name.common.toUpperCase();
    this.wordProgress = Array.from(this.word).map(l => l === ' ' ? ' ' : '_');
  }

  verifyLetter() {
    if (this.gameEnded) return;

    const letter = this.typedLetter.toUpperCase().trim();
    if (!letter || letter.length !== 1) return;

    if (this.wrongLetters.includes(letter)) return;
    if (this.wordProgress.includes(letter)) return;

    if (this.word.includes(letter)) {
      this.word.split('').forEach((l, i) => {
        if (l === letter) this.wordProgress[i] = letter;
      });

      if (!this.wordProgress.includes('_')) {
        this.gameEnded = true;
        setTimeout(() => alert('🎉 Parabéns! Você venceu!'), 200);
      }

    } else {
      this.lifepoints -= 1;
      this.wrongLetters.push(letter);
      this.updateToy();
      this.showHints();
      if (this.lifepoints == 0) {
        this.gameEnded = true;
        setTimeout(() => alert(`💀 Você perdeu! O país era: ${this.word}`), 200);
      }
    }

    this.typedLetter = "";
  }

  updateToy() {
    const parts = [
      () => this.dummy.head = 'O',
      () => this.dummy.body = '|',
      () => this.dummy.leftArm = '/',
      () => this.dummy.rightArm = '\\',
      () => this.dummy.leftLeg = '/',
      () => this.dummy.rightLeg = '\\'
    ];

    switch (this.dificulty) {
      case "easy":
        if (this.lifepoints >= 1)
          parts[parts.length - this.lifepoints]()
        break;
      case "medium":
        if (this.lifepoints >= 1) {
          if (this.lifepoints == 3)
            parts[0]()
          else if (this.lifepoints == 2) {
            parts[1]()
            parts[2]()
            parts[3]()
          } else if (this.lifepoints == 1) {
            parts[4]()
            parts[5]()
          }
        }
        break;
      case "hard":
        if (this.lifepoints >= 1) {
          for (const part of parts)
            part()
        }
        break;
    }

  }

  showHints() {
    
  }
}
