import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private requestsInFlight: number = 0;

  constructor(private loaderService: LoaderService,
              private toaster: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.requestsInFlight++;

    // Show loader if it's not already visible
    if (this.requestsInFlight === 1) {
      this.loaderService.setLoading(true);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors here if needed
        this.toaster.error("Something went wrong please try again!")
        return throwError(error)
      }),
      finalize(() => {
        this.requestsInFlight--;

        // Hide loader if all requests are completed
        if (this.requestsInFlight === 0) {
          //setTimeout(() => {
            this.loaderService.setLoading(false);
          //}, 100000);
        }
      })
    );
  }

  
}
