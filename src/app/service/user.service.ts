import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { snapshotChanges } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore:AngularFirestore, private fireauth: AngularFireAuth) { }

  public sendMyLocation(lat:any, long:any)
  {
    const user = JSON.parse(localStorage.getItem('eQuakeuserData')!);
    return this.firestore.collection("users").doc(user.uid).update({location: {lat: lat, long:long},updatedAt: new Date() });
  }

  public setSafeStatus()
  {
    const user = JSON.parse(localStorage.getItem('eQuakeuserData')!);
    return this.firestore.collection("users").doc(user.uid).update({isSafe: true, updatedAt: new Date()});
  }

  public setUnsafeStatus()
  {
    const user = JSON.parse(localStorage.getItem('eQuakeuserData')!);
    return this.firestore.collection("users").doc(user.uid).update({isSafe: false, updatedAt: new Date()});
  }

  public getProtocols()
  {
    return this.firestore.collection("protocols", ref => ref.orderBy("createdAt", "desc")).snapshotChanges();
  }

  public setFeedback(data:any)
  {
    return this.firestore.collection("feedback").add(data);
  }

  public getFeedback(userId:any)
  {
    return this.firestore.collection("feedback", ref => ref.where('userId','==', userId).orderBy("createdAt", "desc")).snapshotChanges();
  }

  public deleteFeedback(id:any)
  {
    return this.firestore.collection("feedback").doc(id).delete();
  }

  public getActiveSoundAlarm()
  {
    return this.firestore.collection("soundAlarm", ref => ref.where('isActive','==', true).limit(1)).snapshotChanges();
  }

  public getCurrentMap()
  {
    return this.firestore.collection("settings").doc("map").snapshotChanges();
  }

  public createEvaluation(data:any)
  {
    return this.firestore.collection("evaluations").add(data);
  }

  public updateEvaluation(id:any, data:any)
  {
    return this.firestore.collection("evaluations").doc(id).update(data);
  }

  public getMyEvaluation()
  {
    const user = JSON.parse(localStorage.getItem('eQuakeuserData')!);
    return this.firestore.collection("evaluations", ref => ref.where('uid','==', user.uid).orderBy("createdAt", "desc")).snapshotChanges();
  }

  public viewEvaluation(id:any)
  {
    return this.firestore.collection("evaluations").doc(id).snapshotChanges();
  }
}
