
import {Serialize, Alias, Editor, Column} from "./decorator";
import "reflect-metadata";
import {EntityElement} from "./entity-element";

//设施
export class Facility extends EntityElement{

    @Alias("地址")
    @Editor("String")
    @Serialize()
    public address: string = "";

    @Alias("竣工日期")
    @Editor("Date")
    @Serialize()
    public complete: Date = new Date();

    @Alias("占地面积")
    @Editor("Number")
    @Serialize()
    public area: number = 0;

    @Alias("运行正常")
    @Editor("Boolean")
    @Serialize()
    public normal: boolean = true;

    constructor() {
        super();
    }

}