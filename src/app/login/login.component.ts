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
      this.commonService.loginApi(payload).subscribe((res:any) => {
        this.toastrService.success("loggin successful", res);
        localStorage.setItem("token", "234324")
        this.router.navigate(['/dashboard']);
      });
      // if(result){
      //   this.toastrService.success("loggin successful");
      //   localStorage.setItem("token", result.token)
      //   this.router.navigate(['/dashboard']);
      // }else{
      //   this.toastrService.error("User name or password is wrong. Please try again");
      //   //alert("User name or password is wrong. Please try again");
      // }
    }
  }
}
