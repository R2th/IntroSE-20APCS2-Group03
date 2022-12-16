![](https://images.viblo.asia/b5d35334-25e7-4972-8c14-2b8f4e72ec86.png)
Trong khi phát triển những ứng dụng Angular, viết unit test là việc không thể thiếu với mỗi developer. Vậy đã có khi nào bạn gặp khó khăn, hay chưa tìm được hướng giải quyết cho việc viết test với những asynchronous codes chưa? Nếu có gặp những tình huống như vậy, thì hãy lăn chuột để đọc tiếp bài viết của mình nhé :D. Đối với những bạn chưa có cơ hội viết test cho async codes thì cũng nên đọc nhé, kiểu gì sau này chả gặp :D 

### Một ví dụ về async codes
Ở đây, mình có tạo một service `AuthenticationService`, trong đó có một function `getUserInfo()` có nhiệm vụ trả về thông tin của user đang đăng nhập vào ứng dụng.  Trong ứng dụng thực tế, function này sẽ phải thực hiện request dữ liệu user info từ server, do đó nó sẽ là một đoạn async codes. Để đơn giản và dễ minh họa, ở đây, mình sẽ thay thế nó bằng cách trả về một `promise` và nó sẽ resolve một giá trị được lấy từ `localStorage` một thời gian sau đó.

```javascript
# authentication.service
export class AuthenticationService {
  getUserInfo(): Promise<any> {
    return Promise.resolve(JSON.parse(localStorage.getItem('user-info')));
  }
}
```

 Dưới đây mình tạo một component `WelcomeComponent`, nó có nhiệm vụ lấy user info từ `AuthenticationService` và hiển thị `Welcome, $userName` nếu như user đã được xác thực, và hiển thị `Please login` trong trường hợp ngược lại.
 
```javascript
# welcome.component.ts
@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome">
      <h2 *ngIf="!isLoggedIn">Please login</h2>
      <h2 *ngIf="isLoggedIn">Welcome, {{userName}}</h2>
    </div>
  `,
  providers: [AuthenticationService]
})
export class WelcomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getUserInfo().then(userInfo => {
      if (!!userInfo) {
        this.isLoggedIn = true;
        this.userName = userInfo['name'];
      }
    });
  }
}
```
Việc set giá trị của `$userName` được tiến hành bên trong `then` callback từ `promise` được trả về từ `AuthenticationService` mình đã nói ở phía trên.

Ở đây, mình đã thực hiện chúng ở trong `ngOnInit()` lifecycle hook. Có thể nó không phải là nơi tốt nhất để thực hiện chức năng này vì giá trị có thể thay đổi theo thời gian nhưng mà khá tốt cho mục đích minh họa.

### Vấn đề gặp phải khi test async codes trong Jasmine

** Trước khi đến với việc test, mình sẽ khởi tạo một số variable như sau:

```javascript
  const mockLoggedUser = { name: 'Vuong Hung ' };
  const notLoggedInText = 'Please login';
  const loggedInText = 'Welcome, Vuong Hung';
  
  let fixture = TestBed.createComponent(WelcomeComponent); (1)
  let component = fixture.componentInstance; (2)
  let authService = fixture.debugElement.injector.get(AuthenticationService); (3)
  let targetElement = fixture.debugElement.query(By.css('.welcome')); (4)
```
**(1)** Một `fixture` là một wrapper cho component và template của nó, ở đây chúng ta khởi tạo một instance của component fixture thông qua `TestBed`, nó sẽ inject `AuthenticationService` vào trong hàm khởi tạo của component.

**(2)** Chúng ta có thể tìm ra component thực tế bằng cách gọi `componentInstance` từ `fixture`.

**(3)** Ở đây, chúng ta có thể lấy injected service của `AuthenticationService`.

**(4)** Chúng ta lưu reference đến một DOM element có class `.welcome` vào trong biến `targetElement` để phục vụ cho việc expect kết quả test sau này.


Đầu tiên, hãy thử test `WelcomeComponent` mà tạm thời quên đi tính không đồng bộ trong đó xem sao nhé.

```javascript
it('No asynchronous handling', () => {
   expect(targetElement.nativeElement.textContent.trim()).toEqual(''); (1)
   fixture.detectChanges(); (2)
   expect(targetElement.nativeElement.textContent.trim()).toEqual(notLoggedInText); (3)

   spyOn(authService, 'getUserInfo').and.returnValue(Promise.resolve(mockLoggedUser)); (4)
   component.ngOnInit(); (5)
   fixture.detectChanges(); (6)
   expect(targetElement.nativeElement.textContent.trim()).toEqual(loggedInText); (7)
});

