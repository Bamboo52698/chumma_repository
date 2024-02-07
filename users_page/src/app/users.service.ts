import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Users} from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }
  
  getUsers(){
    return this.http.get<Users[]>('http://localhost//what//user_connect1.php')
  
  }
  
}
