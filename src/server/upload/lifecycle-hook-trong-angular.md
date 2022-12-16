Xin chào tất cả mọi người, nếu các bạn đã từng làm việc với React hay Vue thì nó đều có lifecycle hook thì Angular cung không ngoại lệ, bài viết này minh xin giới thiệu về lifecycle hook trong Angular, rất mong được mọi người theo dõi

### 1) Lifecycle Hook trong angular

- Là các phương thức của **Directive** và **Component** như việc tạo ra, thay đổi, hủy.
- Mỗi hook sẽ thuộc về một interface. Ví dụ : ngOnInit thuộc OnInit

![](https://images.viblo.asia/f8a55637-10cc-4154-b27d-33946848dc81.jpg)

 **1.1) Contructor** : 
 - Được gọi trước tất cả lifecycle hook, thường dùng để tìm các Dependency Injection như các **Service**.
 - Chú ý constructor không phải là một hook method

**1.2) ngOnInit** : 

- Khởi tạo directive/component sau khi hiển thị lần đầu tiên và set các thuộc đầu vào của directive/component
- Chỉ được gọi một lần duy nhất, sau khi hook ngOnChanges() được gọi lần đâu tiên

- Dùng để khởi tạo các giá trị

**Ví dụ :**
- Mình sẽ tạo ra một project mới và đồng thời sẽ tạo ra một component có tên là `LifecycleHookComponent`

**File lifecycle-hook.component.ts**

```js
import { Component, OnInit } from '@angular/core'; // import OnInit từ angular/core

@Component({
    selector: 'app-lifecycle-hook',
    templateUrl: './lifecycle-hook.component.html',
    styleUrls: ['./lifecycle-hook.component.css']
})
export class LifecycleHookComponent implements OnInit { // implements OnInit

    constructor() { }

    ngOnInit(): void { // gọi đến hook ngOInit
        console.log('ngOnInit : LifecycleHookComponent');
    }
}

```

Ở file này mình có import và có gọi đến hook `ngOnInit()` và ở trong thì mình có `cosole.log` ra để xem

**File app.component.html**

Tiếp theo là mình sẽ gọi component này ở file app ra để chạy

```html
<div class="container" [style.margin-top.px]="50">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ title }}</h3>
                </div>
                <div class="panel-body">
                    <ng-container *ngIf="isShowing">
                        <app-lifecycle-hook></app-lifecycle-hook>
                    </ng-container>
                </div>
            </div>
        </div>
    </div>
</div>
```

Sau khi chạy chương trình lên thì mình sẽ được kết quả

![](https://images.viblo.asia/3ad9a36b-0cbc-436f-a2ee-86f7a2321724.PNG)


**1.2) ngOnDestroy** : 

- Được gọi khi component bị hủy, dùng để hủy các kết nối, giải phóng bộ nhớ
- Ví dụ : component kết nối Api, database, route -> nên hủy để giải phóng bộ nhớ

**Ví dụ**


****File lifecycle-hook.component.ts****

Ở file này mình sẽ gọi đến hook `ngOnDestroy` và mình có log ra để xem kết quả

```js
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-lifecycle-hook',
    templateUrl: './lifecycle-hook.component.html',
    styleUrls: ['./lifecycle-hook.component.css']
})
export class LifecycleHookComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit(): void {
        console.log('ngOnInit : LifecycleHookComponent');
    }


    ngOnDestroy() {
        console.log('ngOnDestroy : LifecycleHookComponent');
    }
}

```

**File app.component.html**

```html
<div class="container" [style.margin-top.px]="50">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ title }}</h3>
                </div>
                <div class="panel-body">
                    <ng-container *ngIf="isShowing">
                        <app-lifecycle-hook></app-lifecycle-hook>
                    </ng-container>
                    <button type="button" class="btn btn-primary" (click)="onToggle()">Toggle</button>
                </div>
            </div>
        </div>
    </div>
</div>
```

**File app.component.ts**

```js
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title : string = 'Lifecycle Hook';

    public isShowing : boolean = true;

    onToggle() : void {
    	this.isShowing = !this.isShowing;
    }
}

```

Ở ví dụ trên mình sẽ thêm 1 button để khi click vào button này thì sẽ đóng mở component `lifecycle-hook` và sau mỗi lần đóng mở thì mình được kết quả

![](https://images.viblo.asia/3ede6cf7-ac3b-4708-b597-0fc01cd89970.PNG)

**1.3) ngOnChanges** :
- Phương thức ngOnChanges được gọi khi component phát hiện có giá trị được binding vào component bằng phương pháp Input properties.
- Được quản lý thông qua đối tượng **SimpleChanges**, được gọi trước cả **ngOnInit**

    - Cho ta một đối tượng kiểu **SimpleChanges**
    - **SimpleChanges** : thuộc về `@angular/core`
    - Dùng để xử lý khi `@Input` có sự thay đổi

        - currentValue : Giá trị hiện tại
        - previousValue : giá trị trước đó
        - firstChange() : thay đổi lần đầu tiên ? true : false

**Ví dụ**

Để check `ngOnChanges` thì ở ví dụ này mình có tạo ra 2 ô input và 1 button để mình sẽ tính tổng của hai ô input trên sau đó mình sẽ truyền dữ liệu qua cho component `lifecycle-hook`

