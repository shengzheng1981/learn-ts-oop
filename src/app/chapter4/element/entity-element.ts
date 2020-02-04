import {Serialize, Column, Editor, Alias} from "./decorator";
import "reflect-metadata";
import {Element} from "./element";

//实体基类
export class EntityElement extends Element{

    @Serialize()
    public _id: string = "";

    @Alias("名称")
    @Editor("String")
    @Column()
    @Serialize()
    public name: string = "";

    @Alias("编码")
    @Editor("String")
    @Column()
    @Serialize()
    public code: string = "";

    @Alias("描述")
    @Editor("Memo")
    @Serialize("desc")
    public description: string = "";

    constructor() {
        super();
    }


    toString(): string {
        return this.name || '未命名';
    }

    create() {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }

}


