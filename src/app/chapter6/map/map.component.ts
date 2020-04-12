import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Map, TileLayer, Marker, Icon, CircleMarker, Canvas, LayerGroup, Polyline, Polygon } from 'leaflet';
import { LmapEditorComponent } from '../lmap-editor/lmap-editor.component';
import '../../../../node_modules/leaflet-editable/src/Leaflet.Editable.js';
import { Meta } from '../element/meta';
import { Facility } from '../element/facility';
import { FacilityService } from '../service/facility.service';
import { NzMessageService, NzModalService } from "ng-zorro-antd";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    @ViewChild('mapContainer', { static: true }) mapContainer: ElementRef;
    @ViewChild('lmapEditor', { static: false }) lmapEditor: LmapEditorComponent;

    map: any;
    facilities: any = [];
    current: Facility;

    properties: Array<Meta>;

    constructor(private modal: NzModalService, private message: NzMessageService, private facilityService: FacilityService) { }

    ngOnInit() {
        this.map = new Map(this.mapContainer.nativeElement, {
            minZoom: 2,
            maxZoom: 18,
            renderer: new Canvas(),
            //add for editor
            editable: true
        }).setView([39.9041999, 116.4073963], 10);
        let tile = new TileLayer('http://{s}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1', {
            maxZoom: 18,
            subdomains: ['webrd01', 'webrd02', 'webrd03', 'webrd04']
        });
        tile.addTo(this.map);
        this.properties = Meta.getMeta(Facility);
        this.facilityService.getAll().subscribe((result) => {
            this.facilities = result;
            this.lmapEditor.loadFeatures(this.facilities);
        });
    }

    onCreated(layer) {
        const facility = new Facility();
        facility.code = "PG-" + (new Date()).getMilliseconds();
        facility.geometry = layer.toGeoJSON().geometry;
        this.facilityService.create(facility).subscribe(
            (result) => {
                layer._id = facility._id;
                layer.created = false;
                layer.updated = false;
                this.facilities.push(facility);
                this.message.create("success", "添加成功!");
            },
            (error) => { this.message.create("warning", "添加失败!"); }
        );
    }

    onDeleted(layer) {
        
    }

    onUpdated(layer) {
        const facility = this.facilities.find(item => item._id == layer._id);
        facility.geometry = layer.toGeoJSON().geometry;
        this.facilityService.update(facility).subscribe(
            (result) => {
                layer.created = false;
                layer.updated = false;
                this.message.create("success", "保存成功!");
            },
            (error) => { this.message.create("warning", "保存失败!"); }
        );
    }

    onSave(layers) {
        const created = [], deleted = [], updated = [];
        layers.forEach(layer => {
            if (layer.created) {
                const facility = new Facility();
                facility.create();
                facility.code = "PG-" + (new Date()).getMilliseconds();
                facility.geometry = layer.toGeoJSON().geometry;
                created.push(facility);
                this.facilities.push(facility);
                layer._id = facility._id;
                layer.created = false;
                layer.updated = false;
            } else if (layer.updated) {
                const facility = this.facilities.find(item => item._id == layer._id);
                facility.geometry = layer.toGeoJSON().geometry;
                updated.push(facility);
                layer.created = false;
                layer.updated = false;
            } else if (layer.deleted) {
                const facility = this.facilities.find(item => item._id == layer._id);
                deleted.push(facility);
                const index = this.facilities.findIndex(item => item._id == layer._id);
                index != -1 && this.facilities.splice(index, 1);
            }
        })
        this.facilityService.bulkWrite(created, deleted, updated).subscribe(
            (result) => {
                this.message.create("success", "保存成功!");
            },
            (error) => { this.message.create("warning", "保存失败!"); }
        );
    }
}
