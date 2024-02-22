import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-respons';
import {tap} from 'rxjs';
import { MovieDetails } from '../interfaces/movie-response';
import { CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private baseUrl:string = 'https://api.themoviedb.org/3';
  private carteleraPage:number = 1;
  public cargando:boolean = false;
  constructor(
    private http:HttpClient
  ) { 
    
  }

  
 get params(){
  return{
    api_key: 'eb1f0342385151ea8094d7a76d96188f',
    language: 'es-ES',
    page: this.carteleraPage.toString()
  }
 }
  buscarPeliculas(texto:string):any{
    const params = {... this.params, page: '1', query: texto}


    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params
    }).pipe(
      map(resp=> resp.results)
    )

  }












  getCartelera(): Observable <CarteleraResponse>{



    this.cargando = true
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{params: this.params}).pipe(
     
      tap(
        ()=>{
          this.carteleraPage += 1;
          this.cargando = false
        }
      )
    )
  }



  getPeliculaDetalle( id:string){
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err=>of(null))
    );
  }


  getCast( id:string){
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(
        resp=>(resp.cast)
      ),
      catchError(err=>of([]))
    );
  }



}
