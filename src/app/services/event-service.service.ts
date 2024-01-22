import { Injectable } from '@angular/core';
import { url } from './endPoint';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  url:string=url
  constructor(
    private http:HttpClient
  ) {}
  
  addEvent(event:FormData):Observable<any>{
    return this.http.post<any>(`${url}/events`,event)
  }
  getEvents():Observable<Event[]>{
    return this.http.get<Event[]>(`${url}/events`)
  }
  deleteEvent(eventId:string):Observable<any>{
    console.log(eventId);
    
    const params = new HttpParams().set('eventId', eventId);
    console.log(params);
    
    return this.http.delete<any>(`${this.url}/deleteEvent`, { params: params })
  }
  
  getLocationwise():Observable<Event[]>{
    return this.http.get<Event[]>(`${url}/getLocationwise`)
  }

  getEventsDatewise():Observable<Event[]>{
    return this.http.get<Event[]>(`${url}/getEventsDatewise`)
  }
  getAudiencewise():Observable<Event[]>{
    return this.http.get<Event[]>(`${url}/getAudiencewise`)
  }
}
