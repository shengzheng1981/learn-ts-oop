import "reflect-metadata";
export const SerializeMetaKey = "Serialize";
export const AliasMetaKey = "Alias";
export const ColumnMetaKey = "Column";
export const EditorMetaKey = "Editor";

//序列化装饰器
export function Serialize(name?: string) {
    return (target: Object, property: string): void => {
        Reflect.defineMetadata(SerializeMetaKey, name || property, target, property);
    };
}

//中文别名装饰器
export function Alias(alias: string) {
    return Reflect.metadata(AliasMetaKey, alias);
}

//表格显示列装饰器（列表视图-表格列筛选）
export function Column() {
    return Reflect.metadata(ColumnMetaKey, true);
}

//自定义类型装饰器（详情视图-编辑器筛选）
export function Editor(type: string) {
    return Reflect.metadata(EditorMetaKey, type);
}