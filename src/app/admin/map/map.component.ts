import Swal from 'sweetalert2';
import { AdminService } from './../../service/admin.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public saGrp!: FormGroup;
  public loading = false;
  public error:string = '';
  public submitted = false;
  public umapFile:any;
  private basePath = '/uploads';
  public filename = '';
  public mapSource:any;

  public uploadProgress!:Observable<any>;
  
  @ViewChild('inputFile') myInputVariable!: ElementRef;
  constructor(private router:Router, private _formBuilder:FormBuilder, private adminService:AdminService, private storage:AngularFireStorage)
  {

  }

  get f(){
    return this.saGrp.controls;
  }

  ngOnInit(): void {
    this.saGrp = this._formBuilder.group({
      mapFile: ['', Validators.required],
      filename: ['Map'],
      createdAt: [new Date()]
    });

    this.adminService.getUploadedMap().subscribe((data:any) => {
      if(data.payload.exists)
      {
        this.mapSource = data.payload.data()?.mapFile;
      }
    });
  }

  public onSubmit()
  {
    this.loading = true;
    this.submitted = true;

    if (this.saGrp.invalid) {
      this.loading = false;
      return;
    }
    
    const filePath = `${this.basePath}/${this.umapFile[0].name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.umapFile[0]);


    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        
        storageRef.getDownloadURL().subscribe(downloadURL => {
          
          this.saGrp.patchValue({
            mapFile: downloadURL
          });

          this.adminService.uploadMapFile(this.saGrp.value)
          .then(result => {
            // console.log(result)
            Swal.fire('Done', 'Map file was uploaded', 'success');

            this.loading = false;
            
            this.umapFile = null;
            this.submitted = false;
            this.myInputVariable.nativeElement.value = '';
            this.filename = '';

            
          }).catch(e => {
            this.loading = false;
            console.log(e)
            // this.error = e.message;
          });

        });
      })
    ).subscribe();
    
    this.uploadProgress = uploadTask.percentageChanges()

  }

  public onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.umapFile = event.target.files;
      this.filename = this.umapFile[0].name;
      reader.readAsDataURL(file);

      reader.onload = () => {
        reader.result as string;
        this.saGrp.patchValue({
          mapFile: reader.result,
          filename : this.filename
        });
   
      };

    }
  }

}
