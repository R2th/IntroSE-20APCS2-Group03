![Angular Trong 5 Phút: Dynamic Component Rendering](https://images.viblo.asia/e8eb1911-464a-455f-be1b-4a658e03f389.jpg)
Trong nhiều trường hợp, chúng ta không biết trước phải render component nào, mà sẽ được render lúc runtime.

Ví dụ như Dialog, Snackbar của Angular Material chẳng hạn. Là người viết lib, chúng ta chỉ tạo ra phần khung, còn người dùng lib sẽ tự định nghĩa component và trigger việc render khi nào họ muốn.

Trong bài này chúng ta sẽ tìm hiểu cách để Dynamic Component Rendering trong Angular như thế nào.

## 1. Create Angular Application

Để bắt đầu chúng ta sẽ tạo một project mới bằng Angular CLI, các bạn có thể để chọn default bằng cách nhấn enter vài lần.

```bash
$ ng new dynamic-component
```

Sau đó mở project bằng editor tùy thích, rồi khởi chạy project bằng câu lệnh `ng serve` và mở app ở <a href="http://localhost:4200" target="_blank">http://localhost:4200</a> để xem.

## 2. Create Angular Components

Chúng ta sẽ lần lượt tạo 2 component đặt tên lần lượt là alert-container và alert-content; để demo.

```bash
$ ng g c alert-container

$ ng g c alert-content
```

Thêm selector của alert-container vào `app.component.html` và xem kết quả.

## 3. Thiết lập phần container

```html
<ng-container #container></ng-container>
```

```ts
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-alert-container',
  templateUrl: './alert-container.component.html',
  styleUrls: ['./alert-container.component.scss']
})
export class AlertContainerComponent implements OnInit {

  @ViewChild('container', {
    read: ViewContainerRef,
    static: true
  }) container: ViewContainerRef;

  constructor() { }

  ngOnInit() {
  }

}

```

### 3.1 `ViewContainerRef` là gì?

Nó là một cái container từ đó có thể tạo ra Host View (component khi được khởi tạo sẽ tạo ra view tương ứng), và Embedded View  (được tạo từ TemplateRef). Với các view được tạo đó sẽ có nơi để gắn vào (container).

Container có thể chứa các container khác (`ng-container` chẳng hạn) tạo nên cấu trúc cây.
Hay hiểu đơn giản thì nó giống như 1 DOM Element, khi đó có thể add thêm các view khác (`Component`, `Template`) vào đó.

### 3.2 `static` property có ý nghĩa gì?

`static: true` resolve query results before change detection runs

```ts
export class AlertContainerComponent implements OnInit, AfterViewInit {

  @ViewChild('container', {
    read: ViewContainerRef,
    static: true
  }) container: ViewContainerRef;

  constructor() { }

  ngOnInit() {
    console.log(this.container);
  }

  ngAfterViewInit() {
    console.log(this.container);
  }

}
```

`static: false` resolve query results after change detection runs

```ts
export class AlertContainerComponent implements OnInit, AfterViewInit {

  @ViewChild('container', {
    read: ViewContainerRef,
    static: false
  }) container: ViewContainerRef;

  constructor() { }

  ngOnInit() {
    console.log(this.container);
  }

  ngAfterViewInit() {
    console.log(this.container);
  }

}
```

## 4. Tiến hành render component ở runtime

```ts
export class AlertContainerComponent implements OnInit, AfterViewInit {

  @ViewChild('container', {
    read: ViewContainerRef,
    static: true
  }) container: ViewContainerRef;

  componentRef: ComponentRef<AlertContentComponent>;

  ngAfterViewInit() {
    this.renderComponent();
  }

  renderComponent() {
    const container = this.container;
    container.clear();
    const injector = container.injector;

    const cfr: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);

    const componentFactory = cfr.resolveComponentFactory(AlertContentComponent);

    const componentRef = container.createComponent(componentFactory, 0, injector);
    this.componentRef = componentRef;
  }

}
```

Chúng ta cần một số bước như sau để dynamic render component:


**Bước 1:** Lấy ra `ComponentFactoryResolver` service để có thể tạo ra `ComponentFactory`.

```ts
const cfr: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);

const componentFactory = cfr.resolveComponentFactory(AlertContentComponent);
```

**Bước 2:** Từ `ComponentFactory` sẽ dùng `ViewContainerRef` để tạo ra component.

```ts
const componentRef = container.createComponent(componentFactory, 0, injector);
```

### Fix lỗi Error No component factory found for

> Error: No component factory found for AlertContentComponent. Did you add it to @NgModule.entryComponents?

Lỗi này do chúng ta sử dụng dynamic render, nên cần báo cho Angular biết chúng ta sẽ cần những component nào.
Chỉ cần add component vào array `entryComponents` khi khai báo `NgModule` là được.

```ts
@NgModule({
  /// ...other config
  entryComponents: [ AlertContentComponent ]
})
export class YourModule { }
```

## 5. Tương tác giữa 2 component

### 5.1 Gửi dữ liệu cho dynamic component:

```ts
export class AlertContentComponent implements OnInit {

  @Input()
  data: string;
}
```

```ts
const componentRef = container.createComponent(componentFactory, 0, injector);
componentRef.instance.data = 'Data from container';
```

### 5.2 Emit Event để close bằng service

Tạo service và sử dụng RxJS Subject để làm Event Bus, giúp dễ dàng gửi Event qua lại giữa các componnent.

```bash
$ ng g s alert
```

```ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _close$ = new Subject();

  public close$ = this._close$.asObservable();

  constructor() { }

  close(reason?: any) {
    this._close$.next(reason);
  }
}

```

Inject service vào các component, 1 bên emit event, 1 bên listen event đó.

```ts
export class AlertContainerComponent {

  // ... other setup

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.close$.subscribe(reason => {
      this.container.clear();

      if (this.componentRef) {
        this.componentRef.destroy();
      }
    });
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
```

```ts
export class AlertContentComponent {

  constructor(private alertService: AlertService) { }

  close() {
    this.alertService.close();
  }

}
```
### 5.3 Fix lỗi Error ExpressionChangedAfterItHasBeenCheckedError

> Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'XXX'. Current value: 'YYY'. It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?

Lỗi này do chúng ta tạo component dynamic (tạo sau khi OnInit, ở ngoài Angular lifecycle), nên phải thực hiện trigger change detection bằng tay như sau:

```ts
const componentRef = container.createComponent(componentFactory, 0, injector);
componentRef.instance.data = 'Data from container';
componentRef.changeDetectorRef.detectChanges();
```

Hoặc chúng ta sẽ render component ở trong OnInit (có thể áp dụng trong trường hợp này, vì ViewChild đã resolve trước khi chạy Change Detection).

```ts
export class AlertContainerComponent implements OnInit {

  @ViewChild('container', {
    read: ViewContainerRef,
    static: true
  }) container: ViewContainerRef;

  componentRef: ComponentRef<AlertContentComponent>;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.close$.subscribe(reason => {
      this.container.clear();

      if (this.componentRef) {
        this.componentRef.destroy();
      }
    });
    this.renderComponent();
  }
}
```

Một giải pháp khác ổn định hơn là chúng ta sẽ tạo một directive và inject `ViewContainerRef` thông qua Dependency Injection. Lúc này sẽ đảm bảo được chúng ta luôn có thể render component ở `OnInit`.

```ts
import { Directive, ViewContainerRef, OnInit, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { AlertService } from './alert.service';
import { AlertContentComponent } from './alert-content/alert-content.component';

@Directive({
  selector: '[appDynamicContainer]'
})
export class DynamicContainerDirective implements OnInit {
  componentRef: ComponentRef<AlertContentComponent>;

  constructor(
    private container: ViewContainerRef,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.close$.subscribe(reason => {
      this.container.clear();

      if (this.componentRef) {
        this.componentRef.destroy();
      }
    });
    this.renderComponent();
  }

  renderComponent() {
    const container = this.container;
    container.clear();
    const injector = container.injector;

    const cfr: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);

    const componentFactory = cfr.resolveComponentFactory(AlertContentComponent);

    const componentRef = container.createComponent(componentFactory, 0, injector);
    componentRef.instance.data = 'Data from appDynamicContainer directive';
    this.componentRef = componentRef;
  }

}
```


## 6. Video


{@embed: https://www.youtube.com/watch?v=Z5axQKnT0VU}


## 7. Link Tham Khảo

Bài viết gốc: 
<a href="https://www.tiepphan.com/angular-trong-5-phut-dynamic-component-rendering/" target="_blank">https://www.tiepphan.com/angular-trong-5-phut-dynamic-component-rendering/</a>

Code demo:
<a href="https://github.com/tieppt/dynamic-component-demo" target="_blank">https://github.com/tieppt/dynamic-component-demo</a>