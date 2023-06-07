import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './service/user.service';
import { User } from './model/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  userId?: number;;
  users: User[] = [];
  user: any = {
    nick: '',
    password: ''
  };

  constructor(private route: ActivatedRoute, private userService: UserService) {

  }
  
  ngOnInit(): void {
      this.login();
  }

  login() {
    if (this.user.nick && this.user.password) {
      this.userService.loginUser(this.user.nick, this.user.password).subscribe({
        next: (userInserted) => {
          console.log("Inicio de sesion correcto");
          console.log(userInserted);
          this.userService.user = userInserted;
        },
        error: (err) => { this.handleError(err); }
      })
    } else {
      console.log('Error al iniciar sesion');
    }
  }
  handleError(err: any) {
  }

}
