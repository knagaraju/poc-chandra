import { Component } from '@angular/core';
import { CommonService } from '../dashboard-new/core/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
              private router: Router,
              private toastrService: ToastrService
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
        this.toastrService.success("loggin successful");
        localStorage.setItem("token", "423423")
        this.router.navigate(['/dashboard']);
      }else{
        this.toastrService.success("loggin successful");
        alert("User name or password is wrong. Please try again");
      }
    }
  }
}
