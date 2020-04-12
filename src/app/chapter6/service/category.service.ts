import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import { FacilityCategory } from '../element/facility-category';

@Injectable()
export class CategoryService {
    private baseUrl = 'https://learn-ts-api.herokuapp.com/categories';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get(this.baseUrl + "/").pipe(map(result => {
            const array = [];
            Array.isArray(result) && result.forEach(item => {
                const category = new FacilityCategory();
                category.fromJSON(item);
                array.push(category);
            })
            return array;
        }));
    }

    getOne(id: string): Observable<any> {
        return this.http.get(this.baseUrl + "/detail/" + id).pipe(map(item => {
            const category = new FacilityCategory();
            category.fromJSON(item);
            return category;
        }));
    }

    create(category: FacilityCategory): Observable<any> {
        category.create();
        return this.http.post(this.baseUrl + "/create", {category: category.toJSON()});
    }

    update(category: FacilityCategory): Observable<any> {
        return this.http.post(this.baseUrl + "/" + category._id + "/update", {category: category.toJSON()});
    }

    delete(category: FacilityCategory): Observable<any> {
        return this.http.get(this.baseUrl + "/" + category._id + "/remove");
    }

}