```
**(1)** Đầu tiên, chúng ta expect text bên trong `targetElement` là rỗng. Đó là bởi vì khi Angular load lần đầu tiên, không có change detection nào được gọi, do đó data chưa được binding, đó là lý do không có text nào bên trong đó cả.

**(2)** Chúng ta nói với `TestBed` thực hiện data binding bằng cách gọi change detection, do đó view sẽ được update.

**(3)** Sau khi data được binding, thẻ `<h2>` với text `Please login` xuất hiện. Nên ở đây chúng ta expect text bên trong `targetElement` sẽ là `Please login`.

**(4)** Ở đây chúng ta mock kết quả của function `getUserInfo` bên trong `authService` với một promise được resolve với một object `{name: 'Vuong Hung'}`.

**(5)** Hãy luôn nhớ rằng, trong môi trường test chúng ta phải gọi `ngOnInit()` lifecycle hook của component một cách thủ công, chứ Angular không tự động làm việc đó cho bạn đâu.

**(6)** Sau khi dữ liệu đã được lấy trong `ngOnInit()`, chúng ta gọi change detection lần thứ 2 để binding lại data trong view.

**(7)** Ở đây, chúng ta sẽ nghĩ rằng `isLoggedIn` được set thành `true` trong `ngOnInit()` rồi,  nên sẽ expect text bên trong `targetElement` sẽ là `Welcome, Vuong Hung`.

Ok, mọi thứ đã chuẩn bị xong, bây giờ chúng ta chạy test thử xem thế nào nhé `ng test`:
![](https://images.viblo.asia/8ad309db-3b52-4c55-b9f3-95baf8479731.png)


Ơ, đoạn test trên bị lỗi ở expectation cuối cùng (7). Rõ ràng `isLoggedIn` được set thành `true` và `userName` đã được trả về trong `ngOnInit()` rồi cơ mà nhỉ, thì đúng ra đoạn expectation đó phải đúng chứ?? 

Hãy chú ý kĩ hơn xem, vấn đề nằm ở đây là `authService.getUserInfo` function là một async code, vào thời điểm chúng ta chạy expectation cuối cùng, nó vẫn chưa kịp resolve giá trị. Do đó, mà thuộc tính `isLoggedIn` trong `WelcomeComponent` chưa được update, tức là nó vẫn đang có giá trị mặc định là `false`. Như vậy, đoạn text trong `targetElement` vẫn đang là `Please login`.

Đừng lo, tôi sẽ giới thiệu cho các bạn một vài cách để xử lý thằng async codes trong đoạn test trên ngay bây giờ.

### Async test với fakeAsync() và tick()
```javascript
it('Handling asynchronous with fakeAsync() and tick()', fakeAsync(() => { (1)
   fixture.detectChanges();
   expect(targetElement.nativeElement.textContent.trim()).toEqual(notLoggedInText);
   spyOn(authService, 'getUserInfo').and.returnValue(Promise.resolve(mockLoggedUser));
   component.ngOnInit();

   tick(); (2)
   fixture.detectChanges();
   expect(targetElement.nativeElement.textContent.trim()).toEqual(loggedInText);
}))
```
**(1)** Chúng ta wrap test spec trong một test zone có tên là [fakeAsync()](https://angular.io/api/core/testing/fakeAsync)

**(2)** Chúng ta gọi [tick()](https://angular.io/api/core/ApplicationRef#tick) để mô phỏng thời gian trôi cho đến khi tất cả các hoạt động bất đồng bộ đang chờ xử lý được hoàn tất.

Do vậy khi chúng ta gọi `tick()`, ứng dụng sẽ chờ đợi cho đến khi promise được trả về từ `authService.getUserInfo()` được resolved, sau đó mới thực thi tiếp những dòng tiếp theo.

`tick()` function là một trong những tiện ích của Angular testing. Nó là một cặp bài trùng luôn đi kèm với `fakeAsync` và bạn chỉ có thể gọi nó bên trong `fakeAsync` mà thôi.

Giờ chúng ta hãy thử chạy lại test xem sao nhá `ng test`:
![](https://images.viblo.asia/2d13953b-52f0-423b-9ca9-3ee4e26ca6e2.png)

Wow, vậy là chạy test xanh lè rồi :D 

### Async test với async() và whenStable()
`fakeAsync()` như đã nói ở trên được implement khá đơn giản và hiệu quả. Tuy nhiên nó có một vài hạn chế. Cụ thể, nó sẽ không hoạt động nếu như đoạn test bên trong nó tạo một `XHR` request.

Thông thường, `XHR` request trong test hiếm khi sử dụng, do vậy bạn vẫn có thể sử dụng `fakeAsync` bình thường. Nhưng nếu trong trường hợp bạn cần phải gọi `XHR` request, thì hãy lăn chuột tiếp đi, ngay sau đây mình sẽ giới thiệu cho bạn cách sử dụng một phương pháp thay thế đó là `async()`:

Cùng viết lại  đoạn test trên với `async`, sau đó mình sẽ giải thích sự khác biệt:

```javascript
it('Handling asynchronous with async() and whenStable()', async(() => { (1)
   fixture.detectChanges();
   expect(targetElement.nativeElement.textContent.trim()).toEqual(notLoggedInText);
   spyOn(authService, 'getUserInfo').and.returnValue(Promise.resolve(mockLoggedUser));
   component.ngOnInit();
    
   fixture.whenStable().then(() => { (2)
     fixture.detectChanges();
     expect(targetElement.nativeElement.textContent.trim()).toEqual(loggedInText);
   });
}));
```
**(1)** Chúng ta wrap test spec trong một test zone khác có tên [async()](https://angular.io/api/core/testing/async).

**(2)** `async()` function sẽ luôn theo dõi tất cả các promises bên trong nó. Và chỉ khi các pending promises đó được resolved hết, thì sau đó nó sẽ resolve promise trả về từ `whenStable()`.

Trong `then` callback của promise trả về từ `whenStable()` nói trên, chúng ta có thể yên tâm `authService.getUserInfo` đã thực hiện hoàn tất và trả về đúng kết quả như chúng ta đang kỳ vọng.

Cùng chạy lại test với cách `async()` này để xem kết quả thế nào nhá `ng test`:

![](https://images.viblo.asia/bd3a5b40-70c4-4e2f-af8d-9fc02c33aade.png)

Tiếp tục chạy test xanh lè :smile: 

### Jasmine done()
Một cách cuối cùng mình muốn giới thiệu đến các bạn là `done()` function, được tích hợp bên trong `Jasmine` framework.

Cách handle async codes với `done()` này, tuy có hơi rườm rà hơn so với `fakeAsync()` và `async()` đã được giới thiệu ở trên, nhưng đôi khi nó lại cần thiết. Ví dụ, bạn không thể gọi `fakeAsync` và `async` khi các đoạn test có liên quan đến `intervalTimer()` hay RxJS delay() operator.

```javascript
it('Handling asynchronous with jasmine.done', (done) => { (1)
   fixture.detectChanges();
   expect(targetElement.nativeElement.textContent.trim()).toEqual(notLoggedInText);
   let spy = spyOn(authService, 'getUserInfo').and.returnValue(Promise.resolve(mockLoggedUser));
   component.ngOnInit();
    
   spy.calls.mostRecent().returnValue.then(() => { (2)
     fixture.detectChanges();
     expect(getTargetText()).toEqual(loggedInText);
     done(); (3)
   })
});

