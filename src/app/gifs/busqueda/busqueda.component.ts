import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  buscar(){
    
    const busqueda = this.txtBuscar.nativeElement.value;
    if(busqueda.trim().length === 0) return;
    this.gifsService.buscarGifs(busqueda);
    this.txtBuscar.nativeElement.value = '';
  }

}
