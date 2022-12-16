Trong angular, chúng ta sử dụng khai báo @Input() và @Output() để chia sẻ dữ liệu giữa một thành phần cha và một hoặc nhiều thành phần con với nhau.<br>
Khai báo **@Input()** cho phép thành phần cha cập nhật hoặc truyền dữ liệu sang thành phần con. Ngược lại, **@Output()** cho phép thành phần con gửi dữ liệu đến một thành phần cha.<br>
### Sending data to a child component
Khi sử dụng @input() chúng ta có thể truyền dữ liệu từ thành phần cha sang thành phần con một cách dễ dàng, ví dụ như ảnh minh họa:<br><br>
![](https://images.viblo.asia/ed9314e3-1045-40c6-9e73-f14584e7c373.png)

**Configuring the child component**<br>
Để sử dung @input() trong lớp thành phần con , trước tiên chúng ta phải import **input** và khai báo **@input()** trong lớp thành phần con như bên dưới:<br>
**src/app/item-detail/item-detail.component.ts**<br>
```Javascript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})

export class ItemDetailComponent {

    @Input() item = ''; // decorate the property with @Input()

}
```
Đoạn code trên khai báo **@Input()** với thuộc tính **item**, cái thuộc tính có kiểu dữ liệu là string hoặc có thể là bất kỳ kiểu dữ liệu khác như: number, string, boolean, object.<br>
Giá trị của thuộc tính **item** được truyền đến từ component cha nhé.<br>
**src/app/item-detail/item-detail.component.html**<br>
```Javascript
<p>
  Today's item: {{item}}
</p>
```
**Configuring the parent component**<br>
Bây giờ chúng ta muốn truyền dữ liệu từ lớp thành phần cha sang lớp thành phần con, bạn hãy thêm selector **<app-item-detail>** của lớp thành phần con vào file app.component.html như dưới.<br>
Sử dụng ràng buộc thuộc tính để ràng buộc thuộc tính **item** trong lớp thành phần con với thuộc tính **currentItem** của lớp thành phần cha.<br>
**src/app/app.component.html**<br>
```Javascript
<app-item-detail [item]="currentItem"></app-item-detail>
```
Trong lớp thành phần cha, chúng ta gán một giá trị cho thuộc tính **currentItem**.<br>
**src/app/app.component.ts**<br>
```Javascript
export class AppComponent {
  currentItem = 'Television';
}
```
**Output**:<br>
```
Today's item: Television
```
Với @Input (), Angular truyền giá trị cho thuộc tính **currentItem** đến lớp thành phần con là **item** để hiển thị ra chuỗi **Television**.<br>
Sơ đồ liên kết dữ liệu giữa lớp thành phần cha và con:<br>
![](https://images.viblo.asia/c1f06878-b437-4ab0-aaca-9dbd2de2fd6e.png)

### Sending data to a parent component
Khi dử dụng @Output(), bạn có thể truyền dữ liệu từ lớp thành phần con đến lớp thành phần cha:<br>
![](https://images.viblo.asia/c16ff494-937e-4741-830a-9c6556b71ee3.png)<br>
Các bạn hãy xem ví dụ bên dưới để hiểu hơn về cách sử dụng @output() nhé :<br>
**Configuring the child component**<br>
1. Import **Output** và **EventEmitter** vào  lớp thành phần con:<br>

```
import { Output, EventEmitter } from '@angular/core';
```
    
2. Trong lớp con, khai báo @Output(). Ví dụ sau newItemEvent @Output () có một loại là EventEmitter, có nghĩa là nó là một sự kiện.<br>
**src/app/item-output/item-output.component.ts**<br>
```
@Output() newItemEvent = new EventEmitter<string>();
```
Các phần khác nhau của khai báo được miêu tả như sau:<br>

| DECLARATION PARTS | DETAILS | 
| -------- | -------- | 
| @Output()     | Một hàm decorator đánh dấu thuộc tính như một cách để dữ liệu đi từ con đến cha.     |
| newItemEvent     | Tên của @Output ().     |
| EventEmitter<string>     | Kiểu của @Output ().     |
| new EventEmitter<string>()     | Yêu cầu Angular tạo một trình phát sự kiện mới và dữ liệu mà nó phát ra thuộc loại chuỗi.     |
 
<br>
3. Tạo một phương thức **addNewItem()** trong lớp thành phần con:<br>
    
**src/app/item-output/item-output.component.ts**
```Javascript
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-item-output',
    templateUrl: './item-output.component.html',
    styleUrls: ['./item-output.component.css']
})
export class ItemOutputComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    @Output() newItemEvent = new EventEmitter<string>();

    addNewItem(value: string) {
        this.newItemEvent.emit(value);
    }
}

```
**src/app/item-output/item-output.component.html**<br>
```Javascript
<label for="item-input">Add an item:</label>
<input type="text" id="item-input" #newItem>
<button type="button" (click)="addNewItem(newItem.value)">Add to parent's list</button>
```
**Configuring the parent component**<br>
AppComponent trong ví dụ này có danh sách các **items** trong một mảng và một phương thức để thêm các mục khác vào mảng.<br>
```Javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
    
export class AppComponent {
    items = ['item1', 'item2', 'item3', 'item4'];

    addItem(newItem: string) {
        this.items.push(newItem);
    }
}
```
Phương thức addItem () nhận một đối số dưới dạng một chuỗi và sau đó thêm chuỗi đó vào mảng **items**.<br><br>
**Configuring the parent's template**<br>
1. Đầu tiên, trong template của thành phần cha, hãy liên kết phương thức của thành phần cha với sự kiện của thành phần con.
2. Thêm selector của thành phần con là **<app-item-output>** vào bên trong template của thành phần cha.

**src/app/app.component.html**<br>
```Javascript
<div class="container">
    <app-item-output (newItemEvent)="addItem($event)"></app-item-output>
    <ul>
        <li *ngFor="let item of items">{{item}}</li>
    </ul>
</div>
```
Sự kiện  (newItemEvent)="addItem($event)" kết nối đến sự kiện trong thành phần con newItemEvent, đến phương thức trong thành phần cha là **addItem()** <br><br>
**Output**:<br>
![](https://images.viblo.asia/2142ca2b-e388-487d-a16d-6fbdeecf7b00.png)

### Using @Input() and @Output() together
Sử dụng @Input () và @Output () trên cùng một thành phần con như sau:<br>
**src/app/app.component.html**<br>
```Javascript
<app-input-output
  [item]="currentItem"
  (deleteRequest)="crossOffItem($event)">
</app-input-output>
```
Sơ đồ sau cho thấy các phần khác nhau của @Input () và @Output () trên thành phần con <app-input-output>.<br>
![](https://images.viblo.asia/ebc20d13-f1f7-4331-8367-86cd1da4c8aa.png)<br>
    
Selector <app-input-output> với **item** và **deleteRequest** là thuộc tính @Input () và @Output () trong lớp thành phần con.<br>
Thuộc tính currentItem và phương thức crossOffItem () đều thuộc lớp thành phần cha.<br>