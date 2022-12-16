Xin chào tất cả mọi người, ở bài viết [trước](https://viblo.asia/p/tim-hieu-ve-angular-djeZ1e0gZWz) mình có giới thiệu qua một số thành phần cơ bản trong Angular và cách truyền dữ liệu từ component -> view và từ view -> component ở bài viết này mình xin giới thiệu về Two way binding và directives trong angular

## 1) Two - way binding là gì
- Tow - way binding giúp chúng ta đồng dữ liệu từ  view ->component->view (Đồng bộ hóa dữ liệu giữa component và view)
- Để có thể sử dụng được two way binding ta cần import : FormsModule từ "@angular/forms" ở trong file "app.module.ts"
- Cú pháp sử dụng là : [(ngModel)]="name"

Ví dụ

- Đầu tiên ta sẽ import FormsModule để có thể sử dụng được two way binding

**File app.module.ts**

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //

import { AppComponent } from './app.component';
import { TwoWayBindingComponent } from './two-way-binding/two-way-binding.component';

@NgModule({
  declarations: [
    AppComponent,
    TwoWayBindingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

**File two-way-binding.component.ts**
```js
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-two-way-binding',
    templateUrl: './two-way-binding.component.html',
    styleUrls: ['./two-way-binding.component.css']
})
export class TwoWayBindingComponent implements OnInit {
    public name : string = ''; // Khai báo 1 biến name để sử dụng two way binding

    constructor() { }

    ngOnInit(): void {
    }

}
```

**File two-way-binding.component.html**
- [(ngModel)]="name" - cú pháp để sử dụng two way binding
```js
<div class="form-group">
    <label>Họ Tên : {{ name }}</label>
    <input type="text" class="form-control" [(ngModel)]="name">
</div>

```

**File app.component.html**
- Ở file này ta sẽ gọi compnent "app-two-way-binding" để sử dụng

```js
<app-two-way-binding></app-two-way-binding>
```

## 2) Build-in directives là gì

- Build-in directives : là một thành phần mở rộng HTML, hay nói một các khác là các thuộc tính (properties) của các thẻ HTML mà Angular nó định nghĩa thêm, vì nó là của riêng Angular nên phải tuân thủ theo nguyên tắc.
- Trong Angular có một số directives cơ bản sau
    - Structural directives
    - Attribute directives

### 2.1) Structural directives
- Trong Structural directives có ba loại ta cần quan tâm đó là: 
   - ngIf,
   - ngFor,
   - ngSwitchCase


***2.1.1) ngIf***

- ngIf giống như việc mình sử dụng **if** trong các ngôn ngữ lập trình
- Để sử dụng ngIf ta dùng cú pháp sau: 

> *ngIf="điều kiện"

- Mở rộng :
> *ngIf="điều kiện; then template_nếu đúng else template_nếu_sai"

- Để hiểu rõ hơn thì chúng ta đi vào ví dụ sau
Ví dụ 1: sử dụng ***ngIf="điều kiện"**

**File structural.component.ts**

```js
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-structural',
    templateUrl: './structural.component.html',
    styleUrls: ['./structural.component.css']
})
export class StructuralComponent implements OnInit {
    public isShow : boolean = true;
    public userName : string = 'Ahihi';
  
    constructor() { }

    ngOnInit(): void {
    }
}

```
- ở file này mình có khai báo 2 biến là isShow để xác định điều kiện hiển thị và biến userName để hiển thị tên lên màn hình

**File structural.component.html**

```html
<h1 *ngIf="isShow">Ho Ten : {{userName}}</h1>
```

- ở file này mình xác định xem trạng thái của biến isShow để hiển thị ra userName

Ví dụ 2: sử dụng cú pháp ***ngIf="điều kiện; then template_nếu đúng else template_nếu_sai"**

**File structural.component.ts**

```js
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-structural',
    templateUrl: './structural.component.html',
    styleUrls: ['./structural.component.css']
})
export class StructuralComponent implements OnInit {
    public age : number;
    
    constructor() { }

    ngOnInit(): void {
    }
}

```

- Ở file này mình có khai báo 1 biến age để xác định xem tuổi nếu lớn hơn 18 tuổi thì sẽ hiển thị ra là "Tuổi trưởng thành" ngược lại thì sẽ hiển thị ra là "Chưa đủ tuổi trưởng thành"

**File structural.component.html**

```html
<div class="form-group">
    <label for="">Tuoi: </label>
    <input type="text" class="form-control" [(ngModel)]="age">
</div>

<ng-container *ngIf="age > 18; else elseNotEnough">
    <h3>Tuổi trưởng thành</h3>  <!-- nếu age > 18 thỏa mãn thì được hiển thị-->
</ng-container>

<ng-template #elseNotEnough>
    <h3>Chưa đủ tuổi trưởng thành</h3> <!-- nếu age < 18 thì được hiển thị -->
</ng-template>
```

- Ở file này mình có dùng two way binding biến tuổi để mỗi khi người dùng nhập dữ liệu vào ô input thì nó cũng được truyền sang view luôn để dử dụng
- Sau đó ở bên view mình có kiểm tra biến age để xác định xem thành phần được hiển thị 
- Trong file trên mình có sử dụng <ng-container></ng-container>, <ng-template></ng-template>
   - <ng-template></ng-template> cũng là một Structural directives và nó thường được sử dụng trong cấu trúc điều khiển if/else và switch case
   - <ng-container></ng-container>  là một thùng chứa logic có thể được sử dụng để nhóm các nút nhưng không được hiển thị trong cây DOM dưới dạng nút
   - Chi tiết về hai <ng-template></ng-template>, <ng-container></ng-container> mọi người có thể tham khảo ở bài [này](https://viblo.asia/p/nhung-dieu-can-biet-ve-ng-template-ng-content-ng-containter-va-ngtemplateoutlet-trong-angular-naQZRJ9dZvx)

***2.1.1) ngFor***

- Giống như việc lặp dữ liệu trong các ngôn ngữ lập trình thì trong Angular ta dùng cú pháp sau: 

```js
*ngFor="
    let item of arrays;
    let i = index
    let f = first
    let l = last
    let e = even
    let o = odd;
    trackBy: myTrackByFuntion
```

- Các biến cục bộ của ngFor
   - index: chỉ số hiện tại
   - first: trả về true nếu là phần tử đầu tiên
   - last: trả về true nếu là phần tử cuối
   - even: trả về true nếu là phần tử chẵn
   - odd: trả về true nếu là phần tử lẻ
   - trackBy: Dữ liệu đầu vào (index, item) => return về thuộc tính duy nhất (Ví  dụ: ID, mã ...)

- Ví dụ :

**File structural.component.ts**

```js
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-structural',
    templateUrl: './structural.component.html',
    styleUrls: ['./structural.component.css']
})
export class StructuralComponent implements OnInit {
    public products : any[] = [
        {
            id: 1,
            name: 'IP 11',
            price: 15000000
        },
        {
            id: 2,
            name: 'IP 12',
            price: 20000000
        },
        {
            id: 3,
            name: 'IP 13',
            price: 30000000
        },
        {
            id: 4,
            name: 'IP 14',
            price: 40000000
        },
        {
            id: 5,
            name: 'IP 14',
            price: 50000000
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }
}

```

- Ở file này mình khai báo 1 biến products chưa danh sách các sản phẩm

**File structural.component.html**

```html
<table class="table table-hover">
    <thead>
        <tr>
            <th>ID</th>
            <th>Ten</th>
            <th>Gia</th>
        </tr>
    </thead>
    <tbody>
        <tr
            *ngFor="
                let item of products;
                let f = first
            "
            [style.background-color]="f ? 'gray' : ''" <!-- kiểm tra xem nếu là phần tử đầu tiên thì background-color : gray  -->
        >
            <td >{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }} VND</td>
        </tr>
    </tbody>
</table>
```

- Ở file này thì mình dùng **ngFor** để hiển thị dữ liệu và có dùng thêm **let f = first** và sau đó kiểm tra xem phần tử nào là phần tử đầu tiên thì sẽ cho **background-color : gray**

***2.1.3) ngSwitchCase***

- Nếu khi bạn code mà phải ngIf nhiều thì có thể dùng ngSwitchCase
- Các biến cần quan tâm: [ngSwitch], *ngSwitchCase, *ngSwitchDefault
   -   [ngSwitch] lấy biến nào đem đi để so sánh
   -   *ngSwitchCase: Giá trị mà mình cần so sánh 
   -   *ngSwitchDefault: trường hợp mặc định

- Ví Dụ

**File structural.component.ts**

```js
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-structural',
    templateUrl: './structural.component.html',
    styleUrls: ['./structural.component.css']
})
export class StructuralComponent implements OnInit {
    public users : any[] = [ // Khai báo 1 biến chứa danh sách các user
        {
            id: 1,
            name: 'AAAAAAAAAA'
        },
        {
            id: 2,
            name: 'BBBBBBBBB'
        },
        {
            id: 3,
            name: 'CCCCCCCCCCCC'
        },
        {
            id: 4,
            name: 'DDDDDDDDDDDD'
        },
        {
            id: 5,
            name: 'EEEEEEEEEEEE'
        }
    ]

    constructor() { }

    ngOnInit(): void {
    }
}

```

**File structural.component.html**

```html
<h3>ngIf</h3>

<ul class="list-group">
    <li class="list-group-item" *ngFor="let user of users">
        <span class="text-danger" *ngIf="user.id === 1">{{user.name}}</span>
        <span class="text-success" *ngIf="user.id === 3">{{user.name}}</span>
        <span class="text-primary" *ngIf="user.id !== 3 && user.id !== 1">{{user.name}}</span>
    </li>
</ul>

<h3>ngSwitchCase</h3>

<ul class="list-group">
    <li
        class="list-group-item"
        *ngFor="let user of users"
        [ngSwitch]="user.id"
    >
        <span class="text-danger" *ngSwitchCase="1">{{user.name}}</span>
        <span class="text-success" *ngSwitchCase="3">{{user.name}}</span>
        <span class="text-primary" *ngSwitchDefault>{{user.name}}</span>
    </li>
</ul>
```

- Ở trên mình có viết theo 2 kiểu đó là sử dụng **ngIf** và **ngSwitchCase** và đều kiểm tra nếu **user.id === 1** thì sẽ hiển thị **text-danger** , nếu **user.id === 3** thì sẽ hiển thị **text-success** còn lại sẽ hiển thị là **text-primary**

### 2.2) Attribute Directive

-Trong  Attribute Directive có hai  directive cơ bản đó là : ngClass, ngStyle

***2.2.1) ngClass***
- Dùng để thêm hoặc xóa nhiều CSS Class cùng 1 lúc 
- Viết trực tiếp trong "Template" hoặc "Class Typescript"
- Cú pháp :

> [ngClass]="[]"
> 'key':"{'classA': condition}"=>nếu value trả về true => class sẽ được thêm vào, ngược lại class sẽ bị xóa đi

Ví Dụ 

- Đầu tiền ta cần tạo mới 1 compoent attribute thông qua lệnh sau

> ng g c attribute

**FIle attribute.component.css**
- ta định nghĩa sẵn một số css cho một số class

```css
.pd-10 {
	padding: 10px;
}

.cl-yellow {
	color: red;
}

.border-blue {
	border: solid 2px blue;
}

.border-black {
	border: solid 2px black;
}
```

**FIle attribute.component.html**

- Để sử dụng ngClass ta viết như sau

```html
<!-- Sử dụng ngClass -->
<h3
    [ngClass]="['pd-10', 'cl-yellow', 'border-blue']"
>
    attribute works!
</h3>

<!-- Kiểm tra xem có nên áp dụng class border-blue này không thông qua biến isSpecial -->
<h3
    [ngClass]="{'border-blue': isSpecial}" 
>
    attribute works!
</h3>

<!-- Giả sử có nhiều class cần check thì ta có thể đẩy phần đó qua bên file attribute.component.ts để check -->
<h3
    [ngClass]="setClasses()"
>
    attribute works!
</h3>
```

**File attribute.component.ts**

```js
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-attribute',
    templateUrl: './attribute.component.html',
    styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {
    public isSpecial : boolean = true;

    constructor() { }

    ngOnInit(): void {
    }

    setClasses(): any {
        return {
            'border-blue': this.isSpecial,
            'cl-yellow': this.isSpecial,
            'pd-10': this.isSpecial,
            'border-black': this.isSpecial
        };
    }
}

```

**File app.component.html**
- Để có thể hiển thị được các phần trên ra ngoài view thì ta cần gọi <app-attribute></app-attribute> ở file này

```html
<app-attribute></app-attribute>
```

***2.2.2) ngStyle***
- Dùng để thêm hoặc xóa nhiều CSS Style cùng 1 lúc => ngStyle
- Viết trực tiếp trong "Template" hoặc "Class Typescript"
- Cú pháp : 

