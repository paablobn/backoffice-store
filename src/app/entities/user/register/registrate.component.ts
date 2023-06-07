import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/service/user.service';
import { User } from '../user/model/user.model';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.scss']
})
export class RegistrateComponent implements OnInit {

  userId?: number;
  user?: User;
  users: User[] = [];
  passwordC?: String;

  constructor(private route: ActivatedRoute, private userService: UserService) {

  }
  
  ngOnInit(): void {
    this.initializeUser();
}

confirmPassword(): boolean{
  if (this.user!.password == this.passwordC!){
    return true;
  }else{
    return false;
  }
}

public saveUser(): void {
    this.insertUser();
}

private initializeUser(): void {
  this.user = new User(undefined, this.user?.nick!, this.user?.nombre!, this.user?.apellidos!, this.user?.telefono!, this.user?.email!, this.user?.password!);
}

private insertUser(): void {
  this.userService.insert(this.user!).subscribe({
    next: (userInserted) => {
      console.log("Creado correctamente");
      console.log(userInserted);
    },
    error: (err) => { this.handleError(err); }
  })
}

private handleError(err: any): void {

}
}
