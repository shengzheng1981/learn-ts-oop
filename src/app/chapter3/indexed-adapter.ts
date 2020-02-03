
//indexed db 适配器
export class IndexedAdapter {
 
    static DB_Name: string = "chapter3";
    static DB_Version: number = 1;
    static DB: IDBDatabase;

     //此处增加默认数据 用于演示
    static DB_Tables: any[] = [
        {
            name: "Facility", 
            data:[
                {_id: "1", name: "泵站", code: "P-001", complete: "2020-01-01"},
                {_id: "2", name: "调蓄池", code: "S-001", complete: "2020-02-01"},
                {_id: "3", name: "防洪坝", code: "W-001", complete: "2020-02-02"}
            ]
        },
        {
            name: "FacilityCategory", 
            data:[
                {_id: "1", code: "A1", title: "A类设施"},
                {_id: "2", code: "B1", title: "B类设施"},
                {_id: "3", code: "C1", title: "C类设施"}
            ]
        }
    ]

    constructor() {
    }
    //数据库加载
    static load(){
        return new Promise( (resolve, reject) => {
            let request = window.indexedDB.open(IndexedAdapter.DB_Name, IndexedAdapter.DB_Version);
            request.onerror = (event) => {
                reject('Database failed to open');
            };
            //加载IndexedDB
            request.onsuccess = (event) => {
                IndexedAdapter.DB = request.result;
                resolve('Database opened successfully')
            };
            //IndexedDB初始化及升级
            request.onupgradeneeded = (event) => {
                // Grab a reference to the opened database
                const db = (event.target as any).result;
                IndexedAdapter.DB_Tables.forEach( table => {
                    db.createObjectStore(table.name, { keyPath: "_id" });
                    const transaction = (event.target as any).transaction;
                    Array.isArray(table.data) && table.data.forEach( (item) => {
                        const objectStore = transaction.objectStore(table.name);
                        objectStore.add(item);
                    });
                });
            };
        });
    }
    

    //CRUD

    static get(type){
        return new Promise( (resolve, reject) => {
            const objectStore = IndexedAdapter.DB.transaction(type.name, "readwrite").objectStore(type.name);
            const request = objectStore.getAll();
            request.onerror = (event) => {
                // 错误处理
                reject("get all failed!");
            };
            request.onsuccess = (event) => {
                // 把更新过的对象放回数据库
                const data = (event.target as any).result;
                //加载IndexedDB存储的原有记录
                const array = [];
                Array.isArray(data) && data.forEach(item => {
                    const instance = new type();
                    instance.fromJSON(item);
                    array.push(instance);
                });
                resolve(array);
            };
        });
    }

    static create(instance){
        return new Promise( (resolve, reject) => {
            const objectStore = IndexedAdapter.DB.transaction(instance.constructor.name, "readwrite").objectStore(instance.constructor.name);
            const request = objectStore.add(instance.toJSON());
            request.onerror = (event) => {
                // 错误处理
                reject("create failed!");
            };
            request.onsuccess = (event) => {
                // 完成，数据已添加！
                resolve("create successfully!");
            };
        }); 
    }

    static delete(instance){
        return new Promise( (resolve, reject) => {
            const objectStore = IndexedAdapter.DB.transaction(instance.constructor.name, "readwrite").objectStore(instance.constructor.name);
            const request = objectStore.delete(instance._id);
            request.onerror = (event) => {
                // 错误处理
                reject("delete failed!");
            };
            request.onsuccess = (event) => {
                // 完成，数据已删除！
                resolve("delete successfully!");
            };
        });
    }

    static update(instance){
        return new Promise( (resolve, reject) => {
            const objectStore = IndexedAdapter.DB.transaction(instance.constructor.name, "readwrite").objectStore(instance.constructor.name);
            const request = objectStore.get(instance._id);
            request.onerror = (event) => {
                // 错误处理
                reject("update failed!");
            };
            request.onsuccess = (event) => {
                // 把更新过的对象放回数据库
                const requestUpdate = objectStore.put(instance.toJSON());
                requestUpdate.onerror = (event) => {
                    // 错误处理
                    reject("update failed!");
                };
                requestUpdate.onsuccess = (event) => {
                    // 完成，数据已更新！
                    resolve("update successfully!");
                };
            };
        });
    }


}