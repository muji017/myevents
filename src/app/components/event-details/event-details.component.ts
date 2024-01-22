import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { imgUrl } from 'src/app/services/endPoint';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
   
  eventId!:string
  event!:any|undefined
  imgUrl:string=imgUrl
  constructor(
    private route:ActivatedRoute ,
    private service:EventServiceService
  ){}

  ngOnInit(){
    this.route.params.subscribe((params) => {
      const id = params['eventId'];
      this.eventId = id;
      console.log(this.eventId)  
    })
    this.getEvents()
  }
  getEvents(){
    this.service.getEvents().subscribe((res)=>{
      const allEvents=res
      let event=allEvents.find((ev:any)=>ev._id==this.eventId)
      this.event=event
      console.log(this.event);
      
    })
  }
}
