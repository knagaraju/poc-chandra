import { Component } from '@angular/core';
import { CommonService } from '../dashboard-new/core/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormData: any = {
    username: '',
    password:'',
    rememberMe: false
  }

  constructor(private commonService: CommonService,
              private router: Router
  ){

  }

  login(loginForm: any) {
    if (loginForm.valid) {
      const payload = {
        userName: this.loginFormData.username,
        password: this.loginFormData.password
      }
      let result = this.commonService.loginApi(payload);
      if(result){
        localStorage.setItem("token", result.token)
        this.router.navigate(['/dashboard']);
      }else{
        alert("USer name or password is wrong. Please try again");
      }
    }
  }
}
