import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user/user/model/user.model';
import { UserService } from 'src/app/entities/user/user/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  user?: User;

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    
  }

  userIsRegister(){
    this.user = this.userService.user!;
    return this.user !== undefined;
  }

  logout(): void {
    this.userService.user = undefined;
  }
  handleError(err: any) {
  }
}
