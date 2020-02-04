import { Component, OnInit } from '@angular/core';
import { Facility } from '../element/facility';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { Meta } from '../element/meta';
import { FacilityService } from '../service/facility.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  facilities: any = [];
  current: Facility;

  properties: Array<Meta>;

  constructor(private modal: NzModalService, private message: NzMessageService, private facilityService: FacilityService) { }

  async ngOnInit() {
    this.properties = Meta.getMeta(Facility);
    this.facilityService.getAll().subscribe( (result) => {
      this.facilities = result;
    })
  }

  active(item){
    this.current = item;
  }

  add(){
    this.current = new Facility();
    this.facilityService.create(this.current).subscribe( 
      (result) => {
        this.facilities.push(this.current);
        this.facilities = [...this.facilities];
        this.message.create("success", "添加成功!");
      },
      (error) => {this.message.create("warning", "添加失败!");}
    );
  }

  remove(item) {
    this.modal.confirm({
      nzTitle: '提示',
      nzContent: '是否确认删除？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.facilityService.delete(this.current).subscribe( 
          (result) => {
            const index = this.facilities.findIndex(facility => facility._id === item._id);
            this.facilities.splice(index, 1);
            this.facilities = [...this.facilities];
            if (item._id === this.current._id) this.current = null;
            this.message.create("success", "删除成功!");
          },
          (error) => {this.message.create("warning", "删除失败!");}
        );
      }
    });
  }

  save(){
    this.facilityService.update(this.current).subscribe( 
      (result) => {
        this.message.create("success", "保存成功!");
      },
      (error) => {this.message.create("warning", "保存失败!");}
    );
  }
}
