import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  showCampusMap:boolean = false;
  showSOP:boolean = false;
  showSoundAlarms:boolean = false;
  zoom=1;

  campusMapPdfUrl = '/assets/offline/defeault/campus-map.pdf';
  SOPMapPdfUrl = '/assets/offline/defeault/fmo-emergency-protocol.pdf';

  // Sound Alarms
  earthquakeSoundAlarm = '/assets/offline/defeault/earthquake-siren.mp3'
  fireSoundAlarm = '/assets/offline/defeault/fire-siren.mp3'
  morsecodeSoundAlarm = '/assets/offline/defeault/sos-morse-code.mp3'

  isEarthquakeSiren:boolean = false;
  isFireeSiren:boolean = false;
  isMorsecodeSiren:boolean = false;

  @ViewChild('earthquakeSiren') earthquakeSiren!: ElementRef;
  @ViewChild('fireSiren') fireSiren!: ElementRef;
  @ViewChild('morseCodeSiren') morseCodeSiren!: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }

  zoomOut()
  {
    this.zoom = this.zoom-0.5;
  }

  zoomIn()
  {
    this.zoom = this.zoom+0.5;
  }

  showContent(opt:any)
  {
    this.zoom = 1;
    if(opt == 'map')
    {
      this.showSOP = false;
      this.showSoundAlarms = false;
      this.showCampusMap = true;
    }

    if(opt == 'sop')
    {
      this.showSoundAlarms = false;
      this.showCampusMap = false;
      this.showSOP = true;
    }

    if(opt == 'alarm')
    {
      this.showCampusMap = false;
      this.showSOP = false;
      this.showSoundAlarms = true;
    }
  }

  playAudio(el:any) {
    if(el == 'earthquake')
    {
      this.isEarthquakeSiren = !this.isEarthquakeSiren;

      if(this.isEarthquakeSiren)
      {
        this.earthquakeSiren.nativeElement.play();
      }else{
        this.earthquakeSiren.nativeElement.pause();
      }
      
    }

    if(el == 'fire')
    {
      this.isFireeSiren = !this.isFireeSiren;

      if(this.isFireeSiren)
      {
        this.fireSiren.nativeElement.play();
      }else{
        this.fireSiren.nativeElement.pause();
      }
      
    }

    if(el == 'morsecode')
    {
      this.isMorsecodeSiren = !this.isMorsecodeSiren;

      if(this.isMorsecodeSiren)
      {
        this.morseCodeSiren.nativeElement.play();
      }else{
        this.morseCodeSiren.nativeElement.pause();
      }
      
    }
  }

}
