import { Component, OnInit } from '@angular/core';
import tamagochiData from '../../../assets/data/tamagochi.json';
import { CommonModule } from '@angular/common';
import {RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css', './select-responsive.css']
})
export class SelectComponent implements OnInit{
  bichos: any[] = []; // Array para armazenar os bichos disponíveis
  tamagotchiSelecionado: string = ''; //Armazena ID dos Tamagochis

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (tamagochiData.bichos && tamagochiData.bichos.length > 0) {
      this.bichos = tamagochiData.bichos;
    }
  }

  async playAudio(audioName: string){
    let audio = new Audio(audioName);
    audio.volume = 0.01;
    audio.play()
  }

  selecionarTamagotchi(bicho: any): void {
    this.tamagotchiSelecionado = bicho.id;
    this.playAudio("./assets/music/button.mp3")

  }

  irParaMain(bicho: any): void {
    this.tamagotchiSelecionado = bicho.id;
    this.playAudio("./assets/music/button.mp3");
    setTimeout(() => {
      this.router.navigate(['tamagochi', bicho.id]);
    }, 500);
  }

}
