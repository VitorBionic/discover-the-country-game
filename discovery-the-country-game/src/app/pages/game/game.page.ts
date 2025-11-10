import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesApi } from 'src/app/services/countries-api';
import { DIFFICULTIES } from 'src/app/config/difficutlties.config';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonInput]
})
export class GamePage implements OnInit {

  // Variáveis do jogo e da dificuldade
  dificulty!: string;
  country!: any;
  dificultyTag!: string;
  lifepoints!: number;
  time!: number;
  hints!: string[];
  wordProgress!: string;

  // Variáveis da forca
  palavra!: string;
  palavraOculta: string[] = [];
  letrasErradas: string[] = [];
  letraDigitada = '';
  tentativas = 0;
  venceu = false;
  perdeu = false;

  boneco = {
    cabeca: '',
    corpo: '',
    bracoEsq: '',
    bracoDir: '',
    pernaEsq: '',
    pernaDir: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countriesApi: CountriesApi
  ) { }

  async ngOnInit() {
    const param = this.dificulty = this.route.snapshot.paramMap.get('dificulty') || '';
    const valid = ['easy', 'medium', 'hard'];
    
    if (!valid.includes(param)) {
      this.router.navigate(['/home']);
      return;
    }

    this.dificulty = param;
    this.country = await this.countriesApi.getRandomCountry();

    const dificultySettings = DIFFICULTIES[this.dificulty as keyof typeof DIFFICULTIES];
    this.dificultyTag = dificultySettings["tag"];
    this.lifepoints = dificultySettings["lifepoints"];
    this.time = dificultySettings["time"];
    this.hints = [...dificultySettings["hints"]];

    // Pega o nome do país e define a palavra da forca
    this.palavra = this.country.name.common.toUpperCase();
    this.palavraOculta = Array.from(this.palavra).map(l => l === ' ' ? ' ' : '_');
  }

  verificarLetra() {
    if (this.venceu || this.perdeu) return;

    const letra = this.letraDigitada.toUpperCase().trim();
    if (!letra || letra.length !== 1) return;

    if (this.palavra.includes(letra)) {
      this.palavra.split('').forEach((l, i) => {
        if (l === letra) this.palavraOculta[i] = letra;
      });

      if (!this.palavraOculta.includes('_')) {
        this.venceu = true;
        setTimeout(() => alert('🎉 Parabéns! Você venceu!'), 200);
      }

    } else if (!this.letrasErradas.includes(letra)) {
      this.letrasErradas.push(letra);
      this.tentativas++;
      this.atualizarBoneco();

      if (this.tentativas >= 6) {
        this.perdeu = true;
        setTimeout(() => alert(`💀 Você perdeu! A palavra era: ${this.palavra}`), 200);
      }
    }

    this.letraDigitada = '';
  }

  atualizarBoneco() {
    const partes = [
      () => this.boneco.cabeca = 'O',
      () => this.boneco.corpo = '|',
      () => this.boneco.bracoEsq = '/',
      () => this.boneco.bracoDir = '\\',
      () => this.boneco.pernaEsq = '/',
      () => this.boneco.pernaDir = '\\'
    ];

    if (this.tentativas <= partes.length) partes[this.tentativas - 1]();
  }

  reiniciarJogo() {
    this.palavraOculta = Array.from(this.palavra).map(l => l === ' ' ? ' ' : '_');
    this.letrasErradas = [];
    this.letraDigitada = '';
    this.tentativas = 0;
    this.venceu = false;
    this.perdeu = false;
    this.boneco = { cabeca: '', corpo: '', bracoEsq: '', bracoDir: '', pernaEsq: '', pernaDir: '' };
  }
}
