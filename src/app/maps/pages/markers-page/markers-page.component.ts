import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarkers {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  public addingMarkers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-2.59665,51.45523);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'This HTML file was not found';
    
    
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });
    //después de inicializar el mapa
    this.readFromLocalStorage();

    /* const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'Noa'

    const marker = new Marker({
      color: 'red',
      //element: markerHtml
    })
    .setLngLat( this.currentLngLat )
    .addTo( this.map ); */
  }

  createMarker(){
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat =  this.map?.getCenter();

    this.addMarker( lngLat, color ); //añade markers pero no los guarda. Si actualizamos se pierden
  }

  addMarker( lngLat: LngLat, color: string ) {
    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

      this.addingMarkers.push({ color, marker })
      this.saveToLocalStorage();
  }

  deleteMarker( index: number ) {
    this.addingMarkers[index].marker.remove(); //para eliminar marcador/pin
    this.addingMarkers.splice( index, 1 ); //para eliminar etiqueta de marcador
  }

  flyToMarker( marker: Marker ) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarkers[] = this.addingMarkers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
    
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarkers[] = JSON.parse( plainMarkersString ); //! OJO !

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color )
    } )
    
  }

}