**File app.component.html**

```html
<div class="container" [style.margin-top.px]="50">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ title }}</h3>
                </div>
                <div class="panel-body">
                    <ng-container *ngIf="isShowing">
                        <!-- sau khi nhận được kết quả từ total thì mình sẽ truyền nó sang app-lifecycle-hook -->
                        <app-lifecycle-hook [total]="total"></app-lifecycle-hook>
                    </ng-container>
                    Số thứ nhất : <input type="number" class="form-control" [(ngModel)]="num1">
                    Số thứ hai : <input type="number" class="form-control" [(ngModel)]="num2">
                    <button type="button" class="btn btn-primary" (click)="totalNumber()">Tính tổng</button>
                </div>
            </div>
        </div>
    </div>
</div>

```

**File app.component.ts**

```js
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title : string = 'Lifecycle Hook';

    public isShowing : boolean = true;

    public num1 : number;
    public num2 : number;
    public total : number = 0;

    totalNumber() {
        this.total = this.num1 + this.num2;
    }
}

```

**File lifecycle-hook.component.ts**

```js
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-lifecycle-hook',
    templateUrl: './lifecycle-hook.component.html',
    styleUrls: ['./lifecycle-hook.component.css']
})
export class LifecycleHookComponent implements OnChanges {
    @Input('total') total : number;

    constructor() { }

    ngOnChanges(simpleChange : SimpleChanges) {
        console.log('ngOnChanges : LifecycleHookComponent');
        console.log(simpleChange);
    }
}

```

Kết quả nhận được

![](https://images.viblo.asia/8bb4168f-6ccd-4188-acba-6835c8201856.PNG)

Mỗi lần nhận được giá trị từ component cha truyền sang thì hàm `ngOnChanges` sẽ được gọi và mình có log thêm tham số của hàm `ngOnChanges`

**1.4) ngDoCheck** :
- ngDoCheck kích hoạt với mọi chu kỳ phát hiện thay đổi. Angular chạy phát hiện thay đổi thường xuyên. Thực hiện bất kỳ hành động nào sẽ làm cho nó quay vòng. ngDoCheck kích hoạt với các chu kỳ này. Khi sử dụng nó chúng ta nên thận trọng vì nó có thể tạo ra các vấn đề về hiệu suất khi được triển khai không chính xác.
- ngDoCheck cho phép ta kiểm tra dữ liệu theo cách thủ công
- Được gọi sau ngOnChanges và ngOnInit, cứ mỗi lần gọi ngOnChange => sẽ được gọi

**1.5) ngAfterContentInit**

- ngAfterContentInit kích hoạt sau khi khởi tạo DOM nội dung của thành phần (tải lần đầu tiên). Chờ đợi trên các truy vấn @ContentChild là trường hợp sử dụng chính của hook.
- @ContentChild truy vấn các tham chiếu phần tử mang lại cho DOM nội dung. Do đó, chúng sẽ không có sẵn cho đến sau khi DOM nội dung tải. Do đó, tại sao ngAfterContentInit và đối tác của nó ngAfterContentChecked được sử dụng.
- Sử dụng **ng-content** để kiểm tra - Sử dụng **ContentChild** (Kiểu ElementRef)
- Chỉ được dọi 1 lần duy nhất

**1.6) ngAfterContentChecked**
- ngAfterContentChecked kích hoạt sau mỗi chu kỳ phát hiện thay đổi nhắm mục tiêu DOM nội dung. Điều này cho phép các nhà phát triển hỗ trợ cách DOM nội dung phản ứng với việc phát hiện thay đổi.
- ngAfterContentChecked có thể kích hoạt thường xuyên và gây ra các vấn đề về hiệu suất nếu được triển khai kém.
- ngAfterContentChecked cũng kích hoạt trong giai đoạn khởi tạo của một thành phần. Nó xuất hiện ngay sau ngAfterContentInit.
- Được gọi nhiều lần
- Chỉ dành cho component

**1.7) ngAfterView** :
- Được gọi sau khi Angular khởi tạo view của component và các child views
- Chế độ xem luôn tải ngay sau nội dung. ngAfterViewInit đợi các truy vấn @ViewChild (ren) để giải quyết. Các phần tử này được truy vấn từ trong cùng một khung nhìn của thành phần.
- Chính là thành view hiện tại
- Xử lý Template + Template Reference Variables
- Sử dụng ViewChild
- Chú ý khi dùng template ref (#tên biến) cũng sử dụng ViewChild
- Ví dụ : `<my-content #abc />`

**1.8) ngAfterViewChecked**

- ngAfterViewChecked kích hoạt sau bất kỳ chu kỳ phát hiện thay đổi nào nhắm mục tiêu chế độ xem của thành phần
- ngAfterViewChecked cho phép các nhà phát triển tạo điều kiện thuận lợi cho việc phát hiện thay đổi ảnh hưởng đến DOM xem như thế nào.

**Kết luận**

Phía trên là một số kiến thức mình tìm hiểu được liên lifecycle hook trong angular, Cám ơn mọi người đã theo dõi.

**nguồn tham khảo**

- https://angular.io/guide/lifecycle-hooks
- https://levunguyen.com/
- https://tienanhvn.blogspot.com/