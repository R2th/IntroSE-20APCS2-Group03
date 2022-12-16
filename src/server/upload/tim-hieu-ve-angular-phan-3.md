Xin chào tất cả mọi người, ở bài viết [trước](https://viblo.asia/p/tim-hieu-ve-angular-phan-2-RnB5pMpbKPG) mình có giới thiệu qua về Two way binding và directives ở bài viết này mình xin giới thiệu về cách truyền dữ liệu giữa các component trong angular. Để truyền tải dữ liệu giữa các component người ta sẽ dùng `@input` và` @output` để truyền dữ liệu
### 1) Component Interaction :` @Input`

Để truyền dữ liệu từ component cha sang component con trong angular ta sẽ dùng `@Input`

- Cần import input từ `@angular/core`
- Truyền dữ liệu từ component cha (wrapper) và component con
- Cú pháp  : [] - cặp ngoặc vuông - để khai báo giá trị nhận vào

Để có thể hiểu rõ hơn thì mời các bạn xem qua ví dụ sau

**Ví dụ 1**
Đầu tiên ta tạo ra 1 component có tên là **child** (component này là component con), để tạo ra component **child** ta  chạy lệnh sau `ng g c child` và ta sử dụng luôn component **app** làm component cha

**File app.component.js**

```js
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public gender : boolean = true;
    public age : number = 18;
}

```
Ở file này ta định nghĩa một số biến **gender**, **age** để truyền qua cho **child** component

**File app.component.html**

```html
<div class="container" [style.margin.px]="30">
    <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
 <!-- truyền các biến được định nghĩa ở component cha qua cho component con -->
            <app-child
                [gender]="gender"
                [age]="age"
                [name]="'Ahihi'"
            ></app-child>
        </div>
    </div>
</div>
```

File này ta nhận các biến được định nghĩa ở bên file **app.component.ts** sau đó ta truyền qua cho **child** component, ngoài ra thì mình có truyền thêm một biến **name** cho conponent con và mình định nghĩa giá trị của nó luôn tại file này.

Giờ ta sẽ chuyển qua file **child.component.ts** để xem cách nhận giá trị mà từ component cha truyền vào.

Ngoài cú pháp truyền bằng cặp ngoặc vuông ở trên thì bạn có thể truyền bằng một cách khác đó là kết hợp với **interpolation** như sau

```html
<div class="container" [style.margin.px]="30">
    <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
 <!-- truyền các biến được định nghĩa ở component cha qua cho component con -->
            <app-child
                gender="{{gender}}"
                age="{{age}}"
                [name]="'Ahihi'"
            ></app-child>
        </div>
    </div>
</div>
```

**File child.component.ts**

```js
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
    // Nhận các giá trị từ component cha thông qua từ khóa `@Input('key')
    @Input('gender') gender : boolean = false;
    @Input('age') age : number;
    @Input('name') name : string;

    constructor() { }

    ngOnInit(): void {
    }
}

```

Để nhận được giá trị từ component cha truyền vào thì ta cần import từ khóa **Input** từ **`@angular/core`**

Ngoài ta còn 1 cách khác nữa đó là sử dụng **setter** và **getter** để nhận dữ liệu

```js
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

    @Input('gender') gender : boolean = false;
    @Input('age') age : number;
    private _name : string;

    constructor() { }

    ngOnInit(): void {
    }

    @Input()
    set name(name: string) {
    	this._name = name;
    }

    get name() {
    	return this._name;
    }
}

```

Sau khi nhận được các giá trị từ component cha rồi thì ta sẽ qua file **child.component.html** để hiển thị dữ liệu nhận được

**File child.component.html**

```html
<div class="panel panel-success">
    <div class="panel-heading">
        <h3 class="panel-title">Child Component</h3>
    </div>
    <div class="panel-body">
        <h3>Ho ten : {{ name }}</h3>
        <h3>Gioi tinh : {{ gender ? 'Nam' : 'Nu' }}</h3>
        <h3>Tuoi : {{ age }}</h3>
    </div>