```

**(1)** Jasmine test spec function passed một parameter được gọi là `done`.

**(2)** Chúng ta có thể thêm một callback function (sử dụng spy) được gọi khi promise được trả về từ `authService.getUserInfo()` được resolved. Trong function này, chúng ta có thể biết rằng là `isLoggedIn` và `userName` được set một giá trị mới, và có thể đặt một expectation tại đây.

**(3)** Khi chúng ta hoàn thành xong các asynchronous tasks, hãy nhớ nói với Jasmine điều đó thông qua `done()` function.

Bây giờ, hãy viết thử lại test sử dụng `done()` xem sao nhé `ng test`:

![](https://images.viblo.asia/f704d989-a628-40d1-b1e5-6f88b182061f.png)

Và xanh lè tiếp tục :D

### Kết luận
Trên đây mình đã giới thiệu cho các bạn 3 cách giải quyết mỗi khi phải viết test với các asynchronous codes trong Angular. Hãy sử dụng chúng một cách hợp lý trong mỗi trường hợp để đạt được hiệu quả cao nhất có thể nhé ^ _ ^.

**Full Source Codes:**

```javascript
# authentication.service.ts

import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  getUserInfo(): Promise<any> {
    return Promise.resolve(JSON.parse(localStorage.getItem('user-info')));
  }
}
```

```javascript
# welcome.component.ts

