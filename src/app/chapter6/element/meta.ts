//元数据
import {
    SerializeMetaKey,
    ColumnMetaKey,EditorMetaKey, AliasMetaKey
} from "./decorator";
import "reflect-metadata";

export class Meta {

    public key: string = "";
    public serialize: string = "";
    public alias: string = "";
    public column: boolean = false;
    public editor: string = "";


    constructor() {
    }

    init(target, property) {
        this.key = property;
        this.serialize =  Reflect.getMetadata(SerializeMetaKey, target, property);
        this.alias = Reflect.getMetadata(AliasMetaKey, target, property);
        this.column = Reflect.getMetadata(ColumnMetaKey, target, property);
        this.editor = Reflect.getMetadata(EditorMetaKey, target, property);
    }

    static getMeta(type): Array<Meta> {
        const array: Array<Meta> = []
        const instance = new type();
        Object.keys(instance).forEach( property => {
            const meta = new Meta();
            meta.init(instance, property);
            array.push(meta);
        });
        return array;
    }
}


