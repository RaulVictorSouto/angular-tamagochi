import { Component } from '@angular/core';
import { MainTamagochiComponent } from "../../components/main-tamagochi/main-tamagochi.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [MainTamagochiComponent]
})
export class HomeComponent {

}
