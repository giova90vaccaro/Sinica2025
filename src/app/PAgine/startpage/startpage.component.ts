import { Component, Injectable } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@Component({
    selector: 'app-startpage',
    standalone:true,
    imports: [MatToolbarModule, MatIconModule, MatSidenavModule, RouterOutlet, MatButtonModule],
    templateUrl: './startpage.component.html',
    styleUrl: './startpage.component.css'
})
export class StartpageComponent {

}
