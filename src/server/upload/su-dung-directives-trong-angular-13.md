Directives là các lớp định nghĩa hành vi đến các thành phần trong các ứng dụng angular. Sử dụng built-in directives để quản lý forms, danh sách, styles và những gì người dùng nhìn thấy.
### Built-in structural directives
Structural directives chịu trách nhiệm về bố cục HTML. Chúng định hình hoặc định hình lại cấu trúc của DOM, thường bằng cách thêm, xóa và thao tác các phần tử chính mà chúng được gắn vào.<br>
DOM Javascript là viết tắt của chữ Document Object Model, dịch tạm ra là mô hình các đối tượng trong tài liệu HTML. Thông qua mô hình DOM ta có thể truy xuất đến các thẻ HTML một cách dễ dàng.<br>
### Sử dụng NgIf
Chúng ta có thể thêm hoặc xóa một phần tử bằng cách áp dụng directive **NgIf** cho một thành phần chính.<br>
Khi **NgIf** là false, Angular sẽ xóa một thành phần và thành phần con của nó khỏi DOM. Angular sau đó loại bỏ các thành phần của chúng, giúp giải phóng bộ nhớ và tài nguyên.<br>
Để thêm hoặc bớt một phần tử, hãy gắn *ngIf với một biểu thức điều kiện chẳng hạn như isActive, ví dụ:<br>
Tạo một ItemDetailComponent  với command sau:<br>
```
ng g c ItemDetail
```

Tiếp theo cập nhật code component template tương ứng:<br>
**src/app/item-detail.component.html**<br>
```
<p>item-detail works!</p>
```

**src/app/app.component.html**<br>
Thêm selector app-item-detail của ItemDetailComponent  vào file app.component.html<br>
```
<app-item-detail *ngIf="isActive" [item]="item"></app-item-detail>
```

**src/app/app.component.ts**<br>
Cập nhật code như sau:<br>
```Javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isActive: boolean = true;
}
```
Chạy ứng dụng và xem kết quả:<br>
```
item-detail works!
```
Khi biểu thức isActive trả về giá trị true, **NgIf** sẽ thêm ItemDetailComponent vào DOM.<br>
Khi biểu thức isActive là false, **NgIf** sẽ xóa ItemDetailComponent khỏi DOM và loại bỏ component cũng như tất cả các thành phần con của nó.<br><br>
**Guarding against null**<br>
Theo mặc định, NgIf ngăn hiển thị một phần tử được liên kết với giá trị null.<br>

Hãy cập nhật code như bên dưới:<br>
**src/app/app.component.ts**<br>
```Javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentCustomer = {'name': 'yamada'};
  nullCustomer = null;
}

```
**src/app/app.component.html**<br>
```
<div *ngIf="currentCustomer">Hello, {{currentCustomer.name}}</div>
```
Trong ví dụ trên, currentCustomer được hiển thị, bởi vì có một giá trị currentCustomer.<br>
Output:<br>
```
Hello, yamada
```

Tuy nhiên, nếu thuộc tính là null, Angular sẽ không hiển thị , ví dụ sau, Angular sẽ không hiển thị nullCustomer  bởi vì nó là null:<br>
**src/app/app.component.html**:<br>
```
<div *ngIf="nullCustomer">Hello, <span>{{nullCustomer}}</span></div>
```

### Sử dụng NgFor
Sử dụng NgFor để hiển thị danh sách các mục. Hãy xem Ví dụ sau:<br>
Hãy thêm code vào các file tương ứng trong app.component như bên dưới:<br>
**src/app/app.component.ts**<br>
```Javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = ['Angular', 'Javascript', 'PHP', 'Laravel'];
}

```
**src/app/app.component.html**:<br>
```Javascript
<div *ngFor="let item of items">{{item}}</div>
```
Output:<br>
```
Angular
Javascript
PHP
Laravel
```

