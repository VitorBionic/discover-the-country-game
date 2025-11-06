import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GamePage implements OnInit {

  dificulty!: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const param = this.dificulty = this.route.snapshot.paramMap.get('dificulty') || ''
    const valid = ['easy', 'medium', 'hard']
    
    if (!valid.includes(param)) {
      this.router.navigate(['/home'])
      return
    }

    this.dificulty = param
  }

}
