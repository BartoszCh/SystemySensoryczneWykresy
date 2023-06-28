import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Metric} from "./metric";

@Injectable({
  providedIn: 'root'
})
export class HeartrateService {
  getAllData() : Observable<Metric[]> {
    return this.http.get<Metric[]>('http://localhost:8080/api/metrics/list?dateFrom=14-06-2021_1445&dateTo=14-06-2024_1445');
  }

  constructor(private http: HttpClient) { }
}
