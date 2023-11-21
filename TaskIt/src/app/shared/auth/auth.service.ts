import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';
import { Task } from 'src/app/tasklist/tasks/task.model';



const apiKey = 'AIzaSyAtiXppdHnJ4N9lJjLezq1eU6l_oLzJv6Q';
const signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const signInURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser = new BehaviorSubject<User>(null);
  userToken: string = null;
  isLogInMode: boolean = false;
  firebaseRootUrlTasks = "https://taskit-55d07-default-rtdb.firebaseio.com/";
  // initDB: Task[] = [{title: 'Edit or Delete this Task', dueDate: new Date(), priority: 'Low', status: 'To Do', taskID: Math.floor(Math.random()*1000000)}];

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string, firstName: string, lastName: string, imgPath: string){

    return this.http.post<AuthResponseData>(signUpURL+apiKey, {email, password, returnSecureToken: true}).pipe(
      tap(res => {
        const {email, localId, idToken, expiresIn } = res;

        this.handleAuth(email, localId, idToken, +expiresIn, firstName, lastName, imgPath)
      })
    );
  }

  handleAuth(email: string, userId: string, token: string, expiresIn: number, firstName?: string, lastName?: string,   imgpath?: string) {
    const expDate = new Date(new Date().getTime() + expiresIn *1000);
    const formUser = new User(email, userId, token, expDate, firstName, lastName, imgpath);

    this.currentUser.next(formUser);

    localStorage.setItem("userData", JSON.stringify(formUser));


  }

  signIn(email: string, password: string){
    return this.http.post<AuthResponseData>(signInURL+apiKey, {email, password, returnSecureToken: true}).pipe(
      tap(res => {
        const {email, localId, idToken, expiresIn } = res;

        this.handleAuth(email, localId, idToken, +expiresIn)
      })
    );
  }



  setIsLogInMode(value: boolean){
    this.isLogInMode = value;
  }

}
