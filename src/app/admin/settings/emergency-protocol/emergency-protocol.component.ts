import Swal from 'sweetalert2';
import { AdminService } from './../../../service/admin.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-emergency-protocol',
  templateUrl: './emergency-protocol.component.html',
  styleUrls: ['./emergency-protocol.component.css']
})
export class EmergencyProtocolComponent implements OnInit {

  public emp!: FormGroup;
  public loading = false;
  public error:string = '';
  public submitted = false;
  public isCollaped:boolean = true;

  public imageSrc:any = null;
  public imageFile:any;
  private basePath = '/uploads';

  @ViewChild('inputFile') myInputVariable!: ElementRef;
  constructor(private router:Router, private _formBuilder:FormBuilder, private adminService:AdminService, private storage:AngularFireStorage)
  {

  }

  get f(){
    return this.emp.controls;
  }

  ngOnInit(): void {
    this.emp = this._formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      status: ["", Validators.required],
      thumbnail: ['', Validators.required],
      createdAt: [new Date()]
    });

  }

  public onSubmit()
  {
    this.loading = true;

    this.submitted = true;
    if (this.emp.invalid) {
      this.loading = false;
      return;
    }

    /* Upload file to bucket */
    const filePath = `${this.basePath}/${this.imageFile[0].name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.imageFile[0]);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        
        storageRef.getDownloadURL().subscribe(downloadURL => {
          
          this.emp.patchValue({
            thumbnail: downloadURL
          });

          this.adminService.createProtocol(this.emp.value)
          .then(result => {
            // console.log(result)
            this.loading = false;
            this.emp.reset({
              title: null,
              description: null,
              status: "",
              thumbnail: "",
              createdAt: new Date()
            });
            
            this.imageSrc = null;
            this.submitted = false;
            this.myInputVariable.nativeElement.value = '';

            Swal.fire('Saved!', 'New protocol was added', 'success');
          }).catch(e => {
            this.loading = false;
            console.log(e)
            // this.error = e.message;
          });

        });
      })
    ).subscribe();

  }

  public onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.imageFile = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
        this.emp.patchValue({
          thumbnail: reader.result
        });
   
      };
   
    }
  }

}
