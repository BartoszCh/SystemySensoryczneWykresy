import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeartrateService {
  private data = [
    {
      date: '12-12-2023_13:12',
      heartrate: 90,
      acc: 1.32,
      temperature: 34.21
    },
    {
      date: '12-12-2023_13:13',
      heartrate: 88,
      acc: 1.29,
      temperature: 34.18
    },
    {
      date: '12-12-2023_13:14',
      heartrate: 92,
      acc: 1.35,
      temperature: 34.25
    },
    // Add more data objects here...
    {
      date: '12-12-2023_13:31',
      heartrate: 86,
      acc: 1.28,
      temperature: 34.19
    },
    {
      date: '12-12-2023_13:32',
      heartrate: 88,
      acc: 1.31,
      temperature: 34.22
    },
    {
      date: '12-12-2023_13:33',
      heartrate: 94,
      acc: 1.37,
      temperature: 34.28
    },
    // Add more data objects here...
  ];


  getData() {
    return this.data;
  }
  constructor() { }
}
