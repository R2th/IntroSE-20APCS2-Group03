Một trường hợp điển hình mà chúng ta gặp phải khi làm việc với các ứng dụng **Single page** đó là việc lấy dữ liệu từ nhiều **API endpoints** khác nhau và sau đó hiển thị dữ liệu được trả về cho người dùng. Việc xử lý nhiều **HTTP requests** và quản lý chúng có thể gặp chút khó khăn nhưng với **Angular HTTP service** và một chút trợ giúp từ thư viện **RxJS** đi kèm, thì chúng ta có thể thực hiện được chỉ trong một vài dòng code. Có nhiều cách để xử lý nhiều **HTTP requests**, chúng có thể là tuần tự hoặc song song. Trong bài này, mình sẽ đề cập đến cả hai.

Trước khi đi vào nội dung chính, mình xin chia sẻ cho các bạn một số thông tin về môi trường chạy, cũng như phiên bản của Angular, RxJS và API mà mình sử dụng trong bài viết này:
* **Angular**: 8.0.0
* **RxJS**: 6.5.2
* **API**: https://swapi.co/

Trong bài viết này, mình sẽ sử dụng một API có sẵn (https://swapi.co/), API này cho phép chúng ta lấy ra được những thông tin liên quan đến bộ phim nổi tiếng **Star Wars: Chiến tranh giữa các vì sao** :D. Ví dụ như thông tin về các nhân vật, hành tinh, phi thuyền, ... có trong phim.

Hãy bắt đầu với một ví dụ đơn giản là xử lý một **HTTP request** với **Angular HTTP service**:

```javascript:app/app.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.http.get('https://swapi.co/api/people/1').subscribe(res => {
      console.log(res);
    });
  }
}
```

Trong app của chúng ta, hiện tại chỉ có một **component** duy nhất sử dụng **Angular HTTP service** thông qua **Dependency Injection**. **Angular** sẽ cung cấp cho chúng ta một đối tượng của **HTTP service** khi chúng ta khai báo trong **constructor** của **component**.

Bây giờ chúng ta đã có **service**, tiếp đến ta sẽ gọi tới **service** này trong `ngOnInit` để lấy dữ liệu trả về từ API. Chúng ta call tới api `https://swapi.co/api/people/1` với `http.get()` bằng phương thức **GET**. Sau đó chúng ta gọi tới **subscribe** để lấy dữ liệu trả về từ API. Và khi dữ liệu được trả về, chúng ta chỉ cần **log** nó lại bằng đối tượng **console**. Đây là một ví dụ đơn giản về cách xử lý một **HTTP request**, giờ chúng ta sẽ chuyển sang trường hợp xử lý 2 **HTTP requests**.

## Subscribe
Trong ví dụ tiếp theo, ta sẽ cần lấy thông tin homeworld của một character. Tuy nhiên, để lấy được chúng ta sẽ cần phải lấy được thông tin của character trước, sau đó phải chờ dữ liệu trả về từ API thì lúc này chúng ta mới có dữ liệu cần thiết để tiếp tục lấy được thông tin homeworld. Trong trường hợp này, chúng ta bắt buộc phải gọi tới 2 API endpoints khác nhau và 2 API endpoints này phải được sắp xếp một cách tuần tự.

```javascript:app/app.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.http.get('https://swapi.co/api/people/1').subscribe(character => {
      this.http.get(character.homeworld).subscribe(homeworld => {
        console.log(homeworld);
      });
    });
  }
}
```

Trong **life cycle** `ngOnInit`, chúng ta có thể thấy có tới 2 HTTP requests. Tại request đầu tiên, chúng ta gọi tới API `https://swapi.co/api/people/1` để lấy ra dữ liệu của character.

![](https://images.viblo.asia/5dc5d26c-6635-434a-891f-2b53821f5b74.png)

Sau khi lấy được dữ liệu character được trả về từ API, chúng ta có thế lấy được dữ liệu homeworld của character này thông qua homeworld API endpoint. Vậy là chúng ta đã đạt được mục tiêu ban đầu đề ra là lấy được thông tin của character. Tuy nhiên, có 2 điều cần chú ý trong cách này. Thứ nhất, chúng ta đang trình bày theo cấu trúc nested (lồng nhau), nếu như có thêm nhiều request cần xử lý thì code của chúng sẽ khó đọc hơn rất nhiều. Thứ hai, 2 requests trên đều là 2 requests tuần tự, vì vậy chúng ta buộc phải đặt lồng nhau nếu sử dụng phương thức subscribe. Tuy nhiên, RxJS có cung cấp cho chúng ta một số operator giúp cho việc xử lý nhiều request trở nên dễ dàng và ngắn ngọn hơn rất nhiều. Chúng ta hãy cùng xem những ví dụ tiếp theo để biết đó là những operator.

## MergeMap
Trong ví dụ này, chúng ta sử dụng `mergeMap` / `flatMap` (`flatMap` là một alias của `mergeMap`) để lặp qua các giá trị được trả về từ **Observable**. Vì vậy khi nhận được **homeworld**, nghĩa là chúng ta đang nhận lại một **Observable** bên trong luồng **Observable** của **character**. Điều này tạo ra một **Observable** lồng nhau trong một **Observable** khác. `mergeMap` giúp chúng ta lấy được giá trị từ **Observable** bên trong và chuyển nó trở lại luồng cha. Việc này có thể mất một chút thời gian để làm quen, nhưng trên thực tế nó vẫn là một công cụ tiện dụng của thư viện **RxJS**.

```javascript:app/app.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.http.get('https://swapi.co/api/people/1').pipe(
      mergeMap(character => this.http.get(character['homeworld']))
    ).subscribe(homeworld => {
      console.log(homeworld);
    });
  }
}
```

Vừa rồi chúng ta đã làm quen với `mergeMap` để xử lý các request tuần tự, vậy còn các request song song thì xử lý thế nào, để biết chúng ta hãy cùng đi đến ví dụ tiếp theo.

## ForkJoin
Trong ví dụ tiếp theo này, chúng ta sẽ dùng một operator được gọi là `forkJoin`. Nếu bạn cảm thấy giống **promise**, thì nó thực sự rất giống với `Promise.all()`. `forkJoin`  cho phép chúng ta nhóm nhiều **Observable** lại với nhau, và thực thi chúng một cách song song. Sau khi tất cả **Observable** được thực thi xong, **forkJoin** sẽ chuyển chúng thành một **Observable** duy nhất. Giá trị trả về khi **subscribe** sẽ là một mảng các kết quả tương ứng với các **Observable** trong `forkJoin`. Trong ví dụ này, chúng ta muốn lấy ra một character và một homeworld của character đó. Chúng ta đã biết ID của character này, vì vậy ta có thể thực hiện 2 request này một cách song song.

```javascript:app/app.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    const character = this.http.get('https://swapi.co/api/people/1');
    const characterHomeworld = this.http.get('http://swapi.co/api/planets/1');

    forkJoin([character, characterHomeworld]).subscribe(results => {
      console.log('character', results[0]);
      console.log('characterHomeworld', results[1]);
    });
  }
}
```

Trong đoạn code trên, chúng ta lưu vào `character` và `characterHomeworld` vào các biến. Chúng sẽ không thực thi cho đến khi chúng ta **subscribe**. Khi chúng ta truyền chúng vào `forkJoin`, thì `forkJoin` sẽ **subscribe** và thực thi các **Observable**, thu thập từng giá trị lấy được và gộp chúng lại thành một mảng các giá trị được trả về từ các request.

## Kết luận
Trên đây, mình đã giới thiệu cho các bạn về các cách để xử lý nhiều HTTP requests trong Angular với RxJS. Với `mergeMap` / `flatMap` và `forkJoin`, ta có thể xử lý nhiều request một cách dễ dàng hơn cũng như code cũng sẽ ngắn ngọn và dễ đọc hơn. Cám ơn các bạn đã đọc bài viết của mình.

-----
***Live demo:** https://stackblitz.com/edit/multi-http-requests*

***Tài liệu tham khảo:** https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs*