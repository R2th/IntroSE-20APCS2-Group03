Khi làm việc với Angular, chắc hẳn các bạn đã nghe và thường xuyên nhắc đến **RXJS**, **Observable**. Nó là một phần không thể thiếu để làm việc với các services, providers của Angular. Tuy nhiên, ngoài việc tạo ra các phương thức tiện lợi để xử lý các luồng dữ liệu và sự kiện thì đôi khi nó cũng mang đến cho chúng ta đôi chút rắc rối. Trong bài viết này, mình sẽ nêu lên một vài điểm cần chú ý từ chính các phương thức được sử dụng nhiều nhất với Observable là **subscribe** và **unsubscribe**. Về khái niệm `RXJS là gì`, `Observable là gì` thì các bạn có thể tìm đọc các tài liệu khác, mình sẽ không nhắc lại trong bài viết này.

## subscribe và unsubscribe

Khi chúng ta làm việc với **Observable** thì sẽ thường xuyên sử dụng phương thức **subscribe** để theo dõi các thay đổi của dữ liệu hoặc nhận về kết quả của một công việc nào đó.

VD việc sử dụng với **HttpClient** service của Angular:

```typescript
import { HttpClient } from '@angular/common/http';
// ...
// inject http
constructor(private http: HttpClient) { }
// ...
// use http
const apiUrl = 'http://abc.com/def';
this.http.get(apiUrl).subscribe(val => console.log(val));
```

Khi API trả về kết quả thì dữ liệu đó sẽ được log ra qua phương thức **subscribe**. Và để kết thúc quá trình lắng nghe kết quả từ API trả về thì chúng ta sẽ xử dụng đến phương thức **unsubscribe**.

```typescript
// ...
this.http.get(apiUrl).subscribe(val => console.log(val)).unsubscribe();
```

Nếu **unsubscribe** không được triệu gọi thì luồng dữ liệu đó sẽ được lưu vào bộ nhớ và theo dõi, bất cứ khi nào có sự thay đổi của dữ liệu trong luồng thì phương thức **subscribe** sẽ được thực thi. Tuy nhiên, trong thực tế, 1 request lấy dữ liệu từ API thì cũng chỉ nhận được 1 response duy nhất, cho nên chúng ta không thể thấy việc phương thức **subscribe** được khởi chạy lần tiếp theo, và service **HttpClient** cũng tự gọi một phương thức để kết thúc quá trình lắng nghe kết quả từ API. Bởi vậy, chúng ta thường không cần dùng đến phương thức **unsubscribe** trong các trường hợp này.

## Vấn đề với unsubscribe

Ở ví dụ trên thì chúng ta có thể lãng quên hoặc thấy thằng **unsubscribe** chẳng có nhiều tác dụng, nhưng nếu trong các trường hợp khác mà các bạn cũng bỏ qua việc **unsubscribe** một Observable thì hậu quả của nó thật khôn lường. Ngoài việc rò rỉ bộ nhớ do phải lưu các Observable để **subscribe** gây sút giảm hiệu năng của ứng dụng, nó còn mang đến các kết quả dở khóc dở cười cho các New Dev.

- VD: Giả xử các bạn có một **component A** làm nhiệm vụ request lên API để lấy data khi **button reload** của một **component B** được click. **Component A** sẽ kiểm tra khi nào **button reload** ở **component B** được click thông qua một **service C**. **Component A** có thể ẩn, hiện tùy vào thao tác của người dùng.

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<button (click)="showA = !showA">Toggle</button>
  <p>{{showA ? 'component A is display' : 'component A is hidden'}}</p>
  <b-component></b-component>
  <a-component *ngIf="showA"></a-component>`
})
export class AppComponent {
  showA = true;
}
```
```typescript
// c.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CService {
  buttonSubject: Subject<any> = new Subject();
  buttonObservable = this.buttonSubject.asObservable();
}
```
```typescript
// a.component.ts
import { Component, OnInit } from '@angular/core';
import { CService } from './c.service';

@Component({
  selector: 'a-component',
  template: `<h1>GET and show data!</h1>`
})
export class AComponent implements OnInit {
  constructor(private cService: CService) { }

  ngOnInit() {
    this.cService.buttonObservable.subscribe(e => {
      console.log('GET api');
    });
  }
}
```
```typescript
// b.component.ts
import { Component } from '@angular/core';
import { CService } from './c.service';

@Component({
  selector: 'b-component',
  template: '<button (click)="handleButtonClick($event)">Reload</button>'
})
export class BComponent {
  constructor(private cService: CService) { }

  handleButtonClick(e) {
    this.cService.buttonSubject.next(e);
  }
}
```

Ở  VD này, khi các bạn click vào **button reload** sẽ thấy tại cửa sổ console log ra thông báo `GET api`, tức là **component A** đã lắng nghe được sự kiện click của **button reload** trong **component B** và thực hiện công việc `GET api`.

