import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private firestore:AngularFirestore, private fireauth: AngularFireAuth, private fns:AngularFireFunctions)
  {
    //this.fns.useFunctionsEmulator('http://localhost:5001');
  }

  public getUsers()
  {
    return this.firestore.collection("users", ref => ref.orderBy("createdAt", "desc")).snapshotChanges();
  }   /* getUsers() */

  public createProtocol(data:any)
  {
    return this.firestore.collection("protocols").add(data);
  }   /* createProtocol() */

  public getProtocols()
  {
    return this.firestore.collection("protocols", ref => ref.orderBy("createdAt", "desc")).snapshotChanges();
  }

  public deleteProtocol(id:any)
  {
    this.firestore.collection("protocols").doc(id).delete();
  }

  public uploadAudioFile(data:any)
  {
    return this.firestore.collection("soundAlarm").add(data);
  }

  public uploadMapFile(data:any)
  {
    return this.firestore.collection("settings").doc("map").set(data);
  }

  public getUploadedMap()
  {
    return this.firestore.collection("settings").doc("map").snapshotChanges();
  }

  public getAudioFiles()
  {
    return this.firestore.collection("soundAlarm", ref => ref.orderBy("createdAt", "desc")).snapshotChanges();
  }

  public deleteAudioFile(id:any)
  {
    this.firestore.collection("soundAlarm").doc(id).delete();
  }

  public setAudioActive(id:any)
  {
     const soundAlarm = this.firestore.collection("soundAlarm", ref => ref.where('isActive', '==', true)).snapshotChanges().subscribe(data => {
      data.forEach(row => {
        this.firestore.doc("soundAlarm/"+row.payload.doc.id).update({isActive: false});
      });
      soundAlarm.unsubscribe();
      this.firestore.collection("soundAlarm").doc(id).update({isActive:true});
    });
  }

  public getUserStatus()
  {
    return this.firestore.collection("users", ref => ref.orderBy("location")).snapshotChanges();
  }

  public setSMSTemplate(message:string)
  {
    return this.firestore.collection("settings").doc("smstemplate").set({message: message});
  }

  public getSMsTemplate()
  {
    return this.firestore.collection("settings").doc("smstemplate").valueChanges();
  }

  public setTriggerDrill(event:boolean)
  {
    return this.firestore.collection("settings").doc("drill").set({isActive: event});
  }

  public getTriggeredDrill()
  {
    return this.firestore.collection("settings").doc("drill").snapshotChanges();
  }

  public setSoundAlarm(event:boolean)
  {
    const soundAlarm = this.firestore.collection("soundAlarm", ref => ref.where('isActive', '==', true).limit(1)).snapshotChanges().subscribe(data => {
      data.forEach(row => {
        this.firestore.doc("soundAlarm/"+row.payload.doc.id).update({isPlay: event});
      });
      soundAlarm.unsubscribe();
    });
  }

  public drillLogs()
  {
    let user = localStorage.getItem('eQuakeuserData');
    let userData;

    if(user)
    {
      let tmp = JSON.parse(user);
      userData = {
        email: tmp.email,
        role: tmp.role,
        uid: tmp.uid
      }
      
    }else{
      user = null;
    }

    let data = {
      user: userData ? userData: null,
      createdAt: new Date()
    }
    return this.firestore.collection("drillLogs").add(data);
  }

  public getDrillLogsCount()
  {
    return this.firestore.collection("drillLogs").get();
  }

  public unSeenFeedbacks()
  {
    return this.firestore.collection("feedback", ref => ref.where("seen", "==", false)).snapshotChanges();
  }

  public getUserFeedbacks()
  {
    return this.firestore.collection("feedback", ref => ref.orderBy('createdAt', 'desc')).snapshotChanges();
  }

  public getFeedbackCount()
  {
    return this.firestore.collection("feedback").get();
  }

  public deleteFeedback(id:any)
  {
    this.firestore.collection("feedback").doc(id).delete();
  }

  public setFeedbackToSeen()
  {
    this.firestore.collection("feedback", ref => ref.where("seen", "==", false)).snapshotChanges().subscribe((data) => {
      data.forEach(row => {
        row.payload.doc.ref.update({seen: true});
      });
    });
  }

  public getAccountInvites()
  {
    return this.firestore.collection("accountInvite", ref => ref.orderBy('createdAt', 'desc')).snapshotChanges();
  }

  public deleteAccountInvite(id:any)
  {
    this.firestore.collection("accountInvite").doc(id).delete();
  }

  public async deactivateUserAccount(uid:string, email:string, password:string)
  {
    const deactivateUserFn = this.fns.httpsCallable('deactivateUser');
    try {
      await deactivateUserFn({ uid }).toPromise();
      this.firestore.doc("users/"+uid).update({isActive:false});
    } catch (error) {
      console.error(`Error deleting user ${uid}:`, error);
    }

  }

  public async activateUserAccount(uid:string, email:string, password:string)
  {
    const activateUser = this.fns.httpsCallable('activateUser');
    try {
      await activateUser({ uid }).toPromise();
      this.firestore.doc("users/"+uid).update({isActive:true});
    } catch (error) {
      console.error(`Error deleting user ${uid}:`, error);
    }

  }

  public async sendSMS(to:string, message:string)
  {
    const SMS = this.fns.httpsCallable('sendSMS');
    try {
      const result = await SMS({ to:to, message:message }).toPromise();
      console.log(result)
    } catch (error) {
      console.error(`Error sending sms`, error);
    }
  }   /* sendSMS() */

  public getArchivedUsers()
  {
    return this.firestore.collection("users", ref => ref.where('isActive', '==', false).orderBy('createdAt', 'desc')).snapshotChanges();
  }   /* getArchivedUsers() */

  public getEvaluations()
  {
    return this.firestore.collection("evaluations", ref => ref.orderBy("createdAt", "desc")).snapshotChanges();
  }   /* createEvaluation() */

  public createEvaluation(data:any)
  {
    return this.firestore.collection("evaluations").add(data);
  }   /* createEvaluation() */

  public getStakeHolderUsers()
  {
    return this.firestore.collection("users", ref => ref.where('role', '==', 'user').where('isActive', '==', true)).valueChanges();
  }

  public getLCMCUsers()
  {
    return this.firestore.collection("users", ref => ref.where('role', '==', 'lcmc').where('isActive', '==', true)).valueChanges();
  }

}
