import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Map, TileLayer, Marker, Icon, CircleMarker, GeoJSON, Canvas, LayerGroup, FeatureGroup, LatLng, Polygon, Polyline} from 'leaflet';

@Component({
    selector: 'app-lmap-editor',
    templateUrl: './lmap-editor.component.html',
    styleUrls: ['./lmap-editor.component.scss']
})
export class LmapEditorComponent implements OnInit {

    @Input() editable: boolean;
    @Input() map: any;
    @Input() option: any = {
        style: {
            icon: "marker.svg",
            color: '#ff0000',
            fillColor: '#ff0000',
            fillOpacity: 0.8
        }
    };

    constructor() {
    }

    ngOnInit() {

    }

    //画点
    startPoint() {
        const point = this.map.editTools.startMarker(undefined, {
            icon: new Icon({
                iconUrl: "assets/img/marker/" + (this.option.style.icon || "marker.svg"),
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            })
        });
        point.on('dblclick', (event) => {
            this.editable &&  point.toggleEdit();
        });
    }

    //画线
    startPolyline() {
        const polyline = this.map.editTools.startPolyline(undefined, {
            color: this.option.style.color || '#ff0000',
            opacity: 1,
            weight: 4,
            clickTolerance: 6
        });
        polyline.on('dblclick', (event) => {
            this.editable &&  polyline.toggleEdit();
        });
    }

    //画面
    startPolygon() {
        const polygon = this.map.editTools.startPolygon(undefined, {
            color: this.option.style.color || '#ff0000',
            fillColor: this.option.style.fillColor || '#ff0000',
            fillOpacity: this.option.style.fillOpacity || 1
        });
        polygon.on('dblclick', (event) => {
            this.editable && polygon.toggleEdit();
        });
    }

    //删除选中地图要素
    removeSelection() {
        const list = [];
        this.map.editTools.featuresLayer.eachLayer(layer => {
            layer.editor && list.push(layer);
        });
        list.forEach(layer => {
            this.map.editTools.featuresLayer.removeLayer(layer);
        });
    }

}
