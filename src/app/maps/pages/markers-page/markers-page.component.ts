import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

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

    /* const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'Noa'

    const marker = new Marker({
      color: 'red',
      //element: markerHtml
    })
    .setLngLat( this.currentLngLat )
    .addTo( this.map ); */
  }

}
