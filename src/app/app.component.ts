import { Component} from '@angular/core';
import { SelectComponent } from "./pages/select/select.component";
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [SelectComponent, RouterOutlet]
})
export class AppComponent {
  title = 'tamagochi';
}

