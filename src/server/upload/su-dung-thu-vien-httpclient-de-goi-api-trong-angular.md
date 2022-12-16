Làm cách nào để thực hiện việc này bằng cách sử dụng Thư viện HTTPClient?

Ngày nay, hầu như tất cả các ứng dụng front-end đang sử dụng giao thức HTTP để giao tiếp với các dịch vụ back-end. Có hai cách mà các trình duyệt hiện đại có thể thực hiện các yêu cầu HTTP - `XMLHttpRequest` interface và `fetch()` API.
**Angular** cung cấp module **HttpClient** cho phép các nhà phát triển cos thể gửi các request HTTP và thực hiện các lệnh gọi API đến các máy chủ HTTP từ xa.

```
HttpClient is available as an injectable class, with methods to perform HTTP requests. Each request method has multiple signatures, and the return type varies based on the signature that is called (mainly the values of observe and responseType).” — Angular.IO
```

Nó có sẵn trong module `@angle/common/http` và cung cấp một client **HTTP API** đơn giản dựa trên giao diện **XMLHttpRequest** được trình duyệt hiển thị.
*Có rất nhiều lợi ích khi sử dụng api này, một số lợi ích đáng nói như là -
Dễ dàng trong việc Testing
Typed Request & Response Objects
Request & Response Interception
APIs Observable Support
Dễ dàng trong việc Handling Error
*

**Cách dùng**


Trong file app.module.ts:
```

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    ////....
  ],
  imports: [
    // Other Modules...,
    HttpClientModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Khi HttpClientModule được imported trong AppModule, ta có thể dễ dàng inject HTTPClient trong các class như data.service.ts như sau:

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) { }
getPosts() {
    return this.httpClient
    .get('https://jsonplaceholder.typicode.com/posts')
  }
}
```

**Typed Response - Giá trị trả về được định nghĩa trước**
Chúng ta cũng có thể cấu hình request HTTPClient để mong đợi kiểu trả về mong muốn. Điều này sẽ làm cho việc xử lý đầu ra dễ dàng hơn và rõ ràng hơn đối với người dùng.
```
getEntities (): Có thể quan sát được <Entity[]> {
    trả về this.httpClient.get <Entity []> (this.apiUrl)
}
```


**Thực hiện gọi API tới server khi CORS không được hỗ trợ:**

Chúng ta cũng có thể sử dụng module HttpClient để thực hiện lệnh gọi API khi server không hỗ trợ  **CORS**.
Trong Angular, các request **JSONP** trả về một Observable. Ở đây, trước tiên chúng ta có thể subscribes các observables và sau đó sử dụng  **RxJS** để thay đổi giá trị trả về. Sau khi hoàn tất, chúng ta có thể sử dụng async pipe để quản lý các kết quả trả về.
Để sử dụng JSONP, trước tiên chúng ta phải include: HttpClientJsonpModule được import trong NgModule.
```

getPosts() : Observable {
    return this.httpClient.jsonp('apiURL', 'callback').pipe(
      catchError(this.handleError('searchHeroes', [])) 
      // then handle the errorResponse
   );
}
```

**Error Handling in HttpClient**

Chúng ta cần xử lý hai loại lỗi trong bất kỳ ứng dụng nào - phía server và phía client.
Về **phía Backend của server** có thể từ chối yêu cầu, trả lại phản hồi HTTP với mã trạng thái như 404 hoặc 500.
Về phía **Client** có thể giống như lỗi mạng dẫn đến việc không hoàn thành request hoặc bất kỳ exceptionnào được đưa ra trong RxJS. Kết quả của các lỗi hoặc exception này sẽ là các objects ErrorEvent của JavaScript.
Một trong những lợi ích của api HttpClient là nó có thể ghi lại cả hai loại lỗi trong HttpErrorResponse và chúng ta có thể sử dụng phản hồi để tìm ra nguyên nhân thực sự đã gây ra sự cố.
* **Creating Error Handler**
```
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it   accordingly.
      console.error('An error occurred:',   errorResponse.error.message);
    } 
   else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        'Backend returned code ${errorResponse.status}, '+
        'body was: ${errorResponse.error}');
    }
    // return an observable with a user-facing error message
    return throwError(
      'Error Occurred; please try again later.');
  };
```

Trong ví dụ trên, trả về RxJS ErrorObservable và sẽ dễ dàng để hanlde các error.
```
getEntities(): Observable<Entity[]> {
    return this.httpClient.get<Entity[]>(this.apiUrl)
     .pipe(
      catchError(this.handleError)
     ); 
  }
```

* **Phương pháp tiếp cận tổng quát **

```
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
// TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
// TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
// Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
```
Cách dùng như sau:
```

getEntities(): Observable<Entity[]> {
    return this.httpClient.get<Entity[]>(this.apiUrl)
     .pipe(      
   catchError(this.handleError<Entity>('getEntities'))
     ); 
  }
```
Chúng ta cũng có thể hanlde error với HttpInterceptor. Khi sử dụng nó, ta nên mô tả rõ và thay đổi request HTTP từ ứng dụng lên server.
```

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
```

Interceptors có thể thực thi nhiều tác vụ khác nhau, từ việc authen để việc logging, trong một routine, cho mỗi HTTP request/response. 


**Retrying request**

Có vài ví dụ việc tạo **HttpRequest**, khi đường truyền mạng gặp lỗi để có kết quả thành công.

Thư viện RxJS có vài hàm để có thể làm việc này. Dễ nhất là dùng **retry()** và ta có thể dùng nó tự động để có thể re-subscribes một Observable, với số lần mong muốn.
Một khi ta re-subscribes kết quả của **HttpClient**, nó sẽ tự động cấp phát lại HTTP request.
```
getEntities(): Observable<Entity[]> {
    return this.httpClient.get<Entity[]>(this.apiUrl)
     .pipe(
      retry(2), // retry a failed request up to 2 times
      catchError(this.handleError<Entity>('getEntities'))
     ); 
  }
```

Tham khảo: https://javascript.plainenglish.io/the-right-way-to-make-api-calls-in-angular-5cc03a62bf43