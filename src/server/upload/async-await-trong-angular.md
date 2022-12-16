## Định nghĩa async-await
Việc tạo hàm với câu lệnh `async function` sẽ định nghĩa ra một hàm không đồng bộ (asynchronous function). Khi một hàm async được gọi, nó sẽ trả về 1 `Promise`. Khi hàm async trả về giá trị, Promise sẽ được resolved với giá trị vừa được trả về. Khi hàm async trả về exception, Promise sẽ bị reject.

Hàm async có thể bao gồm biểu thức `await`, nó sẽ tạm dừng việc thực thi của hàm async để chờ đến khi Promise thực hiện xong mới tiếp tục hàm async. Từ khóa await chỉ có hiệu lực bên trong hàm async. Nếu bạn sử dụng nó bên ngoài phần thân của hàm async, bạn sẽ nhận một SyntaxError. 

Nói đơn giản, nó là cơ hội để code không đồng bộ theo kiểu đồng bộ.
## Ví dụ 1
Hãy bắt đầu với 1 ví dụ đơn giản. Một hàm để trả về Promise sẽ được resolve sau 2 giây, và trả về giá trị là biến truyền vào.
```
resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
}
```
Với `promise`, chúng ta có thể sử dụng giá trị trả về bằng hàm callback `then()`
```
getValueWithPromise() {
    this.resolveAfter2Seconds(20).then(value => {
      console.log(`promise result: ${value}`);
    });
    console.log('I will not wait until promise is resolved');
}
```
Ở trong trường hợp này, `console.log()` ở dòng 5 sẽ được in ra trước `console.log()` ở dòng 3, đó là bản chất của `promise`.

Giờ hãy xem async-await hoạt động thế nào:
```
async getValueWithAsync() {
    const value = <number>await this.resolveAfter2Seconds(20);
    console.log(`async result: ${value}`);
}
```
Một vài điểm cần lưu ý 
* Dòng 1 - Hàm được bắt đầu với từ khóa `async`, bắt buộc phải có từ khóa này nếu trong hàm của bạn có sử dụng `await`.
* Dòng 2 - Chúng ta không gọi `then()` phía sau promise, thay vì thế, chúng ta sẽ thêm tưf khóa `await` phía trước. Từ khóa này sẽ ko cho phép đoạn lệnh tiếp theo được thực thi, có nghĩa là `console.log()` ở dòng 3 chỉ được gọi khi promise ở dòng 2 được resolved, giống như khi xử lý một hàm đồng bộ.
* Vì sử dụng Typescript nên ta cần nhập kiêu dữ liệu trả về của promise, như trong ví dụ trên là `<number>`.
## Ví dụ 2
```
addWithPromise() {
    this.resolveAfter2Seconds(20).then(data1 => {
      let result1 = <number>data1;
      this.resolveAfter2Seconds(30).then(data2 => {
        let result2 = <number>data2;
        this.additionPromiseResult = result1 + result2;
        console.log(`promise result: ${this.additionPromiseResult}`);
      });
    });
  }
```
Trong thực tế, việc kết thúc trong nested promise rất phổ biến (hay gọi là callback hell), như ví dụ trên là ta có 2 tầng lồng nhau. Nhưng thử tưởng tượng với 7 hay 8 tầng lồng nhau, cùng với các biến và exception, nó trông sẽ đáng sợ thế nào.

