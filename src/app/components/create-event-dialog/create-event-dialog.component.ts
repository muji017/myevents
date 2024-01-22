import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.css']
})
export class CreateEventDialogComponent {

  eventForm!: FormGroup
  files!: FileList
  imageSrc: string[] = []
  audiencelist: string[] = []

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialoge: MatDialog,
    private service: EventServiceService
  ) {
    this.eventForm = this.fb.group({
      eventName: fb.control('', Validators.required,),
      eventDate: fb.control('', Validators.required,),
      eventTime: fb.control('', Validators.required,),
      location: fb.control('', Validators.required,),
      details: fb.control('', [Validators.required, Validators.minLength(15)]),
      audience: fb.control('')
    });
  }

  showNameError(): any {

    const eventName: any = this.eventForm.get('eventName');
    if (!eventName.valid) {
      if (eventName.errors.required) {
        return "EventName is required"
      }
    }
  }
  showDateError(): any {

    const eventDate: any = this.eventForm.get('eventDate');
    if (!eventDate.valid) {
      if (eventDate.errors.required) {
        return "EventDate is required"
      }
    }
  }
  showTimeError(): any {

    const eventTime: any = this.eventForm.get('eventTime');
    if (!eventTime.valid) {
      if (eventTime.errors.required) {
        return "EventTime is required"
      }
    }
  }

  showDetailsError(): any {

    const details: any = this.eventForm.get('details');
    if (!details.valid) {
      if (details.errors.required) {
        return "Details is required"
      }
      if (details.errors.minlength) {
        return 'Details Should be minimum 15 characters';
      }

    }
  }

  showLocationError(): any {

    const location: any = this.eventForm.get('location');
    if (!location.valid) {
      if (location.errors.required) {
        return "Location is required"
      }
    }
  }

  onFilesSelected(event: any): any {
    const files: FileList = event.target.files;
    this.files = files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        return this.toastr.warning('Image type is invalid');
      }
    }
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc.push(e.target.result);
      };

      reader.readAsDataURL(this.files[i]);
    }
  }
  addAudience(): any {
    const audience = this.eventForm.get('audience')?.value.trim();
    if (audience == '') {
      return this.toastr.warning("Empty field")
    }
    this.audiencelist.push(audience)
    this.eventForm.get('audience')?.setValue('');
  }
  removeAudience(index: number) {
    this.audiencelist.splice(index, 1)
  }
  close() {
    this.dialoge.closeAll()
  }

  submitForm() {

    if (!this.eventForm.valid) {
      if (this.showNameError()) {
        this.toastr.warning(this.showNameError())
        return
      }
      if (this.showDateError()) {
        this.toastr.warning(this.showDateError())
        return
      }
      if (this.showTimeError()) {
        this.toastr.warning(this.showTimeError())
        return
      }
      if (this.showLocationError()) {
        this.toastr.warning(this.showLocationError())
        return
      }
      if (this.showDetailsError()) {
        this.toastr.warning(this.showDetailsError())
        return
      }
      return
    }

    const event = new FormData();

    for (const controlName of Object.keys(this.eventForm.controls)) {
      if (controlName !== 'audience') {
        const control = this.eventForm.get(controlName);
        event.append(controlName, control?.value);
      }
    }
    event.append('audiences', JSON.stringify(this.audiencelist))
    
    const files = this.files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
    event.append(`images`,file,file.name);
    }
    const formDataObject: any = {};
    event.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject);
    this.service.addEvent(event).subscribe((res)=>{
      this.toastr.success('Event added successfully')
      this.dialoge.closeAll()
        setTimeout(() => {
          window.location.reload();
        }, 1000)
    },
    (error)=>{
      console.log(error);
    })

  }
}
