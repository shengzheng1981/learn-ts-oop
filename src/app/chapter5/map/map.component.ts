import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Map, TileLayer, Marker, Icon, CircleMarker, Canvas, LayerGroup, Polyline, Polygon} from 'leaflet';
import { LmapEditorComponent } from '../lmap-editor/lmap-editor.component';
import '../../../../node_modules/leaflet-editable/src/Leaflet.Editable.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map : any;

  @ViewChild('mapContainer', {static: true}) mapContainer: ElementRef;
  @ViewChild('lmapEditor', {static: false}) lmapEditor: LmapEditorComponent;
  
  constructor() { }
  
  ngOnInit() {
    this.map = new Map(this.mapContainer.nativeElement, {
      minZoom: 2,
      maxZoom: 18,
      renderer: new Canvas(),
      //add for editor
      editable: true
    }).setView([39.9041999, 116.4073963], 13);
    let tile = new TileLayer('http://{s}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1', {
        maxZoom: 18,
        subdomains: ['webrd01', 'webrd02', 'webrd03', 'webrd04']
    });
    tile.addTo(this.map);
  }

}
