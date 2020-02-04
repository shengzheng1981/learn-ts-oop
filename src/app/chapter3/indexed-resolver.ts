import { RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndexedAdapter } from './indexed-adapter';

@Injectable()
export class IndexedResolver implements Resolve<any> {
  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return IndexedAdapter.load();
  }
}