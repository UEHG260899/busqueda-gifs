import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  //No importa donde este en el proyecto, se puede usar de manera global
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'trVn8fMme1UuSO8iMf0SmybEWeTdv37o';
  private _historial: string[] = [];

  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

      this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=trVn8fMme1UuSO8iMf0SmybEWeTdv37o&q=${query}&limit=10`)
        .subscribe( (response) => {
          this.resultados = response.data;
        });

  }
}
