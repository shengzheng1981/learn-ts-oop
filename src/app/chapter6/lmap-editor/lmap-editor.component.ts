import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Map, TileLayer, Layer, Marker, Icon, CircleMarker, GeoJSON, Canvas, LayerGroup, FeatureGroup, LatLng, Polygon, Polyline} from 'leaflet';

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

    @Output() onCreated = new EventEmitter<any>();
    @Output() onDeleted = new EventEmitter<any>();
    @Output() onUpdated = new EventEmitter<any>();

    @Output() onSave = new EventEmitter<any>();
    //current tool
    currentTool: string = "Select";
    //edited
    edited: boolean = false;
    //delete array
    deleteArray: Array<Layer> = [];

    constructor() {
    }

    ngOnInit() {
        this.map.editTools.on("editable:drawing:commit", (e) => {
            if (this.currentTool == "Marker" || this.currentTool == "Polyline" || this.currentTool == "Polygon") {
                e.layer.disableEdit();
                e.layer.created = true;
                this.currentTool = "Select";
                this.edited = true;
            } 
        });
        
        this.map.editTools.on("editable:editing", (e) => {
            e.layer.updated = true;
            this.edited = true;
        });
    }

    save() {
        this.map.editTools.featuresLayer.eachLayer((layer) => {
            if(layer.created) {
                this.onCreated.emit(layer);
            } else if (layer.updated) {
                this.onUpdated.emit(layer);
            }
            layer.disableEdit();
        });
        this.deleteArray.forEach((layer) => {
            this.onDeleted.emit(layer);
        });
        this.edited = false;
    }

    save2() {
        const changedArray = [];
        this.map.editTools.featuresLayer.eachLayer((layer) => {
            if(layer.created) {
                changedArray.push(layer);
            } else if (layer.updated) {
                changedArray.push(layer);
            }
            layer.disableEdit();
        });
        this.deleteArray.forEach((layer) => {
            changedArray.push(layer);
        });
        this.onSave.emit(changedArray);
        this.edited = false;
    }

    select() {
        if (this.map.editTools.drawing()) {
            this.map.editTools.stopDrawing();
        } 
        this.currentTool = "Select";
    }

    //画点
    startMarker() {
        this.currentTool = "Marker";
        const marker = this.map.editTools.startMarker(undefined, {
            icon: new Icon({
                iconUrl: "assets/img/marker/" + (this.option.style.icon || "marker.svg"),
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            })
        });
        marker.on('dblclick', (event) => {
            this.editable && marker.toggleEdit();
        });
    }

    //画线
    startPolyline() {
        this.currentTool = "Polyline";
        const polyline = this.map.editTools.startPolyline(undefined, {
            color: this.option.style.color || '#ff0000',
            opacity: 1,
            weight: 4,
            clickTolerance: 6
        });
        polyline.on('dblclick', (event) => {
            this.editable && polyline.toggleEdit();
        });
    }

    //画面
    startPolygon() {
        this.currentTool = "Polygon";
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
            if (layer.editEnabled()){
                layer.deleted = true;
                if (!layer.created) this.deleteArray.push(layer);
                list.push(layer);
            } 
        });
        list.forEach(layer => {
            this.map.editTools.featuresLayer.removeLayer(layer);
        });
        if (this.deleteArray.length > 0) this.edited = true;
    } 

    //加载要素到地图（来自反序列化）
    loadFeatures(features){
        Array.isArray(features) && features.forEach(feature => {
            if (feature.geometry) {
                if(feature.geometry.type === 'Point'){
                    const point = feature.geometry.coordinates;
                    const marker = new Marker([point[1],point[0]],{
                        icon: new Icon({
                            iconUrl: "assets/img/marker/" + (this.option.style.icon || "marker.svg"),
                            iconSize: [28, 28],
                            iconAnchor: [14, 14]
                        })
                    });
                    marker.on('dblclick', (event) => {
                        this.editable && marker.toggleEdit();
                    });
                    marker._id = feature._id;
                    this.map.editTools.featuresLayer.addLayer(marker);
                }
        
                if(feature.geometry.type === 'LineString'){
                    const swap = feature.geometry.coordinates.map( point => [point[1],point[0]] );
                    const polyline = new Polyline(swap, {
                        color: this.option.style.color || '#ff0000',
                        opacity: this.option.style.fillOpacity || 1,
                        weight: 4,
                        clickTolerance: 6
                    });
                    polyline.on('dblclick', (event) => {
                        this.editable && polyline.toggleEdit();
                    });
                    polyline._id = feature._id;
                    this.map.editTools.featuresLayer.addLayer(polyline);
                }
        
                if(feature.geometry.type === 'Polygon'){
                    const swap = feature.geometry.coordinates.map( ring => ring.map( point => [point[1],point[0]])) ;
                    const polygon = new Polygon(swap, {
                        color: this.option.style.color || '#ff0000',
                        fillColor : this.option.style.fillColor || '#ff0000',
                        fillOpacity : this.option.style.fillOpacity || 1
                    });
                    polygon.on('dblclick', (event) => {
                        if (this.editable) {
                            polygon.toggleEdit();
                        }
                    });
                    polygon._id = feature._id;
                    this.map.editTools.featuresLayer.addLayer(polygon);
                }
            }
        });
    }


}
