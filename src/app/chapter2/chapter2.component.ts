import { Component, OnInit } from '@angular/core';
import { Facility } from './element/facility';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { Meta } from './element/meta';

@Component({
  selector: 'app-chapter2',
  templateUrl: './chapter2.component.html',
  styleUrls: ['./chapter2.component.scss']
})
export class Chapter2Component implements OnInit {

  static DB_Name: string = "chapter2-data";
  static DB_Table_Name: string = "Facility";
  static DB_Version: number = 1;
  static DB_Default_Data = [
      {name: "泵站", code: "P-001", complete: "2020-01-01"},
      {name: "调蓄池", code: "S-001", complete: "2020-02-01"},
      {name: "防洪坝", code: "W-001", complete: "2020-02-02"}
  ];
  DB: any = null;
  facilities: any = [];
  current: Facility;

  properties: Array<Meta>;

  constructor(private modal: NzModalService, private message: NzMessageService) { }

  async ngOnInit() {
    this.properties = new Array<Meta>();
    const instance = new Facility();
    Object.keys(instance).forEach( property => {
        const meta = new Meta();
        meta.init(instance, property);
        this.properties.push(meta);
    });
    let request = window.indexedDB.open(Chapter2Component.DB_Name, Chapter2Component.DB_Version);
    request.onerror = (event) => {
        //console.log('Database failed to open');
    };
    //加载IndexedDB
    request.onsuccess = (event) => {
        //console.log('Database opened successfully');
        // Store the opened database object in the db variable. This is used a lot below
        this.DB = request.result;
        const objectStore = this.DB.transaction(Chapter2Component.DB_Table_Name).objectStore(Chapter2Component.DB_Table_Name);
        const req = objectStore.getAll();
        req.onsuccess = (event) => {
            const data = (event.target as any).result;
            //加载IndexedDB存储的原有记录
            this.facilities = [];
            Array.isArray(data) && data.forEach(item => {
                const facility = new Facility();
                facility.fromJSON(item);
                this.facilities.push(facility);
            });
            this.facilities.length > 0 && (this.current = this.facilities[0]);
        }
    };
    //IndexedDB初始化及升级
    request.onupgradeneeded = (event) => {
        // Grab a reference to the opened database
        const db = (event.target as any).result;
        // Create an objectStore to store our notes in (basically like a single table)
        // including a auto-incrementing key
        const objectStore = db.createObjectStore(Chapter2Component.DB_Table_Name, { keyPath: "_id" });
        objectStore.transaction.oncomplete = (event) => {
            //初始化默认数据，并将数据保存到新创建的对象仓库
            const objectStore = db.transaction(Chapter2Component.DB_Table_Name, "readwrite").objectStore(Chapter2Component.DB_Table_Name);
            Chapter2Component.DB_Default_Data.forEach( (item) => {
                const facility = new Facility();
                facility.fromJSON(item);
                facility.create();
                objectStore.add(facility.toJSON());
            });
        };
    };
  }

  active(item){
    this.current = item;
  }

  add(){
    this.current = new Facility();
    this.current.create();
    this.facilities.push(this.current);
    this.facilities = [...this.facilities];
    const objectStore = this.DB.transaction(Chapter2Component.DB_Table_Name, "readwrite").objectStore(Chapter2Component.DB_Table_Name);
    objectStore.add(this.current.toJSON());
    this.message.create("success", "添加成功!");
  }

  remove(item) {
    this.modal.confirm({
      nzTitle: '提示',
      nzContent: '是否确认删除？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        const objectStore = this.DB.transaction(Chapter2Component.DB_Table_Name, "readwrite").objectStore(Chapter2Component.DB_Table_Name);
        const request = objectStore.delete(item._id);
        request.onerror = (event) => {
          // 错误处理
          this.message.create("warning", "删除失败!");
        };
        request.onsuccess = (event) => {
          const index = this.facilities.findIndex(facility => facility._id === item._id);
          this.facilities.splice(index, 1);
          this.facilities = [...this.facilities];
          if (item._id === this.current._id) this.current = null;
          this.message.create("success", "删除成功!");
        };
      }
    });
  }

  save(){
    const objectStore = this.DB.transaction(Chapter2Component.DB_Table_Name, "readwrite").objectStore(Chapter2Component.DB_Table_Name);
    const request = objectStore.get(this.current._id);
    request.onerror = (event) => {
      // 错误处理
      this.message.create("warning", "保存失败!");
    };
    request.onsuccess = (event) => {
      // 把更新过的对象放回数据库
      const requestUpdate = objectStore.put(this.current.toJSON());
      requestUpdate.onerror = (event) => {
        // 错误处理
        this.message.create("warning", "保存失败!");
      };
      requestUpdate.onsuccess = (event) => {
        // 完成，数据已更新！
        this.message.create("success", "保存成功!");
      };
    };
  }

}
