import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import tamagochiData from "../../../assets/data/tamagochi.json";
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-main-tamagochi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-tamagochi.component.html',
  styleUrls: ['./main-tamagochi.component.css', './main-responsive.css']
})
export class MainTamagochiComponent implements OnInit {

  nome: string = "";
  especie: string = "";
  saude: number = 0;
  fome: number = 0;
  felicidade: number = 0;
  energia: number = 0;
  imagemRemota: string = "";
  private id: string | null = null;

  saudeMAX: number = 0;
  fomeMAX: number = 0;
  felicidadeMAX: number = 0;
  energiaMAX: number = 0;

  tempoJogo: number = 0;
  inicioContagem: boolean = true;




  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.id = value.get("id");
      this.setValuesToComponent(this.id);
    });

    //verificação de tempo

    interval(1000).subscribe(() => {
      if(this.inicioContagem && this.saude !== 0){
        this.tempoJogo++;
      }
    });

    if (this.saude === 0 && !this.inicioContagem) {
      this.inicioContagem = true;
    }
    // Iniciar a verificação a cada segundo
    interval(1000).subscribe(() => {
      if (this.felicidade === 0 || this.fome === 0) {
        this.energia = this.clampValue(this.energia - 2, 0, this.energiaMAX);
       }
    });

    interval(2000).subscribe(() => {
      if (this.energia === 0) {
        this.saude = this.clampValue(this.saude - 3, 0, this.saudeMAX);
       }
    });

    interval(2000).subscribe(() => {
        this.fome = this.clampValue(this.fome - 1, 0, this.fomeMAX);
    });

    interval(3000).subscribe(() => {
      this.felicidade = this.clampValue(this.felicidade - 1, 0, this.felicidadeMAX);
    });

  }

  setValuesToComponent(id: string | null): void {
    if (id) {
      const bichoAtivo = tamagochiData.bichos.find(bicho => bicho.id === +id);

      if (bichoAtivo) {
        this.nome = bichoAtivo.nome;
        this.especie = bichoAtivo.especie;

        // Definindo o limite máximo dos atributos
        this.saudeMAX = bichoAtivo.saude;
        this.fomeMAX = bichoAtivo.fome;
        this.felicidadeMAX = bichoAtivo.felicidade;
        this.energiaMAX = bichoAtivo.energia;

        this.saude = this.clampValue(bichoAtivo.saude, 0, this.saudeMAX);
        this.fome = this.clampValue(bichoAtivo.fome, 0, this.fomeMAX);
        this.felicidade = this.clampValue(bichoAtivo.felicidade, 0, this.felicidadeMAX);
        this.energia = this.clampValue(bichoAtivo.energia, 0, this.energiaMAX);

        this.imagemRemota = bichoAtivo.imagemRemota;
      }
    }
  }


  clampValue(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  async playAudio(audioName: string) {
    let audio = new Audio(audioName);
    audio.volume = 0.01;
    audio.play()
  }


  papar() {
    if (this.fome !== this.fomeMAX){
    this.playAudio("./assets/music/button.mp3");
    this.fome = this.clampValue(this.fome + 1, 0, this.fomeMAX);
    }else{
      this.playAudio("./assets/music/no-button.mp3");
    }
  }

  brincar() {
    if(this.felicidade !== this.felicidadeMAX){
      this.playAudio("./assets/music/button.mp3");
      this.felicidade = this.clampValue(this.felicidade + 1, 0, this.felicidadeMAX);
      this.fome = this.clampValue(this.fome - 2, 0, this.fomeMAX);
      this.energia = this.clampValue(this.energia - 3, 0, this.energiaMAX);
    } else{
      this.playAudio("./assets/music/no-button.mp3");
    }
  }

  mimir() {
    if(this.energia !== this.energiaMAX){
      this.playAudio("./assets/music/button.mp3");
      this.energia = this.clampValue(this.energia + 1, 0, this.energiaMAX);
      this.felicidade = this.clampValue(this.felicidade + 1, 0, this.felicidadeMAX);
      this.fome = this.clampValue(this.fome - 5, 0, this.fomeMAX);
    }else{
      this.playAudio("./assets/music/no-button.mp3");
    }
  }

  darRemedio() {
    if(this.saude !== this.saudeMAX){
      this.playAudio("./assets/music/button.mp3");
      this.saude = this.clampValue(this.saude + 1, 0, this.saudeMAX);
      this.fome = this.clampValue(this.fome - 2, 0, this.fomeMAX);
      this.felicidade = this.clampValue(this.felicidade - 1, 0, this.felicidadeMAX);
    }else{
      this.playAudio("./assets/music/no-button.mp3");
    }
  }

  tentarNovamente() {
    this.playAudio("./assets/music/button.mp3");
    this.router.navigate(['']);
    this.tempoJogo = 0;
  }

  formatarTempo(tempo: number): string {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }



}
