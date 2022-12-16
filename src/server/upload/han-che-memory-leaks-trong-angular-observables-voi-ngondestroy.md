![image.png](https://images.viblo.asia/fad6f871-2e31-46b6-bde7-d5083a805572.png)

Rò rỉ bộ nhớ (Memory Leaks) là một trong những loại vấn đề tồi tệ nhất mà bạn có thể gặp phải. Nó khó tìm, khó gỡ lỗi và thường khó giải quyết. Thật không may, sự cố này xảy ra trong mọi ngôn ngữ lập trình hoặc framework, bao gồm cả Angular. Observablé thật tuyệt vời, vì dòng dữ liệu không ngừng, nhưng tác động có lợi này có thể gây ra vấn đề nghiêm trọng với rò rỉ bộ nhớ. Hôm nay chúng ta sẽ xem xét kỹ hơn về ngOnDestroy Angular và trả lời câu hỏi: “Khi nào thì tôi nên hủy đăng ký khỏi một observable? Mô hình tốt nhất để sử dụng là gì? ”

Trong bài viết này, ta sẽ:
Tạo một ứng dụng tạo ra các số ngẫu nhiên.
Tái tạo lỗi bộ nhớ bị rò rỉ trong đó.
Khắc phục lỗi rò rỉ bộ nhớ với mẫu takeUntil + ngOnDestroy.
Để hoàn thành những tác vụ này, hãy đảm bảo bạn:
Cài đặt Node.js và npm (tại thời điểm viết bài, tôi đang sử dụng Node.js v8.11.1 và npm 5.8.0).
Cài đặt @angular/cli (trong bài này tôi đang sử dụng phiên bản 6.0.0).
Có kiến thức trung bình về Angular.


**Tạo mới App** 

Tạo mới:


```
ng new memoryLeakApp
cd memoryLeakApp
```
`ng new`  sẽ khởi tạo một Git repository và commit project.
Tạo các thư mục, file sau trong thư mục memoryLeakApp. Chúng ta sẽ edit sau:
```
mkdir src/app/lucky
touch src/app/lucky/lucky.component.ts
touch src/app/lucky/lucky.service.ts
mkdir src/app/really
touch src/app/really/really.component.ts
```
OK, giờ bắt tay vô code. Chúng ta sẽ tạo LuckyService, nó sẽ random ra một con số bất kỳ và qua `observable` trả về thông qua hàm  `getLuckyNumber` . Để debug cho dễ hiểu, ta sẽ implement thêm hàm `thegetSubscribersCount`, trả về số lượng clients đang subscribed vào observable. Mở file src/app/lucky/lucky.service.ts:

```
import { Observable, Subject } from 'rxjs’;

export class LuckyService {
 private luckyGenerator$: Observable<number>;
 private subscribersCount = 0;

 public getLuckyNumber(): Observable<number> {
   this.subscribersCount++;

   if (!this.luckyGenerator$) {
     this.luckyGenerator$ = Observable.create((subject: Subject<number>) => {
       setInterval(() => {
         const number = Math.floor(Math.random() * 10);
         subject.next(number);
       }, 1000);
     });
   }
   return this.luckyGenerator$;
 }

 public getSubscribersCount(): number {
   return this.subscribersCount;
 }
}
```

Tiếp theo ta gọi hàm ở file src/app/lucky/lucky.component.ts:

```
import { Component, OnInit } from '@angular/core';
import { LuckyService } from './lucky.service';

@Component({
 template: `
   <p>You are checking if you are lucky {{displayCount}} time</p>
   <p>Your lucky number is: {{number}}</p>
 `,
})
export class LuckyComponent implements OnInit {
 public subscribersCount = 0;
 public number: number;

 constructor(private luckyService: LuckyService) {}

 public ngOnInit(): void {
   this.luckyService.getLuckyNumber().subscribe((luckyNumber: number) => {
     this.number = luckyNumber;
     console.log('Retrieved lucky number ${this.number} for subscriber ${this.subscribersCount}');
   });
   this.subscribersCount = this.luckyService.getSubscribersCount();
 }
}
```


Giờ ta tạo một component khác. Đây sẽ là phần tạo ra việc memory leak. Code ở file src/app/really/really.component.ts:

```
import { Component } from '@angular/core';

@Component({
 template: `<p>Am I really lucky? Let's check that in console...</p>`,
})
export class ReallyComponent {}
```

Update khai báo trong NgModule tại file the src/app/app.module.ts:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LuckyComponent } from './lucky/lucky.component';
import { LuckyService } from './lucky/lucky.service';
import { ReallyComponent } from './really/really.component';
import { RouterModule } from '@angular/router';

@NgModule({
 declarations: [
   AppComponent,
   LuckyComponent,
   ReallyComponent
 ],
 imports: [
   BrowserModule,
   RouterModule.forRoot([
     { path: '', redirectTo: 'lucky', pathMatch: 'full'},
     { path: 'lucky', component: LuckyComponent, pathMatch: 'full'},
     { path: 'really', component: ReallyComponent, pathMatch: 'full'},
   ])
 ],
 providers: [
   LuckyService
 ],
 bootstrap: [AppComponent]
})
export class AppModule { }
```