import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome">
      <h2 *ngIf="!isLoggedIn">Please login.</h2>
      <h2 *ngIf="isLoggedIn">Welcome, {{userName}}</h2>
    </div>
  `,
  providers: [AuthenticationService]
})
export class WelcomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getUserInfo().then(userInfo => {
      if (!!userInfo) {
        this.isLoggedIn = true;
        this.userName = userInfo['name'];
      }
    });
  }
}

```

```javascript
# welcome.component.spec.ts

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { WelcomeComponent } from './welcome.component';
import { AuthenticationService } from './authentication.service';

fdescribe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let authService: AuthenticationService;
  let targetElement: DebugElement;
  const mockLoggedUser = {name: 'Vuong Hung'};
  const notLoggedInText = "Please login.";
  const loggedInText = 'Welcome, Vuong Hung';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      providers: [AuthenticationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthenticationService);
    targetElement = fixture.debugElement.query(By.css('.welcome'));
  }));

  let getTargetText = () => {
    return targetElement.nativeElement.textContent.trim();
  }

  it('No asynchronous handling', () => {
    expect(getTargetText()).toEqual('');
    fixture.detectChanges();
    expect(getTargetText()).toEqual(notLoggedInText);

    spyOn(authService, 'getUserInfo').and.returnValue(Promise.resolve(mockLoggedUser));
    component.ngOnInit();
    fixture.detectChanges();
    expect(getTargetText()).toEqual(loggedInText);
  });

  it('Handling asynchronous with fakeAsync() and tick()', fakeAsync(() => {
    fixture.detectChanges();
    expect(getTargetText()).toEqual(notLoggedInText);
    spyOn(authService, 'getUserInfo').and.returnValue(Promise.resolve(mockLoggedUser));
    component.ngOnInit();

    tick();
    fixture.detectChanges();
    expect(getTargetText()).toEqual(loggedInText);
  }))

  it('Handling asynchronous with async() and whenStable()', async(() => {
    fixture.detectChanges();
    expect(getTargetText()).toEqual(notLoggedInText);
    spyOn(authService, 'getUserInfo').and.returnValue(Promise.resolve(mockLoggedUser));
    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(getTargetText()).toEqual(loggedInText);
    });
  }));

  it('Handling asynchronous with jasmine.done', (done) => {
    fixture.detectChanges();
    expect(getTargetText()).toEqual(notLoggedInText);
    let spy = spyOn(authService, 'getUserInfo').and.returnValue(Promise.resolve(mockLoggedUser));
    component.ngOnInit();

    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      expect(getTargetText()).toEqual(loggedInText);
      done();
    })
  });
});

```

### Tài liệu tham khảo
1. https://angular.io/guide/testing
2. https://codecraft.tv/courses/angular/unit-testing/asynchronous/