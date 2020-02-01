import { Component, OnInit } from '@angular/core';
import { FacilityCategory } from './element/facility-category';
import {NzMessageService, NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-chapter1',
  templateUrl: './chapter1.component.html',
  styleUrls: ['./chapter1.component.scss']
})
export class Chapter1Component implements OnInit {
  
  static DB_Name: string = "chapter1-config";
  static DB_Table_Name: string = "FacilityCategory";
  static DB_Version: number = 1;
  static DB_Default_Data = [
      {code: "A1", title: "A类设施"},
      {code: "B1", title: "B类设施"},
      {code: "C1", title: "C类设施"}
  ];
  DB: any = null;
  categories: any = [];
  current: FacilityCategory;

  constructor(private modal: NzModalService, private message: NzMessageService) { }

  async ngOnInit() {
    let request = window.indexedDB.open(Chapter1Component.DB_Name, Chapter1Component.DB_Version);
    request.onerror = (event) => {
        //console.log('Database failed to open');
        
    };
    request.onsuccess = (event) => {
        //console.log('Database opened successfully');
        // Store the opened database object in the db variable. This is used a lot below
        this.DB = request.result;
        const objectStore = this.DB.transaction(Chapter1Component.DB_Table_Name).objectStore(Chapter1Component.DB_Table_Name);
        const req = objectStore.getAll();
        req.onsuccess = (event) => {
            const data = (event.target as any).result;
            this.categories = [];
            Array.isArray(data) && data.forEach(item => {
                const category = new FacilityCategory();
                category.fromJSON(item);
                this.categories.push(category);
            });
            this.categories.length > 0 && (this.current = this.categories[0]);
        }
    };
    request.onupgradeneeded = (event) => {
        // Grab a reference to the opened database
        const db = (event.target as any).result;
        // Create an objectStore to store our notes in (basically like a single table)
        // including a auto-incrementing key
        const objectStore = db.createObjectStore(Chapter1Component.DB_Table_Name, { keyPath: "_id" });
        objectStore.transaction.oncomplete = (event) => {
            // 将数据保存到新创建的对象仓库
            const objectStore = db.transaction(Chapter1Component.DB_Table_Name, "readwrite").objectStore(Chapter1Component.DB_Table_Name);
            Chapter1Component.DB_Default_Data.forEach( (item) => {
                const category = new FacilityCategory();
                category.fromJSON(item);
                category.create();
                objectStore.add(category.toJSON());
            });
        };
    };
  }

  active(item){
    this.current = item;
  }

  add(){
    this.current = new FacilityCategory();
    this.current.create();
    this.categories.push(this.current);
    this.categories = [...this.categories];
    const objectStore = this.DB.transaction(Chapter1Component.DB_Table_Name, "readwrite").objectStore(Chapter1Component.DB_Table_Name);
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
        const objectStore = this.DB.transaction(Chapter1Component.DB_Table_Name, "readwrite").objectStore(Chapter1Component.DB_Table_Name);
        const request = objectStore.delete(item._id);
        request.onerror = (event) => {
          // 错误处理
          this.message.create("warning", "删除失败!");
        };
        request.onsuccess = (event) => {
          const index = this.categories.findIndex(category => category._id === item._id);
          this.categories.splice(index, 1);
          this.categories = [...this.categories];
          if (item._id === this.current._id) this.current = null;
          this.message.create("success", "删除成功!");
        };
      }
    });
  }

  save(){
    const objectStore = this.DB.transaction(Chapter1Component.DB_Table_Name, "readwrite").objectStore(Chapter1Component.DB_Table_Name);
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