**Repeating a component view**<br>
Để lặp lại một thành phần component, chúng ta sẽ sử dụng ***ngFor**  đến selector. Ví dụ bên dưới chúng ta sử dụng với selector <app-item-detail>.<br>
**src/app/app.component.html**:<br>
```Javascript
<div *ngFor="let item of items">{{item}}</div>
<app-item-detail *ngFor="let item of items"></app-item-detail>
```
Output:<br>
```Javascript
Angular
Javascript
PHP
Laravel
item-detail works!

item-detail works!

item-detail works!

item-detail works!
```
**Getting the index of** *ngFor<br>
Trong *ngFor, thêm dấu chấm phẩy và  let i = index . Ví dụ sau lấy index trong một biến có tên là i và hiển thị nó với mỗi item tương ứng trong .<br>
**src/app/app.component.html**<br>
```Javascript
<div *ngFor="let item of items; let i=index">{{i + 1}} - {{item}}</div>
```
Output:<br>
```
1 - Angular
2 - Javascript
3 - PHP
4 - Laravel
```
### Sử dụng NgSwitch
Giống như câu lệnh **switch** trong JavaScript, NgSwitch hiển thị một phần tử trong số một số phần tử có thể có, dựa trên điều kiện chuyển đổi. Angular chỉ đặt phần tử đã chọn vào DOM.<br>
NgSwitch là một bộ ba chỉ thị:NgSwitch, NgSwitchCase, NgSwitchDefault. Hãy xem ví dụ sau:<br>
**src/app/app.component.ts**<br>
```Javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    source: string = 'language';

    changeSource(newSource: string): void {
        this.source = newSource;
    }
}

```
**src/app/app.component.html**<br>
```Javascript
<div class="container">
    <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" (change)="changeSource('Angular')">
        <label class="form-check-label" for="flexRadioDefault1">Angular</label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" (change)="changeSource('Javascript')">
        <label class="form-check-label" for="flexRadioDefault2">Javascript</label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" (change)="changeSource('PHP')">
        <label class="form-check-label" for="flexRadioDefault3">PHP</label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" (change)="changeSource('Laravel')">
        <label class="form-check-label" for="flexRadioDefault4">Laravel</label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" checked (change)="changeSource('language')">
        <label class="form-check-label" for="flexRadioDefault5">other language</label>
    </div>

<div [ngSwitch]="source">
    <div *ngSwitchCase="'Angular'">Learn Angular</div>
    <div *ngSwitchCase="'Javascript'">Learn Javascript</div>
    <div *ngSwitchCase="'PHP'">Learn PHP</div>
    <div *ngSwitchCase="'Laravel'">Learn Laravel</div>
  <!-- . . . -->
    <div  *ngSwitchDefault>Learn other language</div>
  </div>
</div>
```
**Output**:<br>
Khi bạn thay đổi giá trị radio button, thì nội dung hiển thị cũng thay đổi tương ứng:<br>
![](https://images.viblo.asia/b20f780b-cf7e-47f7-a6b5-c962e93a612c.png)

### Built-in attribute directives
Attribute directives lắng nghe và sửa đổi hành vi của các thành phần HTML, attributes, properties và components. Các chỉ thị thuộc tính phổ biến nhất như sau:<br>

| COMMON DIRECTIVES | 	DETAILS | 
| -------- | -------- |
 | NgClass | 	Adds and removes a set of CSS classes. | 
 | NgStyle | 	Adds and removes a set of HTML styles. | 
 | NgModel | 	Adds two-way data binding to an HTML form element. | 

### Sử dụng NgClass
Trên phần tử bạn muốn style, hãy thêm [ngClass] và đặt nó bằng một biểu thức. Trong trường hợp này, **isSpecial** là một boolean được đặt thành true trong app.component.ts.<br>
Vì **isSpecial** là **true** nên **ngClass** sẽ thêm class **special** vào trong thẻ \<div>.<br>
**src/app/app.component.html**<br>
```
<!-- toggle the "special" class on/off with a property -->
<div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>
```
**Sử dụng NgClass với một method**<br>
Các bạn hãy theo dõi ví dụ bên dưới để hiểu hơn nhé:<br>
**src/app/app.component.ts**<br>
```Javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    canSave: boolean = true;
    isUnchanged: boolean = true;
    isSpecial: boolean = true;
    
    currentClasses: Record<string, boolean> = {};

    ngOnInit() {
        this.setCurrentClasses();
    }

    setCurrentClasses() {
        // CSS classes: added/removed per current state of component properties
        this.currentClasses =  {
          saveable: this.canSave,
          modified: !this.isUnchanged,
          special:  this.isSpecial
        };
      }
}
```
**src/app/app.component.html**<br>
```Javascript
<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special.</div>
```
**Output**:<br>
![](https://images.viblo.asia/5b11d5d8-d4e7-4cd7-8f9e-9f472725f767.png)

### Sử dụng  NgStyle
Các bạn hãy theo dõi ví dụ bên dưới để hiểu hơn nhé:<br>
**src/app/app.component.ts**<br>
```Javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    canSave: boolean = true;
    isUnchanged: boolean = true;
    isSpecial: boolean = true;
    
    currentStyles: Record<string, string> = {};

    ngOnInit() {
        this.setCurrentStyles();
    }

    setCurrentStyles() {
        // CSS styles: set per current state of component properties
        this.currentStyles = {
            'font-style':  this.canSave      ? 'italic' : 'normal',
            'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
            'font-size':   this.isSpecial    ? '24px'   : '12px'
        };
      }
}
```
**src/app/app.component.html**<br>
```Javascript
<div [ngStyle]="currentStyles">
    This div is initially italic, normal weight, and extra large (24px).
  </div>
```
**Output**:<br>
![](https://images.viblo.asia/ef1ecbd4-ce8e-4979-aee9-2281cd242a58.png)

### Sử dụng ngModel
Sử dụng NgModel directive để hiển thị thuộc tính dữ liệu và cập nhật thuộc tính đó khi người dùng thực hiện thay đổi.<br>
Các bạn hãy theo dõi ví dụ bên dưới để hiểu hơn nhé:<br>
Để sử dụng NgModel, bạn phải import FormsModule và thêm nó vào danh sách imports của NgModule.<br>
**src/app/app.module.ts (FormsModule import)**<br>
```Javascript
import { FormsModule } from '@angular/forms'; // <--- JavaScript import from Angular
/* . . . */
@NgModule({
  /* . . . */

  imports: [
    BrowserModule,
    FormsModule // <--- import into the NgModule
  ],
  /* . . . */
})
export class AppModule { }
```
**src/app/app.component.ts**<br>
```Javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentItem = {'name': 'yamaguchi'}

    setUppercaseName(name: string) {
        this.currentItem.name = name.toUpperCase();
    }
}
```
**src/app/app.component.html**<br>
```Javascript
<div class="container">
    <fieldset><h4>NgModel examples</h4>
        <p>Current item name: {{currentItem.name}}</p>

        <p>
          <label for="example-ngModel">[(ngModel)]:</label>
          <input [(ngModel)]="currentItem.name" id="example-ngModel">
        </p>
      
        <p>
          <label for="example-change">(ngModelChange)="...name=$event":</label>
          <input [ngModel]="currentItem.name" (ngModelChange)="currentItem.name=$event" id="example-change">
        </p>
      
        <p>
          <label for="example-uppercase">(ngModelChange)="setUppercaseName($event)"
            <input [ngModel]="currentItem.name" (ngModelChange)="setUppercaseName($event)" id="example-uppercase">
          </label>
        </p>
      </fieldset>
</div>
```
**Output**:<br>
![](https://images.viblo.asia/f66513be-f377-41d3-92c9-b11e861d0488.png)