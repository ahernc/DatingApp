import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


// L53 Handling errors in Angular
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                return throwError(error.statusText);
            }
            if (error instanceof HttpErrorResponse) {
                const applicationError = error.headers.get('Application-Error'); // needs to match exactly what's in the API!
                // takes care of the 500 errors...
                if (applicationError) {
                    return throwError(applicationError);
                }

                // this is what we get back in the browser... error is the object.
                //  error is one level down...
                const serverError = error.error;
                let modalStateErrors = '';

                // check it exists...
                if (serverError.errors && typeof serverError.errors === 'object') {
                    for (const key in serverError.errors) {
                        if (serverError.errors[key]) {
                            // build up the list of strings
                            modalStateErrors += serverError.errors[key] + '\n';
                        }
                    }
                }
                // if we get "Server Error" it means we didn't catch an error correctly
                return throwError(modalStateErrors || serverError || 'Server Error');
            }
        })
    );
  }
}

// L53 Handling errors in Angular
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};

