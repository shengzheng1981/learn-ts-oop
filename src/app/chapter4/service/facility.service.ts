import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import { Facility } from '../element/facility';

@Injectable()
export class FacilityService {
    private baseUrl = 'https://learn-ts-api.herokuapp.com/facilities';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get(this.baseUrl + "/").pipe(map(result => {
            const array = [];
            Array.isArray(result) && result.forEach(item => {
                const facility = new Facility();
                facility.fromJSON(item);
                array.push(facility);
            })
            return array;
        }));
    }

    getOne(id: string): Observable<any> {
        return this.http.get(this.baseUrl + "/detail/" + id).pipe(map(item => {
            const facility = new Facility();
            facility.fromJSON(item);
            return facility;
        }));
    }

    create(facility: Facility): Observable<any> {
        facility.create();
        return this.http.post(this.baseUrl + "/create", {facility: facility.toJSON()});
    }

    update(facility: Facility): Observable<any> {
        return this.http.post(this.baseUrl + "/" + facility._id + "/update", {facility: facility.toJSON()});
    }

    delete(facility: Facility): Observable<any> {
        return this.http.get(this.baseUrl + "/" + facility._id + "/remove");
    }

}
