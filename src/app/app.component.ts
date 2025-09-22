import { Component } from '@angular/core';
import { StartpageComponent } from "./PAgine/startpage/startpage.component";

@Component({
    selector: 'app-root',
    standalone:true,
    imports: [StartpageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sinica2025';
}