![](https://images.viblo.asia/3eef13b9-b6fb-4f26-84d4-0f41e3c2bf3c.jpg)

Tuy nhiên, khi **component A** bị ẩn đi thì các bạn cũng không mong muốn component A tiếp tục làm công việc `GET api`, nhưng hãy thử click lại **button reload** xem nhé:

![](https://images.viblo.asia/76668b77-41e9-4eab-8f1f-71422dc8c626.jpg)

Các bạn thấy **component A** đã được ẩn đi, nhưng nó vẫn tiếp tục thực hiện công việc `GET api`, điều đó là do chúng ta chưa thực hiện **unsubscribe** **buttonObservable** từ **service C**.

```typescript
// a.component.ts
// ...
ngOnInit() {
  this.cService.buttonObservable.subscribe(e => {
    console.log('GET api');
  });
  // No unsubscribe
}
// ...
```

Và khi **component A** được hiển thị trở lại thì nó sẽ tiếp tục thực hiện một luồng công việc mới. Do đó, công việc `GET api` sẽ bị lặp lại nhiều lần, điều này rất có hại cho hiệu năng của ứng dụng và cả API.

![](https://images.viblo.asia/e408b888-d260-49af-98e2-e35eb88b2676.jpg)

Nếu **component A** được ẩn hiện N lần, thì công việc `GET api` cũng sẽ bị lặp lại N lần. Để khắc phục tình trạng này, các bạn chỉ cần **unsubscribe** **buttonObservable** là được.

```typescript
// a.component.ts
// ...
ngOnInit() {
  const subscription = this.cService.buttonObservable.subscribe(e => {
    console.log('GET api');
    // unsubscribe
    subscription.unsubscribe();
  });
}
// ...
```

Nhưng lúc này, việc `GET api` sẽ chỉ được thực hiện một lần duy nhất cho dù các bạn có click vào button reload bao nhiêu lần đi nữa, bởi vì sau khi công việc của lần click đầu tiên được thực hiện thì quá trình lắng nghe sự kiện click cũng bị dừng lại do phương thức **unsubscribe**.

Vậy nên, để mọi việc diễn ra xuôn sẻ, các bạn hãy **unsubscribe** khi mà component được gỡ khỏi DOM thông qua lifecycle hook **ngOnDestroy** của Angular.

```typescript
// a.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { CService } from './c.service';

@Component({
  selector: 'a-component',
  template: `<h1>GET and show data!</h1>`
})
export class AComponent implements OnInit, OnDestroy {
  subscription: SubscriptionLike;

  constructor(private cService: CService) { }

  ngOnInit() {
    this.subscription = this.cService.buttonObservable.subscribe(e => {
      console.log('GET api');
    });
  }

  ngOnDestroy() {
    // unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

## Một số cách để unsubscribe hiệu quả

Qua VD trên thì các bạn cũng đã hiểu được sự quan trọng của việc kiểm xoát và **unsubscribe** các **Observable** một cách hợp lý. Nhưng giả xử trong một component có quá nhiều các **Observable** cần được **unsubscribe** thì các bạn sẽ làm thế nào để hiệu quả nhất?

```typescript
ngOnInit() {
  this.subscription1 = request1.subscribe(...);
  this.subscription2 = request2.subscribe(...);
  // ...
  this.subscriptionX = requestX.subscribe(...);
}

ngOnDestroy() {
  if (this.subscription1) {
    this.subscription1.unsubscribe();
  }
  if (this.subscription2) {
    this.subscription2.unsubscribe();
  }
  // ...
  if (this.subscriptionX) {
    this.subscriptionX.unsubscribe();
  }
}
```

Nếu làm như đoạn code trên thì thật là kinh khủng đúng không? Vậy hãy cùng thử một số cách dưới đây nhé!

### Sử dụng một mảng để quản lý các subscriptions

```typescript
subscriptions: Subscription[] = [];
ngOnInit() {
  this.subscriptions.push(request.subscribe(...));
  this.subscriptions.push(request.subscribe(...));
  this.subscriptions.push(request.subscribe(...));
}
ngOnDestroy() {
  this.subscriptions.forEach((subscription) => subscription.unsubscribe());
}
```

###  Sử dụng Subscription add

```typescript
subscriptions: Subscription = new Subscription();
ngOnInit() {
  this.subscriptions.add(request.subscribe(...));
  this.subscriptions.add(request.subscribe(...));
  this.subscriptions.add(request.subscribe(...));
}
ngOnDestroy() {
  this.subscriptions.unsubscribe();
}
```

### Sử dụng takeUntil operators

```typescript
import { takeUntil } from 'rxjs/operators';
// ...
destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
ngOnInit() {
  request.pipe(takeUntil(this.destroy)).subscribe();
  request.pipe(takeUntil(this.destroy)).subscribe();
  request.pipe(takeUntil(this.destroy)).subscribe();
}
ngOnDestroy() {
  this.destroy.next(null);
}
```

## Lời kết

Qua bài viết này, mình hi vọng sẽ truyền đạt được cho các bạn một chút kiến thức nho nhỏ và cũng là kinh nghiệm của mình khi làm việc với RXJS và Angular. Nếu các bạn có gặp một số trường hợp tương tự như bài viết này thì hãy áp dụng các cách mà mình đã nói ở trên nhé! Ngoài các cách để unsubscribe một Observable như bên trên thì cũng còn một vài cách nữa, nhưng nó cũng có phần phức tạp và không tiện dụng cho lắm nên mình cũng không nêu ra, cảm ơn tất cả mọi người đã quan tâm theo dõi!

Code demo: [Các bạn có thể xem VD tại đây](https://stackblitz.com/edit/angular-rxjs-subscribe-unsubscribe)