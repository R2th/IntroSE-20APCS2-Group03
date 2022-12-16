### Mở đầu
Đối với 1 ứng dụng web thì Form có lẽ là 1 thành phần không thể thiếu, bởi nó giúp chúng ta có thể thu thập được dữ liệu từ người dùng. Trong Angular việc thao tác với From cũng là 1 phần khá là thú vị nhưng cũng không kém phần phức tạp, chính vì vậy trong bài viết ngày hôm nay chúng ta sẽ tiếp tục cùng nhau tìm hiểu về Form trong Angular nhé!!!

### Các loại form trong Angular

Có 2 loại Form trong Angular là **Template-driven form** và **Model Driven form**
- **Template-driven form** là phương pháp mà chúng ta sẽ tạo forms dựa vào template (giống như trong Angularjs). Chúng ta thực hiện việc thêm các directives và hành vi vào template, sau đó Angular sẽ tự động tạo forms để quản lý và sử dụng.
- **Model Driven Form** hay còn gọi là **Reactive Form**, phương pháp này tránh việc sử dụng các directive ví dụ như ngModel, required, etc, thay vào đó tạo các Object Model ở trong các Component, rồi tạo ra form từ chúng.

Vậy cách sử dụng hay ưu nhược điểm của mỗi form như nào thì sau đây chúng ta sẽ đi vào chi tiết của từng loại Form, tuy nhiên trong phạm vi của bài viết ngày hôm nay mình sẽ chỉ giới thiệu được **Template-driven form**, còn **Model Driven forms** sẽ để trong các bài viết sắp tới nhé.

### Template-driven forms

Như đã định nghĩa ở trên thì **Template-Driven Form** tạo form dựa vào template, trong trường hợp này thì Form Model (hiểu nôm na là tên gọi chung của Form trong Angular) có thể nói là toàn bộ HTML Form template (tức là toàn bộ source code trong thẻ <form>)
    
Các directives mà Angular cung cấp có thể kể đến như: ngForm, ngModel, ngModelGroup... 
    
Cấu trúc cơ bản của 1 **Template-Driven Form**:
<br/>
 ![](https://images.viblo.asia/cbeb4573-be28-45b0-afc1-4e737136769a.png)

### Luồng hoạt động

1. User thay đổi dữ liệu trong các ô input như là input, checkbox, text area...
2. Input Element sẽ gửi đi input event chứa value từ user vừa nhập vào
3. Control_Value_Accessor sẽ trigger phương thức setValue( ) trên FormControl instance.
4. FormControl instance sẽ emit giá trị mới qua valueChanges observable
5. Bất cứ subcriber đến valueChanges observable đểu nhận được giá trị mới nhất của control đó.
6. Control_Value_Accessor cũng gọi phương thức NgModel.viewToModelUpdate( ) để emit ngModelChange event.
7. Ttrong trường hợp chúng ta sử dụng cơ chế two-way binding thì lúc này property trong component sẽ được update value bởi ngModelChange event).
8.  Khi property trong Component thay đôỉ thì cơ chế phát hiện thay đổi bắt đầu chạy và control_Value_Accessor sẽ update Input Element trong view với giá trị mới nhất của property trong component.

Dưới đây là flow tổng quát của **Template-Driven Form:**
    
