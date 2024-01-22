import { Component, EventEmitter } from '@angular/core';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EventServiceService } from 'src/app/services/event-service.service';
import { imgUrl, url } from 'src/app/services/endPoint';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
   
  allLocations:{location:string,count:number}[]=[]
  allAudience:{name:string,count:number}[]=[]

  allEvents:any[]=[]
  allEventList:any[]=[]
  url:string=imgUrl
  constructor(
    private dialog:MatDialog,
    private service:EventServiceService,
    private toastr:ToastrService
    ){}

  ngOnInit(){
    this.getEvents()
    this.service.getLocationwise().subscribe((res)=>{
      const loc = res.map((item:any) => ({ location: item._id, count: item.count }));
      this.allLocations=loc
    })
    this.service.getAudiencewise().subscribe((res)=>{
      console.log("loc",res);
      const loc = res.map((item:any) => ({ name: item._id, count: item.count }));
      console.log(loc);
      this.allAudience=loc
    })
  }
  getEvents(){
    this.service.getEvents().subscribe((res)=>{
      this.allEvents=res
      this.allEventList=res
    })
  }
  getAllEvents(){
    this.ngOnInit()
  }

  create(){
    this.dialog.open(CreateEventDialogComponent, {
      enterAnimationDuration: 1200,
      exitAnimationDuration: 1200,
      maxHeight: '500px',
      maxWidth: '500px'
    })
  }
  getEventsDatewise(){
    this.service.getEventsDatewise().subscribe((res:any)=>{
      console.log(res); 
      this.allEvents=res
    })
  }
  getLocationwise(event:any) {
    const selectedLocation = event.target.value;
    const events=this.allEventList
    const locationEvent=events.filter((event)=> event.location==selectedLocation)
    this.allEvents=locationEvent
  }  

  getAudiencewise(event:any) {
    const selectedAudience = event.target.value;
    const events=this.allEventList
    const selectedEvent=events.filter((event)=> event.audiences.includes(selectedAudience))
    this.allEvents=selectedEvent
  }  
  delete(eventId:string){
    console.log(eventId);
    
    this.service.deleteEvent(eventId).subscribe((res)=>{
      this.toastr.success("Event Deleted successfuly")
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    })
  }
  getEventDetails(eventId:string){
    
  }
}