Bây giờ thay đổi source src/app/app.component.html theo route chúng ta cần:

```
<div class="navigation">
 <a routerLink="/lucky">Lucky component!</a>&nbsp;
 <a routerLink="/really">Am I really lucky?</a>
</div>
<router-outlet></router-outlet>
```

Để cho tiện, các bạn có thể get code ở git link sau:

```
git clone -b angular_memory_leak_step1 https://github.com/maciejtreder/angular-memory-leak.git memoryLeakApp
cd memoryLeakApp/
npm install
```

**Time for the Memory Leak**


Giờ chúng ta sẽ xem thử nó chạy ra sao:

`ng serve`

Mở trình duyệt và gõ vào: http://localhost:4200
![image.png](https://images.viblo.asia/eeeac9e9-c9e4-48cf-8322-ba5f6ad9d365.png)

Yes, vậy là app đang show ra việc tạo số ngẫu nhiên mỗi giây rồi. Bây giờ…chuyển đến component sau, và xem coi chuyện gì tiếp theo (path /really):

![image.png](https://images.viblo.asia/84b96f8e-166e-47a4-b465-400d2bcc6b1f.png)

Như bạn thấy ở console, subscription tạo ở LuckyComponent vẫn chạy và thực thi code. Chuyện gì sẽ xảy khi ta mở lại LuckyComponent? hoặc ta cố tình truy cập vào component thật nhiều lần?  Sẽ có một vấn đề nghiêm trọng: 
![image.png](https://images.viblo.asia/50d19e6d-bded-4c51-9440-bfd1525c3c2e.png)


**Unsubscribe Using ngOnDestroy**


Vậy phải làm thế nào?  `ngOnDestroy` sẽ là một biện pháp cho chúng ta. Hãy cùng hiện thực nó và unsubscribe bên trong observable. Update file src/app/lucky/lucky.component.ts:

```
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LuckyService } from './lucky.service';
import { Subscription } from 'rxjs’;
@Component({
 template: `
   <p>You are checking if you are lucky {{displayCount}} time</p>
   <p>Your lucky number is: {{number}}</p>
`,
})
export class LuckyComponent implements OnInit, OnDestroy {
 public subscribersCount: number = 0;
 public number: number;
 private luckySubscription$: Subscription;
 constructor(private luckyService: LuckyService) {}
 public ngOnInit(): void {
   this.luckySubscription$ = this.luckyService.getLuckyNumber().subscribe((luckyNumber: number) => {
     this.number = luckyNumber;
     console.log('Retrieved lucky number ${this.number}, for subscriber ${this.subscribersCount}');

   });
   this.subscribersCount = this.luckyService.getSubscribersCount();
 }

 public ngOnDestroy(): void {
   this.luckySubscription$.unsubscribe();
 }
}
```

OK, có vẻ ổn. Ở đây ta unsubscribe trong ngOnDestroy, hàm này sẽ được gọi khi component bị hủy, hành động xảy khi khi ta rời trang này. Hãy thử lại và xem memory leak đã được không còn:

`ng serve`

Sau khi rời khỏi component `LuckyComponent`,bạn có thể thấy code từ subscriptions không còn được thực thi. Observable đã được unsubscribed bên trong hàm `ngOnDestroy`. Quá tuyệt! Bây giờ chuyển sang thử truy cập nhiều lần giữa các component và xem kết quả chúng đã được unsubscribing sau mỗi lần.

![image.png](https://images.viblo.asia/9655a2d1-2a4a-4d25-a03e-3ad8800d0a5e.png)

Bạn có thể xem code tại git link:

```
git clone -b angular_memory_leak_step2 https://github.com/maciejtreder/angular-memory-leak.git memoryLeakApp
cd memoryLeakApp/
npm install
```

**TakeUntil Pattern**
Giải pháp trên dùng tốt cho một observable, nhưng nếu ta có nhiều observables thì sao, phải unsubscribe thủ công? Cần phải add nhiều Subscription variables, chỉ để unsubscribe trong ngOnDestroy? Lúc đó code sẽ ra như sau:

```
export class LuckyComponent implements OnInit, OnDestroy {
 public number1: number;
 public number2: number;

 private luckySubscription1: Subscription;
 private luckySubscription2: Subscription;
 private luckySubscription3: Subscription;
 private luckySubscription4: Subscription;
 private luckySubscription5: Subscription;
 private luckySubscription6: Subscription;

 constructor(private luckyService: LuckyService) {}

 public ngOnInit(): void {
   /*
      subscribing to multiple observables comes here
  */
 }

 public ngOnDestroy(): void {
   this.luckySubscription1.unsubscribe();
   this.luckySubscription2.unsubscribe();
   this.luckySubscription3.unsubscribe();
   this.luckySubscription4.unsubscribe();
   this.luckySubscription5.unsubscribe();
   this.luckySubscription6.unsubscribe();
 }
}
```

Dĩ nhiên là không làm như vậy. Ta có thể làm cách khác. Đến lúc cần dùng `takeUntil` . Đây là tài liệu về hàm `takeUntil`:
`Returns the values from the source observable sequence until the other observable sequence or Promise produces a value.`
Phần quan trọng là: **until the other observable … produces a value**.
OK, dvậy là ta cần  “other observable”. Copy đoạn code vào ` src/app/lucky/lucky.component.ts`:

```
import { LuckyService } from './lucky.service';
import { Subject } from 'rxjs;
import { takeUntil } from 'rxjs/operators';

@Component({
 template: `
  <p>You are checking if you are lucky {{displayCount1}} time</p>
  <p>Your lucky number is: {{number1}}</p>
  <p>Another lucky number is: {{number2}}</p>
 `
})
export class LuckyComponent implements OnInit, OnDestroy {
 public number1: number;
 public number2: number;

 private onDestroy$: Subject<void> = new Subject<void>();

 constructor(private luckyService: LuckyService) {}

 public ngOnInit(): void {
   const subscriberCount1 = this.luckyService.getSubscribersCount();
   this.luckyService.getLuckyNumber()
     .pipe(takeUntil(this.onDestroy$))
     .subscribe((luckyNumber: number) => {
       this.number1 = luckyNumber;
       console.log('Retrieved lucky number ${this.number1} for subscriber ${subscriberCount1}');
   });

   const subscriberCount2 = this.luckyService.getSubscribersCount();
   this.luckyService.getLuckyNumber()
     .pipe(takeUntil(this.onDestroy$))
     .subscribe((luckyNumber: number) => {
       this.number2 = luckyNumber;
       console.log('Retrieved lucky number ${this.number2} for subscriber ${subscriberCount2}');
   });
 }

 public ngOnDestroy(): void {
   this.onDestroy$.next();
 }
}
```

Chúng ta cần khai báo mới một observable:
`private onDestroy$: Subject<void> = new Subject<void>();`

Then, by using `pipe` method with `takeUntil` we inform compiler that we want to unsubscribe from the observable when any value appear in `onDestroy$`:

```
this.luckyService.getLuckyNumber()
   .pipe(takeUntil(this.onDestroy$))
   .subscribe((luckyNumber: number) => {
      this.number1 = luckyNumber;
      console.log('Retrieved lucky number ${this.number1}, for subscriber ${subscriberCount1}');
});
```

Cuối cùng, ta đưa giá trị `onDestroy$` bên trong `ngOnDestroy`:
```
public ngOnDestroy(): void {
   this.onDestroy$.next();
}
```
Hãy thử chạy lại service, chuyển qua lại nhiều lần giữa các component và xem kết quả!
Chính xác! Observables đã được unsubscribed, không còn memory leak, với chỉ vài dòng code.

**Tổng kết**


Qua bài đã thấy được việc memory leak trong Angular và 2 cách giải quyết vấn đề. (recommend  dùng takeUntil.)
Tôi hy vọng bạn có thể dùng chúng vào ứng dụng của bạn để tốt hơn.
Bạn có thể vào GitHub repository để xem Step 3 và dùng ng-toolkit để hiểu thêm về Angular và các tính năng SPA.
Tôi là Maciej Treder và bạn có thể liện hệ qua  contact@maciejtreder.com, https://www.maciejtreder.com và @maciejtreder (GitHub, Twitter, LinkedIn).
Nguồn: Twilio Blog.