> [ngStyle]={'key': 'value'}

Ví dụ

**File attribute.component.html**

```html
<!-- Style được định nghĩ ngay trong template -->
<h3
    [ngStyle]="{
        'border' : isSpecial ? 'solid 2px black' : '',
        'padding.px' : '10',
        'color' : 'red'
    }"
>
    attribute works!
</h3>

<!-- Nếu việc sử lý và định nghĩ trực tiếp ở ngay trong template quá dài và không tiện thì mình có thwr chuyển phần sử lý này qua file attribute.component.ts --> 
<h3
    [ngStyle]="setStyle()"
>
    attribute works!
</h3>
```

**File attribute.component.ts**

```js
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-attribute',
    templateUrl: './attribute.component.html',
    styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {
    public isSpecial : boolean = true;

    constructor() { }

    ngOnInit(): void {
    }

    setStyle(): any {
        return {
            'border' : 'solid 2px black',
            'padding.px' : '10',
            'color' : 'red'
        };
    }
}

```

## Kết bài
- Trên đây là một chút kiến thức mà mình tìm hiểu được về **two way binding** và **directives**  trong Angular, rất mong được sự góp ý của mọi người. Cảm ơn mọi người đã theo dõi bài viết của mình.

## Nguồn tham khảo
- https://angular.io/