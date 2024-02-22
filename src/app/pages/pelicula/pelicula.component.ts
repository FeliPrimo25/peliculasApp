import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-respons';
import { MovieDetails } from '../../interfaces/movie-response';
import { RatingModule } from 'ng-starrating';
import { Location } from '@angular/common';
import { Cast, CreditsResponse } from "../../interfaces/credits-response";
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
    public pelicula!: MovieDetails | null;
    public cast:Cast[] = [];



  constructor(
    private activatedRpute:ActivatedRoute,
    private peliculaSerice:PeliculasService,
    private location:Location,
    private router:Router
  ){}
    ngOnInit(): void {
      const id = this.activatedRpute.snapshot.params['id'];
        
      combineLatest([
        this.peliculaSerice.getPeliculaDetalle(id),
        this.peliculaSerice.getCast(id)
      ]).subscribe(
        ([pelicula, cast])=>{
          if(!pelicula){
                this.router.navigateByUrl('/home')
                return;
              }

          this.pelicula	= pelicula,
          this.cast = cast
        }
      )
      
      
      
      // this.peliculaSerice.getPeliculaDetalle(id).subscribe(movie=>{
      //   if(!movie){
      //     this.router.navigateByUrl('/home')
      //     return;
      //   }
      //   console.log(movie);
      //   this.pelicula = movie;
      // })
      // this.peliculaSerice.getCast(id).subscribe(
      //     cast =>{
      //       console.log(cast);
      //       this.cast = cast;
      //     }
      // )


    }

    volver(){
      this.location.back();
    }


}
