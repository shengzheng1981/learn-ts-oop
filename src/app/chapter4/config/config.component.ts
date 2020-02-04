import { Component, OnInit } from '@angular/core';
import { FacilityCategory } from '../element/facility-category';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { Meta } from '../element/meta';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  categories: any = [];
  current: FacilityCategory;

  properties: Array<Meta>;

  constructor(private modal: NzModalService, private message: NzMessageService, private categoryService: CategoryService) { }

  async ngOnInit() {
    this.properties = Meta.getMeta(FacilityCategory);
    this.categoryService.getAll().subscribe( (result) => {
      this.categories = result;
    })
  }

  active(item){
    this.current = item;
  }

  add(){
    this.current = new FacilityCategory();
    this.categoryService.create(this.current).subscribe( 
      (result) => {
        this.categories.push(this.current);
        this.categories = [...this.categories];
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
        this.categoryService.delete(this.current).subscribe( 
          (result) => {
            const index = this.categories.findIndex(category => category._id === item._id);
            this.categories.splice(index, 1);
            this.categories = [...this.categories];
            if (item._id === this.current._id) this.current = null;
            this.message.create("success", "删除成功!");
          },
          (error) => {this.message.create("warning", "删除失败!");}
        );
      }
    });
  }

  save(){
    this.categoryService.update(this.current).subscribe( 
      (result) => {
        this.message.create("success", "保存成功!");
      },
      (error) => {this.message.create("warning", "保存失败!");}
    );
  }
}
