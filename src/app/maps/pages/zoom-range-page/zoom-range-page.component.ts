import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public currentZoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-2.59665,51.45523);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'This HTML file was not found';
    
    
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if ( !this.map ) throw 'Map not found';

    this.map.on('zoom', (ev) => {
      this.currentZoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => { //listener para que cuando hagamos demasiado zoom vuelva a valor zoom 18
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat } = this.currentLngLat;      
    });
  }

  zoomIn() {
    this.map?.zoomIn(); //para botón zoom in
  }

  zoomOut() {
    this.map?.zoomOut(); //para botón zoom out
  }

  zoomChanged( value: string ) {
    this.currentZoom = Number(value);
    this.map?.zoomTo( this.currentZoom );
  }
  
}
