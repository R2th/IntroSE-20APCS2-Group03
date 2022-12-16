### Mở đầu
Khi làm quen với Angular thì có lẽ khái niệm đầu tiên mà mọi người được học đó chính là Component. Một ứng dụng được viết bằng Angular được tập hợp bởi các Component, chúng ta tạo ra từng Component và sắp xếp chúng lại để tạo ra ứng dụng. vậy thì Component là gì!? Trong bài viết ngày hôm nay chúng ta sẽ cùng nhau tìm hiểu về những khái niệm cơ bản của Component nhé!

### Khởi tạo Component

Khi khởi tạo 1 ứng dụng Angular thì **Angular CLI** sẽ giúp chúng ta khởi tạo ra 1 Component có tên là **App Component** trong thư mục src/app:
```js
import { Component } from '@angular/core';

@Component({
    // Khai báo selector cho component, có thể gọi đến selector này giống như thẻ html (<app-root></app-root>)
    selector: 'app-root',
    // Khai báo file html mà component "đại diện" (hay còn gọi là view/template của Component)
    templateUrl: './app.component.html',
    // Khai báo file style mà component này sẽ sử dụng
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
}
```
 
**AppComponent** là thành phần cha của ứng dụng. Tất cả các thành phần mới tạo ra sau này đều là thành phần con của **AppComponent**.

Để tạo component mới, ta sử dụng lệnh **Angular CLI**:

`ng generate component <component-name>` 

hoặc bằng cách ngắn hơn  

`ng g c <component-name>`

Ví dụ, để tạo component có tên là **login**, ta chạy lệnh: `ng g c login`

Chú ý bạn có thể thêm:
+ Option **-t** nếu không muốn tạo ra file html. Sử dụng template ngay trong component
+ Option **--inline-style** nếu không muốn tạo ra file style. Sử dụng style ngay trong component

Ngoài ra bạn cũng có thể tạo mới 1 Component bằng cách tạo tay hoặc là copy 1 Component có sẵn rồi... edit lại là được :)) Nhưng mọi người nhớ chú ý là tên Component không được đặt trùng nhau nhé, nếu không muốn **Angular CLI** generate ra 2 selector giống hệt nhau.


### Vòng đời của Component
Vòng đời của một component Angular hỗ trợ các Interface để tạo nên sự tuần tự trong quá trình hoạt động. Một vòng đời của Component sẽ có thứ tự như sau: OnChanges, OnInit, DoCheck AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy.

![](https://images.viblo.asia/3e8bca05-06d1-4999-98a6-628bd57a7c21.png)

Để hiểu rõ hơn vòng đời của Component và thời điểm method được kích hoạt thì mọi người có thể vào trang chủ của [Angular](https://angular.io/guide/lifecycle-hooks#lifecycle-event-sequence), ở đây thì họ có nói khá rõ về nhiệm vụ và chức năng của từng method

#### Cách thêm lifecycle vào trong Component:
Nếu muốn sử dụng method nào thì ta chỉ cần Implements nó vào trong Class là được, ví dụ:

```js
 // implement OnInit's `ngOnInit` method
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() { console.log("OnInit"); }
}
```

### Hiển thị dữ liệu trên View
Để hiển thị dữ liệu ra màn hình thì trong file template (tức là file html khai báo trong Component) ta sẽ sử dụng cú pháp `{{ }}` hay còn gọi là phương thức nội suy **Interpolation**.  

Ví dụ trong Component ta có property user là 1 object như sau:

```js
export class Component {
  user = {
      id: 'id_1',
      name: 'Viblo',
      age: 22,
      class: '10A4',
  };
}
 ```
 thì để hiển thị trên View, trong file html ta sẽ có thể viết như sau:
```js
<div class="user-info">
  <p>id: {{user.id}}</p>
  <p>name: {{user.name}}</p>
  <p>age: {{user.age}}</p>
  <p>classes: {{user.class}}</p>
</div>
```

### Truyền dữ liệu giữa các Component
Angular cung cấp cho chúng ta 2 decorator để truyền dữ liệu giữa các Component là @**Input** và @**Output**.

Decorator là một cú pháp khai báo đặc biệt, không bao giờ đứng độc lập mà luôn được gắn kèm với một khai báo class, method, property hoặc accessor. Mọi người có thể thấy trong mỗi Component thì thằng @**Component** cũng là 1 decorator.

Vậy nhiệm vụ của @**Input** và @**Output** là gì:
- @**Input**:  Nhận giá trị truyền vào component. Ví dụ:

```js
// file template của component A
// app-menu là component B và lúc này ta sẽ truyền property `menus` của component A tới component B 
// với giá trị là `menu`
 <app-menu [menu]="menus"></app-menu>
```
```js
// file component của component B
// Do trong template component A có truyền vào component B 1 property là `menu`,
// cho nên ta cần phải khai báo decorator @Input ở phía trước `menu`
export Class MenuComonent implements OnInit {
   @Input() menu: Array<any>;
}
```
![](https://images.viblo.asia/b820da47-949e-40a7-9de1-005ad95a37c3.png)

Flow của @**Input**:

![](https://images.viblo.asia/ad97c271-cef4-461c-a358-f447656475db.png)

- @**Output**: Bắt sự kiện cho eventEmitter được truyền vào component. Tức là mỗi khi có sự kiện xảy ra ở trên View như là onClick, onChange, onMouseMove...thì thằng Output sẽ bắn ngược lại event cho thằng component cha. Ví dụ:

```js
// file template của component A
// app-menu là component B và lúc này ta sẽ truyền function `handleOnClick` được định nghĩa
// trong component A tới component B với giá trị là `click`
 <app-menu (click)="onClick($event)"></app-menu>
```
```js
// file Component của component B
// Do trong template component A có truyền vào component B 1 event là `click`,
// cho nên ta cần phải khai báo decorator @Output ở phía trước `click`
export Class MenuComonent implements OnInit {
   @Output() click = new EventEmitter();
}
```
![](https://images.viblo.asia/8d0f9cef-82a7-4678-96cb-f2e4ac449422.png)

Flow của @**Output**:

![](https://images.viblo.asia/035a677e-f578-45c9-b563-db24d4ab0711.png)

Mọi người lưu ý, khi muốn truyền tới component con với data là property thì ta sử dụng dấu ngoặc vuông ```[]```, còn nếu data là 1 event thì sẽ là dấu ngoặc tròn ```()```.

Ngoài ra còn 1 kiểu truyền dữ liệu giữa các Component ngang hàng không phải là cha - con thì ta sẽ sử dụng **Shared Service**. Tuy nhiên thì trong phạm vi bài viết mình sẽ không đi sâu vào cách này mà mình sẽ giới thiệu về nó trong những bài viết sắp tới. Thực ra thì về bản chất service cũng chỉ là nơi ta tập trung và quản lý các data, nó cũng gần tương đương với Redux trong React vậy nên chắc có lẽ cũng không có gì khó khăn đâu :D

### Kết
Trên đây là một số kiến thức cơ bản trong Component mà mình nghĩ là cần thiết để bắt đầu làm quen với angular. Ngoài những kiến thức trên thì trong Component còn 1 số vấn đề khác cũng khá là quan trọng mà mình nghĩ các bạn nên tìm hiểu như là: FromGroup, Two-way binding, các method xử lý logic (getter, setter...), các decorator khác @**Host**, @**ViewChild**, @**ViewChildren**...