</div>
```

Để hiển thị dữ liệu thì ta dùng **interpolation** ở bài [ trước](https://viblo.asia/p/tim-hieu-ve-angular-djeZ1e0gZWz) để hiển thị ra 

### 2) Component Interaction :` @Output`

Để truyền dữ liệu từ component con sang component cha trong angular ta sẽ dùng `@Output` và `EventEmitter`

- Cần import Output, EventEmitter từ `@angular/core`
- Truyền tải dữ liệu từ component con ra ngoài component cha
- Cú pháp : () - Cặp ngoặc tròn - để khai báo giá trị trả ra ngoài
- Để trả giá trị ra ngoài : (tên biến output).emit(giá trị cần truyền)

Để có thể hiểu rõ hơn thì mời các bạn xem qua ví dụ sau

**Ví dụ**

Mô tả qua chút về ví dụ thì là mình sẽ tạo ra 1 form ở component con sau đó mình sẽ submit dữ liệu khi submit dữ liệu thì mình sẽ gửi dữ liệu đó ra ngoài component cha để hiển thị.

**File child.component.html**

```html
<div class="panel panel-success">
    <div class="panel-heading">
        <h3 class="panel-title">Child Component</h3>
    </div>
    <div class="panel-body">
        <form>
            <legend>Form</legend>

            <div class="form-group">
                <label for="">Full name</label>
                <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="txtFullName"
                    [ngModelOptions]="{standalone: true}"
                >
            </div>
        
            <button
                type="submit"
                class="btn btn-primary"
                (click)="onSend()"
            >
                Send
            </button>
        </form>
    </div>
</div>
```
Ở file trên mình có sử dụng ` [(ngModel)]="txtFullName"` là `Two - way binding` để có thể truyền dữ liệu qua lại giữa component và view nếu bạn nào chưa rõ có thể xem lại [tại đây](https://viblo.asia/p/tim-hieu-ve-angular-phan-2-RnB5pMpbKPG)

Để sử dụng được `Two - way binding` thì các bạn nhớ là import `FormsModule` tại `app.module.ts`

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ChildComponent } from './components/child/child.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Sau đó mình có khai báo một sự kiện khi người dùng click button submit đó là `onSend`

Tiếp theo mình sẽ qua file **child.component.ts** để xử lý dữ liệu sau đó sẽ truyền sang component cha

**File child.component.ts**

```js
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
    public txtFullName : string;
    
    // sử dụng @Output('key này sẽ là key mà component cha nhập được
    @Output('txtFullName') onHandleFullName = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
    }

    onSend() {
        this.onHandleFullName.emit(this.txtFullName);
    }
}
```

- Đầu tiên ta sẽ import `Output, EventEmitter` từ `@angular/core`
- Khi người dùng nhập dữ liệu ở trong form xong thì hàm `onSend()` sẽ được gọi, khi được gọi thì hàm `onSend()` sẽ gọi đến `this.onHandleFullName` được định nghĩa ở trên, tiếp theo là ta gọi đến hàm `emit(giá trị được mà component cha nhận được)` để truyền dữ liệu từ component con ra ngoài => `this.onHandleFullName.emit(this.txtFullName);`
- Khi truyền dữ liệu ra ngoài được rồi thì làm thể nào để component cha nhận được thì ta sẽ dựa vào key ở trong `@Output('txtFullName')` ta đã định nghĩa ở trên, giờ ta sẽ chuyển qua file **app.component.html**

**File app.component.html**

Component cha muốn lại dữ liệu mà component con truyền ra thì ta sẽ dụng cú pháp như đã nói ở trên đó là 

> (key được truyền ra)="funtion_name($event)"

```html
<div class="container" [style.margin.px]="30">
    <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <app-child
                (txtFullName)="onGetFullName($event)"
            ></app-child>
        </div>
    </div>
</div>
```

Sau khi đã xác định hàm nhận dữ liệu `onGetFullName($event)` thì ta sẽ qua file **app.component.ts** để viết code xử lý

**File app.component.ts**

```js
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public fullName : string;

    onGetFullName(value : string) {
        this.fullName = value;
    }
}

```

Ở file này ta sẽ khai báo hàm `onGetFullName()` tương ứng với bên file **app.component.html** để mình nhận dữ liệu từ conponent truyền ra, dữ liệu từ component con truyền ra chính là giá trị của `value` được khai báo ở trên, sau đó, mình ` this.fullName = value` để mình hiển thị lại dữ liệu nhận được ra ngoài view

```
<div class="container" [style.margin.px]="30">
    <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <!-- Dữ liệu sau khi được xử lý ở bên component được đẩy ra ngoài view -->
            Du lieu duoc gui tu Child component : {{ fullName }}
            <app-child
                (txtFullName)="onGetFullName($event)"
            ></app-child>
        </div>
    </div>
</div>
```

**Kết bài**
Trên đây là một chút kiến thức mà mình tìm hiểu được về cách truyền dư liệu từ component cha sang component con và nguo trong Angular Cảm ơn mọi người đã theo dõi bài viết của mình.

**Nguồn tham khảo**

- https://angular.io/