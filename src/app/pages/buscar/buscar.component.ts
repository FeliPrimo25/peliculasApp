import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-respons';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit{

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculaService:PeliculasService
  ){}

    public texto:string = '';
    public Movies: Movie[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      cc =>{
        console.log(cc['texto']);
        this.peliculaService.buscarPeliculas(cc['texto']).subscribe(
          (          movies: any)=>{
            this.texto = cc['texto'];
            this.Movies = movies;
            console.log(movies);
          }
        )
      }
    )
  }
}
