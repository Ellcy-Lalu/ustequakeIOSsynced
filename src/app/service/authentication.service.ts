import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firestore:AngularFirestore, private fireauth: AngularFireAuth,private fns:AngularFireFunctions)
  {
    /* this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('eQuakeuserData'));
    this.currentUser = this.currentUserSubject.asObservable(); */
    this.fireauth.authState.subscribe(async (user) => {
      if(user)
      {
        // console.log(user.uid);
        const activeUser = this.firestore.doc("users/" + user.uid);
        let d: any = (await activeUser.ref.get()).data();
        
        let eQuakeuserData = {
          uid: user.uid,
          email: user.email,
          firstname: d.firstname,
          lastname: d.lastname,
          role: d.role,
          isSafe: d.isSafe,
          token: (await user.getIdTokenResult()).token
        };

        localStorage.setItem('eQuakeuserData', JSON.stringify(eQuakeuserData));

      }else{
        localStorage.setItem('eQuakeuserData', 'null');
        // console.log('user session expired')
      }
    })
  }

  public signIn(data:any)
  {
    return this.fireauth.signInWithEmailAndPassword(data.email, data.password)
    .then(async response => {
      if (response.user) {
        // this.fireauth.authState;
        
        const user = this.firestore.doc("users/" + response.user.uid);
        // console.log((await user.ref.get()).data())
        let d: any = (await user.ref.get()).data();
        // console.log(d)
        let eQuakeuserData = {
          uid: response.user.uid,
          email: response.user.email,
          firstname: d.firstname,
          lastname: d.lastname,
          role: d.role,
          isSafe: d.isSafe,
          token: (await response.user.getIdTokenResult()).token
        };
  
        // console.log(eQuakeuserData);
  
        localStorage.setItem('eQuakeuserData', JSON.stringify(eQuakeuserData));
        /* this.currentUserSubject.next(eQuakeuserData); */
        return eQuakeuserData;
  
      }

      return false;
    })
    
  }   /* signIn() */

  public signOut()
  {
    return this.fireauth.signOut()
    .then(response => {
      return response
    });
  }   /* signOut() */

  public isAuthenticated()
  {
    const user = JSON.parse(localStorage.getItem('eQuakeuserData')!);
    return user !== null ? true : false;
  }   /* isAuthenticated() */

  public register(data:any)
  {
    // console.log(data)
    return this.fireauth.createUserWithEmailAndPassword(data.email, data.password)
    .then(async (result) => {
      if(result.user)
      {
        /* Create user record */

        this.firestore.collection("users").doc(result.user.uid).set(data);
        let eQuakeuserData = {
          uid: result.user.uid,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          role: data.role,
          isSafe: data.isSafe,
          token: (await result.user.getIdTokenResult()).token
        }
        localStorage.setItem('eQuakeuserData', JSON.stringify(eQuakeuserData));
        return result;
      }else{
        return {error: 'Cannot register user'};
      }
    }).catch(e => {
      // console.log('Error: ',e.message);
      throw new Error(e.message);
    });
  }   /* register() */

  public sendInvite(data:any)
  {
    return this.firestore.collection("accountInvite").doc(data.email).get().subscribe(result => {
      if(result.exists)
      {
        return false;
      }else{
        return this.firestore.collection("accountInvite").doc(data.email).set(data);
      }
    });

  }   /* sendInvite() */

  public async createUser(data:any)
  {
    const SMS = this.fns.httpsCallable('createUser');
    try {
      const result = await SMS({ email:data.email, password:data.password }).toPromise();
      
      if(result.success)
      {
        return this.firestore.collection("users").doc(result.uid).set(data);
      }
      if(result.error)
      {
        return result;
      }
    } catch (error) {
      // console.error(`Error creating user`, error);
      return error;
    }
  }   /* createUser() */

  public checkPhoneNumber(phone:any)
  {
    return this.firestore.collection("users", ref => ref.where('phone', '==', phone).limit(1)).snapshotChanges();
  }   /* checkPhoneNumber() */

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

  public async setNewPassword(userId: any, password:string)
  {
    const np = this.fns.httpsCallable('updatePassword');
    try{
      const result = await np({userId: userId, password:password}).toPromise();
      return result;
      // console.log(result)
    } catch (error) {
      console.error(`Error sending sms`, error);
    }
  }   /* setNewPassword() */

}