![](https://images.viblo.asia/a3cd9b5a-1eb5-4214-be1a-a4fa1a85018e.png)


### Luồng hoạt động

### Ví dụ
    
Để có thể sử dụng các APIs mà Angular cung cấp cho việc thao tác với Template-driven forms, chúng ta cần import NgModule là FormsModule từ package @angular/forms như sau:
    
```js
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [...],
  imports: [
    ...,
    FormsModule
  ],
  providers: [...],
  bootstrap: [...]
})
export class AppModule { }
```
    
Đầu tiên chúng ta cần truy cập vào form instance bằng cách sử dụng **ngForm** như sau:
```js
<form
  autocomplete="off"
  #bookForm="ngForm"
>
</form>
```
Ở trong đoạn code phía trên, chúng ta đã tạo một template variable là **bookForm**, nó sẽ là một instance của directive **ngForm**, như thế chúng ta có thể sử dụng các public API mà directive này cung cấp như lấy ra value của nó chẳng hạn như **bookForm.value** hay là kiểm tra xem form của chúng ta có valid hay không **bookForm.invalid**

Tuy nhiên thì hiện tại form của chúng ta vẫn đang chỉ là 1 form rỗng, công việc tiếp theo là chúng ta phải nói cho Angular biết các form control nào cần phải quản lý. Đây chính là lúc chúng ta dùng đến ngModel directive.

Chúng ta sẽ thêm ngModel vào các control như sau:
```js
<form
  autocomplete="off"
  #bookForm="ngForm"
>
  <div class="form-group">
    <label for="bookName">Book Name</label>
    <input name="name" ngModel type="text" class="form-control">

    <label for="year">Year</label>
    <input  name="year" ngModel type="text" class="form-control">

    <label for="stars">Stars</label>
    <input  name="stars" ngModel type="text" class="form-control">
  </div>
</form>
```
Chú ý là chúng ta cần phải khai báo attribute name cho các form control nhé, bởi vì form sẽ quản lý các form control dựa trên attribute name. Chúng ta thử sử dụng bookForm.value để xem bookForm có những value nào nhé: 
```js
<pre>{{ bookForm.value | json }}</pre>
```
Kết quả:
```js
{
  "name": "",
  "year": "",
  "stars": ""
}
```
Giả sử trong component có sẵn 1 biến **book**, và chúng ta muốn bind data cho các control với **book**, lúc này chúng ta sẽ dùng đến binding cho property, và property chúng ta nhắc đến ở đây chính là **ngModel**.
```js
// *.component.ts
book = {name: '123', year: 1993, stars: null};
 
// *.component.html
...
<input name="name" [ngModel]="book.name" type="text" class="form-control">
...
<input name="year" [ngModel]="book.year" type="text" class="form-control">
...
<input name="stars" [ngModel]="book.stars" type="text" class="form-control">
...
```
Chú ý rằng, khi update form control, bản thân control được form quản lý sẽ thay đổi – bookForm.value, nhưng object book ở trong component sẽ không có thay đổi gì cả, vì chúng ta không hề đụng chạm gì tới nó, chúng ta chỉ binding một chiều, để có thể thay đổi book trong component chúng ta buộc phải binding ngược trở lại. Cách binding trên còn được biết đến với tên gọi two-way binding **[(ngModel)].**
```js
...
<input name="name" [(ngModel)]="book.name" type="text" class="form-control">
...
<input name="year" [(ngModel)]="book.year" type="text" class="form-control">
...
<input name="stars" [(ngModel)]="book.stars" type="text" class="form-control">
...
```
Để thêm các validation cho form thì trong Angular có cung cấp một số Validators cơ bản mà chúng ta có thể dùng ngay trong template như: required, minlength, maxlength... Chúng được viết là các directives, nên chúng ta có thể sử dụng như các directives khác trong template của bạn.

Ví dụ:
```js
<input name="name" required minlength="3" [(ngModel)]="book.name" type="text" class="form-control">
```
Chúng ta vừa thêm 2 validators cho form control name đó là form này bắt buộc phải required và có ít nhất là 3 ký tự.
Để kiểm tra và dễ dàng quan sát, chúng ta sẽ thêm phần hiển thị lỗi như sau:
```js
<pre>{{ bookForm.controls.name?.errors | json }}</pre>
```
Khi ô input này để trống thì ta có thể thấy lỗi hiển thị trên màn hình:
```js
{
  "required": true
}
```    
hoặc khi nhập vào 2 ký tự, thì kết quả sẽ là:
```js
{
  "minlength": {
    "requiredLength": 3,
    "actualLength": 2
  }
}
```  
Khi input này được nhập nhiều hơn 2 ký tự thì chúng ta sẽ thấy key **required** và **minlength** của object trên sẽ bị xóa bỏ. Chúng ta có thể sử dụng điều này để điều khiển giao diện ẩn/hiển thị lỗi ra view cho người dùng.
    
Cuối cùng để hoàn thiện form trên thì chúng ta sẽ thêm 1 button dùng để submit form bằng cách sử dụng directive **ngSubmit**
```js
<form
  autocomplete="off"
  #bookForm="ngForm"
  (ngSubmit)="addBook(bookForm.value)"
>
  <div class="form-group">
      ...
  </div>
  <button type="submit" class="btn btn-primary mr-1">Save</button>
</form>
```   
### Tạm kết
Như vậy, chúng ta có thể thấy việc sử dụng **Template-driven form** trong Angular khá là dễ dàng và dễ tiếp cận đối với những người mới làm quen với Angular. Trong bài viết này này thì mình chưa đề cập đến custom validation cho form control, phần lớn bởi vì **Template-driven form** không thật sự mạnh trong việc hỗ trợ custom validation, thay vào đó mình sẽ giới thiệu chủ đề này trong những bài viết sắp tới. Rất hy vọng mọi người sẽ tiếp tục theo dõi và ủng hộ.