import { Component, HostListener, OnInit} from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-respons';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public movies:Movie[] =[];
  public moviesslideShow:Movie[] =[];
  @HostListener('window:scroll', ['event'])
  onScroll(){
    const pos = document.documentElement.scrollTop + 1100;
    const max = document.documentElement.scrollHeight;

    if(pos > max){

      if(this.peliculasService.cargando ){return};


      this.peliculasService.getCartelera().subscribe(
        resp =>{this.movies.push(...resp.results)}
      )
    }

  }
  constructor(
    private peliculasService: PeliculasService
   ){}
  
  
   ngOnInit(): void {
    this.peliculasService.getCartelera()
    .subscribe(resp =>{ 
        this.moviesslideShow = resp.results
        this.movies =  resp.results;
    }
      );
   }
    
     
      
}
