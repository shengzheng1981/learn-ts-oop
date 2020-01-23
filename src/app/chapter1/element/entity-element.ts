import {Serialize, SerializeMetaKey} from "./decorator";
import "reflect-metadata";
import {Element} from "./element";

//实体基类
export class EntityElement extends Element{

    @Serialize()
    public _id: string = "";

    @Serialize()
    public name: string = "";

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


