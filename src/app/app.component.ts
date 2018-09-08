import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { COUNTRIES } from './countries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  country: string;
  contries = COUNTRIES;

  constructor() {
    this.country = '------';
    // window.onload = function() { markMap(); }
  }
  markMap = function() {
    var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var map = new Image();
    map.src = '../assets/WorldMap.png';
    ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width * Math.random(), canvas.height * Math.random(), 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.stroke();
  }

  generateCountry = function() {
    this.country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    this.markMap();
  }
  onSearchChange = function() {
    alert("HEJ")
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == 32) {
      this.generateCountry();
    }
  }
}