Với async thì nó sẽ thế này:
```
 async addWithAsync() {
    const result1 = <number>await this.resolveAfter2Seconds(20);
    const result2 = <number>await this.resolveAfter2Seconds(30);
    this.additionAsyncResult = result1 + result2;
    console.log(`async result: ${this.additionAsyncResult}`);
  }
```
Chỉ nhìn sơ qua cũng thấy nó đơn giản hơn nhiều. Tuy là cùng trả về kết quả giống nhau, nhưng xét về sự dễ đọc, dễ maintain thì async-await vượt trội hơn so với cách sử dụng promise cổ điển.
## Sử dụng Http REST APIs
Trong ứng dụng Angular, chúng ta có thể lấy data thông qua Http hoặc HttpClient service. Mặc định các phương thức của HttpClient như `get()`, `put()`, `delete()`, `post()` trả về `Observable<T>`. Kết quả này có thể được sử dụng thông qua phương thức `subscribe` hoặc là toán tử `toPromise()` từ RxJs. 
### Lấy kết quả HttpClient sử dụng Observable
Nhiều dev Angular sử dụng `subcribe` để lấy dữ liệu HTTP Rest mà không biết tới việc nó khác với `promise` như thế nào. Phương thức `subscribe` sẽ được lấy từ 1 object `Observable`. Một khi đã subscribe (đăng kí), callback `subscribe` sẽ được thực thi mỗi khi có một data mới được tạo ra bởi `Observer`. Trong khi đó, callback `then()` của promise sẽ chỉ được thực thi nhiều nhất là 1 lần. Vì vậy, trừ khi bạn cần thiết phải lấy dữ liệu dưới dạng định kì (recurring), ngoài ra thì đừng dùng `subscribe`. Thay vào đó, hãy sử dụng `toPromise()`. Nếu bạn để ý tới những ví dụ trong tài liệu của Angular, thì chúng sử dụng chủ yếu là `toPromise`.
```
getDataUsingSubscribe() {
    this.httpClient.get<Employee>(this.url).subscribe(data => {
      this.subscribeResult = data;
      console.log('Subscribe executed.')
    });
    console.log('I will not wait until subscribe is executed..');
 }
 ```
### Get HTTPClient result sử dụng toPromise:
Rx.js cung cấp một phương thức gọi là `toPromise()`, và ta có thể dùng nó để convert một `Observable<T>` thành promise. Một khi đã convert, nội dung bên trong `then` của nó sẽ được gọi tới mỗi khi có data mới.
```
getDataUsingPromise() {
    this.httpClient.get<Employee>(this.url).toPromise().then(data => {
      this.promiseResult = data;
      console.log('Promise resolved.')
    });
    console.log('I will not wait until promise is resolved..');
  }
```
### Get HTTPClient result sử dụng Async-Await

Với cú pháp Async-await, ta không cần dùng tới `subscribe` lẫn `toPromise`. Code khi đó nhìn sẽ rất đơn giản và trực quan. Trong ví dụ dưới, dòng thứ 3 sẽ được thực thi một khi data được fetch về từ "url", Observable<T> được convert về promise, promise được xử lý (resolve), và data sẽ được lưu trữ trong biến `asyncResult`.
```
 async getAsyncData() {
    this.asyncResult = await this.httpClient.get<Employee>(this.url).toPromise();
    console.log('No issues, I will wait until promise is resolved..');
  }
```
### Conditional programming:

Có một trường hợp phổ biến, đó là chương trình sẽ cần lấy data từ 1 url, sau đó xét điều kiện để fetch data tiếp theo. Sử dụng promise thì code sẽ trông như thế này:
```
getConditionalDataUsingPromise() {
    this.httpClient.get<Employee>(this.url).toPromise().then(data => {
      console.log('First Promise resolved.')
      if (data.id > 5) {
        let anotherUrl = 'http://dummy.restapiexample.com/api/v1/employee/23';
        this.httpClient.get<Employee>(anotherUrl).toPromise().then(data => {
          this.conditionalPromiseResult = data;
          console.log('Second Promise resolved.')
        });
      }
    });
  }
```
Thay vào đó, nếu sử dụng async-await thì code sẽ trông như thế này:
```
 async getConditionalDataUsingAsync() {
    let data = await this.httpClient.get<Employee>(this.url).toPromise();
    if (data.id > 5) {
      let anotherUrl = 'http://dummy.restapiexample.com/api/v1/employee/23';
      this.conditionalAsyncResult = await this.httpClient.get<Employee>(anotherUrl).toPromise();
    }
    console.log('No issues, I will wait until promise is resolved..');
 }
```

***Nói chung là async-await cung cấp cho ta một cách tốt hơn để xử lý bất đồng bộ trong ứng dụng Angular.***

Nguồn: https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77