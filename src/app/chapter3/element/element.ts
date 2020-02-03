import {Serialize, SerializeMetaKey} from "./decorator";
import "reflect-metadata";

//基类
export class Element {
 

    constructor() {
    }

    //格式化
    toString(): string {
        return '';
    }

    //序列化
    toJSON(): any {
        const obj = {};
        Object.keys(this).forEach( property => {
            const serialize = Reflect.getMetadata(SerializeMetaKey, this, property);
            if (serialize) {
                if (this[property] instanceof Element) {
                    obj[serialize] = this[property].toJSON();
                } else {
                    obj[serialize] = this[property];
                }
            }
        });
        return obj;
    }

    //反序列化
    fromJSON(obj) {
        obj && Object.keys(this).forEach( property => {
            const serialize = Reflect.getMetadata(SerializeMetaKey, this, property);
            if (serialize) {
                if (this[property] instanceof Element) {
                    this[property].fromJSON(obj[serialize]);
                } else {
                    this[property] = obj[serialize];
                }
            }
        });
    }

    //打印
    print() {
        Object.keys(this).forEach( property => {
            console.log(property + ": " + this[property]);
        });
    }


}