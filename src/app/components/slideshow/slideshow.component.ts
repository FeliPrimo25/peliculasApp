import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-respons';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent  implements OnInit, AfterViewInit{
  @Input() movies:Movie[] =[];
  ngOnInit(): void {
    
    
  }
  
  public swiper!: Swiper;
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      // Optional parameters
     
      loop: true,
      autoplay: {
        delay: 500,
      }
     
    });
    
  }

  next(){
    this.swiper.slideNext()
  }
  prev(){
    this.swiper.slidePrev()
  }


}
