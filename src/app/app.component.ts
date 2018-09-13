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
  images: HTMLImageElement[] = [];
  currentImage: HTMLImageElement = null;
  bigImageWidth = 0;

  constructor() {
    this.drawPlaces();
  }

  drawPlaces = function() {
    for (let i = 0; i < PLACES.length; i++) {
      const place = new Image();
      place.src = '../assets/' + PLACES[i];
      if (IS_PNG[i]) {
        place.src += '.png';
      } else {
        place.src += '.jpg';
      }
      const scaling = 120 / place.height;
      place.width = Math.round(place.width * scaling);
      place.height = Math.round(place.height * scaling);
      place.classList.add('img-thumbnail');
      place.classList.add('rounded');
      this.images.push(place);
    }
    const images = this.images;
    window.onload = function() {
      for (const image of images) {
        const imageDiv = document.getElementById('images');
        imageDiv.appendChild(image);
      }
    };
  };
  generatePlace = function() {
  };

  setBig = function(image, increase, loops, scope) {
    setTimeout(function() {
      if (increase) {
        scope.bigImageWidth += 10;
      } else {
        scope.bigImageWidth -= 10;
      }
      image.style.width = scope.bigImageWidth + 'px';
      if (--loops) { scope.setBig(image, increase, loops, scope); }
      if (loops === 0) {
        scope.isLooping = false;
        if (!increase) {
          scope.currentImage = null;
        } else {
          scope.setBigCSS(scope.currentImage);
        }
      }
    }, 30);
  };

  setBigCSS = function(image: HTMLImageElement) {
    image.style.position = 'absolute';
    image.style.margin = 'auto';
    image.style.top = '0';
    image.style.right = '0';
    image.style.bottom = '0';
    image.style.left = '0';
  };

  setNormalCSS = function(image: HTMLImageElement) {
    image.style.position = 'static';
    image.style.margin = '0px';
    image.style.top = 'auto';
    image.style.right = 'auto';
    image.style.bottom = 'auto';
    image.style.left = 'auto';
  };

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      if (!this.isLooping) {
        this.isLooping = true;
        if (this.currentImage === null) {
          this.currentImage = this.images[Math.floor(Math.random() * this.images.length)];
          this.bigImageWidth = this.currentImage.width;
          this.setBig(this.currentImage, true, 60, this);
        } else {
          this.setNormalCSS(this.currentImage);
          this.setBig(this.currentImage, false, 60, this);
        }
      }
    }
  }
}
