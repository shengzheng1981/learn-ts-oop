import {Serialize, SerializeMetaKey} from "./decorator";
import "reflect-metadata";
import {Element} from "./element";

//配置基类
export class ConfigElement extends Element{

    @Serialize()
    public code: string = "";

    @Serialize()
    public title: string = "";


    constructor() {
        super();
    }


    toString(): string {
        return this.title || '未命名';
    }


}


