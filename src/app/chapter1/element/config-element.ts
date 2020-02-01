import {Serialize, SerializeMetaKey} from "./decorator";
import "reflect-metadata";
import {Element} from "./element";

//配置基类
export class ConfigElement extends Element{

    @Serialize()
    public _id: string = "";

    @Serialize()
    public code: string = "";

    @Serialize()
    public title: string = "";

    @Serialize("desc")
    public description: string = "";

    constructor() {
        super();
    }


    toString(): string {
        return this.title || '未命名';
    }

    create() {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }

}


