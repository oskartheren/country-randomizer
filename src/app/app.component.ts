import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { PLACES } from './places';
import { IS_PNG } from './places';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isBig = false;
  isLooping = false;

  constructor() {
    this.drawPlaces();
  }

  drawPlaces = function() {
    const images = [];
    for (let i = 0; i < PLACES.length; i++) {
      // const place = new Image(window.innerWidth / 8, window.innerHeight / 5);
      const place = new Image();
      place.classList.add('img-thumbnail');
      place.src = '../assets/' + PLACES[i];
      if (IS_PNG[i]) {
        place.src += '.png';
      } else {
        place.src += '.jpg';
      }
      const scaling = 120 / place.height;
      place.width = Math.round(place.width *  scaling);
      place.height = Math.round(place.height * scaling);
      place.classList.add('rounded');
      images.push(place);
    }
    window.onload = function() {
      for (const image of images) {
        const imageDiv = document.getElementById('images');
        imageDiv.appendChild(image);
      }
    };
  };

  showPlace = function(place: string) {
    const image = <HTMLImageElement>document.getElementById('bigImage');
    const index = PLACES.indexOf(place);
    image.src = '../assets/' + place;
    if (IS_PNG[index]) {
      image.src += '.png';
    } else {
      image.src += '.jpg';
    }
    this.setBig(image, 1, 30, this);
  };
  generatePlace = function() {
    this.place = PLACES[Math.floor(Math.random() * PLACES.length)];
    this.showPlace(this.place);
  };

  setBig = function(image, multiplier, loops, scope) {
     setTimeout(function () {
       image.width += multiplier * ( window.innerWidth / 30);
       image.height += multiplier * ( window.innerHeight / 30);
       if (--loops) { scope.setBig(image, multiplier, loops, scope); }
       if (loops === 0 ) {scope.isLooping = false; }
    }, 10);
  };

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      if (!this.isLooping) {
        this.isLooping = true;
        if (this.isBig) {
          this.generatePlace();
        } else {
          const image = <HTMLImageElement>document.getElementById('bigImage');
          this.setBig(image, -1, 30, this);
        }
        this.isBig = !this.isBig;
      }
    }
  }
}
